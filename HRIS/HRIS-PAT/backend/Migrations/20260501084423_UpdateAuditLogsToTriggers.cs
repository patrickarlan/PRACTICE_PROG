using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateAuditLogsToTriggers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdminId",
                table: "AuditLogs");

            migrationBuilder.DropColumn(
                name: "AdminName",
                table: "AuditLogs");

            migrationBuilder.DropColumn(
                name: "Details",
                table: "AuditLogs");

            migrationBuilder.DropColumn(
                name: "TargetUserId",
                table: "AuditLogs");

            migrationBuilder.RenameColumn(
                name: "Timestamp",
                table: "AuditLogs",
                newName: "ChangedAt");

            migrationBuilder.RenameColumn(
                name: "TargetUserName",
                table: "AuditLogs",
                newName: "ChangedBy");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "AuditLogs",
                newName: "AuditId");

            migrationBuilder.AlterColumn<string>(
                name: "Action",
                table: "AuditLogs",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "NewData",
                table: "AuditLogs",
                type: "jsonb",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OldData",
                table: "AuditLogs",
                type: "jsonb",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RecordId",
                table: "AuditLogs",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TableName",
                table: "AuditLogs",
                type: "text",
                nullable: true);

            // --- CUSTOM TRIGGER SQL START ---
            migrationBuilder.Sql(@"
                ALTER TABLE ""AuditLogs"" ALTER COLUMN ""ChangedAt"" SET DEFAULT now();
                ALTER TABLE ""AuditLogs"" ALTER COLUMN ""TableName"" DROP NOT NULL;
                ALTER TABLE ""AuditLogs"" ALTER COLUMN ""RecordId"" DROP NOT NULL;
                ALTER TABLE ""AuditLogs"" ALTER COLUMN ""Action"" DROP NOT NULL;
            ");

            migrationBuilder.Sql(@"
                CREATE OR REPLACE FUNCTION audit_trigger_func()
                RETURNS TRIGGER AS $$
                DECLARE
                    current_user_id TEXT;
                BEGIN
                    current_user_id := current_setting('app.current_user_id', true);
                    
                    IF (TG_OP = 'INSERT') THEN
                        INSERT INTO ""AuditLogs"" (""TableName"", ""RecordId"", ""Action"", ""NewData"", ""ChangedBy"", ""ChangedAt"")
                        VALUES (TG_TABLE_NAME, CAST(NEW.""ReportId"" AS TEXT), 'INSERT', to_jsonb(NEW), current_user_id, now());
                        RETURN NEW;
                    ELSIF (TG_OP = 'UPDATE') THEN
                        INSERT INTO ""AuditLogs"" (""TableName"", ""RecordId"", ""Action"", ""OldData"", ""NewData"", ""ChangedBy"", ""ChangedAt"")
                        VALUES (TG_TABLE_NAME, CAST(NEW.""ReportId"" AS TEXT), 'UPDATE', to_jsonb(OLD), to_jsonb(NEW), current_user_id, now());
                        RETURN NEW;
                    ELSIF (TG_OP = 'DELETE') THEN
                        INSERT INTO ""AuditLogs"" (""TableName"", ""RecordId"", ""Action"", ""OldData"", ""ChangedBy"", ""ChangedAt"")
                        VALUES (TG_TABLE_NAME, CAST(OLD.""ReportId"" AS TEXT), 'DELETE', to_jsonb(OLD), current_user_id, now());
                        RETURN OLD;
                    END IF;
                    RETURN NULL;
                END;
                $$ LANGUAGE plpgsql;
            ");

            migrationBuilder.Sql(@"
                CREATE OR REPLACE FUNCTION audit_users_trigger_func()
                RETURNS TRIGGER AS $$
                DECLARE
                    current_user_id TEXT;
                BEGIN
                    current_user_id := current_setting('app.current_user_id', true);
                    
                    IF (TG_OP = 'INSERT') THEN
                        INSERT INTO ""AuditLogs"" (""TableName"", ""RecordId"", ""Action"", ""NewData"", ""ChangedBy"", ""ChangedAt"")
                        VALUES (TG_TABLE_NAME, NEW.""Id"", 'INSERT', to_jsonb(NEW), current_user_id, now());
                        RETURN NEW;
                    ELSIF (TG_OP = 'UPDATE') THEN
                        INSERT INTO ""AuditLogs"" (""TableName"", ""RecordId"", ""Action"", ""OldData"", ""NewData"", ""ChangedBy"", ""ChangedAt"")
                        VALUES (TG_TABLE_NAME, NEW.""Id"", 'UPDATE', to_jsonb(OLD), to_jsonb(NEW), current_user_id, now());
                        RETURN NEW;
                    ELSIF (TG_OP = 'DELETE') THEN
                        INSERT INTO ""AuditLogs"" (""TableName"", ""RecordId"", ""Action"", ""OldData"", ""ChangedBy"", ""ChangedAt"")
                        VALUES (TG_TABLE_NAME, OLD.""Id"", 'DELETE', to_jsonb(OLD), current_user_id, now());
                        RETURN OLD;
                    END IF;
                    RETURN NULL;
                END;
                $$ LANGUAGE plpgsql;
            ");

            migrationBuilder.Sql(@"
                DROP TRIGGER IF EXISTS audit_ar_trigger ON ""AccomplishmentReportEXP"";
                CREATE TRIGGER audit_ar_trigger
                AFTER INSERT OR UPDATE OR DELETE ON ""AccomplishmentReportEXP""
                FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();
            ");

            migrationBuilder.Sql(@"
                DROP TRIGGER IF EXISTS audit_users_trigger ON ""AspNetUsers"";
                CREATE TRIGGER audit_users_trigger
                AFTER INSERT OR UPDATE OR DELETE ON ""AspNetUsers""
                FOR EACH ROW EXECUTE FUNCTION audit_users_trigger_func();
            ");
            // --- CUSTOM TRIGGER SQL END ---
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP TRIGGER IF EXISTS audit_ar_trigger ON \"AccomplishmentReportEXP\";");
            migrationBuilder.Sql("DROP TRIGGER IF EXISTS audit_users_trigger ON \"AspNetUsers\";");
            migrationBuilder.Sql("DROP FUNCTION IF EXISTS audit_trigger_func();");
            migrationBuilder.Sql("DROP FUNCTION IF EXISTS audit_users_trigger_func();");

            migrationBuilder.DropColumn(
                name: "NewData",
                table: "AuditLogs");

            migrationBuilder.DropColumn(
                name: "OldData",
                table: "AuditLogs");

            migrationBuilder.DropColumn(
                name: "RecordId",
                table: "AuditLogs");

            migrationBuilder.DropColumn(
                name: "TableName",
                table: "AuditLogs");

            migrationBuilder.RenameColumn(
                name: "ChangedBy",
                table: "AuditLogs",
                newName: "TargetUserName");

            migrationBuilder.RenameColumn(
                name: "ChangedAt",
                table: "AuditLogs",
                newName: "Timestamp");

            migrationBuilder.RenameColumn(
                name: "AuditId",
                table: "AuditLogs",
                newName: "Id");

            migrationBuilder.AlterColumn<string>(
                name: "Action",
                table: "AuditLogs",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "AdminId",
                table: "AuditLogs",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AdminName",
                table: "AuditLogs",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Details",
                table: "AuditLogs",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TargetUserId",
                table: "AuditLogs",
                type: "text",
                nullable: true);
        }
    }
}
