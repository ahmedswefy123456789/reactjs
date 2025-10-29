import React, { useState, useEffect } from "react";

const priorities = ["important", "normal", "delayed"];

export default function NotesManager() {
  const [note, setNote] = useState("");
  const [priority, setPriority] = useState(priorities[1]);
  const [notes, setNotes] = useState([]);



  const [isInitialLoad, setIsInitialLoad] = useState(true);

useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("notes")) || [];
  setNotes(saved);
  setIsInitialLoad(false);
}, []);

useEffect(() => {
  if (!isInitialLoad) {
    localStorage.setItem("notes", JSON.stringify(notes));
  }
}, [notes, isInitialLoad]);



  const addNote = () => {
    if (!note) return;
    setNotes([
      ...notes,
      { id: Date.now(), text: note, priority },
    ]);
    setNote("");
    setPriority(priorities[1]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const changePriority = (id, newPriority) => {
    setNotes(
      notes.map((n) =>
        n.id === id ? { ...n, priority: newPriority } : n
      )
    );
  };

  return (
    <div className=" notes-manager card">
      <h2 className=" header-notes"> Notes</h2>
      <div className="">
        <input
          type="text"
          placeholder="Add a new note"
          className="input input-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()} 
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className=" select-priority"
        >
          {priorities.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <button
          onClick={addNote}
          className="btn btn-add"
        >
          Add Note
        </button>
      </div>

      <div className="notes-list">
        {priorities.map((p) => (
          <div key={p}>
            <h3 className="header-key">{p}</h3>
            <ul>
              {notes
                .filter((n) => n.priority === p)
                .map((n) => (
                  <li
                    key={n.id}
                    className={`priority-class${
                      n.priority === "important"
                        ? "red-priority"
                        : n.priority === "delayed"
                        ? "yellow-priority"
                        : "green-priority"
                    }`}
                  >
                    <span>{n.text}</span>
                    <div className="set-priority-delete">
                      <select
                        value={n.priority}
                        onChange={(e) =>
                          changePriority(n.id, e.target.value)
                        }
                        className="select-priority-note"
                      >
                        {priorities.map((pp) => (
                          <option key={pp} value={pp}>
                            {pp}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => deleteNote(n.id)}
                        className="btn btn-delete"
                      >
                        delete
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
