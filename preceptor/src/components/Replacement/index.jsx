import { useState } from "react";
import "./styles.css";
import { ReplacementSearch } from "./ReplacementSearch";
import { ReplacementStudentCard } from "./ReplacementStudentCard";
import { ReplacementModal } from "./ReplacementModal";

export function Replacement({ students, availability, setAvailability }) {
  const [filterStudent, setFilterStudent] = useState("");
  const [selectStudent, setSelectStudent] = useState(null);
  const [topMessage, setTopMessage] = useState("");

  const searchFilterStudent = students.filter((s) =>
    s.name?.toUpperCase().includes(filterStudent),
  );

  const selectedStudentData = students.find((s) => s.id === selectStudent);

  function cancel() {
    setSelectStudent(null);
  }

  function handleAddReplacement(date, turn) {
    const selectedAvailability = availability.find(
      (a) => a.date === date && a.period === turn,
    );

    if (!selectedAvailability) {
      setTopMessage("❌ Sem vagas para esta data");
      return;
    }

    if (selectedAvailability.capacity - selectedAvailability.occupied <= 0) {
      setTopMessage("⚠️ Não há mais vagas disponíveis");
      return;
    }

    // ✅ Aqui já dá pra decrementar no estado global:
    setAvailability((prev) =>
      prev.map((a) =>
        a.id === selectedAvailability.id
          ? { ...a, occupied: a.occupied + 1 }
          : a,
      ),
    );

    setTopMessage(`✅ Agendamento confirmado: ${date} ${turn.toUpperCase()}`);

    setTimeout(() => setTopMessage(""), 2500);
    // (Fechar modal a gente faz já já)
  }

  return (
    <section className="replacement-container">
      <ReplacementSearch
        filterStudent={filterStudent}
        setFilterStudent={setFilterStudent}
      />

      <section className="replacement-list">
        {searchFilterStudent.map((s) => (
          <ReplacementStudentCard
            key={s.id}
            s={s}
            selectStudent={selectStudent}
            setSelectStudent={setSelectStudent}
          />
        ))}
      </section>

      {selectStudent && (
        <ReplacementModal
          availability={availability}
          selectedStudentData={selectedStudentData}
          cancel={cancel}
          handleAddReplacement={handleAddReplacement}
          topMessage={topMessage}
        />
      )}
    </section>
  );
}
