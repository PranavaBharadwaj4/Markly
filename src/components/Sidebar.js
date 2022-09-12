import React from "react";
import NavLab from "./NoteLab";

export default function Sidebar(props) {
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <NavLab
        note={note}
        className={`title ${
          note.id === props.currentNote.id ? "selected-note" : ""
        }`}
        currentNote={props.currentNote}
        numNotes={props.numNotes}
        delete={props.delete}
        setCurrentNoteId={props.setCurrentNoteId}
        // onClick={() => props.setCurrentNoteId(note.id)}
        updateNoteName={props.updateNoteName}
      />
    </div>
  ));

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>MARKLY</h3>
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>
      <div className="sidebar-notes">{noteElements}</div>
    </section>
  );
}
