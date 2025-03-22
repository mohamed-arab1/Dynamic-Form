import React from "react";

interface SubmittedDataTableProps {
  submittedData: { [key: number]: string };
  properties: { id: number; name: string }[];
}

const SubmittedDataTable: React.FC<SubmittedDataTableProps> = ({ submittedData, properties }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-2">Submitted Data</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Property</th>
            <th className="border p-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(submittedData).map(([key, value]) => (
            <tr key={key}>
              <td className="border p-2">{properties.find(p => p.id === Number(key))?.name || key}</td>
              <td className="border p-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmittedDataTable;
