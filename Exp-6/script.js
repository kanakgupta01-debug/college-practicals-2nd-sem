const heading = document.getElementById("heading");
const input = document.getElementById("messageInput");
const paragraph = document.getElementById("paragraph");

const changeTextBtn = document.getElementById("changeTextBtn");
const bgColorBtn = document.getElementById("bgColorBtn");
const fontSizeBtn = document.getElementById("fontSizeBtn");
const toggleBtn = document.getElementById("toggleBtn");
const resetBtn = document.getElementById("resetBtn");

let fontSize = 18;

// onchange event
input.addEventListener("change", function () {
    paragraph.textContent = input.value;
});

// onclick event
changeTextBtn.addEventListener("click", function () {
    if (input.value.trim() !== "") {
        heading.textContent = input.value;
    } else {
        heading.textContent = "Please Enter Some Text";
    }
});

// onclick event
bgColorBtn.addEventListener("click", function () {
    const colors = [
        "#f8d7da",
        "#d4edda",
        "#d1ecf1",
        "#fff3cd",
        "#e2e3e5"
    ];

    const randomColor =
        colors[Math.floor(Math.random() * colors.length)];

    document.body.style.backgroundColor = randomColor;
});

// onclick event
fontSizeBtn.addEventListener("click", function () {
    fontSize += 2;
    paragraph.style.fontSize = fontSize + "px";
});

// onclick event
toggleBtn.addEventListener("click", function () {
    if (paragraph.style.display === "none") {
        paragraph.style.display = "block";
    } else {
        paragraph.style.display = "none";
    }
});

// onclick event
resetBtn.addEventListener("click", function () {
    location.reload();
});

// onmouseover event
bgColorBtn.addEventListener("mouseover", function () {
    bgColorBtn.textContent = "Click Me!";
});

// mouse leaves button
bgColorBtn.addEventListener("mouseout", function () {
    bgColorBtn.textContent = "Change Background Color";
});