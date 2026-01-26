export function ReplacementSearch({ filterStudent, setFilterStudent }) {
  return (
    <div>
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
      <h2>SELECIONE O ESTUDANTE </h2>
    </div>
  );
}
