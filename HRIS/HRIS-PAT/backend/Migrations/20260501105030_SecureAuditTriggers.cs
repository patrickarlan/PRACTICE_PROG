using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class SecureAuditTriggers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
-- 1. Refined Audit Function for Reports
CREATE OR REPLACE FUNCTION audit_trigger_func()
RETURNS TRIGGER AS $$
DECLARE
    current_user_id TEXT;
BEGIN
    BEGIN
        current_user_id := current_setting('app.current_user_id', true);
    EXCEPTION WHEN OTHERS THEN
        current_user_id := 'SYSTEM';
    END;
    
    IF current_user_id IS NULL OR current_user_id = '' THEN 
        current_user_id := 'SYSTEM'; 
    END IF;

    IF (TG_OP = 'INSERT') THEN
        INSERT INTO ""AuditLogs"" (""TableName"", ""RecordId"", ""Action"", ""NewData"", ""ChangedBy"", ""ChangedAt"")
        VALUES (TG_TABLE_NAME, CAST(NEW.""ReportId"" AS TEXT), 'INSERT', to_jsonb(NEW), current_user_id, now());
    ELSIF (TG_OP = 'UPDATE') THEN
        -- Optimization: Only log if data actually changed
        IF (to_jsonb(OLD) = to_jsonb(NEW)) THEN RETURN NEW; END IF;
        
        INSERT INTO ""AuditLogs"" (""TableName"", ""RecordId"", ""Action"", ""OldData"", ""NewData"", ""ChangedBy"", ""ChangedAt"")
        VALUES (TG_TABLE_NAME, CAST(NEW.""ReportId"" AS TEXT), 'UPDATE', to_jsonb(OLD), to_jsonb(NEW), current_user_id, now());
    ELSIF (TG_OP = 'DELETE') THEN
        INSERT INTO ""AuditLogs"" (""TableName"", ""RecordId"", ""Action"", ""OldData"", ""ChangedBy"", ""ChangedAt"")
        VALUES (TG_TABLE_NAME, CAST(OLD.""ReportId"" AS TEXT), 'DELETE', to_jsonb(OLD), current_user_id, now());
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Refined Audit Function for Users (Excludes Passwords - Phase 7.4)
CREATE OR REPLACE FUNCTION audit_users_trigger_func()
RETURNS TRIGGER AS $$
DECLARE
    current_user_id TEXT;
    old_data JSONB;
    new_data JSONB;
BEGIN
    BEGIN
        current_user_id := current_setting('app.current_user_id', true);
    EXCEPTION WHEN OTHERS THEN
        current_user_id := 'SYSTEM';
    END;

    IF current_user_id IS NULL OR current_user_id = '' THEN 
        current_user_id := 'SYSTEM'; 
    END IF;

    -- Phase 7.4: Filter out sensitive columns
    IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
        new_data := to_jsonb(NEW) - 'PasswordHash' - 'SecurityStamp' - 'ConcurrencyStamp';
    END IF;
    
    IF (TG_OP = 'UPDATE' OR TG_OP = 'DELETE') THEN
        old_data := to_jsonb(OLD) - 'PasswordHash' - 'SecurityStamp' - 'ConcurrencyStamp';
    END IF;

    IF (TG_OP = 'INSERT') THEN
        INSERT INTO ""AuditLogs"" (""TableName"", ""RecordId"", ""Action"", ""NewData"", ""ChangedBy"", ""ChangedAt"")
        VALUES (TG_TABLE_NAME, NEW.""Id"", 'INSERT', new_data, current_user_id, now());
    ELSIF (TG_OP = 'UPDATE') THEN
        -- Only log if actual data changed (ignoring password/stamp fields)
        IF (old_data = new_data) THEN RETURN NEW; END IF;
        
        INSERT INTO ""AuditLogs"" (""TableName"", ""RecordId"", ""Action"", ""OldData"", ""NewData"", ""ChangedBy"", ""ChangedAt"")
        VALUES (TG_TABLE_NAME, NEW.""Id"", 'UPDATE', old_data, new_data, current_user_id, now());
    ELSIF (TG_OP = 'DELETE') THEN
        INSERT INTO ""AuditLogs"" (""TableName"", ""RecordId"", ""Action"", ""OldData"", ""ChangedBy"", ""ChangedAt"")
        VALUES (TG_TABLE_NAME, OLD.""Id"", 'DELETE', old_data, current_user_id, now());
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
