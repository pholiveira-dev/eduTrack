import { useMemo } from "react";
import "./styles.css";

// util: semana (seg..dom) baseada na data atual
function getWeekRange(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay(); // 0 dom, 1 seg...
  const diffToMonday = (day === 0 ? -6 : 1) - day;

  const start = new Date(d);
  start.setDate(d.getDate() + diffToMonday);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

function parseISODate(iso) {
  // iso "YYYY-MM-DD"
  const [y, m, d] = String(iso).split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

function formatBR(iso) {
  const dt = parseISODate(iso);
  const dd = String(dt.getDate()).padStart(2, "0");
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const yy = dt.getFullYear();
  return `${dd}/${mm}/${yy}`;
}

export function Dashboard({ students = [], availability = [] }) {
  const { start, end } = useMemo(() => getWeekRange(new Date()), []);

  const weekAvailability = useMemo(() => {
    return availability
      .filter((a) => {
        const dt = parseISODate(a.date);
        return dt >= start && dt <= end;
      })
      .sort((a, b) => (a.date + a.period).localeCompare(b.date + b.period));
  }, [availability, start, end]);

  const totals = useMemo(() => {
    const capacity = weekAvailability.reduce(
      (acc, a) => acc + (a.capacity || 0),
      0,
    );
    const occupied = weekAvailability.reduce(
      (acc, a) => acc + (a.occupied || 0),
      0,
    );
    const available = Math.max(0, capacity - occupied);

    return { capacity, occupied, available };
  }, [weekAvailability]);

  const byPeriod = useMemo(() => {
    const base = {
      matutino: { capacity: 0, occupied: 0, available: 0 },
      vespertino: { capacity: 0, occupied: 0, available: 0 },
      noturno: { capacity: 0, occupied: 0, available: 0 },
    };

    for (const a of weekAvailability) {
      const key = a.period;
      if (!base[key]) continue;

      base[key].capacity += a.capacity || 0;
      base[key].occupied += a.occupied || 0;
    }

    for (const key of Object.keys(base)) {
      base[key].available = Math.max(
        0,
        base[key].capacity - base[key].occupied,
      );
    }

    return base;
  }, [weekAvailability]);

  const lowSlots = useMemo(() => {
    // alerta: 0 vagas ou <= 5 vagas
    return weekAvailability
      .map((a) => ({
        ...a,
        remaining: Math.max(0, (a.capacity || 0) - (a.occupied || 0)),
      }))
      .filter((a) => a.remaining <= 5)
      .slice(0, 6);
  }, [weekAvailability]);

  const nextDates = useMemo(() => {
    // agrupa por data
    const map = new Map();
    for (const a of weekAvailability) {
      const remaining = Math.max(0, (a.capacity || 0) - (a.occupied || 0));
      if (!map.has(a.date)) map.set(a.date, []);
      map.get(a.date).push({ ...a, remaining });
    }

    return Array.from(map.entries())
      .map(([date, items]) => ({ date, items }))
      .sort((x, y) => x.date.localeCompare(y.date))
      .slice(0, 5);
  }, [weekAvailability]);

  return (
    <section className="dash">
      <header className="dash-header">
        <div>
          <h1 className="dash-title">Dashboard • EduTrack</h1>
          <p className="dash-subtitle">
            Visão geral da semana (vagas por turno e alertas).
          </p>
        </div>

        <div className="dash-meta">
          <span className="dash-pill">UDF</span>
          <span className="dash-pill soft">
            Semana: {formatBR(start.toISOString().slice(0, 10))} —{" "}
            {formatBR(end.toISOString().slice(0, 10))}
          </span>
        </div>
      </header>

      {/* KPIs */}
      <section className="dash-kpis">
        <article className="kpi card">
          <div className="kpi-top">
            <span className="kpi-label">Alunos cadastrados</span>
            <i data-lucide="users" aria-hidden="true" />
          </div>
          <div className="kpi-value">{students.length}</div>
          <div className="kpi-foot">Base atual do sistema</div>
        </article>

        <article className="kpi card">
          <div className="kpi-top">
            <span className="kpi-label">Vagas na semana</span>
            <i data-lucide="calendar" aria-hidden="true" />
          </div>
          <div className="kpi-value">{totals.capacity}</div>
          <div className="kpi-foot">Somatório de mat/ves/not</div>
        </article>

        <article className="kpi card">
          <div className="kpi-top">
            <span className="kpi-label">Disponíveis</span>
            <i data-lucide="check-circle" aria-hidden="true" />
          </div>
          <div className="kpi-value">{totals.available}</div>
          <div className="kpi-foot">
            Ocupadas: <strong>{totals.occupied}</strong>
          </div>
        </article>

        <article className="kpi card warn">
          <div className="kpi-top">
            <span className="kpi-label">Alertas</span>
            <i data-lucide="alert-triangle" aria-hidden="true" />
          </div>
          <div className="kpi-value">{lowSlots.length}</div>
          <div className="kpi-foot">Turnos com ≤ 5 vagas</div>
        </article>
      </section>

      <section className="dash-grid">
        {/* Por turno */}
        <article className="card panel">
          <div className="panel-head">
            <h2>Disponibilidade por turno</h2>
            <span className="panel-sub">Semana atual</span>
          </div>

          <div className="period-grid">
            {["matutino", "vespertino", "noturno"].map((p) => (
              <div key={p} className="period-row">
                <div className="period-left">
                  <span className={`period-badge ${p}`}>{p}</span>
                </div>

                <div className="period-right">
                  <div className="period-metric">
                    <span className="muted">Disponíveis</span>
                    <strong>{byPeriod[p].available}</strong>
                  </div>
                  <div className="period-metric">
                    <span className="muted">Capacidade</span>
                    <strong>{byPeriod[p].capacity}</strong>
                  </div>
                  <div className="period-metric">
                    <span className="muted">Ocupadas</span>
                    <strong>{byPeriod[p].occupied}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Alertas */}
        <article className="card panel">
          <div className="panel-head">
            <h2>Alertas de vagas baixas</h2>
            <span className="panel-sub">≤ 5 vagas restantes</span>
          </div>

          {lowSlots.length === 0 ? (
            <div className="empty">
              <i data-lucide="sparkles" aria-hidden="true" />
              <div>
                <strong>Tudo certo por enquanto</strong>
                <p>Nenhum turno com vagas críticas nesta semana.</p>
              </div>
            </div>
          ) : (
            <ul className="alert-list">
              {lowSlots.map((a) => (
                <li key={a.id} className="alert-item">
                  <div className="alert-main">
                    <span className="alert-date">{formatBR(a.date)}</span>
                    <span className={`period-badge ${a.period}`}>
                      {a.period}
                    </span>
                  </div>
                  <div
                    className={`alert-slots ${a.remaining === 0 ? "zero" : ""}`}
                  >
                    {a.remaining} vagas
                  </div>
                </li>
              ))}
            </ul>
          )}
        </article>

        {/* Próximas datas */}
        <article className="card panel wide">
          <div className="panel-head">
            <h2>Vagas por dia (semana)</h2>
            <span className="panel-sub">Resumo rápido por data</span>
          </div>

          {nextDates.length === 0 ? (
            <div className="empty">
              <i data-lucide="calendar-x" aria-hidden="true" />
              <div>
                <strong>Nenhuma disponibilidade cadastrada</strong>
                <p>Cadastre as vagas da semana para começar a agendar.</p>
              </div>
            </div>
          ) : (
            <div className="days">
              {nextDates.map((d) => (
                <div key={d.date} className="day-card">
                  <div className="day-head">
                    <span className="day-date">{formatBR(d.date)}</span>
                    <span className="day-total">
                      {d.items.reduce((acc, x) => acc + x.remaining, 0)} vagas
                    </span>
                  </div>

                  <div className="day-periods">
                    {d.items.map((x) => (
                      <div key={x.id} className="day-period">
                        <span className={`period-badge ${x.period}`}>
                          {x.period}
                        </span>
                        <span
                          className={`day-remaining ${x.remaining === 0 ? "zero" : ""}`}
                        >
                          {x.remaining}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </article>
      </section>
    </section>
  );
}
