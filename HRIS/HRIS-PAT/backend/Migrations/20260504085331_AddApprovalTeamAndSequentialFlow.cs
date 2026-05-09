using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddApprovalTeamAndSequentialFlow : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ApprovalTeamId",
                table: "AspNetUsers",
                column: "ApprovalTeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_ApprovalTeams_ApprovalTeamId",
                table: "AspNetUsers",
                column: "ApprovalTeamId",
                principalTable: "ApprovalTeams",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_ApprovalTeams_ApprovalTeamId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_ApprovalTeamId",
                table: "AspNetUsers");
        }
    }
}
