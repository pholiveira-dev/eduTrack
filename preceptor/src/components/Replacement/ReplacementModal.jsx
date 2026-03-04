import { useEffect, useMemo, useState } from "react";

const PERIOD_LABEL = {
  matutino: "Matutino",
  vespertino: "Vespertino",
  noturno: "Noturno",
};

export function ReplacementModal({
  selectedStudentData,
  cancel,
  availability,
  handleAddReplacement,
  topMessage, // agora é { text, type } vindo do index.jsx
}) {
  const [selectDate, setSelectDate] = useState("");
  const [selectTurn, setSelectTurn] = useState("");

  // ✅ estados do form (antes não existiam)
  const [teacher, setTeacher] = useState("");
  const [reason, setReason] = useState("");
  const [semester, setSemester] = useState("");

  // ✅ step do modal (form -> success)
  const [step, setStep] = useState("form"); // "form" | "success"

  // ✅ salva o que foi confirmado pra exibir na tela final
  const [confirmed, setConfirmed] = useState(null);

  const availabilityDate = useMemo(() => {
    return availability?.filter((d) => d.date === selectDate) || [];
  }, [availability, selectDate]);

  const canConfirm =
    Boolean(selectedStudentData) &&
    Boolean(teacher) &&
    Boolean(reason) &&
    Boolean(semester) &&
    Boolean(selectDate) &&
    Boolean(selectTurn);

  // ✅ quando vier sucesso do index.jsx, troca o modal para tela de confirmação
  useEffect(() => {
    if (topMessage?.type === "success") {
      setConfirmed({
        studentName: selectedStudentData?.name ?? "",
        studentRgm: selectedStudentData?.rgm ?? "",
        studentTurn: selectedStudentData?.turn ?? "",
        studentGroup: selectedStudentData?.group ?? "",
        teacher,
        reason,
        semester,
        date: selectDate,
        period: selectTurn,
      });
      setStep("success");
    }
  }, [
    topMessage?.type,
    selectedStudentData,
    teacher,
    reason,
    semester,
    selectDate,
    selectTurn,
  ]);

  function resetFormButKeepStudent() {
    setTeacher("");
    setReason("");
    setSemester("");
    setSelectDate("");
    setSelectTurn("");
    setConfirmed(null);
    setStep("form");
  }

  return (
    <section className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-container">
        {/* ✅ toast topo (agora com type) */}
        {topMessage?.text && (
          <p className={`top-alert ${topMessage.type}`}>{topMessage.text}</p>
        )}

        {/* =========================
            TELA DE CONFIRMAÇÃO (Opção B)
        ========================= */}
        {step === "success" && confirmed && (
          <div className="confirmation">
            <div className="confirmation-badge" aria-hidden="true">
              ✅
            </div>

            <h2 className="confirmation-title">Reposição agendada</h2>
            <p className="confirmation-subtitle">
              Confirme abaixo os dados do agendamento.
            </p>

            <div className="confirmation-card">
              <div className="confirmation-row">
                <span className="confirmation-label">Aluno</span>
                <span className="confirmation-value">
                  {confirmed.studentName}
                </span>
              </div>

              <div className="confirmation-row">
                <span className="confirmation-label">RGM</span>
                <span className="confirmation-value">
                  {confirmed.studentRgm}
                </span>
              </div>

              <div className="confirmation-row">
                <span className="confirmation-label">Data</span>
                <span className="confirmation-value">{confirmed.date}</span>
              </div>

              <div className="confirmation-row">
                <span className="confirmation-label">Turno</span>
                <span className="confirmation-value">
                  {PERIOD_LABEL[confirmed.period] ?? confirmed.period}
                </span>
              </div>

              <div className="confirmation-divider" />

              <div className="confirmation-row">
                <span className="confirmation-label">Professor</span>
                <span className="confirmation-value">{confirmed.teacher}</span>
              </div>

              <div className="confirmation-row">
                <span className="confirmation-label">Justificativa</span>
                <span className="confirmation-value">{confirmed.reason}</span>
              </div>

              <div className="confirmation-row">
                <span className="confirmation-label">Semestre</span>
                <span className="confirmation-value">{confirmed.semester}</span>
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" onClick={cancel}>
                Fechar
              </button>

              <button type="button" onClick={resetFormButKeepStudent}>
                Agendar outra reposição
              </button>
            </div>
          </div>
        )}

        {/* =========================
            FORMULÁRIO (step === "form")
        ========================= */}
        {step === "form" && (
          <form
            className="replacement-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!canConfirm) return;

              // ✅ chama a lógica do index.jsx (valida + decrementa vaga + toast)
              handleAddReplacement(selectDate, selectTurn);
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

            <label>
              Professor
              <select
                required
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="Amanda">Amanda</option>
                <option value="Breno">Breno</option>
                <option value="Jade">Jade</option>
                <option value="Mariana">Mariana</option>
                <option value="Yuri">Yuri</option>
              </select>
            </label>

            <label>
              Justificativa
              <select
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="Atestado Médico">Atestado Médico</option>
                <option value="Escala 12x36">Escala 12x36</option>
                <option value="Autorização do professor">
                  Autorização do professor
                </option>
              </select>
            </label>

            <label>
              Semestre
              <select
                required
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="7º semestre">7º semestre</option>
                <option value="8º semestre">8º semestre</option>
              </select>
            </label>

            <label>
              Data da reposição
              <input
                onChange={(e) => {
                  setSelectDate(e.target.value);
                  setSelectTurn(""); // ✅ troca de data reseta turno selecionado
                }}
                type="date"
                value={selectDate}
                required
              />
            </label>

            <div className="availability-section">
              <h4 className="availability-title">Vagas disponíveis</h4>

              {!selectDate && (
                <p className="availability-hint">
                  Por favor, selecione uma data
                </p>
              )}

              {selectDate && (
                <ul className="availability-list">
                  {availabilityDate.map((s) => {
                    const remaining = s.capacity - s.occupied;
                    const disabled = remaining <= 0;

                    return (
                      <li key={s.id}>
                        <button
                          type="button"
                          disabled={disabled}
                          className={`availability-item ${
                            selectTurn === s.period ? "active" : ""
                          }`}
                          onClick={() => setSelectTurn(s.period)}
                        >
                          <span className="availability-period">
                            {PERIOD_LABEL[s.period] ?? s.period}
                          </span>
                          <span className="availability-slots">
                            ({remaining} vagas)
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}

              {selectDate && availabilityDate.length === 0 && (
                <p className="availability-empty">
                  Nenhuma vaga cadastrada para {selectDate}
                </p>
              )}
            </div>

            <div className="modal-actions">
              <button type="button" onClick={cancel}>
                Cancelar
              </button>

              <button type="submit" disabled={!canConfirm}>
                Confirmar
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
