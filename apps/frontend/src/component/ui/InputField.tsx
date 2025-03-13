interface propType {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors:isValidUserType
}
interface isValidUserType {
  [key: string]:null | string;
}

const InputField = ({
  label,
  type,
  name,
  value,
  placeholder,
  handler,
  errors
}: propType) => {
  return (
    <label htmlFor={name} className="flex flex-col gap-2 mb-3">
      {label}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handler}
        className="text-sm border py-2 px-2 rounded-lg text-gray-700"
      />
      {errors[name] && <div className="text-red-500 text-sm">{errors[name]}</div>}
    </label>
  );
};

export default InputField;
