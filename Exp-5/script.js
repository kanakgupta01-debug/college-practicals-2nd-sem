/* ═══════════════════════════════════════════════
   Experiment 5 — script.js
   Array and Object Operations using JavaScript

   Concepts covered:
   ✔ Arrays & Objects
   ✔ for...in  (iterate object keys)
   ✔ for...of  (iterate array elements)
   ✔ Array.filter()
   ✔ Array.map()
   ✔ Array.reduce()
   ✔ Dynamic DOM manipulation
═══════════════════════════════════════════════ */

// ─────────────────────────────────────────────
// 1. DATA STORE  — Array of Employee Objects
//    Each employee is an OBJECT stored inside an ARRAY
// ─────────────────────────────────────────────
let employees = [];   // ← Main array (Array concept)

// Pre-load some demo employees so the app isn't empty on first load
const demoData = [
  { id: "EMP-001", name: "Arjun Sharma",  salary: 72000, dept: "Engineering" },
  { id: "EMP-002", name: "Priya Mehta",   salary: 45000, dept: "Marketing"   },
  { id: "EMP-003", name: "Rohan Gupta",   salary: 85000, dept: "Finance"     },
  { id: "EMP-004", name: "Sneha Kapoor",  salary: 38000, dept: "HR"          },
  { id: "EMP-005", name: "Karan Malhotra",salary: 61000, dept: "Engineering" },
  { id: "EMP-006", name: "Neha Singh",    salary: 53000, dept: "Sales"       },
];

// for...of loop to push each demo object into the array
for (const emp of demoData) {   // ← for...of (Array concept)
  employees.push(emp);
}

// Update counter in header on load
updateHeaderCount();

// ─────────────────────────────────────────────
// 2. ADD EMPLOYEE
//    Reads form values → creates object → pushes to array
// ─────────────────────────────────────────────
function addEmployee() {
  // Read values from form (Variables)
  const name   = document.getElementById("empName").value.trim();
  const id     = document.getElementById("empId").value.trim();
  const salary = parseFloat(document.getElementById("empSalary").value);
  const dept   = document.getElementById("empDept").value;

  const msgEl = document.getElementById("formMsg");

  // Validation using if-else conditions
  if (!name || !id || isNaN(salary) || !dept) {
    showMsg(msgEl, "⚠ Please fill all fields correctly.", "error");
    return;
  }

  if (salary < 0) {
    showMsg(msgEl, "⚠ Salary cannot be negative.", "error");
    return;
  }

  // Check duplicate ID using for...of loop
  for (const emp of employees) {   // ← for...of
    if (emp.id === id) {
      showMsg(msgEl, `⚠ Employee ID "${id}" already exists.`, "error");
      return;
    }
  }

  // Create employee OBJECT  (Object concept)
  const newEmployee = {
    id:     id,
    name:   name,
    salary: salary,
    dept:   dept,
  };

  // Push object into array (Array concept)
  employees.push(newEmployee);

  showMsg(msgEl, `✓ ${name} added successfully!`, "success");
  clearForm();
  updateHeaderCount();
}

// ─────────────────────────────────────────────
// 3. DISPLAY ALL EMPLOYEES
//    Uses for...of loop to iterate the array
// ─────────────────────────────────────────────
function displayAll() {
  if (employees.length === 0) {
    showEmpty("No employees found. Add some first.");
    return;
  }

  setOutputTag(`All (${employees.length})`);
  hideStatRow();

  let rows = "";
  let idx  = 1;

  // for...of loop — iterates each employee object in the array
  for (const emp of employees) {   // ← for...of (Array concept)
    rows += buildRow(idx, emp);
    idx++;
  }

  renderTable(rows);
}

// ─────────────────────────────────────────────
// 4. FILTER — Salary > ₹50,000
//    Uses Array.filter() method
// ─────────────────────────────────────────────
function filterHighSalary() {
  // Array.filter() — returns NEW array of objects matching condition
  const highEarners = employees.filter(emp => emp.salary > 50000);  // ← filter (Array method)

  if (highEarners.length === 0) {
    showEmpty("No employees with salary > ₹50,000.");
    return;
  }

  setOutputTag(`Salary > ₹50,000 (${highEarners.length})`);
  hideStatRow();

  let rows = "";
  let idx  = 1;

  for (const emp of highEarners) {   // ← for...of
    rows += buildRow(idx, emp, true);  // highlight salary
    idx++;
  }

  renderTable(rows);
}

// ─────────────────────────────────────────────
// 5. TOTAL SALARY PAYOUT
//    Uses Array.reduce() to sum all salaries
// ─────────────────────────────────────────────
function calcTotal() {
  if (employees.length === 0) {
    showEmpty("No employees found.");
    return;
  }

  // Array.reduce() — accumulates total salary (map concept)
  const total = employees.reduce((acc, emp) => acc + emp.salary, 0);  // ← reduce

  // Array.map() — extract only salary values
  const salaryList = employees.map(emp => emp.salary);  // ← map (Array method)

  setOutputTag("Total Payout");

  // Show stat boxes
  document.getElementById("statVal1").textContent = `₹${total.toLocaleString("en-IN")}`;
  document.getElementById("statLbl1").textContent  = "Total Salary Payout";
  document.getElementById("statVal2").textContent = employees.length;
  document.getElementById("statLbl2").textContent  = "Total Employees";
  showStatRow();

  // Also show all employees
  let rows = "";
  let idx  = 1;
  for (const emp of employees) {
    rows += buildRow(idx, emp);
    idx++;
  }
  renderTable(rows);
}

// ─────────────────────────────────────────────
// 6. AVERAGE SALARY
//    Uses reduce for total then divides
// ─────────────────────────────────────────────
function calcAverage() {
  if (employees.length === 0) {
    showEmpty("No employees found.");
    return;
  }

  const total   = employees.reduce((acc, emp) => acc + emp.salary, 0);
  const average = total / employees.length;   // ← arithmetic operator

  setOutputTag("Average Salary");

  document.getElementById("statVal1").textContent = `₹${Math.round(average).toLocaleString("en-IN")}`;
  document.getElementById("statLbl1").textContent  = "Average Salary";
  document.getElementById("statVal2").textContent = `₹${total.toLocaleString("en-IN")}`;
  document.getElementById("statLbl2").textContent  = "Total Payout";
  showStatRow();

  // Show all rows
  let rows = "";
  let idx  = 1;
  for (const emp of employees) {
    rows += buildRow(idx, emp);
    idx++;
  }
  renderTable(rows);
}

// ─────────────────────────────────────────────
// 7. SHOW DEPARTMENT FILTER INPUT
// ─────────────────────────────────────────────
function showDeptFilter() {
  const el = document.getElementById("deptFilter");
  el.classList.toggle("hidden");
}

// ─────────────────────────────────────────────
// 8. COUNT EMPLOYEES IN A SPECIFIC DEPARTMENT
//    Uses for...in to iterate object keys &
//    builds a department frequency object
// ─────────────────────────────────────────────
function countDept() {
  const selectedDept = document.getElementById("deptSelect").value;

  if (!selectedDept) {
    alert("Please select a department.");
    return;
  }

  // Build department count object using for...of + for...in
  const deptCount = {};   // ← Object to store counts

  for (const emp of employees) {         // ← for...of (Array concept)
    const d = emp.dept;
    if (deptCount[d] === undefined) {    // ← Object property check
      deptCount[d] = 0;
    }
    deptCount[d]++;
  }

  // for...in — iterate keys of the deptCount object
  let deptSummary = "";
  for (const key in deptCount) {         // ← for...in (Object concept)
    deptSummary += `${key}: ${deptCount[key]}  `;
  }

  const count = deptCount[selectedDept] || 0;

  setOutputTag(`Dept: ${selectedDept}`);

  document.getElementById("statVal1").textContent = count;
  document.getElementById("statLbl1").textContent  = `${selectedDept} Employees`;
  document.getElementById("statVal2").textContent = employees.length;
  document.getElementById("statLbl2").textContent  = "Total Employees";
  showStatRow();

  // Filter and show only matching dept
  const deptEmployees = employees.filter(emp => emp.dept === selectedDept);  // ← filter

  if (deptEmployees.length === 0) {
    showEmpty(`No employees in ${selectedDept} department.`);
    return;
  }

  let rows = "";
  let idx  = 1;
  for (const emp of deptEmployees) {
    rows += buildRow(idx, emp);
    idx++;
  }
  renderTable(rows);

  // Hide dept filter
  document.getElementById("deptFilter").classList.add("hidden");
}

// ─────────────────────────────────────────────
// 9. CLEAR OUTPUT PANEL
// ─────────────────────────────────────────────
function clearOutput() {
  document.getElementById("empTable").classList.add("hidden");
  document.getElementById("emptyMsg").textContent = "Use the buttons above to perform operations.";
  document.getElementById("emptyMsg").classList.remove("hidden");
  document.getElementById("outputTag").textContent = "";
  hideStatRow();
}

// ─────────────────────────────────────────────
// HELPER — Build a table row HTML string
//   Demonstrates: accessing object properties with dot notation
// ─────────────────────────────────────────────
function buildRow(idx, emp, highlightSalary = false) {
  // Access object properties using dot notation (Object concept)
  const salaryClass = (emp.salary > 50000 || highlightSalary) ? "salary-high" : "salary-low";
  const deptClass   = `dept-pill dept-${emp.dept.replace(/\s+/g, "")}`;

  return `
    <tr>
      <td>${idx}</td>
      <td>${emp.id}</td>
      <td>${emp.name}</td>
      <td><span class="${deptClass}">${emp.dept}</span></td>
      <td class="${salaryClass}">₹${emp.salary.toLocaleString("en-IN")}</td>
    </tr>`;
}

// ─────────────────────────────────────────────
// HELPER — Render rows into the table
// ─────────────────────────────────────────────
function renderTable(rowsHTML) {
  document.getElementById("empTableBody").innerHTML = rowsHTML;
  document.getElementById("empTable").classList.remove("hidden");
  document.getElementById("emptyMsg").classList.add("hidden");
}

// ─────────────────────────────────────────────
// HELPER — Show empty message
// ─────────────────────────────────────────────
function showEmpty(msg) {
  document.getElementById("empTable").classList.add("hidden");
  document.getElementById("emptyMsg").textContent = msg;
  document.getElementById("emptyMsg").classList.remove("hidden");
  hideStatRow();
}

// ─────────────────────────────────────────────
// HELPER — Stat row visibility
// ─────────────────────────────────────────────
function showStatRow() { document.getElementById("statRow").classList.remove("hidden"); }
function hideStatRow() { document.getElementById("statRow").classList.add("hidden"); }

// ─────────────────────────────────────────────
// HELPER — Set output tag label
// ─────────────────────────────────────────────
function setOutputTag(text) {
  document.getElementById("outputTag").textContent = text;
}

// ─────────────────────────────────────────────
// HELPER — Show form message (success / error)
// ─────────────────────────────────────────────
function showMsg(el, msg, type) {
  el.textContent  = msg;
  el.className    = `form-msg ${type}`;
  setTimeout(() => { el.textContent = ""; el.className = "form-msg"; }, 3000);
}

// ─────────────────────────────────────────────
// HELPER — Clear the add-employee form
// ─────────────────────────────────────────────
function clearForm() {
  document.getElementById("empName").value   = "";
  document.getElementById("empId").value     = "";
  document.getElementById("empSalary").value = "";
  document.getElementById("empDept").value   = "";
}

// ─────────────────────────────────────────────
// HELPER — Update employee count in header
// ─────────────────────────────────────────────
function updateHeaderCount() {
  document.getElementById("empCountHeader").textContent = employees.length;
}