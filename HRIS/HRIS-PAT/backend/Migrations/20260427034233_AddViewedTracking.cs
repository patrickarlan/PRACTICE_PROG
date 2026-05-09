using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddViewedTracking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ViewedAt",
                table: "AccomplishmentReports",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ViewedById",
                table: "AccomplishmentReports",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ViewedByName",
                table: "AccomplishmentReports",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ViewedAt",
                table: "AccomplishmentReports");

            migrationBuilder.DropColumn(
                name: "ViewedById",
                table: "AccomplishmentReports");

            migrationBuilder.DropColumn(
                name: "ViewedByName",
                table: "AccomplishmentReports");
        }
    }
}
