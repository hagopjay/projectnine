import React, { useState } from 'react';
import { formatJSON } from '../utils/formatJSON';

interface JSONInputProps {
  onJSONSubmit: (data: any) => void;
}

export const JSONInput: React.FC<JSONInputProps> = ({ onJSONSubmit }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    try {
      const parsedJSON = JSON.parse(jsonInput);
      const formattedData = formatJSON(parsedJSON);
      onJSONSubmit(formattedData);
      setError('');
    } catch (err) {
      setError('Invalid JSON format');
      console.error(err);
    }
  };

  return (
    <div className="absolute bottom-4 left-4 right-4 bg-black/80 p-4 rounded-lg z-10">
      <div className="flex flex-col gap-4">
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Paste your JSON here..."
          className="w-full h-40 bg-gray-800 text-white p-4 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setJsonInput('')}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
          >
            Update Graph
          </button>
        </div>
      </div>
    </div>
  );
};