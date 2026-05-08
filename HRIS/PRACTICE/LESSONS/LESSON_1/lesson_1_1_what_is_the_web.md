# Unit 1: The Web & How It Works
## Lesson 1.1: What is the Web?

Welcome to your first lesson! Before we write code in C# or React, you need to understand the environment where your application lives: **The Web**.

---

### 1. The Client-Server Model
Every time you use a web application (like your HRIS project or Facebook), there are two main computers talking to each other:

*   **The Client:** This is the computer or device making the request. Usually, it's **you** and your web browser (Chrome, Edge, Safari). The client is responsible for showing the user interface (the buttons, colors, and text).
*   **The Server:** This is a computer sitting somewhere else (or running on your own machine during development). It "serves" the data. It holds the brain of the application (the backend) and talks to the database.

**In your HRIS project:**
*   **Client:** Your React application running in the browser.
*   **Server:** Your ASP.NET Core application running on port 5107.

---

### 2. What happens when you type a URL?
When you type `http://localhost:5173` or `google.com` into your browser and press Enter:
1.  Your **Client** (browser) sends a digital message called a **Request** across the network.
2.  The **Server** receives that request, processes it (looks up data, checks permissions), and sends back a message called a **Response**.
3.  The response usually contains the HTML, CSS, and JavaScript files that your browser then turns into a visual webpage.

---

### 3. HTTP (The Language of the Web)
How do the Client and Server understand each other? They use a protocol (a set of rules) called **HTTP** (HyperText Protocol).

Think of HTTP like a waiter in a restaurant:
*   You (the Client) tell the waiter what you want (Request).
*   The waiter goes to the kitchen (the Server) to get it.
*   The waiter brings the food back to you (Response).

#### HTTP Methods
When making a request, the client specifies *what* it wants to do. The most common methods are:
*   **GET:** "Give me data." (e.g., Loading the employee list).
*   **POST:** "Create new data." (e.g., Submitting a login form or adding a new employee).
*   **PUT:** "Update existing data." (e.g., Changing an employee's department).
*   **DELETE:** "Remove data." (e.g., Deleting a report).

---

### 4. HTTP Status Codes
Every response from the server comes with a number called a **Status Code**. It tells the client if the request was successful or if something went wrong.

You need to know these common codes:
*   **200 OK:** Everything worked perfectly!
*   **400 Bad Request:** The server didn't understand the request (you sent bad data).
*   **401 Unauthorized:** You are not logged in or don't have permission.
*   **404 Not Found:** The page or data you asked for doesn't exist.
*   **500 Internal Server Error:** The backend code crashed. (This is usually a bug in the C# code).

---

### 5. Reading a Web Request as a Sentence (Professor's Method 🗣️)
Before we start writing code, let's practice translating how the Client talks to the Server into plain English sentences. This will help you "read" web interactions naturally.

Here are a few examples:

*   **Request:** `GET /index.html`
    *   **Sentence translation:** *"Hey Server, please **GET** (fetch) the file named **index.html** for me."*
*   **Request:** `POST /api/employees`
    *   **Sentence translation:** *"Hey Server, I want to **POST** (send/create) new data in the **employees** section."*
*   **Response:** `200 OK`
    *   **Sentence translation:** *"Hey Client, I found what you wanted and everything is **OK**!"*
*   **Response:** `404 Not Found`
    *   **Sentence translation:** *"Sorry Client, I looked everywhere but I could **Not Find** what you asked for."*

Learning to read technical terms as sentences makes understanding code much easier!

---

## 🎯 Practice Activities

Complete these activities in your practice folder. Create a file called `answers.md` in the same folder as this lesson to write your answers.

1.  **Explore the Server:** Open your browser, go to `http://localhost:5107` (your HRIS backend), and describe what you see or what response you get.
2.  **Inspect Network Requests:** Open your HRIS frontend in the browser. Press `F12` to open Developer Tools, and go to the **Network** tab. Refresh the page. Look at the list of requests being made. Write down the names of 3 requests you see.
3.  **Define in your own words:** In your `answers.md`, write a simple 2-sentence explanation of what a **Client** is and what a **Server** is, using an analogy different from the restaurant one.
4.  **Hunt for Status Codes:** Look at your HRIS frontend again in the Network tab. Find a request that returned a **200** status. Then, try to visit a URL that doesn't exist (like `http://localhost:5173/this-page-is-fake`) and see if you can spot a **404** code in the Network tab.
5.  **Research:** What is the difference between `HTTP` and `HTTPS`? Write a short 2-sentence summary of why the 'S' matters.
