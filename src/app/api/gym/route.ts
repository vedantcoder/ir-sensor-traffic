let gymOccupancy = 0;

export async function GET() {
  return Response.json({ occupancy: gymOccupancy });
}

export async function POST(req: Request) {
  const { direction } = await req.json();

  if (direction === "in") gymOccupancy++;
  else if (direction === "out" && gymOccupancy > 0) gymOccupancy--;

  return Response.json({ occupancy: gymOccupancy });
}
