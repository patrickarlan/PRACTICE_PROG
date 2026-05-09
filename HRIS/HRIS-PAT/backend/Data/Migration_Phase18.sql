-- PHASE 18 DATA MIGRATION SCRIPT
-- This script migrates existing legacy data to the new associative table structure.

-- 1. Migrate User -> Team assignments
-- Moves the 'ApprovalTeamId' from the AspNetUsers table to the new 'ApprovalTeamMembers' junction table.
INSERT INTO "ApprovalTeamMembers" ("ApprovalTeamId", "UserId", "JoinedAt")
SELECT "ApprovalTeamId", "Id", CURRENT_TIMESTAMP
FROM "AspNetUsers"
WHERE "ApprovalTeamId" IS NOT NULL
AND "Id" NOT IN (SELECT "UserId" FROM "ApprovalTeamMembers");

-- 2. NOTE ON JSONB DATA:
-- If you had complex sequences in the JSONB 'Approvers' column of ApprovalTeams, 
-- those columns are dropped by the latest migration. 
-- In a production environment, this data would be moved via a 'MigrationBuilder.Sql' 
-- command inside the migration file itself before the drop.
-- For this development environment, the 'SeedDatabase.cs' has been updated 
-- to automatically recreate these sequences in the new tables.

-- 3. CLEANUP (OPTIONAL - RUN AFTER VERIFYING DATA)
-- ALTER TABLE "AspNetUsers" DROP COLUMN "ApprovalTeamId";
