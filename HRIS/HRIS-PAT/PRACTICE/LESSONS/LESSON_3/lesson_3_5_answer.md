## 🧪 Test Checklist

**HTML**
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive UI</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white rounded-lg shadow-md p-8 w-full max-w-sm">
        <h1 class="text-xl font-bold mb-6 text-gray-800">Edit Employee</h1>
        <form>
            <label for="first-name" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input type="text" id="first-name" name="first-name"
                class="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400" />

            <label for="department" class="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <input type="text" id="department" name="department"
                class="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400" />

            <button type="submit"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors duration-200 mb-2">
                Save Changes
            </button>
            <button type="button" disabled
                class="w-full bg-gray-300 text-gray-500 font-semibold py-2 rounded-md cursor-not-allowed opacity-60">
                Locked
            </button>
        </form>
    </div>
</body>

</html>
```

- [x] `tailwind_form.html` built with **zero** `<style>` tags or external `.css` files
- [x] Both inputs have linked `<label>` tags (using `for` and `id`)
- [x] Inputs show a visible blue focus ring on click/tab
- [x] "Save Changes" button visibly darkens on `:hover`
- [x] "Locked" button appears faded and shows `cursor-not-allowed`
- [x] No horizontal scroll at 360px viewport width
- [x] All text is readable (sufficient contrast)

---

## 💬 Reflection Questions

Answer these in your `lesson_3_5_answer.md` file:

1. **In your own words, what is the main difference between writing raw CSS and writing Tailwind CSS?**
   > in raw css , you write classes in a css file and then apply them in html , while in tailwind css , you write classes directly in html .

2. **What does `md:grid-cols-2` mean? Break down each part of that class.**
   > it means that the grid will have 2 columns on medium screens and above .

3. **What is the purpose of the `transition-colors` class? What would the button look like without it?**
   > it adds a smooth transition to the button when the background color changes . without it , the button would change color instantly .

4. **What does "mobile-first" mean in Tailwind? Why is it better to start from mobile and scale up?**
   > it means that the styles are applied from mobile screens and scale up .
   > it is better to start from mobile and scale up because it is easier to add more styles for larger screens than to remove styles for smaller screens .

---

## 📊 Final Score: 10/10

**Summary:**
- [x] Activity completed (`tailwind_form.html` built)
- [x] All 7 checklist items pass
- [x] Production QA checklist completed (3 checks)
- [x] Reflection questions answered

**Ready for:** Lesson 3.5.0 — Node.js & the Frontend Development Environment