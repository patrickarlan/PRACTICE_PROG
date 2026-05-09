using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddApprovedAndReturnedNamesV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApprovedById",
                table: "AccomplishmentReportEXP",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApprovedByName",
                table: "AccomplishmentReportEXP",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ReturnedByName",
                table: "AccomplishmentReportEXP",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApprovedById",
                table: "AccomplishmentReportEXP");

            migrationBuilder.DropColumn(
                name: "ApprovedByName",
                table: "AccomplishmentReportEXP");

            migrationBuilder.DropColumn(
                name: "ReturnedByName",
                table: "AccomplishmentReportEXP");
        }
    }
}
