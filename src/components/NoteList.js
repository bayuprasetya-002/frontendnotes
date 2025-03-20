import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils";

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const response = await axios.get(`${BASE_URL}/notes`);
    setNotes(response.data);
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/notes/${id}`);
      getNotes();
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <Link to={`/add`} className="button is-success">Tambah Catatan</Link>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Judul</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => (
              <tr key={note.id}>
                <td>{index + 1}</td>
                <td>{note.judul}</td>
                <td>{new Date(note.tanggal).toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" })}</td>
                <td>
                  <Link to={`/edit/${note.id}`} className="button is-small is-info">Edit</Link>
                  <button onClick={() => deleteNote(note.id)} className="button is-small is-danger">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotesList;
