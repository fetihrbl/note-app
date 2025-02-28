const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");

// Get existing notes and display them
getNotes().forEach((note) => {
    const noteEl = createNoteEl(note.id, note.content);
    appEl.insertBefore(noteEl, btnEl);
})

// Create a note element (textarea)
function createNoteEl(id, content) {
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.placeholder = "Empty Note";
    element.value = content;

    // Delete note
    element.addEventListener("dblclick", () => {
        const warning = confirm("Do you want to delete this note?");
        if (warning) {
            deleteNote(id, element);
        }
    });

    // Update note (on content change)
    element.addEventListener("input", () => {
        updateNote(id, element.value);
    });

    return element;
}

// Delete a note
function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id !== id); // Filter out the deleted note
    saveNote(notes); // Save the updated notes to localStorage
    appEl.removeChild(element); // Remove the note from the DOM
}

// Update a note's content
function updateNote(id, content) {
    const notes = getNotes();
    const note = notes.find((note) => note.id === id); // Find the note to update
    if (note) {
        note.content = content; // Update the content of the found note
        saveNote(notes); // Save the updated notes to localStorage
    }
}

// Save the notes array to localStorage
function saveNote(notes) {
    localStorage.setItem("note-app", JSON.stringify(notes));
}

// Get the notes array from localStorage
function getNotes() {
    return JSON.parse(localStorage.getItem("note-app") || "[]"); // Use the correct default value
}

// Add new note
btnEl.addEventListener("click", () => {
    const notes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random() * 100000), // Generate a unique ID
        content: "", // Empty content for the new note
    };
    const noteEl = createNoteEl(noteObj.id, noteObj.content); // Create new note element
    appEl.insertBefore(noteEl, btnEl); // Add it to the DOM

    notes.push(noteObj); // Add the new note to the notes array
    saveNote(notes); // Save the updated notes array to localStorage
});
