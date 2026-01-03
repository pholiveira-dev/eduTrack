import { TextInput } from "./TextInput";
import { SelectInput } from "./SelectInput";

export function StudentFormFields({ student, setStudent }) {
  return (
    <>
      <TextInput
        label="Nome completo"
        id="name"
        placeholder="Ex: João da Silva"
        value={student.name}
        onChange={(value) =>
          setStudent((prev) => ({
            ...prev,
            name: value.toUpperCase(),
          }))
        }
        required
      />

      <TextInput
        label="RGM"
        id="rgm"
        placeholder="Ex: 123456"
        value={student.rgm}
        onChange={(value) =>
          setStudent((prev) => ({
            ...prev,
            rgm: value,
          }))
        }
        required
      />

      <SelectInput
        label="Turno"
        id="turno"
        value={student.turn}
        onChange={(value) =>
          setStudent((prev) => ({
            ...prev,
            turn: value,
          }))
        }
        required
        options={[
          { value: "", label: "Selecione..." },
          { value: "matutino", label: "Matutino" },
          { value: "vespertino", label: "Vespertino" },
          { value: "noturno", label: "Noturno" },
        ]}
      />

      <TextInput
        label="Grupo"
        id="grupo"
        placeholder="Ex: 1A"
        value={student.group}
        onChange={(value) =>
          setStudent((prev) => ({
            ...prev,
            group: value.toUpperCase(),
          }))
        }
        required
      />
    </>
  );
}
