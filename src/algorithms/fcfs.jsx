// // export default function fcfs(processes) {
// //   const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);
// //   let time = 0;
// //   let results = [];

// //   for (let p of sorted) {
// //     if (time < p.arrival) time = p.arrival;
// //     const start = time;
// //     const end = start + p.burst;
// //     time = end;
// //     results.push({
// //       pid: p.pid,
// //       start,
// //       end,
// //       waiting: start - p.arrival,
// //       turnaround: end - p.arrival,
// //     });
// //   }

// //   return results;
// // }
// export default function fcfs(processes) {
//   const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);
//   let time = 0;
//   let results = [];

//   for (let p of sorted) {
//     if (time < p.arrival) time = p.arrival;
//     const start = time;
//     const end = start + p.burst;
//     time = end;
//     results.push({
//       pid: p.pid,
//       arrival: p.arrival,  // Include arrival time
//       burst: p.burst,      // Include burst time
//       start,
//       end,
//       waiting: start - p.arrival,
//       turnaround: end - p.arrival,
//     });
//   }

//   return results;
// }

export default function fcfs(processes) {
  const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);
  let time = 0;
  let results = [];
  let totalWaiting = 0;
  let totalTurnaround = 0;
  let maxCT = 0;
  let maxAT = 0;

  for (let p of sorted) {
    if (time < p.arrival) time = p.arrival;
    const start = time;
    const end = start + p.burst;
    time = end;
    const waiting = start - p.arrival;
    const turnaround = end - p.arrival;

    maxCT = Math.max(maxCT, end);
    maxAT = Math.max(maxAT, p.arrival);

    totalWaiting += waiting;
    totalTurnaround += turnaround;

    results.push({
      pid: p.pid,
      arrival: p.arrival,
      burst: p.burst,
      start,
      end,
      waiting,
      turnaround,
    });
  }

  const n = processes.length;
  const avgWT = totalWaiting / n;
  const avgTAT = totalTurnaround / n;
  const L = maxCT - maxAT;
  const throughput = n / L;

  return { results, avgWT, avgTAT, L, throughput };
}
