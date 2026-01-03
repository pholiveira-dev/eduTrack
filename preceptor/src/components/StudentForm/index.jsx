import { useState } from "react";
import { StudentFormFields } from "./StudentFormFields";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";

export function StudentForm({ handleAddStudent }) {
  const [student, setStudent] = useState({
    name: "",
    rgm: "",
    turn: "",
    group: "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    handleAddStudent({ ...student, id: uuidv4() });
    setStudent({
      name: "",
      rgm: "",
      turn: "",
      group: "",
    });
  }

  return (
    <>
      <div className="form-page">
        <h1>Cadastrar Aluno</h1>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados do aluno</legend>
            <StudentFormFields student={student} setStudent={setStudent} />
            <button type="submit">Cadastrar</button>
          </fieldset>
        </form>
      </div>
    </>
  );
}
