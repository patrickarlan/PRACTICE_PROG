using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UnifyAdminRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Unify ""HR Management"" into ""SuperAdmin""
            // 1. Reassign users from HR Management to SuperAdmin (avoiding duplicates)
            migrationBuilder.Sql(@$"
                INSERT INTO ""AspNetUserRoles"" (""UserId"", ""RoleId"")
                SELECT ur.""UserId"", (SELECT ""Id"" FROM ""AspNetRoles"" WHERE ""Name"" = 'SuperAdmin' LIMIT 1)
                FROM ""AspNetUserRoles"" ur
                JOIN ""AspNetRoles"" r ON ur.""RoleId"" = r.""Id""
                WHERE r.""Name"" = 'HR Management'
                AND ur.""UserId"" NOT IN (
                    SELECT ""UserId"" FROM ""AspNetUserRoles""
                    WHERE ""RoleId"" = (SELECT ""Id"" FROM ""AspNetRoles"" WHERE ""Name"" = 'SuperAdmin' LIMIT 1)
                );
            ");

            // 2. Remove users from HR Management role
            migrationBuilder.Sql(@$"
                DELETE FROM ""AspNetUserRoles""
                WHERE ""RoleId"" = (SELECT ""Id"" FROM ""AspNetRoles"" WHERE ""Name"" = 'HR Management' LIMIT 1);
            ");

            // 3. Delete the HR Management role itself
            migrationBuilder.Sql(@$"
                DELETE FROM ""AspNetRoles"" WHERE ""Name"" = 'HR Management';
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // For rollback: Re-create the role and move users back if necessary.
            // But since this is a unification, we usually treat it as a one-way migration.
        }
    }
}
