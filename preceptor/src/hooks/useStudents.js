import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "student";

export function useStudents() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  // Repo (Repository Pattern)
  const repo = useMemo(() => {
    return {
      async findByRgm(rgm) {
        return (
          students.find((s) => String(s.rgm).trim() === String(rgm).trim()) ??
          null
        );
      },
      async existsByRgm(rgm) {
        return students.some(
          (s) => String(s.rgm).trim() === String(rgm).trim(),
        );
      },
      async create(student) {
        setStudents((prev) => [...prev, student]);
        return student;
      },
    };
  }, [students]);

  return { students, setStudents, repo };
}
