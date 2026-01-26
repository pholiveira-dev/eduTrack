import { useState } from "react";

export function ReplacementModal({
  selectedStudentData,
  cancel,
  availability,
  handleAddReplacement,
  addReplacement,
}) {
  const [selectDate, setSelectDate] = useState("");
  const [selectTurn, setSelectTurn] = useState("");

  const availabilityDate =
    availability?.filter((d) => d.date === selectDate) || [];

  return (
    <section className="modal-overlay">
      <div className="modal-container">
        <form
          className="replacement-form"
          onSubmit={(e) => {
            e.preventDefault();

            if (!selectDate || !selectTurn) {
              alert("Selecione a data e o período da reposição");
              return;
            }
          }}
        >
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
          </label>

          {
            <div className="availability-section">
              <h4 className="availability-title">Vagas disponíveis</h4>

              {!selectDate && (
                <p className="availability-hint">
                  Por favor, selecione uma data
                </p>
              )}

              <ul className="availability-list">
                {availabilityDate.map((s) => (
                  <li key={s.id} className="availability-item">
                    <button
                      type="button"
                      className={`availability-period ${
                        selectTurn === s.period ? "active" : ""
                      }`}
                      value={s.period}
                      onClick={(e) => setSelectTurn(e.target.value)}
                    >
                      {s.period}
                    </button>
                    <span className="availability-slots">
                      {s.capacity - s.occupied} vagas
                    </span>
                  </li>
                ))}
              </ul>

              {selectDate && availabilityDate.length === 0 && (
                <p className="availability-empty">
                  Nenhuma vaga cadastrada para {selectDate}
                </p>
              )}
            </div>
          }

          <div className="modal-actions">
            <button type="button" onClick={cancel}>
              Cancelar
            </button>
            <button
              type="submit"
              onClick={() => handleAddReplacement(selectDate, selectTurn)}
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
