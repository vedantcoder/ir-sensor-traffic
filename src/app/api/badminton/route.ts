let totalOccupancy = 0;
let court1InUse = false;
let court2InUse = false;

const lastTrigger: Record<"gate1" | "gate2", string | null> = {
  gate1: null,
  gate2: null,
};

// Timeout for gate sequences (10 seconds)
const GATE_TIMEOUT_MS = 10000;
const gateTimeouts: Record<"gate1" | "gate2", NodeJS.Timeout | null> = {
  gate1: null,
  gate2: null,
};

// Reset gate sequence after timeout
function resetGateSequence(gate: "gate1" | "gate2") {
  if (lastTrigger[gate]) {
    console.log(
      `⏰ Gate ${
        gate === "gate1" ? "1" : "2"
      }: Sequence timeout, resetting from ${lastTrigger[gate]}`
    );
    lastTrigger[gate] = null;
  }
  if (gateTimeouts[gate]) {
    clearTimeout(gateTimeouts[gate]!);
    gateTimeouts[gate] = null;
  }
}

// Set timeout for gate sequence
function setGateTimeout(gate: "gate1" | "gate2") {
  // Clear existing timeout
  if (gateTimeouts[gate]) {
    clearTimeout(gateTimeouts[gate]!);
  }

  // Set new timeout
  gateTimeouts[gate] = setTimeout(
    () => resetGateSequence(gate),
    GATE_TIMEOUT_MS
  );
}

export async function GET() {
  return Response.json({
    total: totalOccupancy,
    court1: court1InUse,
    court2: court2InUse,
  });
}

export async function POST(req: Request) {
  const { action, sensor, court } = await req.json();

  // Toggle court occupancy
  if (action === "toggleCourt") {
    if (court === 1) court1InUse = !court1InUse;
    else if (court === 2) court2InUse = !court2InUse;
  }

  // Reset gate sequences
  if (action === "resetGates") {
    console.log("🔄 Manual reset of all gate sequences");
    resetGateSequence("gate1");
    resetGateSequence("gate2");
  }

  // Manual occupancy reset
  if (action === "resetOccupancy") {
    console.log("🔄 Manual reset of occupancy count");
    totalOccupancy = 0;
    resetGateSequence("gate1");
    resetGateSequence("gate2");
  }

  // Handle gate triggers
  if (action === "triggerSensor") {
    console.log(
      `Sensor triggered: ${sensor}, Gate 1 last: ${lastTrigger.gate1}, Gate 2 last: ${lastTrigger.gate2}`
    );

    // Gate 1 sensors (A1, B1)
    if (sensor === "A1" || sensor === "B1") {
      const last = lastTrigger.gate1;

      // Valid entry sequence: A1 → B1
      if (last === "A1" && sensor === "B1") {
        totalOccupancy++;
        console.log(
          `✅ Gate 1: Entry detected (A1→B1), total: ${totalOccupancy}`
        );
        resetGateSequence("gate1"); // Complete sequence, reset
      }
      // Valid exit sequence: B1 → A1
      else if (last === "B1" && sensor === "A1" && totalOccupancy > 0) {
        totalOccupancy--;
        console.log(
          `✅ Gate 1: Exit detected (B1→A1), total: ${totalOccupancy}`
        );
        resetGateSequence("gate1"); // Complete sequence, reset
      }
      // Same sensor triggered twice - reset and start new sequence
      else if (last === sensor) {
        console.log(
          `⚠️ Gate 1: Same sensor ${sensor} triggered twice - starting new sequence`
        );
        resetGateSequence("gate1");
        lastTrigger.gate1 = sensor;
        setGateTimeout("gate1");
      }
      // Different starting sensor or first sensor - start new sequence
      else {
        console.log(`🔄 Gate 1: New sequence started with ${sensor}`);
        resetGateSequence("gate1");
        lastTrigger.gate1 = sensor;
        setGateTimeout("gate1");
      }
    }

    // Gate 2 sensors (A2, B2)
    if (sensor === "A2" || sensor === "B2") {
      const last = lastTrigger.gate2;

      // Valid entry sequence: A2 → B2
      if (last === "A2" && sensor === "B2") {
        totalOccupancy++;
        console.log(
          `✅ Gate 2: Entry detected (A2→B2), total: ${totalOccupancy}`
        );
        resetGateSequence("gate2"); // Complete sequence, reset
      }
      // Valid exit sequence: B2 → A2
      else if (last === "B2" && sensor === "A2" && totalOccupancy > 0) {
        totalOccupancy--;
        console.log(
          `✅ Gate 2: Exit detected (B2→A2), total: ${totalOccupancy}`
        );
        resetGateSequence("gate2"); // Complete sequence, reset
      }
      // Same sensor triggered twice - reset and start new sequence
      else if (last === sensor) {
        console.log(
          `⚠️ Gate 2: Same sensor ${sensor} triggered twice - starting new sequence`
        );
        resetGateSequence("gate2");
        lastTrigger.gate2 = sensor;
        setGateTimeout("gate2");
      }
      // Different starting sensor or first sensor - start new sequence
      else {
        console.log(`🔄 Gate 2: New sequence started with ${sensor}`);
        resetGateSequence("gate2");
        lastTrigger.gate2 = sensor;
        setGateTimeout("gate2");
      }
    }

    // Handle invalid cross-gate sequences and provide better warnings
    const gate1Active = lastTrigger.gate1 !== null;
    const gate2Active = lastTrigger.gate2 !== null;

    if ((sensor === "A1" || sensor === "B1") && gate2Active && !gate1Active) {
      console.log(
        `⚠️ Cross-gate activity: Gate 2 has pending sequence (${lastTrigger.gate2}) while Gate 1 triggered (${sensor})`
      );
    }
    if ((sensor === "A2" || sensor === "B2") && gate1Active && !gate2Active) {
      console.log(
        `⚠️ Cross-gate activity: Gate 1 has pending sequence (${lastTrigger.gate1}) while Gate 2 triggered (${sensor})`
      );
    }

    // Detect potential simultaneous gate usage
    if (gate1Active && gate2Active) {
      console.log(
        `🚦 Both gates active: Gate 1 (${lastTrigger.gate1}), Gate 2 (${lastTrigger.gate2}), Current: ${sensor}`
      );
    }
  }

  return Response.json({
    total: totalOccupancy,
    court1: court1InUse,
    court2: court2InUse,
  });
}
