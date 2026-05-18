**FOR LESSON 1.6 = ACTIVITY 1**

**visited `http://localhost:5107` without running anything**

## ERROR: INFORMATION: Request reached the end of the middleware pipeline without being handled by application code. Request path: GET http://localhost:5107/, Response status code: 404

**WHERE IT HAPPENED**
Browser, when visiting `http://localhost:5107`.

**SYMPTOM:**
The Get request was finished but page is null.

**CAUSE:**
The backend is running but the request used was `/` instead of an available endpoints.

**FIX:** 
Enabled swagger via .env to have a UI for the backend.

**PREVENTION:** 
Look for Swagger if it's enabled and see its documentation so that devs can see available endpoints.


**FOR LESSON 1.6 = ACTIVITY 3**

## Command Executed:
```javascript
null.toString()
```

**WHERE IT HAPPENED:** 
Browser, when typing `null.toString()` in Console.

**SYMPTON:**
Javascript threw an error on `.toString()` on a null value.

**CAUSE:**
The code attempted to call a method (`.toString()`) on `null`, which has no methods or properties.

**FIX:**
Check if the value is not null before calling methods on it:
```javascript
if (value !== null) {
    value.toString();
}
```

**PREVENTION**
Always validate that a variable contains data before using methods on it. This is especially important when receiving data from APIs, which can return null if a request fails.


**FOR LESSON 1.6 = ACTIVITY 6**

## Command Executed:
```
Changed http://localhost:5107 into 5999 of hris/.env
```
## ERROR: http://localhost:5999/api/auth/profile

**WHERE IT HAPPENED:** 
Frontend, when clicking Employees tab

**SYMPTON:**
CONSOLE:
Error: Server is unreachable. Please check your connection or try again later.
    at httpClient (dataProvider.ts:38:23)
    at async Object.getList (dataProvider.ts:206:26)
NETWORK: http://localhost:5999/api/auth/profile

**CAUSE:**
The hris/.env is having a mismatch since we changed the 5107 to 5999, the backend is now working on port 5107 while the frontend's url is still at port 5999

**FIX:**
setting up .env is very important because it is the connection of each folders and programs. To fix this ensure that the JWT_ISSUER is aligned to the frontend's 
```hris/.env
VITE_API_URL="http://localhost:5107" //not 5999
```

**PREVENTION**
Always setup .env correctly and corresponding to the project's frotend to ensure smooth request and error free programs.
