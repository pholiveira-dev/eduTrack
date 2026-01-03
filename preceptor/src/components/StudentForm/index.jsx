import { useState } from "react";
import { StudentFormFields } from "./StudentFormFields";
import "./styles.css";

export function StudentForm({ handleAddStudent }) {
  const [student, setStudent] = useState({
    id: Date.now(),
    name: "",
    rgm: "",
    turn: "",
    group: "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    handleAddStudent({ ...student, id: Date.now() });
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
