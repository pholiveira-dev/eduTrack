export function StudentFilters({
  nameFilter,
  setNameFilter,
  rgmFilter,
  setRgmFilter,
  groupFilter,
  setGroupFilter,
  turnFilter,
  setTurnFilter,
  groups,
  turns,
}) {
  return (
    <div>
      <input
        type="text"
        placeholder="Nome completo do aluno"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value.toUpperCase())}
      />{" "}
      <input
        type="text"
        placeholder="RGM - Ex.: 15377377"
        value={rgmFilter}
        onChange={(e) => setRgmFilter(e.target.value)}
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
