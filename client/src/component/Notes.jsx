import React, { useEffect, useState } from "react";
import "../style/notes.css";
import { useNavigate } from "react-router-dom";
import { Modal, Button, CloseButton } from "react-bootstrap";
const Notes = () => {
  const Navigate = useNavigate();
  const [note, setNotes] = useState();

  // create modal function

  const [trueCreateModal, falseCreateModal] = useState(false);

  const createModel = async () => {
    return falseCreateModal(!trueCreateModal);
  };

  // edit modal function

  const [trueEditModal, falseEditModal] = useState(false);

  const editModal = async () => {
    return falseEditModal(!trueEditModal);
  };
  const [topicname, settopicName] = useState();
  const [discripation, setDiscripation] = useState();
  const [editTopicname, setEditTopicName] = useState();
  const [editDiscripation, setEditDiscripation] = useState();
  const [editUserID, setEditUserID] = useState();

  // add new notes function

  const addNote = async (e) => {
    const authToken = localStorage.getItem("token");
    e.preventDefault();
    let result = await fetch(`/api/user/add-notes`, {
      method: "POST",
      body: JSON.stringify({ topicname, discripation }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    result = await result.json();
    if (result.status === "success") {
      alert(result.message);
      createModel();
      window.location.reload(false);
    } else {
      alert(result.message);
      createModel();
      window.location.reload(false);
    }
  };
  // get all notes function

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      const fetchData = async () => {
        try {
          const response = await fetch("/api/user/all-notes", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          const result = await response.json();
          if (result.status === "success") {
            setNotes(result.data);
            console.log(result);
          }
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };
      fetchData();
    } else {
      Navigate("/404notfound");
    }
  }, []);

  // delete note function

  const deleteNote = async (_id) => {
    const authToken = localStorage.getItem("token");
    let result = await fetch(`/api/user/delete-note/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.status === "success") {
      alert(result.message);
      window.location.reload(false);
    } else {
      alert(result.message);
      window.location.reload(false);
    }
  };

  // get for edit data function

  const matchData = (id) => {
    const matchedNote = note.find((n) => n._id === id);
    if (matchedNote) {
      setEditDiscripation(matchedNote.discripation);
      setEditTopicName(matchedNote.topicname);
      setEditUserID(matchedNote._id);
      editModal();
    }
  };

  // edit note function
  const editNote = async (e) => {
    const authToken = localStorage.getItem("token");
    e.preventDefault();
    let result = await fetch(`/api/user/edit-note`, {
      method: "PUT",
      body: JSON.stringify({ editTopicname, editDiscripation, editUserID }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    result = await result.json();
    if (result.status === "success") {
      alert(result.message);
      editModal();
      window.location.reload(false);
    } else {
      alert(result.message);
      editModal();
      window.location.reload(false);
    }
  };

  return (
    <div>
      <section>
        <Button className="btn btn-danger notes_btn" onClick={createModel}>
          Add Notes
        </Button>
      </section>
      <h2 className="text-center text-danger">User Notes</h2>
      <section className="container mt-5">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">S.NO</th>
              <th scope="col">Topic Name</th>
              <th scope="col">Discripation</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(note) &&
    note.map((filterData, index) => {
      const reversedIndex = note.length - index - 1; // Calculate the reversed index
      return (
        <tr key={filterData._id}>
          <td scope="col">{reversedIndex + 1}</td>
          <td scope="col">{note[reversedIndex].topicname}</td>
          <td scope="col">{note[reversedIndex].discripation}</td>
          <td scope="col">
            <button
              className="btn btn-danger"
              onClick={() => matchData(note[reversedIndex]?._id)}
            >
              Edit
            </button>
            <button
              className="btn btn-warning m-2"
              onClick={() => deleteNote(note[reversedIndex]?._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    })}
</tbody>

        </table>
      </section>
      <section className="">
        <Modal show={trueCreateModal}>
          <Modal.Header>
            <Modal.Title>
              <h3>Add Note</h3>
            </Modal.Title>
          </Modal.Header>
          <form onSubmit={addNote}>
            <Modal.Body>
              <div className="">
                <input
                  type="text"
                  name="topicname"
                  className="form-control"
                  value={topicname}
                  onChange={(e) => settopicName(e.target.value)}
                  id=""
                  placeholder="Enter Topic Name"
                />
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  name="discripation"
                  className="form-control"
                  value={discripation}
                  onChange={(e) => setDiscripation(e.target.value)}
                  id=""
                  placeholder="Enter Note Discripation"
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="mt-3">
                <button type="submit" className="btn btn-danger me-3">
                  Add Note
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={createModel}
                >
                  Cancel
                </button>
              </div>
            </Modal.Footer>
          </form>
        </Modal>
        <Modal show={trueEditModal}>
          <Modal.Header>
            <Modal.Title>
              <h3>Edit Note</h3>
            </Modal.Title>
          </Modal.Header>
          <form onSubmit={editNote}>
            <Modal.Body>
              <div className="">
                <input
                  type="hidden"
                  name="_id"
                  className="form-control"
                  value={editUserID}
                  onChange={(e) => setEditUserID(e.target.value)}
                  id=""
                />
                <input
                  type="text"
                  name="topicname"
                  className="form-control"
                  value={editTopicname}
                  onChange={(e) => setEditTopicName(e.target.value)}
                  id=""
                  placeholder="Enter Topic Name"
                />
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  name="discripation"
                  className="form-control"
                  value={editDiscripation}
                  onChange={(e) => setEditDiscripation(e.target.value)}
                  id=""
                  placeholder="Enter Note Discripation"
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="mt-3">
                <button type="submit" className="btn btn-danger me-3">
                  Edit Note
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={editModal}
                >
                  Cancel
                </button>
              </div>
            </Modal.Footer>
          </form>
        </Modal>
      </section>
    </div>
  );
};

export default Notes;
