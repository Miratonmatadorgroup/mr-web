const InputDisplay = ({ label, value }: InputDisplayProps) => {
  return (
    <div className="w-full flex flex-col gap-1 text-sm font-medium text-gray-700">
      <label className="block mb-1">{label}</label>
      <p className="text-gray-950 text-xl font-bold mb-1">{value}</p>
    </div>
  );
};

export default InputDisplay;

interface InputDisplayProps {
  label: string;
  value: string | number;
}
