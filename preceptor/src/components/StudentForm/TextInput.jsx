export function TextInput({
  label,
  id,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
}) {
  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label} {required ? "*" : ""}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}
