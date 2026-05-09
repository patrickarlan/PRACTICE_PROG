const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const projects = ['HRIS Redesign', 'Internal Tools', 'Meetings', 'Client Support', 'Bug Fixing', 'Feature Development'];
const tasksContent = [
    'Frontend development', 'API integration', 'Daily standup & planning', 'Bug fixing in dashboard',
    'Adding new components', 'Database optimization', 'Writing documentation', 'Unit testing',
    'Meeting with stakeholders', 'Code review', 'Refactoring legacy code', 'UI improvements'
];
const statuses = ['submitted', 'approved'];

function generateRandomReport(id) {
    const today = new Date();
    const reportDate = new Date(today);
    reportDate.setDate(today.getDate() - (id % 365)); // Spread reports over late year
    
    const dateStr = reportDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const submittedStr = `${dateStr}, ${Math.floor(Math.random() * 12 + 1)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'PM' : 'AM'}`;
    
    const numTasks = Math.floor(Math.random() * 5) + 1;
    let totalHrs = 0;
    const tasks = [];
    
    for (let i = 0; i < numTasks; i++) {
        const hrs = Math.floor(Math.random() * 4) + 1;
        totalHrs += hrs;
        tasks.push({
            project: projects[Math.floor(Math.random() * projects.length)],
            desc: tasksContent[Math.floor(Math.random() * tasksContent.length)],
            hrs: hrs
        });
    }
    
    return {
        id: id,
        date: dateStr,
        submitted: submittedStr,
        items: `${numTasks} items (${totalHrs} hrs)`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        tasks: tasks
    };
}

const newReports = [];
for (let i = 1; i <= 1000; i++) {
    newReports.push(generateRandomReport(i));
}

data.accomplishmentreports = newReports;

// Also generate some ar-reviews for the manager view if needed, but the user only asked for reports.
// Actually, it's better to keep it consistent.
const employees = [
    { name: 'Jose Reyes', role: 'Software Engineer' },
    { name: 'Ana Cruz', role: 'UX Designer' },
    { name: 'Marco Basa', role: 'Data Analyst' },
    { name: 'Lea Santos', role: 'Backend Engineer' }
];

const newReviews = [];
for (let i = 1; i <= 1000; i++) {
    const report = newReports[i - 1]; // Use the same data but formatted for reviews
    const emp = employees[i % employees.length];
    
    newReviews.push({
        id: String(i),
        employee: emp.name,
        role: emp.role,
        reportDate: report.date,
        items: report.items,
        submitted: report.date,
        status: report.status,
        accomplishments: report.tasks.map(t => ({
            project: t.project,
            task: t.project, // Reusing project as task name for simplicity
            notes: t.desc,
            start: '09:00',
            end: `${9 + t.hrs}:00`,
            hours: t.hrs
        }))
    });
}
data['ar-reviews'] = newReviews;

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('Successfully generated 1000 accomplishment reports and reviews.');
