import { useState } from "react";
import "./styles.css";

export function Replacement({ students }) {
  const [filterStudent, setFilterStudent] = useState("");
  const [selectStudent, setSelectStudent] = useState(null);

  const searchFilterStudent = students.filter((s) =>
    s.name?.toUpperCase().includes(filterStudent)
  );

  const selectedStudentData = students.find((s) => s.id === selectStudent);

  function cancel() {
    setSelectStudent(null);
  }

  return (
    <section className="replacement-container">
      <h1>AGENDAR REPOSIÇÃO</h1>
      <header className="replacement-header">
        <input
          className="replacement-search"
          onChange={(e) => setFilterStudent(e.target.value.toUpperCase())}
          value={filterStudent}
          type="text"
          placeholder="Buscar aluno"
          aria-label="Buscar aluno"
        />
      </header>

      <section className="replacement-list">
        {searchFilterStudent.map((s) => (
          <article key={s.id} className="replacement-card">
            <ul className="student-info">
              <li className="student-name">{s.name}</li>
              <li>RGM: {s.rgm}</li>
              <li>Turno: {s.turn}</li>
              <li>Grupo: {s.group}</li>
            </ul>

            <div className="card-actions">
              <button
                className="select-student-button"
                onClick={() => setSelectStudent(s.id)}
                aria-pressed={selectStudent === s.id}
              >
                Selecionar
              </button>
            </div>
          </article>
        ))}
      </section>

      {selectStudent && (
        <section className="modal-overlay">
          <div className="modal-container">
            <form className="replacement-form">
              <h2>Agendar reposição para:</h2>

              {selectedStudentData && (
                <section
                  className="student-summary"
                  key={selectedStudentData.id}
                >
                  <div className="student-main">{selectedStudentData.name}</div>

                  <div className="student-meta">
                    <span>
                      <strong>TURNO:</strong> {selectedStudentData.turn}
                    </span>
                    <span>
                      <strong>GRUPO:</strong> {selectedStudentData.group}
                    </span>
                  </div>
                </section>
              )}

              <h2>Dados da reposição</h2>

              <label>
                Professor
                <select required>
                  <option value="">Selecione</option>
                  <option>Amanda</option>
                  <option>Breno</option>
                  <option>Jade</option>
                  <option>Mariana</option>
                  <option>Yuri</option>
                </select>
              </label>

              <label>
                Justificativa
                <select required>
                  <option value="">Selecione</option>
                  <option>Atestado Médico</option>
                  <option>Escala 12x36</option>
                  <option>Autorização do professor</option>
                </select>
              </label>

              <label>
                Semestre
                <select required>
                  <option value="">Selecione</option>
                  <option>7º semestre</option>
                  <option>8º semestre</option>
                </select>
              </label>

              <label>
                Data da reposição
                <input type="date" required />
              </label>

              <div className="modal-actions">
                <button type="button" onClick={cancel}>
                  Cancelar
                </button>
                <button type="submit">Confirmar</button>
              </div>
            </form>
          </div>
        </section>
      )}
    </section>
  );
}
