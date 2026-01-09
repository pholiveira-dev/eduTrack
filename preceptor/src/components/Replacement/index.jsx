import { useState } from "react";
import "./styles.css";
import { ReplacementSearch } from "./ReplacementSearch";
import { ReplacementStudentCard } from "./ReplacementStudentCard";
import { ReplacementModal } from "./ReplacementModal";

export function Replacement({ students }) {
  const [filterStudent, setFilterStudent] = useState("");
  const [selectStudent, setSelectStudent] = useState(null);

  const searchFilterStudent = students.filter((s) =>
    s.name?.toUpperCase().includes(filterStudent)
  );

  const selectedStudentData = students.find((s) => s.id === selectStudent);

  function cancel() {
    setSelectStudent(null);
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
          selectedStudentData={selectedStudentData}
          cancel={cancel}
        />
      )}
    </section>
  );
}
