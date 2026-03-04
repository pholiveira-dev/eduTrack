import { useEffect, useMemo, useState } from "react";
import { StudentFilters } from "./StudentFilters";
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

  // ✅ Busca rápida (nome OU RGM)
  const [quickSearch, setQuickSearch] = useState("");

  // ✅ Paginação
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // ✅ Detalhes do aluno selecionado
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const groups = useMemo(
    () => [...new Set(students.map((s) => s.group).filter(Boolean))],
    [students],
  );
  const turns = useMemo(
    () => [...new Set(students.map((s) => s.turn).filter(Boolean))],
    [students],
  );

  // ===== FILTROS (com busca rápida) =====
  const filteredStudents = useMemo(() => {
    const q = quickSearch.trim().toUpperCase();

    return students
      .filter((s) => {
        if (!groupFilter) return true;
        return s.group === groupFilter;
      })
      .filter((s) => {
        if (!turnFilter) return true;
        return s.turn === turnFilter;
      })
      .filter((s) => {
        if (!nameFilter) return true;
        return String(s.name).toUpperCase().includes(nameFilter.toUpperCase());
      })
      .filter((s) => {
        if (!rgmFilter) return true;
        return String(s.rgm).includes(rgmFilter);
      })
      .filter((s) => {
        if (!q) return true;
        const name = String(s.name ?? "").toUpperCase();
        const rgm = String(s.rgm ?? "");
        return name.includes(q) || rgm.includes(quickSearch.trim());
      });
  }, [students, groupFilter, turnFilter, nameFilter, rgmFilter, quickSearch]);

  // ✅ Reseta página quando filtros mudam (pra não cair em página vazia)
  useEffect(() => {
    setPage(1);
  }, [groupFilter, turnFilter, nameFilter, rgmFilter, quickSearch, pageSize]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredStudents.length / pageSize));
  }, [filteredStudents.length, pageSize]);

  const pagedStudents = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredStudents.slice(start, start + pageSize);
  }, [filteredStudents, page, pageSize]);

  const selectedStudent = useMemo(() => {
    return students.find((s) => s.id === selectedStudentId) ?? null;
  }, [students, selectedStudentId]);

  function saveEditingStudent() {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === editingStudentId ? { ...s, ...editingStudent } : s,
      ),
    );
    setEditingStudentId(null);
  }

  function excludeStudent(id) {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    if (selectedStudentId === id) setSelectedStudentId(null);
  }

  function cancelEditing() {
    setEditingStudentId(null);
  }

  return (
    <section className="student-list-container">
      <h1>Lista de Alunos</h1>

      {/* ✅ filtros + busca rápida */}
      <StudentFilters
        quickSearch={quickSearch}
        setQuickSearch={setQuickSearch}
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

      {/* ✅ painel de detalhes */}
      {selectedStudent && (
        <div
          className="student-details-card"
          style={{
            marginTop: 12,
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 8,
          }}
        >
          <strong>Dados do aluno selecionado</strong>
          <div>Nome: {selectedStudent.name}</div>
          <div>RGM: {selectedStudent.rgm}</div>
          <div>Turno: {selectedStudent.turn}</div>
          <div>Grupo: {selectedStudent.group}</div>
        </div>
      )}

      {/* ✅ controles de paginação */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      >
        <span>
          Total: <strong>{filteredStudents.length}</strong> alunos
        </span>

        <span>
          Página <strong>{page}</strong> de <strong>{totalPages}</strong>
        </span>

        <button onClick={() => setPage(1)} disabled={page === 1}>
          {"<<"}
        </button>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          {"<"}
        </button>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          {">"}
        </button>
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
        >
          {">>"}
        </button>

        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value={5}>5 por página</option>
          <option value={10}>10 por página</option>
          <option value={20}>20 por página</option>
          <option value={50}>50 por página</option>
        </select>
      </div>

      <div className="table-wrapper" style={{ marginTop: 12 }}>
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
            {pagedStudents.map((s, index) => (
              <tr
                key={s.id}
                onClick={() => setSelectedStudentId(s.id)}
                style={{
                  cursor: "pointer",
                  background:
                    selectedStudentId === s.id ? "#f5f5f5" : "transparent",
                }}
              >
                <td>{(page - 1) * pageSize + index + 1}</td>
                <td>{s.name}</td>
                <td>{s.rgm}</td>
                <td>{s.turn}</td>
                <td>{s.group}</td>

                <td className="actions" onClick={(e) => e.stopPropagation()}>
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

            {pagedStudents.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: 12 }}>
                  Nenhum aluno encontrado com os filtros atuais.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
