import React, { useState } from "react";

export default function ProcessInput({ onSubmit }) {
  const [processes, setProcesses] = useState([]);
  const [process, setProcess] = useState({ pid: "", arrival: "", burst: "" });

  const addProcess = () => {
    setProcesses([...processes, process]);
    setProcess({ pid: "", arrival: "", burst: "" });
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Enter Process Details</h2>
      <div className="flex gap-2 mb-2">
        <input
          className="border px-2 py-1"
          placeholder="PID"
          value={process.pid}
          onChange={(e) => setProcess({ ...process, pid: e.target.value })}
        />
        <input
          className="border px-2 py-1"
          type="number"
          placeholder="Arrival Time"
          value={process.arrival}
          onChange={(e) => setProcess({ ...process, arrival: +e.target.value })}
        />
        <input
          className="border px-2 py-1"
          type="number"
          placeholder="Burst Time"
          value={process.burst}
          onChange={(e) => setProcess({ ...process, burst: +e.target.value })}
        />
        <button className="bg-blue-500 text-white px-4" onClick={addProcess}>
          Add
        </button>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Processes:</h3>
        <ul>
          {processes.map((p, i) => (
            <li key={i}>{`${p.pid} - AT: ${p.arrival}, BT: ${p.burst}`}</li>
          ))}
        </ul>
      </div>

      <button
        className="mt-4 bg-green-500 text-white px-4 py-1"
        onClick={() => onSubmit(processes)}
      >
        Simulate
      </button>
    </div>
  );
}
