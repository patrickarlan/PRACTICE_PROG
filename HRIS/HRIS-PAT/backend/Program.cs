using System.Text;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using backend.Data;
using backend.Models;
using backend.Services;
using System.Security.Claims;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using Serilog.Filters;


// Use explicit naming to avoid namespace profile conflicts
using OpenApiInfo = Microsoft.OpenApi.Models.OpenApiInfo;
using OpenApiSecurityScheme = Microsoft.OpenApi.Models.OpenApiSecurityScheme;
using ParameterLocation = Microsoft.OpenApi.Models.ParameterLocation;
using SecuritySchemeType = Microsoft.OpenApi.Models.SecuritySchemeType;
using OpenApiRequirement = Microsoft.OpenApi.Models.OpenApiSecurityRequirement;
using OpenApiReference = Microsoft.OpenApi.Models.OpenApiReference;
using ReferenceType = Microsoft.OpenApi.Models.ReferenceType;

// Load environment variables from .env file
Env.Load();

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

try
{
    var builder = WebApplication.CreateBuilder(args);

    // Clear default logging providers and use Serilog
    builder.Logging.ClearProviders();
    var enableApiLogging = bool.Parse(Environment.GetEnvironmentVariable("ENABLE_API_LOGGING") ?? "false");

    builder.Services.AddSerilog((services, configuration) =>
    {
        configuration
            .ReadFrom.Configuration(builder.Configuration)
            .ReadFrom.Services(services)
            .Enrich.FromLogContext()
            // Main Console/File logs
            .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj}{NewLine}{Exception}")
            .WriteTo.File("Logs/hris-.log",
                rollingInterval: RollingInterval.Day,
                retainedFileCountLimit: 7,
                outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj}{NewLine}{Exception}");

        if (enableApiLogging)
        {
            // Dedicated API Request Log
            configuration.WriteTo.Logger(lc => lc
                .Filter.ByIncludingOnly(Matching.FromSource("Serilog.AspNetCore.RequestLoggingMiddleware"))
                .WriteTo.File("Logs/api-requests-.log",
                    rollingInterval: RollingInterval.Day,
                    retainedFileCountLimit: 7,
                    outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj} {NewLine}Headers: {Headers}{NewLine}Body: {Body}{NewLine}{Exception}"));
        }
    });


    // Add services to the container.
    builder.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(policy =>
        {
            policy.WithOrigins("http://localhost:5173", "http://localhost:5174", "http://localhost:3000", "https://hrisweb.vercel.app")
                  .AllowCredentials()
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .WithExposedHeaders("X-Total-Count");
        });
    });

    // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
    builder.Services.ConfigureHttpJsonOptions(options =>
    {
        options.SerializerOptions.AllowTrailingCommas = true;
    });
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "HRIS API", Version = "v1" });
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            In = ParameterLocation.Header,
            Description = "Please enter token (e.g. 'Bearer <token>')",
            Name = "Authorization",
            Type = SecuritySchemeType.ApiKey,
            BearerFormat = "JWT",
            Scheme = "Bearer"
        });
        c.AddSecurityRequirement(new OpenApiRequirement
        {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
        });
    });
    builder.Services.AddControllers()
        .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
            options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
            options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
        });
    // builder.Services.AddScoped<IAccomplishmentReportService, AccomplishmentReportService>(); // Removed redundant registration

    builder.Services.Configure<ApiBehaviorOptions>(options =>
    {
        options.InvalidModelStateResponseFactory = context =>
        {
            var problem = new ValidationProblemDetails(context.ModelState)
            {
                Title = "One or more validation errors occurred.",
                Status = StatusCodes.Status400BadRequest,
            };
            return new BadRequestObjectResult(problem)
            {
                ContentTypes = { "application/problem+json" }
            };
        };
    });

    // Register application services
    builder.Services.AddScoped<IAccomplishmentReportService, AccomplishmentReportService>();

    builder.Services.AddScoped<IEmployeeService, EmployeeService>();
    builder.Services.AddScoped<INotificationService, NotificationService>();
    builder.Services.AddScoped<IAuditLogService, AuditLogService>();
    // Register a real email sender using MailKit for production-ready delivery
    builder.Services.AddSingleton(typeof(IExtendedEmailSender<>), typeof(SmtpEmailSender<>));
    builder.Services.AddSingleton(typeof(Microsoft.AspNetCore.Identity.IEmailSender<>), typeof(SmtpEmailSender<>));

    builder.Services.AddHttpContextAccessor();
    builder.Services.AddSingleton<AuditDbInterceptor>();

    // Add DbContext
    var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
    builder.Services.AddDbContext<ApplicationDbContext>((sp, options) =>
    {
        var interceptor = sp.GetRequiredService<AuditDbInterceptor>();
        options.UseNpgsql(connectionString, npgsqlOptions =>
        {
            npgsqlOptions.EnableRetryOnFailure(
                maxRetryCount: 10,
                maxRetryDelay: TimeSpan.FromSeconds(30),
                errorCodesToAdd: null);
        })
        .AddInterceptors(interceptor);
    });



    // Add Identity
    builder.Services.AddAuthorization(options =>
    {
        options.AddPolicy("CanViewARReview", policy =>
            policy.RequireRole("SuperAdmin", "Viewer", "Approver")
        );

        options.AddPolicy("CanApproveAR", policy =>
            policy.RequireAssertion(context =>
                context.User.IsInRole("SuperAdmin") ||
                context.User.IsInRole("Approver") ||
                context.User.IsInRole("Viewer") // Viewer can approve if sent to them
            )
        );
        
        options.AddPolicy("CanManageTeams", policy =>
            policy.RequireRole("SuperAdmin")
        );
    });
    // Prevent claim renaming (keeps 'sub' instead of the long XML schema)
    // System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

    builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        var secret = Environment.GetEnvironmentVariable("JWT_SECRET") ?? "fallback_secret_key_at_least_32_chars";
        var issuer = Environment.GetEnvironmentVariable("JWT_ISSUER");
        var audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = !string.IsNullOrEmpty(issuer),
            ValidateAudience = !string.IsNullOrEmpty(audience),
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = issuer,
            ValidAudience = audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)),
            NameClaimType = ClaimTypes.NameIdentifier,
            RoleClaimType = ClaimTypes.Role
        };
    });

    builder.Services.AddIdentityApiEndpoints<ApplicationUser>(options =>
    {
        options.Password.RequireDigit = true;
        options.Password.RequireLowercase = true;
        options.Password.RequireNonAlphanumeric = true;
        options.Password.RequireUppercase = true;
        options.Password.RequiredLength = 6;
    })
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

    var app = builder.Build();

    Log.Information("Starting web host...");

    // Seed the database with roles and superadmin user on startup
    using (var scope = app.Services.CreateScope())
    {
        var serviceProvider = scope.ServiceProvider;
        try
        {
            await SeedDatabase.InitializeAsync(serviceProvider);
        }
        catch (Exception ex)
        {
            var logger = serviceProvider.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "An error occurred while seeding the database.");
        }
    }

    // Configure the HTTP request pipeline.
    var enableSwagger = bool.Parse(Environment.GetEnvironmentVariable("ENABLE_SWAGGER") ?? "false");
    if (enableSwagger)
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    if (enableApiLogging)
    {
        app.UseSerilogRequestLogging(options =>
        {
            options.EnrichDiagnosticContext = (diagnosticContext, httpContext) =>
            {
                // 1. Add headers to the log context
                var headers = httpContext.Request.Headers
                    .Where(h => h.Key != "Authorization" && h.Key != "Cookie") // Security: exclude sensitive headers
                    .ToDictionary(h => h.Key, h => h.Value.ToString());
                diagnosticContext.Set("Headers", headers, destructureObjects: true);

                // 2. Add body to the log context (from our custom middleware)
                if (httpContext.Items.TryGetValue("RequestBody", out var body))
                {
                    var bodyStr = body?.ToString() ?? "";

                    // Basic masking for sensitive data
                    if (bodyStr.Contains("\"password\"", StringComparison.OrdinalIgnoreCase))
                    {
                        bodyStr = System.Text.RegularExpressions.Regex.Replace(
                            bodyStr,
                            "\"password\"\\s*:\\s*\"[^\"]*\"",
                            "\"password\":\"***MASKED***\"",
                            System.Text.RegularExpressions.RegexOptions.IgnoreCase);
                    }

                    diagnosticContext.Set("Body", bodyStr);
                }
            };
        });

        // Middleware to capture the request body for Serilog
        app.Use(async (context, next) =>
        {
            if (context.Request.ContentLength > 0 &&
                (context.Request.ContentType?.Contains("application/json") ?? false))
            {
                context.Request.EnableBuffering();
                using (var reader = new StreamReader(context.Request.Body, leaveOpen: true))
                {
                    var body = await reader.ReadToEndAsync();
                    context.Items["RequestBody"] = body;
                    context.Request.Body.Position = 0;
                }
            }
            await next();
        });
    }

    app.UseCors();

    // app.UseHttpsRedirection();

    app.UseExceptionHandler(errorApp =>
    {
        errorApp.Run(async context =>
        {
            context.Response.ContentType = "application/json";
            var feature = context.Features.Get<IExceptionHandlerPathFeature>();
            var exception = feature?.Error;

            // Using our new unified ApiResponse DTO for all server errors
            var response = backend.DTOs.ApiResponse<object>.ErrorResponse(
                exception?.Message ?? "An unexpected server error occurred."
            );

            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            await context.Response.WriteAsJsonAsync(response);
        });
    });

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();
    app.MapIdentityApi<ApplicationUser>();

    app.MapPost("/logout", async (SignInManager<ApplicationUser> signInManager) =>
    {
        await signInManager.SignOutAsync();
        return Results.Ok();
    }).RequireAuthorization();

    var summaries = new[]
    {
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

    app.MapGet("/health", async (ApplicationDbContext dbContext) =>
    {
        bool isDbConnected = false;
        string? dbError = null;
        string? connStringHidden = null;
        try
        {
            // Try opening the connection to force an error to map
            await dbContext.Database.OpenConnectionAsync();
            isDbConnected = true;
            await dbContext.Database.CloseConnectionAsync();
        }
        catch (Exception ex)
        {
            isDbConnected = false;
            dbError = ex.Message;
        }

        var connectionString = dbContext.Database.GetConnectionString();
        connStringHidden = string.IsNullOrEmpty(connectionString) ? "Missing" : $"Present (Length: {connectionString.Length})";

        var result = new
        {
            status = isDbConnected ? "Healthy" : "Degraded",
            database = isDbConnected ? "Connected" : "Disconnected",
            connectionStringStatus = connStringHidden,
            error = dbError,
            timestamp = DateTime.UtcNow
        };

        return isDbConnected ? Results.Ok(result) : Results.Json(result, statusCode: 503);
    })
    .WithName("HealthCheck");

    app.MapGet("/get", () =>
    {
        return Results.Ok(new { message = "This is a sample GET endpoint for testing", timestamp = DateTime.UtcNow });
    })
    .WithName("SampleGetEndpoint");

    app.MapGet("/weatherforecast", () =>
    {
        var forecast = Enumerable.Range(1, 5).Select(index =>
            new WeatherForecast
            (
                DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                Random.Shared.Next(-20, 55),
                summaries[Random.Shared.Next(summaries.Length)]
            ))
            .ToArray();
        return forecast;
    })
    .WithName("GetWeatherForecast");

    app.MapGet("/fun", () =>
    {
        return Results.Ok(new { message = "Here is a fun fact: Programming is like magic, but with coffee!", timestamp = DateTime.UtcNow });
    })
    .WithName("FunEndpoint");

    app.MapGet("/test", () =>
    {
        return Results.Ok(new { message = "Test endpoint reached successfully", timestamp = DateTime.UtcNow });
    })
    .WithName("TestEndpoint");

    app.Run();

    Log.Information("Stopped cleanly");
}
catch (Exception ex) when (ex.GetType().Name is not "HostAbortedException")
{
    Log.Fatal(ex, "An unhandled exception occurred during bootstrapping");
}
finally
{
    Log.CloseAndFlush();
}

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
