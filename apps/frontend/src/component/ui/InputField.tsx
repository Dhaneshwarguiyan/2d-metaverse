interface propType {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  label,
  type,
  name,
  value,
  placeholder,
  handler,
}: propType) => {
  return (
    <label htmlFor="email" className="flex flex-col gap-2 mb-3">
      {label}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handler}
        className="text-sm border py-2 px-2 rounded-lg text-gray-700"
      />
    </label>
  );
};

export default InputField;
