using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Phase18_RelationalApprovalTeams : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Approvers",
                table: "ApprovalTeams");

            migrationBuilder.CreateTable(
                name: "ApprovalTeamApprovers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ApprovalTeamId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    AssignedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApprovalTeamApprovers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApprovalTeamApprovers_ApprovalTeams_ApprovalTeamId",
                        column: x => x.ApprovalTeamId,
                        principalTable: "ApprovalTeams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApprovalTeamApprovers_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ApprovalTeamMembers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ApprovalTeamId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    JoinedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApprovalTeamMembers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApprovalTeamMembers_ApprovalTeams_ApprovalTeamId",
                        column: x => x.ApprovalTeamId,
                        principalTable: "ApprovalTeams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApprovalTeamMembers_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalTeamApprovers_ApprovalTeamId",
                table: "ApprovalTeamApprovers",
                column: "ApprovalTeamId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalTeamApprovers_UserId",
                table: "ApprovalTeamApprovers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalTeamMembers_ApprovalTeamId",
                table: "ApprovalTeamMembers",
                column: "ApprovalTeamId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalTeamMembers_UserId",
                table: "ApprovalTeamMembers",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApprovalTeamApprovers");

            migrationBuilder.DropTable(
                name: "ApprovalTeamMembers");

            migrationBuilder.AddColumn<string>(
                name: "Approvers",
                table: "ApprovalTeams",
                type: "jsonb",
                nullable: false,
                defaultValue: "");
        }
    }
}
