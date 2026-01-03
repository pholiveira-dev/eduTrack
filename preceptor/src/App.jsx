import { useEffect, useState } from "react";
import { StudentForm } from "./components/StudentForm";
import { StudentList } from "./components/StudentList";

export function App() {
  const [students, setStudents] = useState(() => {
    const save = localStorage.getItem("student");
    return save ? JSON.parse(save) : [];
  });

  useEffect(() => {
    localStorage.setItem("student", JSON.stringify(students));
  }, [students]);

  function handleAddStudent(student) {
    setStudents((prev) => [...prev, student]);
  }

  return (
    <>
      <StudentForm handleAddStudent={handleAddStudent} />
      <StudentList setStudents={setStudents} students={students} />
    </>
  );
}
