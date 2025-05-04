import { getBookedDatesByCabinId, getCabin } from "@/app/_library/data-service";

//Creating an API endpoint with route handlers
export async function GET(request, { params }) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}
//export async function POST() {}
