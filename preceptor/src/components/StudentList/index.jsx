import { useState } from "react";
import { StudentFilters } from "./StudentFilters";
// import { StudentTable } from "./StudentTable";
// import { EditStudentModel } from "./StudentTable";
// import { SwapStudentModal } from "./SwapStudentModal";
import "./styles.css";

export function StudentList({ students, setStudents }) {
  const [editingStudent, setEditingStudent] = useState({
    name: "",
    rgm: "",
    turn: "",
    group: "",
  });

  const [editingStudentId, setEditingStudentId] = useState(null);

  const [groupFilter, setGroupFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [rgmFilter, setRgmFilter] = useState("");
  const [turnFilter, setTurnFilter] = useState("");

  const groups = [...new Set(students.map((s) => s.group))];
  const turns = [...new Set(students.map((t) => t.turn))];

  /* ===== ESTADOS PARA TROCA ===== */
  const [swapSourceStudent, setSwapSourceStudent] = useState("");
  const [swapTargetStudent, setSwapTargetStudent] = useState("");
  const [swapSearchTerm, setSwapSearchTerm] = useState("");
  const [swapStep, setSwapStep] = useState("");

  /* ===== FILTROS ===== */
  const filteredStudent = students
    .filter((s) => {
      if (!groupFilter) return true;
      return s.group === groupFilter;
    })
    .filter((s) => {
      if (!nameFilter) return true;
      return s.name.toUpperCase().includes(nameFilter.toUpperCase());
    })
    .filter((s) => {
      if (!rgmFilter) return true;
      return s.rgm.includes(rgmFilter);
    })
    .filter((s) => {
      if (!turnFilter) return true;
      return s.turn === turnFilter;
    });

  function saveEditingStudent() {
    setStudents((prevStudent) =>
      prevStudent.map((s) => (s.id === editingStudentId ? editingStudent : s))
    );
    setEditingStudentId(null);
  }

  function excludeStudent(id) {
    setStudents((prevStudent) => prevStudent.filter((s) => s.id !== id));
  }

  function cancelEditing() {
    setEditingStudentId(null);
  }

  function cancelSwap() {
    setSwapSourceStudent(null);
    setSwapTargetStudent(null);
    setSwapSearchTerm("");
    setSwapStep("");
  }

  function confirmSwap() {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === swapSourceStudent.id) {
          return {
            ...s,
            group: swapTargetStudent.group,
            turn: swapTargetStudent.turn,
          };
        }
        if (s.id === swapTargetStudent.id) {
          return {
            ...s,
            group: swapSourceStudent.group,
            turn: swapSourceStudent.turn,
          };
        }
        return s;
      })
    );

    cancelSwap();
  }

  return (
    <section className="student-list-container">
      <h1>Lista de Alunos</h1>

      <StudentFilters
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        rgmFilter={rgmFilter}
        setRgmFilter={setRgmFilter}
        groupFilter={groupFilter}
        setGroupFilter={setGroupFilter}
        turnFilter={turnFilter}
        setTurnFilter={setTurnFilter}
        groups={groups}
        turns={turns}
      />
      {swapStep && (
        <div className="modal-overlay">
          <div className="modal-card">
            {swapStep === "select" && (
              <>
                <h3>Trocar aluno</h3>

                <p>
                  <strong>{swapSourceStudent.name}</strong> —{" "}
                  {swapSourceStudent.group} / {swapSourceStudent.turn}
                </p>

                <input
                  placeholder="Buscar aluno por nome ou RGM"
                  value={swapSearchTerm}
                  onChange={(e) => setSwapSearchTerm(e.target.value)}
                />

                {swapSearchTerm && (
                  <span className="swap-list">
                    {filteredStudent
                      .filter((s) =>
                        s.name.includes(
                          swapSearchTerm.toUpperCase() ||
                            s.rgm.includes(swapSearchTerm)
                        )
                      )
                      .map((s) => (
                        <span key={s.id} className="swap-item">
                          <div>
                            <strong>NOME: {s.name}</strong> |{" "}
                            <small>GRUPO: {s.group}</small>{" "}
                          </div>
                          <button
                            onClick={() => {
                              setSwapTargetStudent(s);
                              setSwapStep("confirm");
                            }}
                          >
                            Selecionar
                          </button>
                        </span>
                      ))}
                  </span>
                )}
                <button onClick={cancelSwap}>Cancelar</button>
              </>
            )}

            {swapStep === "confirm" && (
              <>
                <h3>Confirmar troca</h3>

                <p>
                  <strong>{swapSourceStudent.name}</strong> (
                  {swapSourceStudent.group}/{swapSourceStudent.turn})
                </p>

                <p>⇄</p>

                <p>
                  <strong>{swapTargetStudent.name}</strong> (
                  {swapTargetStudent.group}/{swapTargetStudent.turn})
                </p>

                <button onClick={confirmSwap}>Confirmar</button>
                <button onClick={cancelSwap}>Cancelar</button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="table-wrapper">
        <table className="student-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>RGM</th>
              <th>Turno</th>
              <th>Grupo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudent.map((s, index) => (
              <tr key={s.id}>
                <td>{index + 1}</td>
                <td>{s.name}</td>
                <td>{s.rgm}</td>
                <td>{s.turn}</td>
                <td>{s.group}</td>

                <td className="actions">
                  {editingStudentId === s.id ? (
                    <div className="modal-overlay">
                      <div className="modal-card">
                        <h3>Editar aluno</h3>

                        <div className="modal-form">
                          <label>
                            Nome
                            <input
                              name="name"
                              value={editingStudent.name}
                              onChange={(e) =>
                                setEditingStudent({
                                  ...editingStudent,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                          </label>

                          <label>
                            RGM
                            <input
                              name="rgm"
                              value={editingStudent.rgm}
                              onChange={(e) =>
                                setEditingStudent({
                                  ...editingStudent,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                          </label>

                          <div className="two-cols">
                            <label>
                              Turno
                              <input
                                name="turn"
                                value={editingStudent.turn}
                                onChange={(e) =>
                                  setEditingStudent({
                                    ...editingStudent,
                                    [e.target.name]: e.target.value,
                                  })
                                }
                              />
                            </label>

                            <label>
                              Grupo
                              <input
                                name="group"
                                value={editingStudent.group}
                                onChange={(e) =>
                                  setEditingStudent({
                                    ...editingStudent,
                                    [e.target.name]: e.target.value,
                                  })
                                }
                              />
                            </label>
                          </div>

                          <div className="modal-actions">
                            <button
                              className="btn ghost success"
                              onClick={saveEditingStudent}
                            >
                              Salvar
                            </button>

                            <button
                              className="btn ghost neutral"
                              onClick={cancelEditing}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setSwapSourceStudent(s); // aluno A
                          setSwapStep("select"); // abre o modal
                        }}
                      >
                        Trocar
                      </button>

                      <button
                        className="btn ghost edit-btn"
                        onClick={() => {
                          setEditingStudentId(s.id);
                          setEditingStudent({ ...s });
                        }}
                      >
                        Editar
                      </button>

                      <button
                        className="btn ghost danger delete-btn"
                        onClick={() => excludeStudent(s.id)}
                      >
                        Excluir
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
