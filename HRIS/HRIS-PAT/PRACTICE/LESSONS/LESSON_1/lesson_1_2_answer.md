## 🎯 Practice Activities

To complete this lesson, perform these activities and write your answers in your `answers.md` file (or create a new one for Lesson 1.2).

1. [x] - **Identify Folders:** Look at your `HRIS-PAT` project directory. Identify which folder contains the frontend code and which contains the backend code. Write them down.
2. [x] - **Draw the Flow:** In your notes, draw a simple text-based diagram (using arrows `-->`) showing the flow of data from: **Browser --> Frontend --> Backend --> Database**.
3. [x] - **Frontend vs Backend Action:** Open the HRIS app in your browser. Perform an action that is "Frontend Only" (e.g., clicking a dropdown menu that just opens up) and an action that requires the "Backend" (e.g., loading a list of data or submitting a form). Describe both.
4. [x] - **Controller Hunt:** Go to the `backend/` folder in your project. Look for a folder named `Controllers`. Open any file inside it (like `EmployeeController.cs`). Don't worry about the C# code yet, but read the method names and try to guess what one of them does.
5. [x] - **Database Peek:** Open **pgAdmin** (or whatever database tool you use). Look at the tables in your HRIS database. Write down the names of 3 tables you see there.

--------

1. the HRIS-PAT/hris folder is the front-end containing the layouts, designs and the components of the UI, while HRIS-PAT/backend contains the working parameters of those UI to function and work according to the user's request.
2. ("LOGIN PAGE [FRONTEND]") -------> (user inputs credentials and pressed button) -------> ("BACKEND UNDERSTAND THE REQUEST AND TRY TO GET FROM DATABASE[BACKEND]") -------> ("DATABASE GETS CHECK IF REQUEST IS VALID") -------> ("VARYING RESULTS THEN RECEIVED BY FRONTEND") -------> ("RESULTS ARE SHOWN VIA UI[FRONTEND]")
3. FRONTEND ACTIONS: CLICKING SIDEBAR TABS THAT OPENS ANOTHER PAGE (EX: AUDIT LOGS)
   BACKEND ACTIONS: BY CLICKING AUDIT LOGS, ITS BACKEND WORKS TO GET THE DATA FROM AuditLogs Table from the database.
4. [HttpGet("{id}")] from EmployeeController.cs: This gets the ID of a single user, although i still dont understand how the id gets used in this line of code
5. AspNetUser: table for user data, Department: table for user departments, AccomplishmentReportEXP: where Reports are stored