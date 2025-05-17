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
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="p-6 max-w-full sm:max-w-3xl md:max-w-4xl mx-auto w-full">
        <h1 className="text-2xl sm:text-3xl font-bold mb-10 text-center">CPU Scheduling Simulator</h1>

        <div className="mb-4">
          <label htmlFor="algorithm" className="mr-2 font-semibold">Select Algorithm:</label>
          <select
            id="algorithm"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="border px-2 py-1 text-white bg-gray-700 rounded"
          >
            <option value="fcfs">FCFS (First Come First Serve)</option>
            <option value="sjf">SJF (Shortest Job First)</option>
          </select>
        </div>

        <ProcessInput onSubmit={handleSimulate} />

        {simulation.results.length > 0 && (
          <>
            <div className="mt-6 overflow-x-auto">
              <h2 className="text-xl font-semibold mb-2">Gantt Chart</h2>
              <div className="flex flex-wrap gap-1 justify-start">
                {simulation.results.map((r, i) => (
                  <div
                    key={i}
                    className="border px-3 py-2 bg-white text-black text-xs sm:text-sm flex flex-col items-center min-w-[50px]"
                  >
                    <span>{r.pid}</span>
                    <span className="text-[10px] sm:text-xs">
                      {r.start} - {r.end}
                    </span>
                  </div>
                ))}
              </div>

              <h2 className="mt-4 text-xl font-semibold">Process Stats</h2>
              <div className="overflow-x-auto">
                <table className="w-full border border-collapse text-sm sm:text-base">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">PID</th>
                      <th className="border px-2 py-1">Arrival Time</th>
                      <th className="border px-2 py-1">Burst Time</th>
                      <th className="border px-2 py-1">Completion Time</th>
                      <th className="border px-2 py-1">Waiting Time</th>
                      <th className="border px-2 py-1">Turnaround Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {simulation.results.map((r, i) => (
                      <tr key={i} className="text-center border-t">
                        <td className="border px-2 py-1">{r.pid}</td>
                        <td className="border px-2 py-1">{r.arrival}</td>
                        <td className="border px-2 py-1">{r.burst}</td>
                        <td className="border px-2 py-1">{r.end}</td>
                        <td className="border px-2 py-1">{r.waiting}</td>
                        <td className="border px-2 py-1">{r.turnaround}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 text-sm sm:text-base">
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
