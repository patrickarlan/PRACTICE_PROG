using System;
using System.Collections.Generic;
using System.IO;

namespace TESTCSharpTemplate
{
    class Program
    {
        static int Main(string[] args)
        {
            var opts = ParseArgs(args);

            if (opts.ShowHelp)
            {
                PrintUsage();
                return 0;
            }

            if (opts.ShowVersion)
            {
                Console.WriteLine("TESTC# version 0.1.0");
                return 0;
            }

            if (!string.IsNullOrEmpty(opts.FilePath))
            {
                if (File.Exists(opts.FilePath))
                {
                    var content = File.ReadAllText(opts.FilePath);
                    Console.WriteLine(content);
                }
                else
                {
                    Console.Error.WriteLine($"File not found: {opts.FilePath}");
                    return 2;
                }
            }

            var name = opts.Name ?? Environment.GetEnvironmentVariable("NAME") ?? Environment.GetEnvironmentVariable("USERNAME") ?? "World";
            for (int i = 0; i < Math.Max(1, opts.Count); i++)
            {
                if (opts.Verbose) Console.WriteLine($"[VERBOSE] Greeting {i + 1}/{opts.Count}");
                Console.WriteLine($"Hello, {name}!");
            }

            if (opts.Positional.Count > 0 && opts.Verbose)
            {
                Console.WriteLine("[VERBOSE] Positional args: " + string.Join(", ", opts.Positional));
            }

            return 0;
        }

        private static Options ParseArgs(string[] args)
        {
            var opts = new Options();
            for (int i = 0; i < args.Length; i++)
            {
                var a = args[i];
                if (a == "-h" || a == "--help") opts.ShowHelp = true;
                else if (a == "-v" || a == "--verbose") opts.Verbose = true;
                else if (a == "--version") opts.ShowVersion = true;
                else if (a == "-n" || a == "--name")
                {
                    string val = null;
                    if (a.Contains("=")) val = a.Split('=', 2)[1];
                    else if (i + 1 < args.Length) val = args[++i];
                    opts.Name = val;
                }
                else if (a.StartsWith("--name="))
                {
                    opts.Name = a.Substring("--name=".Length);
                }
                else if (a == "-c" || a == "--count")
                {
                    string val = null;
                    if (a.Contains("=")) val = a.Split('=', 2)[1];
                    else if (i + 1 < args.Length) val = args[++i];
                    if (int.TryParse(val, out var cnt)) opts.Count = cnt;
                }
                else if (a.StartsWith("--count="))
                {
                    if (int.TryParse(a.Substring("--count=".Length), out var cnt)) opts.Count = cnt;
                }
                else if (a == "-f" || a == "--file")
                {
                    string val = null;
                    if (a.Contains("=")) val = a.Split('=', 2)[1];
                    else if (i + 1 < args.Length) val = args[++i];
                    opts.FilePath = val;
                }
                else if (a.StartsWith("--file="))
                {
                    opts.FilePath = a.Substring("--file=".Length);
                }
                else
                {
                    opts.Positional.Add(a);
                }
            }
            return opts;
        }

        private static void PrintUsage()
        {
            Console.WriteLine("Usage: TESTC# [options]");
            Console.WriteLine();
            Console.WriteLine("Options:");
            Console.WriteLine("  -h, --help           Show this help and exit");
            Console.WriteLine("  -v, --verbose        Enable verbose logging");
            Console.WriteLine("  -n, --name <name>    Name to greet (or set NAME env var)");
            Console.WriteLine("  -c, --count <n>      Repeat greeting n times (default 1)");
            Console.WriteLine("  -f, --file <path>    Print a file's contents");
            Console.WriteLine("      --version        Print version and exit");
            Console.WriteLine();
            Console.WriteLine("Examples:");
            Console.WriteLine("  TESTC# -n Alice -c 3");
            Console.WriteLine("  TESTC# --file=config.json");
            Console.WriteLine("  TESTC# -v positional1 positional2");
        }

        private class Options
        {
            public bool Verbose { get; set; } = false;
            public bool ShowHelp { get; set; } = false;
            public bool ShowVersion { get; set; } = false;
            public string Name { get; set; } = null;
            public int Count { get; set; } = 1;
            public string FilePath { get; set; } = null;
            public List<string> Positional { get; } = new List<string>();
        }
    }
}
