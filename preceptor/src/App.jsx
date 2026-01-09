import { useEffect, useState } from "react";
import { StudentForm } from "./components/StudentForm";
import { StudentList } from "./components/StudentList";
import { MainTemplate } from "./templates/MainTemplate";
import { Replacement } from "./components/Replacement";
import { HowToUse } from "./components/HowToUse";

import "./styles/global.css";
export function App() {
  const [students, setStudents] = useState(() => {
    const save = localStorage.getItem("student");
    return save ? JSON.parse(save) : [];
  });

  const [currentView, setCurrentView] = useState("dashboard");

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

    if (currentView === "replacement") {
      return <Replacement students={students} />;
    }

    if (currentView === "dashboard") {
      return <HowToUse />;
    }
  }

  return (
    <MainTemplate onNavigate={setCurrentView}>{renderContent()}</MainTemplate>
  );
}
