export function SelectInput({
  label,
  id,
  value,
  onChange,
  options,
  required = false,
}) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label} *</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
