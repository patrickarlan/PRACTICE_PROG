using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AmenitiesController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    public AmenitiesController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    /// <summary>
    /// Health check endpoint to verify database and application status
    /// </summary>
    [HttpGet("health")]
    public async Task<IActionResult> GetHealth()
    {
        bool isDbConnected = false;
        string? dbError = null;
        string? connStringHidden = null;
        try
        {
            await _dbContext.Database.OpenConnectionAsync();
            isDbConnected = true;
            await _dbContext.Database.CloseConnectionAsync();
        }
        catch (Exception ex)
        {
            isDbConnected = false;
            dbError = ex.Message;
        }

        var connectionString = _dbContext.Database.GetDbConnection().ConnectionString;
        connStringHidden = string.IsNullOrEmpty(connectionString) ? "Missing" : $"Present (Length: {connectionString.Length})";

        var result = new
        {
            status = isDbConnected ? "Healthy" : "Degraded",
            database = isDbConnected ? "Connected" : "Disconnected",
            connectionStringStatus = connStringHidden,
            error = dbError,
            timestamp = DateTime.UtcNow
        };

        return isDbConnected ? Ok(result) : StatusCode(503, result);
    }

    /// <summary>
    /// Sample GET endpoint for testing
    /// </summary>
    [HttpGet("get")]
    public IActionResult Get()
    {
        return Ok(new { message = "This is a sample GET endpoint for testing", timestamp = DateTime.UtcNow });
    }

    /// <summary>
    /// Weather forecast endpoint
    /// </summary>
    [HttpGet("weatherforecast")]
    public IActionResult GetWeatherForecast()
    {
        var forecast = Enumerable.Range(1, 5).Select(index =>
            new WeatherForecast
            (
                DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                Random.Shared.Next(-20, 55),
                Summaries[Random.Shared.Next(Summaries.Length)]
            ))
            .ToArray();
        return Ok(forecast);
    }

    /// <summary>
    /// Fun fact endpoint
    /// </summary>
    [HttpGet("fun")]
    public IActionResult GetFun()
    {
        return Ok(new { message = "Here is a fun fact: Programming is like magic, but with coffee!", timestamp = DateTime.UtcNow });
    }

    /// <summary>
    /// Test endpoint to verify API connectivity
    /// </summary>
    [HttpGet("test")]
    public IActionResult GetTest()
    {
        var data = new { message = "Test endpoint reached successfully", timestamp = DateTime.UtcNow };

        return Ok(backend.DTOs.ApiResponse<object>.SuccessResponse(data, "Success"));
    }
}

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
