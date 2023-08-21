import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  // get params for API-side filtering
  const [searchParams] = useSearchParams();

  // FILTER (server side)
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // { field: "totalPrice", value: 5000, method: "gte" };

  // SORT (server side)
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getBookings({ filter, sortBy }),
    queryKey: ["bookings", filter, sortBy], // add "dependencies" to re-fetch
  });

  return { isLoading, bookings, error };
}
