using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddUniqueTeamMembershipConstraint : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ApprovalTeamMembers_UserId",
                table: "ApprovalTeamMembers");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalTeamMembers_UserId",
                table: "ApprovalTeamMembers",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ApprovalTeamMembers_UserId",
                table: "ApprovalTeamMembers");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalTeamMembers_UserId",
                table: "ApprovalTeamMembers",
                column: "UserId");
        }
    }
}
