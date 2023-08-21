import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  // get params for API-side filtering

  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // { field: "totalPrice", value: 5000, method: "gte" };

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getBookings({ filter }),
    queryKey: ["bookings", filter], // add "dependencies" to re-fetch
  });

  return { isLoading, bookings, error };
}
