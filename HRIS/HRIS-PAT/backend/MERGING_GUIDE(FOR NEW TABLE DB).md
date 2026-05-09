# HRIS Database Merging Guide

When working with Entity Framework Core on a team, merging database changes requires a little bit of coordination. This guide explains how to handle merging your branches, especially after large refactors like the `AccomplishmentReportEXP` (JSONB) update.

## 🌟 The Golden Rule of Database Merging
**Communication prevents 99% of merge conflicts.** 
Whenever possible, do not generate new migrations at the exact same time as your co-workers. 

If you are merging a massive database change (like refactoring a table), tell your team: *"Hey, I am merging a database change. Please pull my code and run `dotnet ef database update` before you make any new changes to the database!"*

---

## Scenario 1: Only ONE person created a migration (Easy)
*Example: You created the `AccomplishmentReportEXP` migration, but your co-intern was just working on React code or Controllers.*

1. **You** merge your branch into `main`.
2. **Co-intern** pulls the latest `main` branch to their local machine.
3. **Co-intern** opens their terminal in the `backend` folder and runs:
   ```powershell
   dotnet ef database update
   ```
4. **Done!** Entity Framework automatically reads your new migration and builds the new tables on their local machine. No conflicts.

---

## Scenario 2: BOTH people created migrations (Merge Conflict!)
*Example: You created the `AccomplishmentReportEXP` migration, and your co-intern simultaneously created an `AddEmployeesTable` migration on their own branch.*

Because you both ran `dotnet ef migrations add`, you both modified the `ApplicationDbContextModelSnapshot.cs` file. This will cause a nasty Git merge conflict.

### How to professionally fix the conflict:

1. **Merge Order:** Decide who merges first. Let's say **You** merge your massive JSONB refactor into `main` first.
2. **Pull & Conflict:** Your co-intern pulls `main` into their branch and gets a merge conflict in `ApplicationDbContextModelSnapshot.cs`.
3. **Accept Incoming:** Your co-intern must resolve the Git conflict by choosing **"Accept Incoming Changes"**. This means they throw away their snapshot and accept *your* snapshot.
4. **Delete the Local Migration:** Your co-intern must manually delete the `.cs` and `.Designer.cs` migration files that they recently generated for their `EmployeesTable`.
5. **Re-Generate:** Now that their snapshot perfectly matches yours, your co-intern runs their migration command again:
   ```powershell
   dotnet ef migrations add AddEmployeesTable
   ```
6. **Result:** Entity Framework re-generates their migration, but safely places it *after* your JSONB migration. They can now merge their code safely!
