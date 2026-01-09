export function ReplacementStudentCard({ s, setSelectStudent, selectStudent }) {
  return (
    <article className="replacement-card">
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
  );
}
