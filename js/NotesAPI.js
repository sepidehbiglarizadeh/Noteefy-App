const notes = [
  {
    id: 1,
    title: "First note",
    body: "Some dummy text first",
    updated: "2022-06-26T17:28:28.486Z",
  },
  {
    id: 2,
    title: "Seconds note",
    body: "Some dummy text seconds",
    updated: "2022-06-26T18:28:28.486Z",
  },
  {
    id: 3,
    title: "Third note",
    body: "Some dummy text thirs",
    updated: "2022-06-26T19:28:28.486Z",
  },
];

// let now = new Date().toLocaleDateString('en-us', { month:"short", day:"numeric"});

export default class NotesAPI {
  static getAllNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
    return savedNotes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  static saveNote(noteToSave) {
    const notes = NotesAPI.getAllNotes();
    const existedNote = notes.find((n) => n.id == noteToSave.id);
    if (existedNote) {
      existedNote.title = noteToSave.title;
      existedNote.body = noteToSave.body;
      existedNote.updated = new Date().toISOString();
    } else {
      noteToSave.id = new Date().getTime();
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }

  static deleteNotes(id) {
    const notes = NotesAPI.getAllNotes();
    const filteredNotes = notes.filter((n) => n.id != id);
    localStorage.setItem("notes-app", JSON.stringify(filteredNotes));
  }
}
