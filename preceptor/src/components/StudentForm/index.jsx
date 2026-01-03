import { useState } from "react";
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
            <div className="form-group">
              <label htmlFor="name">Nome completo *</label>
              <input
                id="name"
                type="text"
                placeholder="Ex: João da Silva"
                value={student.name.toUpperCase()}
                onChange={(e) =>
                  setStudent((prev) => ({
                    ...prev,
                    name: e.target.value.toUpperCase(),
                  }))
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="rgm">RGM *</label>
              <input
                id="rgm"
                type="text"
                placeholder="Ex: 123456"
                value={student.rgm}
                onChange={(e) =>
                  setStudent((prev) => ({ ...prev, rgm: e.target.value }))
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="turno">Turno *</label>
              <select
                id="turno"
                onChange={(e) =>
                  setStudent((prev) => ({ ...prev, turn: e.target.value }))
                }
                value={student.turn}
                required
              >
                <option value="">Selecione...</option>
                <option value="matutino">Matutino</option>
                <option value="vespertino">Vespertino</option>
                <option value="noturno">Noturno</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="grupo">Grupo*</label>
              <input
                id="grupo"
                type="text"
                placeholder="Ex: 1A"
                onChange={(e) =>
                  setStudent((prev) => ({
                    ...prev,
                    group: e.target.value.toUpperCase(),
                  }))
                }
                value={student.group}
                required
              />
            </div>
            <button type="submit">Cadastrar</button>
          </fieldset>
        </form>
      </div>
    </>
  );
}
