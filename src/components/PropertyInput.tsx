import React from "react";

interface Property {
  id: number;
  name: string;
  type: string;
  options: { id: number; name: string }[];
}

interface PropertyInputProps {
  property: Property;
  value: string;
  onChange: (propertyId: number, value: string) => void;
}

const PropertyInput: React.FC<PropertyInputProps> = ({ property, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">{property.name}</label>
      {property.type === "list" ? (
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => onChange(property.id, e.target.value)}
          value={value || ""}
        >
          <option value="">Select an option</option>
          {property.options.map((opt) => (
            <option key={opt.id} value={opt.name}>{opt.name}</option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={value || ""}
          onChange={(e) => onChange(property.id, e.target.value)}
        />
      )}
    </div>
  );
};

export default PropertyInput;
