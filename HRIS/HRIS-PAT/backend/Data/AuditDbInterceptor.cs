using Microsoft.EntityFrameworkCore.Diagnostics;
using System.Data.Common;
using System.Security.Claims;

namespace backend.Data;

/// <summary>
/// This interceptor executes before every database command.
/// It sets the 'app.current_user_id' session variable in PostgreSQL so that
/// database triggers can identify who performed the action.
///
/// FIX: We previously prepended "SET app.current_user_id = '...';" directly to
/// each SQL command text. This created a two-statement batch, which caused
/// PostgreSQL to report row counts for the wrong statement. EF Core's optimistic
/// concurrency check then saw 0 rows affected and threw DbUpdateConcurrencyException.
///
/// The fix is to send the SET command as a completely SEPARATE command on the same
/// connection BEFORE each operation, so each SQL command remains a single statement
/// and EF Core reads the correct row count.
/// </summary>
public class AuditDbInterceptor : DbCommandInterceptor
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AuditDbInterceptor(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public override InterceptionResult<DbDataReader> ReaderExecuting(
        DbCommand command,
        CommandEventData eventData,
        InterceptionResult<DbDataReader> result)
    {
        SetCurrentUserSessionVariable(command);
        return base.ReaderExecuting(command, eventData, result);
    }

    public override ValueTask<InterceptionResult<DbDataReader>> ReaderExecutingAsync(
        DbCommand command,
        CommandEventData eventData,
        InterceptionResult<DbDataReader> result,
        CancellationToken cancellationToken = default)
    {
        SetCurrentUserSessionVariable(command);
        return base.ReaderExecutingAsync(command, eventData, result, cancellationToken);
    }

    public override InterceptionResult<int> NonQueryExecuting(
        DbCommand command,
        CommandEventData eventData,
        InterceptionResult<int> result)
    {
        SetCurrentUserSessionVariable(command);
        return base.NonQueryExecuting(command, eventData, result);
    }

    public override ValueTask<InterceptionResult<int>> NonQueryExecutingAsync(
        DbCommand command,
        CommandEventData eventData,
        InterceptionResult<int> result,
        CancellationToken cancellationToken = default)
    {
        SetCurrentUserSessionVariable(command);
        return base.NonQueryExecutingAsync(command, eventData, result, cancellationToken);
    }

    private void SetCurrentUserSessionVariable(DbCommand command)
    {
        var user = _httpContextAccessor.HttpContext?.User;
        var userId = user?.FindFirstValue(ClaimTypes.NameIdentifier) 
                  ?? user?.FindFirstValue("sub") 
                  ?? "SYSTEM";

        // CORRECT APPROACH: Issue the SET as a separate command on the same connection
        // BEFORE the actual command runs. This ensures each command remains a single
        // statement and EF Core reads the correct affected row count from the right query.
        //
        // The old approach (prepending to CommandText) created a two-statement batch:
        //   "SET app.current_user_id = 'x'; UPDATE ..."
        // PostgreSQL returned row count for the SET (0), not the UPDATE (1), which caused
        // EF Core's optimistic concurrency check to throw DbUpdateConcurrencyException.
        using var setCmd = command.Connection!.CreateCommand();
        setCmd.Transaction = command.Transaction;
        setCmd.CommandText = $"SET SESSION app.current_user_id = '{userId}'";
        setCmd.ExecuteNonQuery();
        
        // Debug trace (remove after verification)
        if (userId != "SYSTEM") Console.WriteLine($"[Audit] Setting session user: {userId}");
    }
}
