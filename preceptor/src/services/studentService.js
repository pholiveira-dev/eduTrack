// Service / Use Case (regras de negócio ficam aqui)
export function createStudentService({ repo, idGenerator }) {
  function normalizeRgm(rgm) {
    return String(rgm ?? "").trim();
  }

  function normalizeName(name) {
    return String(name ?? "")
      .trim()
      .toUpperCase();
  }

  function normalizeGroup(group) {
    return String(group ?? "")
      .trim()
      .toUpperCase();
  }

  function validate(student) {
    const errors = [];
    if (!student.name?.trim()) errors.push("Nome completo é obrigatório.");
    if (!student.rgm?.trim()) errors.push("RGM é obrigatório.");
    if (!student.turn?.trim()) errors.push("Turno é obrigatório.");
    if (!student.group?.trim()) errors.push("Grupo é obrigatório.");
    return errors;
  }

  async function findByRgm(rgm) {
    const normalized = normalizeRgm(rgm);
    if (!normalized) return null;
    return repo.findByRgm(normalized);
  }

  async function existsByRgm(rgm) {
    const normalized = normalizeRgm(rgm);
    if (!normalized) return false;
    return repo.existsByRgm(normalized);
  }

  async function register(studentInput) {
    const student = {
      ...studentInput,
      name: normalizeName(studentInput.name),
      rgm: normalizeRgm(studentInput.rgm),
      group: normalizeGroup(studentInput.group),
    };

    const errors = validate(student);
    if (errors.length) {
      return { ok: false, error: { type: "VALIDATION", messages: errors } };
    }

    const exists = await existsByRgm(student.rgm);
    if (exists) {
      return {
        ok: false,
        error: {
          type: "CONFLICT",
          messages: ["Esse aluno já está cadastrado (RGM já existe)."],
        },
      };
    }

    const created = {
      ...student,
      id: idGenerator(),
    };

    await repo.create(created);
    return { ok: true, data: created };
  }

  return {
    normalizeRgm,
    findByRgm,
    existsByRgm,
    register,
  };
}
