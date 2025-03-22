import React from "react";

interface DropdownProps {
  label: string;
  options: { id: number; name: string }[];
  value: number | null;
  onChange: (value: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, value, onChange }) => {
  return (
    <div className="mt-4">
      <label className="block mb-2 font-medium">{label}</label>
      <select
        className="w-full p-2 border rounded"
        onChange={(e) => onChange(Number(e.target.value))}
        value={value || ""}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>{option.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
