import { useState } from "react";

export function ReplacementModal({
  selectedStudentData,
  cancel,
  viewVacancies,
}) {
  const [selectDate, setSelectDate] = useState("");

  return (
    <section className="modal-overlay">
      <div className="modal-container">
        <form className="replacement-form">
          {selectedStudentData && (
            <section className="student-summary" key={selectedStudentData.id}>
              <div className="student-main">{selectedStudentData.name}</div>

              <div className="student-meta">
                <span>
                  <strong>RGM:</strong> {selectedStudentData.rgm}
                </span>
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

          {/* Depois quebrar esse select em um arquivo separado*/}

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
            <input
              onChange={(e) => setSelectDate(e.target.value)}
              type="date"
              value={selectDate}
              required
            />
            <button type="button" onClick={() => viewVacancies(selectDate)}>
              Selecionar
            </button>
            {}
          </label>

          {
            <div>
              <h4>Vagas disponíveis</h4>
            </div>
          }

          <div className="modal-actions">
            <button type="button" onClick={cancel}>
              Cancelar
            </button>
            <button type="submit">Confirmar</button>
          </div>
        </form>
      </div>
    </section>
  );
}
