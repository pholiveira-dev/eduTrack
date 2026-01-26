import { useState } from "react";
import "./styles.css";
import { ReplacementSearch } from "./ReplacementSearch";
import { ReplacementStudentCard } from "./ReplacementStudentCard";
import { ReplacementModal } from "./ReplacementModal";

export function Replacement({ students }) {
  const [filterStudent, setFilterStudent] = useState("");
  const [selectStudent, setSelectStudent] = useState(null);
  const [availability, setAvailability] = useState([
    {
      id: 1,
      date: "2026-02-10",
      period: "vespertino",
      capacity: 30,
      occupied: 12,
    },
    {
      id: 2,
      date: "2026-02-10",
      period: "matutino",
      capacity: 30,
      occupied: 28,
    },
    { id: 3, date: "2026-02-11", period: "noturno", capacity: 30, occupied: 5 },
  ]);

  const [addReplacement, setAddReplacement] = useState([]);

  const searchFilterStudent = students.filter((s) =>
    s.name?.toUpperCase().includes(filterStudent)
  );

  const selectedStudentData = students.find((s) => s.id === selectStudent);

  function cancel() {
    setSelectStudent(null);
  }

  /* ####################### MELHORAR ESSA LÓGICA - FILTER + MAP?  #######################*/
  function handleAddReplacement(date, turn) {
    availability
      .filter((a) => a.date === date && a.period === turn)
      .map((r) => {
        return (
          <span>
            Agendamento marcado para o turno {r.period} e a data {r.date}
            {console.log(r.period, r.date)}
          </span>
        );
      });
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
            addReplacement={addReplacement}
          />
        ))}
      </section>

      {selectStudent && (
        <ReplacementModal
          availability={availability}
          selectedStudentData={selectedStudentData}
          cancel={cancel}
          handleAddReplacement={handleAddReplacement}
        />
      )}
    </section>
  );
}
