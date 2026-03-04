export function StudentFilters({
  quickSearch,
  setQuickSearch,
  groupFilter,
  setGroupFilter,
  turnFilter,
  setTurnFilter,
  groups,
  turns,
}) {
  return (
    <div className="filters-bar">
      <input
        type="text"
        placeholder="Busca rápida (Nome ou RGM)"
        value={quickSearch}
        onChange={(e) => setQuickSearch(e.target.value)}
      />{" "}
      <select
        value={groupFilter}
        onChange={(e) => setGroupFilter(e.target.value)}
      >
        <option value="">Todos os grupos</option>
        {groups.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>{" "}
      <select
        value={turnFilter}
        onChange={(e) => setTurnFilter(e.target.value)}
      >
        <option value="">Todos os turnos</option>
        {turns.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}
