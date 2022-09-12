import React from "react";

function NoteLab(props) {
  const [show, setShow] = React.useState(false);

  function toggleShow() {
    setShow((show) => true);
  }
  function handleSubmit(event) {
    setShow(false);

    event.preventDefault();
  }
  React.useEffect(
    function () {
      //   console.log("effect Loaded");
      setShow(false);
    },
    [props.currentNote.id]
  );

  var noteName =
    props.note.name ||
    (props.note.body.split("\n")[0] !==
      "# Type your markdown note's title here" &&
      props.note.body.split("\n")[0]) ||
    `Note ${props.note.count}`;

  //   console.log(noteName);

  return (
    <div
      className={props.className}
      onDoubleClick={toggleShow}
      //   onLoad={console.log(`current note${props.currentNote}`)}
      onClick={() => props.setCurrentNoteId(props.note.id)}
    >
      {!show && <h4 className="text-snippet">{noteName}</h4>}
      {show && (
        <form onSubmit={handleSubmit} className="form">
          <input
            autoFocus
            className="form--input"
            type="text"
            name="name"
            placeholder={noteName}
            onChange={props.updateNoteName}
            value={props.note.name}
          />
        </form>
      )}
      {!show && (
        <button
          className={"delete-btn"}
          // Your onClick event handler here
          onClick={(event) => props.delete(event, props.note.id)}
        >
          <i className="gg-trash trash-icon"></i>
        </button>
      )}
    </div>
  );
}

export default NoteLab;
