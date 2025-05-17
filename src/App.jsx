import { useState } from "react";
import ProcessInput from "./components/ProcessInput";
import fcfs from "./algorithms/fcfs";
import sjf from "./algorithms/sjf";

function App() {
  const [simulation, setSimulation] = useState({ results: [], avgTAT: 0, avgWT: 0, L: 0, throughput: 0 });
  const [algorithm, setAlgorithm] = useState("fcfs");

  const handleSimulate = (processes) => {
    let res;
    if (algorithm === "fcfs") {
      res = fcfs(processes);
    } else if (algorithm === "sjf") {
      res = sjf(processes);
    }
    setSimulation(res);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-10 text-center">CPU Scheduling Simulator</h1>

        <div className="mb-4">
          <label htmlFor="algorithm" className="mr-2 font-semibold">Select Algorithm:</label>
          <select
            id="algorithm"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="border px-2 py-1 text-white"
          >
            <option value="fcfs">FCFS (First Come First Serve)</option>
            <option value="sjf">SJF (Shortest Job First)</option>
          </select>
        </div>

        <ProcessInput onSubmit={handleSimulate} />

        {simulation.results.length > 0 && (
          <>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Gantt Chart</h2>
              <div className="flex gap-1">
                {simulation.results.map((r, i) => (
                  <div key={i} className="border px-4 py-2 bg-white text-black">
                    {r.pid}
                    <div className="text-xs">
                      {r.start} - {r.end}
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="mt-4 text-xl font-semibold">Process Stats</h2>
              <table className="w-full border mt-2">
                <thead>
                  <tr>
                    <th>PID</th>
                    <th>Arrival Time</th>
                    <th>Burst Time</th>
                    <th>Completion Time</th>
                    <th>Waiting Time</th>
                    <th>Turnaround Time</th>
                  </tr>
                </thead>
                <tbody>
                  {simulation.results.map((r, i) => (
                    <tr key={i} className="text-center border-t">
                      <td>{r.pid}</td>
                      <td>{r.arrival}</td>
                      <td>{r.burst}</td>
                      <td>{r.end}</td>
                      <td>{r.waiting}</td>
                      <td>{r.turnaround}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Performance Metrics</h2>
              <p>Average Turnaround Time: {simulation.avgTAT.toFixed(2)}</p>
              <p>Average Waiting Time: {simulation.avgWT.toFixed(2)}</p>
              <p>Scheduling Length (L): {simulation.L.toFixed(2)}</p>
              <p>Throughput: {simulation.throughput.toFixed(2)}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
