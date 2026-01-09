import { useEffect, useState } from "react";
import { StudentForm } from "./components/StudentForm";
import { StudentList } from "./components/StudentList";
import { MainTemplate } from "./templates/MainTemplate";

export function App() {
  const [students, setStudents] = useState(() => {
    const save = localStorage.getItem("student");
    return save ? JSON.parse(save) : [];
  });

  const [currentView, setCurrentView] = useState("");

  useEffect(() => {
    localStorage.setItem("student", JSON.stringify(students));
  }, [students]);

  function handleAddStudent(student) {
    setStudents((prev) => [...prev, student]);
  }

  function renderContent() {
    if (currentView === "students") {
      return <StudentList setStudents={setStudents} students={students} />;
    }

    if (currentView === "form") {
      return <StudentForm handleAddStudent={handleAddStudent} />;
    }
  }

  return (
    <MainTemplate onNavigate={setCurrentView}>{renderContent()}</MainTemplate>
  );
}
