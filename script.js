const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

// Function to load notes from localStorage when the page loads
function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes");
}
showNotes();

// Function to update localStorage whenever a note is added or deleted
function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

// Event listener for creating a new note
createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p"); // Create a paragraph element
  let img = document.createElement("img"); // Create the delete icon

  // Assign class and attributes to inputBox
  inputBox.className = "input-box"; // Use the correct class name
  inputBox.setAttribute("contenteditable", "true"); // Make it editable

  // Set the delete image source (ensure the image path is correct)
  img.src = "images/delete.png";

  // Append the inputBox and the delete icon to the notes container
  notesContainer.appendChild(inputBox).appendChild(img);

  // Update localStorage when a new note is created
  updateStorage();
});

// Event listener for deleting notes and updating content
notesContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    // If the delete icon (IMG) is clicked, remove the parent element (the note)
    e.target.parentElement.remove();
    updateStorage(); // Update localStorage after deletion
  } else if (e.target.tagName === "P") {
    // When a note (P element) is clicked, allow editing
    notes = document.querySelectorAll(".input-box");
    notes.forEach((nt) => {
      nt.onkeyup = function () {
        updateStorage(); // Update localStorage after editing
      };
    });
  }
});

// Prevent the default behavior of the Enter key and insert a line break instead
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak"); // Insert a line break
    event.preventDefault(); // Prevent the default "Enter" action
  }
});
