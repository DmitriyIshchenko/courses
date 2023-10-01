import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();

  // get params for API-side filtering/sorting
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

  // PAGINATION (server side)
  const page = !searchParams.get("page") ? 1 : +searchParams.get("page");

  // QUERY
  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getBookings({ filter, sortBy, page }),
    queryKey: ["bookings", filter, sortBy, page], // add "dependencies" to re-fetch
  });

  // PRE-FETCHING (edge cases: first and last pages)

  const pageCount = Math.ceil(count / PAGE_SIZE);

  // pre-fetch the next page
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
      queryKey: ["bookings", filter, sortBy, page + 1], // add "dependencies" to re-fetch
    });

  // pre-fetch the prev page
  if (page > 1)
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
      queryKey: ["bookings", filter, sortBy, page - 1], // add "dependencies" to re-fetch
    });

  return { isLoading, bookings, error, count };
}
