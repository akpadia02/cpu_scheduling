import React, { useState } from "react";

export default function ProcessInput({ onSubmit }) {
  const [processes, setProcesses] = useState([]);
  const [process, setProcess] = useState({ pid: "", arrival: "", burst: "" });

  const addProcess = () => {
    if (
      process.pid.trim() === "" ||
      process.arrival === "" ||
      process.burst === ""
    ) {
      alert("Please fill all fields before adding a process.");
      return;
    }
    setProcesses([...processes, process]);
    setProcess({ pid: "", arrival: "", burst: "" });
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">Enter Process Details</h2>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          className="border rounded px-3 py-2 w-full sm:w-24 text-white"
          placeholder="PID"
          value={process.pid}
          onChange={(e) => setProcess({ ...process, pid: e.target.value })}
        />
        <input
          className="border rounded px-3 py-2 w-full sm:w-32 text-white"
          type="number"
          min={0}
          placeholder="Arrival Time"
          value={process.arrival}
          onChange={(e) => setProcess({ ...process, arrival: +e.target.value })}
        />
        <input
          className="border rounded px-3 py-2 w-full sm:w-32 text-white"
          type="number"
          min={1}
          placeholder="Burst Time"
          value={process.burst}
          onChange={(e) => setProcess({ ...process, burst: +e.target.value })}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 text-white w-full sm:w-auto"
          onClick={addProcess}
          type="button"
        >
          Add
        </button>
      </div>

      <div className="mt-4 max-h-40 overflow-auto border rounded p-2 bg-gray-700 text-white">
        <h3 className="font-semibold mb-2">Processes:</h3>
        {processes.length === 0 ? (
          <p className="text-sm italic">No processes added yet.</p>
        ) : (
          <ul className="list-disc list-inside space-y-1 text-sm">
            {processes.map((p, i) => (
              <li key={i}>{`${p.pid} - AT: ${p.arrival}, BT: ${p.burst}`}</li>
            ))}
          </ul>
        )}
      </div>

      <button
        className="mt-6 bg-green-600 hover:bg-green-700 rounded px-6 py-2 text-white w-full sm:w-auto block mx-auto sm:mx-0"
        onClick={() => onSubmit(processes)}
        type="button"
        disabled={processes.length === 0}
      >
        Simulate
      </button>
    </div>
  );
}
