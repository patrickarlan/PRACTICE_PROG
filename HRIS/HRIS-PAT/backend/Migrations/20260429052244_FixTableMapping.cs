using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class FixTableMapping : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AccomplishmentReports",
                table: "AccomplishmentReports");

            migrationBuilder.RenameTable(
                name: "AccomplishmentReports",
                newName: "AccomplishmentReportEXP");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AccomplishmentReportEXP",
                table: "AccomplishmentReportEXP",
                column: "ReportId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AccomplishmentReportEXP",
                table: "AccomplishmentReportEXP");

            migrationBuilder.RenameTable(
                name: "AccomplishmentReportEXP",
                newName: "AccomplishmentReports");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AccomplishmentReports",
                table: "AccomplishmentReports",
                column: "ReportId");
        }
    }
}
