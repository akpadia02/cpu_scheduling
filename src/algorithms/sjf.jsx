export default function sjfScheduling(processes) {
  const n = processes.length;
  let time = 0;
  let completed = 0;
  let isCompleted = new Array(n).fill(false);
  let result = [];
  let totalWaiting = 0;
  let totalTurnaround = 0;
  let maxCT = 0;
  let maxAT = 0;

  while (completed < n) {
    let idx = -1;
    let minBurst = Infinity;

    for (let i = 0; i < n; i++) {
      if (!isCompleted[i] && processes[i].arrival <= time) {
        if (processes[i].burst < minBurst) {
          minBurst = processes[i].burst;
          idx = i;
        } else if (
          processes[i].burst === minBurst &&
          processes[i].arrival < processes[idx].arrival
        ) {
          idx = i;
        }
      }
    }

    if (idx !== -1) {
      const start = time;
      const end = start + processes[idx].burst;
      const turnaround = end - processes[idx].arrival;
      const waiting = turnaround - processes[idx].burst;

      maxCT = Math.max(maxCT, end);
      maxAT = Math.max(maxAT, processes[idx].arrival);

      totalWaiting += waiting;
      totalTurnaround += turnaround;

      result.push({
        pid: processes[idx].pid,
        arrival: processes[idx].arrival,
        burst: processes[idx].burst,
        start,
        end,
        turnaround,
        waiting,
      });

      time = end;
      isCompleted[idx] = true;
      completed++;
    } else {
      time++; // CPU idle
    }
  }

  const avgWT = totalWaiting / n;
  const avgTAT = totalTurnaround / n;
  const L = maxCT - maxAT;
  const throughput = n / L;

  return { results: result, avgWT, avgTAT, L, throughput };
}
