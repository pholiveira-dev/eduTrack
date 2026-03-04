import { useState } from "react";
import { StudentFormFields } from "./StudentFormFields";
import "./styles.css";

const emptyStudent = { name: "", rgm: "", turn: "", group: "" };

export function StudentForm({ studentService }) {
  const [student, setStudent] = useState(emptyStudent);
  const [error, setError] = useState("");
  const [searchRgm, setSearchRgm] = useState("");
  const [foundStudent, setFoundStudent] = useState(null);

  const isLocked = Boolean(foundStudent);

  async function handleSearch() {
    setError("");
    const rgm = studentService.normalizeRgm(searchRgm);

    if (!rgm) {
      setError("Digite um RGM para verificar.");
      return;
    }

    const result = await studentService.findByRgm(rgm);

    if (result) {
      setFoundStudent(result);
      setStudent({
        name: result.name ?? "",
        rgm: result.rgm ?? "",
        turn: result.turn ?? "",
        group: result.group ?? "",
      });
      setError("Aluno já cadastrado. Dados carregados.");
    } else {
      setFoundStudent(null);
      setStudent((prev) => ({ ...prev, rgm }));
      setError("Aluno não encontrado. Você pode cadastrar.");
    }
  }

  function handleClear() {
    setError("");
    setSearchRgm("");
    setFoundStudent(null);
    setStudent(emptyStudent);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (foundStudent) {
      setError(
        "Esse aluno já está cadastrado. Clique em “Novo cadastro” para cadastrar outro.",
      );
      return;
    }

    const result = await studentService.register(student);

    if (!result.ok) {
      setError(result.error.messages[0]);
      return;
    }

    setStudent(emptyStudent);
    setSearchRgm("");
    setError("Aluno cadastrado com sucesso!");
  }

  return (
    <div className="page-wrapper">
      <div className="form-page">
        <fieldset style={{ marginBottom: 16 }}>
          <legend>Verificar aluno cadastrado</legend>

          <div className="form-group">
            <label htmlFor="searchRgm">RGM</label>
            <input
              id="searchRgm"
              type="text"
              placeholder="Digite o RGM e clique em Verificar"
              value={searchRgm}
              onChange={(e) => setSearchRgm(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" onClick={handleSearch}>
              Verificar
            </button>
            <button type="button" onClick={handleClear}>
              Novo cadastro
            </button>
          </div>
        </fieldset>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados do aluno</legend>

            {error && (
              <p
                style={{
                  color:
                    error.includes("sucesso") || error.includes("carregados")
                      ? "green"
                      : "crimson",
                  marginBottom: 12,
                }}
              >
                {error}
              </p>
            )}

            <StudentFormFields
              student={student}
              setStudent={setStudent}
              disabled={isLocked}
            />

            <button type="submit" disabled={isLocked}>
              Cadastrar
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
