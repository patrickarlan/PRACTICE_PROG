using Microsoft.EntityFrameworkCore;
using backend.Data;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;

var builder = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: true)
    .AddEnvironmentVariables();

// Manually load .env since it's used in the project
var envPath = Path.Combine(Directory.GetCurrentDirectory(), ".env");
if (File.Exists(envPath))
{
    foreach (var line in File.ReadAllLines(envPath))
    {
        var parts = line.Split('=', 2);
        if (parts.Length == 2)
        {
            Environment.SetEnvironmentVariable(parts[0].Trim(), parts[1].Trim().Trim('"'));
        }
    }
}

var configuration = builder.Build();
var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");

if (string.IsNullOrEmpty(connectionString))
{
    Console.WriteLine("DB_CONNECTION_STRING not found.");
    return;
}

var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
optionsBuilder.UseNpgsql(connectionString);

using (var context = new ApplicationDbContext(optionsBuilder.Options))
{
    Console.WriteLine("Inserting migration history...");
    try {
        context.Database.ExecuteSqlRaw(@"
            INSERT INTO ""__EFMigrationsHistory"" (""MigrationId"", ""ProductVersion"")
            VALUES 
                ('20260427013517_InitialCreate', '10.0.5'),
                ('20260427034233_AddViewedTracking', '10.0.5'),
                ('20260427041129_AddNotificationsTable', '10.0.5'),
                ('20260429052244_FixTableMapping', '10.0.5')
            ON CONFLICT (""MigrationId"") DO NOTHING;
        ");
        Console.WriteLine("Success.");
    } catch (Exception ex) {
        Console.WriteLine($"Error: {ex.Message}");
    }
}
