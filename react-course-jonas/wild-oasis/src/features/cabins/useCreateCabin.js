import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      // show success message
      toast.success("New cabin successfully created");

      // invalidate cache to refetch
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });

      // manually reset form (only on success)
    },
    onError: (error) => toast.error(error.message),
  });

  return { createCabin, isCreating };
}
