import { useMemo, useState, useEffect } from "react";
import { StudentForm } from "./components/StudentForm";
import { StudentList } from "./components/StudentList";
import { MainTemplate } from "./templates/MainTemplate";
import { Replacement } from "./components/Replacement";
import { useStudents } from "./hooks/useStudents";
import { Dashboard } from "./components/Dashboard";

import { createStudentService } from "./services/studentService";
import { v4 as uuidv4 } from "uuid";

import { createIcons, icons } from "lucide";

import "./styles/global.css";

export function App() {
  const { students, setStudents, repo } = useStudents();
  const [currentView, setCurrentView] = useState("dashboard");

  // ✅ availability centralizado (fonte única)
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
    {
      id: 3,
      date: "2026-02-11",
      period: "noturno",
      capacity: 30,
      occupied: 5,
    },
  ]);

  // ✅ Lucide: recria ícones quando troca de página
  useEffect(() => {
    createIcons({ icons });
  }, [currentView]);

  const studentService = useMemo(
    () => createStudentService({ repo, idGenerator: uuidv4 }),
    [repo],
  );

  const views = useMemo(
    () => ({
      dashboard: () => (
        <Dashboard students={students} availability={availability} />
      ),
      students: () => (
        <StudentList setStudents={setStudents} students={students} />
      ),
      form: () => <StudentForm studentService={studentService} />,
      replacement: () => (
        <Replacement
          students={students}
          availability={availability}
          setAvailability={setAvailability}
        />
      ),
    }),
    [students, setStudents, studentService, availability],
  );

  const renderContent = views[currentView] || views.dashboard;

  return (
    <MainTemplate onNavigate={setCurrentView} currentPage={currentView}>
      {renderContent()}
    </MainTemplate>
  );
}
