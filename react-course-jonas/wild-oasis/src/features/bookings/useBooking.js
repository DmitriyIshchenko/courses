import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { bookingId } = useParams();
  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getBooking(bookingId),
    queryKey: ["booking", bookingId],
    retry: false, // by default will fetch 3 times
  });

  return { booking, isLoading, error };
}
