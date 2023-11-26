import React, { useEffect, useState } from "react";
import "../style/notes.css";
import { useNavigate } from "react-router-dom";
import { Modal, Button, CloseButton } from "react-bootstrap";
const Notes = () => {
  const Navigate = useNavigate();
  const [trueCreateModal, falseCreateModal] = useState(false);
  const [note, setNotes] = useState();
  const createModel = async () => {
    return falseCreateModal(!trueCreateModal);
  };
  const [topicname, settopicName] = useState();
  const [discripation, setDiscripation] = useState();
  const addNote = async (e) => {
    e.preventDefault();
    let result = await fetch("/api/user/add-notes", {
      method: "POST",
      body: JSON.stringify({ topicname, discripation }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.status === "success") {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };
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
  return (
    <div>
      <section>
        <Button className="btn btn-danger notes_btn" onClick={createModel}>
          Add Notes
        </Button>
      </section>
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
              note?.map((filterData,index) => (
                <tr key={filterData._id}>
                  <td scope="col">{index+1}</td>
                  <td scope="col">{filterData.topicname}</td>
                  <td scope="col">{filterData.discripation}</td>
                  <td scope="col">
                    <button className="btn btn-danger">E</button>
                    <button className="btn btn-warning m-2">D</button>
                  </td>
                </tr>
              ))}
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
      </section>
    </div>
  );
};

export default Notes;
