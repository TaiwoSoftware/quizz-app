interface InputProps {
  type: string;
  value: string;
  placeholder?: string;
  id?: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input = ({
  type,
  value,
  placeholder,
  handleOnChange,
  id,
}: InputProps) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={handleOnChange}
      required
      className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  );
};

export default Input;
