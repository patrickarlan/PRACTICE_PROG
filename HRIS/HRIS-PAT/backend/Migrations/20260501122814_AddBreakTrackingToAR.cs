using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddBreakTrackingToAR : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BreakDurationMinutes",
                table: "AccomplishmentReportEXP",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<TimeOnly>(
                name: "BreakEndTime",
                table: "AccomplishmentReportEXP",
                type: "time without time zone",
                nullable: true);

            migrationBuilder.AddColumn<TimeOnly>(
                name: "BreakStartTime",
                table: "AccomplishmentReportEXP",
                type: "time without time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BreakDurationMinutes",
                table: "AccomplishmentReportEXP");

            migrationBuilder.DropColumn(
                name: "BreakEndTime",
                table: "AccomplishmentReportEXP");

            migrationBuilder.DropColumn(
                name: "BreakStartTime",
                table: "AccomplishmentReportEXP");
        }
    }
}
