using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddUniqueApproverConstraint : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ApprovalTeamApprovers_UserId",
                table: "ApprovalTeamApprovers");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalTeamApprovers_UserId",
                table: "ApprovalTeamApprovers",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ApprovalTeamApprovers_UserId",
                table: "ApprovalTeamApprovers");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalTeamApprovers_UserId",
                table: "ApprovalTeamApprovers",
                column: "UserId");
        }
    }
}
