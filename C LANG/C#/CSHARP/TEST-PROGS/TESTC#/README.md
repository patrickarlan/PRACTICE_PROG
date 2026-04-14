# TESTC# — Sample Console Template

This repository contains a small C# console app template that demonstrates:
- Command-line argument parsing (flags, options, positional).
- Environment variable fallback.
- Simple file-reading support.
- Verbose logging.

Build:

```powershell
dotnet build
```

Run examples:

```powershell
dotnet run -- -n Alice -c 3
dotnet run -- --file sample.txt
dotnet run -- -v positional1 positional2
```

Notes:
- The app uses `NAME` or `USERNAME` environment variables if `--name` isn't provided.
- Exit codes: `0` success, `2` file-not-found.
