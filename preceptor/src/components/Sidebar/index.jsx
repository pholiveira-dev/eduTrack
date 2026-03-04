import "./styles.css";

const items = [
  { key: "dashboard", label: "Como usar", icon: "home" },
  { key: "form", label: "Cadastrar aluno", icon: "user-plus" },
  { key: "students", label: "Alunos", icon: "users" },
  { key: "replacement", label: "Agendar", icon: "calendar" },
  { key: "history", label: "Reposições", icon: "clipboard-list" },
];

function Icon({ name }) {
  // Lucide CDN: <i data-lucide="home"></i>
  return <i className="menu-icon" data-lucide={name} aria-hidden="true" />;
}

export function Sidebar({ onNavigate, currentPage }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="brand">
          <div className="brand-badge" aria-hidden="true">
            <i data-lucide="graduation-cap"></i>
          </div>
          <div className="brand-text">
            <div className="brand-name">EduTrack</div>
            <div className="brand-subtitle">UDF • Reposições</div>
          </div>
        </div>
      </div>

      <nav className="menu" aria-label="Navegação principal">
        {items.map((it) => (
          <button
            key={it.key}
            type="button"
            className={`menu-item ${currentPage === it.key ? "active" : ""}`}
            onClick={() => onNavigate(it.key)}
          >
            <Icon name={it.icon} />
            <span className="menu-label">{it.label}</span>
            <span className="menu-chevron" aria-hidden="true">
              <i data-lucide="chevron-right"></i>
            </span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-meta">
          <span className="meta-dot" aria-hidden="true" />
          <span>v0.1 • UDF</span>
        </div>

        {/* Futuro: usuário + sair */}
        {/* <button className="logout">Sair</button> */}
      </div>
    </aside>
  );
}
