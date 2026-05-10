## 🎯 Practice Activities

Let's put this knowledge to the test! Write your answers in a new file called `lesson_1_3_answer.md` in your `LESSON_1` folder.

1. [x] - **The Analogy Expansion:** You used the McDonald's analogy beautifully. Now, think of a different scenario (e.g., a library, a hotel, or a bank) and describe the **Client**, the **API**, and the **Server** in that scenario.
2. [x] - **The JSON Translate:** Translate the following JSON data into a plain English sentence using the "Professor's Method":
    ```json
    {
      "title": "Clean Code",
      "author": "Robert Martin",
      "pages": 464,
      "isAvailable": false
    }
    ```
3. [x] - **Explore Public API:** Open your browser and go to this link: `https://jsonplaceholder.typicode.com/posts/1`. Describe what you see. Is it a webpage or raw data? What format is it in?
4. [x] - **Swagger Hunt:** Make sure your backend is running (`dotnet watch run`). Open your browser and go to `http://localhost:5107/swagger` (or the port your backend is using). Look around. Find one `GET` endpoint and one `POST` endpoint. Write down their URLs.
5. [x] - **The Network Tab Redux:** Open your HRIS frontend. Open Developer Tools (F12) and go to the **Network** tab. Refresh the page. Can you find a request that returns a list of employees? Look at the "Response" tab for that request. Do you see JSON data?

------
1. The INTERNET analogy:
    - CLIENT: ME
    - API: GOOGLE
    - SERVER: WEB RESULTS
        - I WILL ASK QUESTIONS ON GOOGLE AND GOOGLE WILL BE THE API FOR ME TO SEND THOSE REQUEST AND TO RECEIVE THOSE REQUEST VIA SHOWING ME THE WEB RESULTS OF OTHER WEBSITES, FORUMS, BLOGS OF OTHER PEOPLE
2. the json data basically says: we have a data that have a title: "Clean code whose author is "Robert Martin" that consists of 464 pages but its availability is not yet released.
3. {
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
    - This format follows the formatting of JSON data
4.  GET: /api/AccomplishmentReports
    POST: /api/Auth/login
5. http://localhost:5107/api/employees?_start=0&_end=5&_page=1&_perPage=5&_sort=id&_order=ASC
JSON DATA:
{
    "success": true,
    "message": "Success",
    "data": [
        {
            "id": "f9e67bd1-6607-43d4-8dd4-b2475dcb99b3",
            "email": "admin@hris.local",
            "userName": "Administrator, System",
            "fullName": "Administrator, System",
            "position": "System Administrator",
            "department": "Administration",
            "roles": [
                "SuperAdmin"
            ],
            "isManagement": false,
            "isApprover": false,
            "isAdmin": true,
            "accessLevel": "SUPERADMIN",
            "isDeactivated": false,
            "status": "Active",
            "approvalTeams": []
        },
        {
            "id": "de9d6e9e-2be2-41a9-9570-1be185331190",
            "email": "jen@hris.local",
            "userName": "Jen Manager",
            "fullName": "Jen Manager",
            "position": "Viewer",
            "department": "Project Manager",
            "roles": [
                "Viewer"
            ],
            "isManagement": true,
            "isApprover": false,
            "isAdmin": false,
            "accessLevel": "VIEWER",
            "supervisorId": "f9e67bd1-6607-43d4-8dd4-b2475dcb99b3",
            "departmentId": 3,
            "isDeactivated": false,
            "status": "Active",
            "approvalTeams": []
        },
        {
            "id": "67fd0144-5d70-4a46-acf2-88ce488028b8",
            "email": "joren@hris.local",
            "userName": "Joren TeamLead",
            "fullName": "Joren TeamLead",
            "position": "Approver",
            "department": "Development",
            "roles": [
                "Approver"
            ],
            "isManagement": false,
            "isApprover": true,
            "isAdmin": false,
            "accessLevel": "APPROVER",
            "supervisorId": "f9e67bd1-6607-43d4-8dd4-b2475dcb99b3",
            "viewerId": "de9d6e9e-2be2-41a9-9570-1be185331190",
            "departmentId": 2,
            "isDeactivated": false,
            "status": "Active",
            "approvalTeams": [
                {
                    "teamId": 1,
                    "teamName": "Dev Team",
                    "role": "Approver"
                }
            ]
        },
        {
            "id": "f990b4b0-6904-424f-a5f6-9eea3a5d7357",
            "email": "ken@hris.local",
            "userName": "Ken FunctionalLead",
            "fullName": "Ken FunctionalLead",
            "position": "Approver",
            "department": "Functional",
            "roles": [
                "Approver"
            ],
            "isManagement": false,
            "isApprover": true,
            "isAdmin": false,
            "accessLevel": "APPROVER",
            "supervisorId": "f9e67bd1-6607-43d4-8dd4-b2475dcb99b3",
            "viewerId": "de9d6e9e-2be2-41a9-9570-1be185331190",
            "departmentId": 4,
            "isDeactivated": false,
            "status": "Active",
            "approvalTeams": [
                {
                    "teamId": 2,
                    "teamName": "Functional Team",
                    "role": "Approver"
                }
            ]
        },
        {
            "id": "abdacaf8-a394-48c9-a5a4-d3b879088534",
            "email": "marc@hris.local",
            "userName": "Marc Employee",
            "fullName": "Marc Employee",
            "position": "Creator",
            "department": "Development",
            "roles": [
                "Creator"
            ],
            "isManagement": false,
            "isApprover": false,
            "isAdmin": false,
            "accessLevel": "CREATOR",
            "supervisorId": "67fd0144-5d70-4a46-acf2-88ce488028b8",
            "viewerId": "de9d6e9e-2be2-41a9-9570-1be185331190",
            "departmentId": 2,
            "approvalTeamId": 1,
            "isDeactivated": false,
            "status": "Active",
            "approvalTeams": [
                {
                    "teamId": 1,
                    "teamName": "Dev Team",
                    "role": "Member"
                }
            ]
        }
    ]
}