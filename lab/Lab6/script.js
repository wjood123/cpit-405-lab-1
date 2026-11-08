
let likes = 0;
let dislikes = 0;
let comments = [];

// Cookie functions
function setCookie(name, value) {
    document.cookie = name + "=" +
        encodeURIComponent(value) +
        "; path=/; SameSite=Lax";
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");

    for (let cookie of cookies) {
        const parts = cookie.split("=");
        if (parts[0] === name) {
            return decodeURIComponent(parts.slice(1).join("="));
        }
    }

    return "";
}

function deleteCookie(name) {
    document.cookie = name +
        "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
}

// Load saved state
let vote = getCookie("lab6Vote");
let savedComment = getCookie("lab6Comment");

if (vote === "like") {
    likes = 1;
} else if (vote === "dislike") {
    dislikes = 1;
}

if (savedComment !== "") {
    comments.push(savedComment);
}

// Update the page using DOM
function updateUI() {
    document.getElementById("likeCount").textContent = likes;
    document.getElementById("dislikeCount").textContent = dislikes;

    document.getElementById("likeBtn").disabled = vote !== "";
    document.getElementById("dislikeBtn").disabled = vote !== "";

    document.getElementById("submitBtn").disabled =
        savedComment !== "";

    const section = document.getElementById("commentsSection");
    section.innerHTML = "";

    comments.forEach(function(comment) {
        const p = document.createElement("p");
        p.className = "comment";
        p.textContent = comment;
        section.appendChild(p);
    });
}

// Like event
document.getElementById("likeBtn").addEventListener("click", function() {
    if (vote !== "") return;

    likes++;
    vote = "like";
    setCookie("lab6Vote", vote);
    updateUI();
});

// Dislike event
document.getElementById("dislikeBtn").addEventListener("click", function() {
    if (vote !== "") return;

    dislikes++;
    vote = "dislike";
    setCookie("lab6Vote", vote);
    updateUI();
});

// Comment event
document.getElementById("submitBtn").addEventListener("click", function() {
    const input = document.getElementById("commentInput");
    const comment = input.value.trim();

    if (comment === "" || savedComment !== "") return;

    comments.push(comment);
    savedComment = comment;

    setCookie("lab6Comment", comment);

    input.value = "";
    updateUI();
});

// Reset event
document.getElementById("resetBtn").addEventListener("click", function() {
    deleteCookie("lab6Vote");
    deleteCookie("lab6Comment");

    likes = 0;
    dislikes = 0;
    comments = [];
    vote = "";
    savedComment = "";

    document.getElementById("commentInput").value = "";
    document.getElementById("message").textContent =
        "Your choices and comments have been reset.";

    updateUI();
});

// Initialize page
updateUI();
