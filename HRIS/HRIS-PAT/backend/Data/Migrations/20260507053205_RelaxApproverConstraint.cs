using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class RelaxApproverConstraint : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ApprovalTeamApprovers_UserId",
                table: "ApprovalTeamApprovers");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalTeamApprovers_UserId_ApprovalTeamId",
                table: "ApprovalTeamApprovers",
                columns: new[] { "UserId", "ApprovalTeamId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ApprovalTeamApprovers_UserId_ApprovalTeamId",
                table: "ApprovalTeamApprovers");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalTeamApprovers_UserId",
                table: "ApprovalTeamApprovers",
                column: "UserId",
                unique: true);
        }
    }
}
