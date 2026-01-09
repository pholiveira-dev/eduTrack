import "./styles.css";
export function Sidebar({ onNavigate }) {
  return (
    <aside className="sidebar">
      <h2 className="logo">EduTrack</h2>

      <nav className="menu">
        <button
          className="menu-item active"
          onClick={() => onNavigate("dashboard")}
        >
          Dashboard
        </button>
        <button className="menu-item" onClick={() => onNavigate("form")}>
          Cadastrar Aluno
        </button>
        <button className="menu-item" onClick={() => onNavigate("students")}>
          Alunos
        </button>

        <button className="menu-item">Cadastrar Reposição</button>
      </nav>
    </aside>
  );
}
