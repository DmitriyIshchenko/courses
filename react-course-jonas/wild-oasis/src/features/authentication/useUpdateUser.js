import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdatingUser } = useMutation({
    mutationFn: ({ password, fullName, avatar }) =>
      updateCurrentUser({ password, fullName, avatar }),
    onSuccess: ({ user }) => {
      // manually change cache
      queryClient.setQueryData(["user"], user);
      toast.success("User account successfully updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateUser, isUpdatingUser };
}
