using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddSequentialApproval : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ApprovalTeamId",
                table: "AspNetUsers",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SubstituteId",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApprovalFlowSnapshot",
                table: "AccomplishmentReportEXP",
                type: "jsonb",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "CurrentApprovalStage",
                table: "AccomplishmentReportEXP",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "CurrentApproverId",
                table: "AccomplishmentReportEXP",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ApprovalTeams",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Approvers = table.Column<string>(type: "jsonb", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApprovalTeams", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApprovalTeams");

            migrationBuilder.DropColumn(
                name: "ApprovalTeamId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SubstituteId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ApprovalFlowSnapshot",
                table: "AccomplishmentReportEXP");

            migrationBuilder.DropColumn(
                name: "CurrentApprovalStage",
                table: "AccomplishmentReportEXP");

            migrationBuilder.DropColumn(
                name: "CurrentApproverId",
                table: "AccomplishmentReportEXP");
        }
    }
}
