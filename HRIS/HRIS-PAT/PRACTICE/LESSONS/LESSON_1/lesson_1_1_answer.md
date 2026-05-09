## 🎯 Practice Activities

To complete this lesson, you must perform these activities. Create a file called `answers.md` in the same folder as this lesson to write your answers.

1.  **Explore the Server:** Open your browser and go to `http://localhost:5107` (your HRIS backend). Describe what you see or what response you get.
2.  **Inspect Network Requests:** Open your HRIS frontend in the browser. Press `F12` to open Developer Tools, and go to the **Network** tab. Refresh the page. Look at the list of requests. Write down the names of 3 requests you see.
3.  **Define in your own words:** In your `answers.md`, write a simple explanation of what a **Client** is and what a **Server** is, using an analogy different from the restaurant or library ones.
4.  **Hunt for Status Codes:** Look at your HRIS frontend again in the Network tab. Find a request that returned a **200** status. Then, try to visit a URL that doesn't exist (like `http://localhost:5173/this-page-is-fake`) and see if you can spot a **404** code.
5.  **Research:** What is the difference between `HTTP` and `HTTPS`? Write a short summary of why the 'S' matters for security.

-----

1. [x] - It doesn't show something although it is running in the backend. The response was  null (404) because it doesn't have UI, but it is working properly.
2. [x] - i got main.tsx, ARReview.tsx, layout.tsx and much more
3. [x] - Client = in terms of web dev, CLIENT is the one that is asking/sender that will be received by the SERVER and will do the WORK to serve the CLIENT. 
    - ANALOGY: MCDONALDS
        - CUSTOMER: CLIENTS THAT ASKED FOR ORDER (FRIES AND COKE)
        - CASHIER: API, WILL TAKE THE ORDERS AND WILL SEND IT TO THE KITCHEN (SERVER)
        - SERVER: FOOD ASSEMBLERS/MAKERS, THEY WILL MAKE THE FOOD AND GIVE IT TO THE CUSTOMER
4. [x] - by typing http://localhost:3000/this-page-is-fake, the page redirect me to the default dashboard where in it was already a built it in the project to redirect users if the page is non-existing 
5. [x] - HTTP is only a plain text, not secured, whereas HTTPS uses an encryption that protects user's data— that is why S is a term of HTTPS for Security or Secure