import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: (credentials) => loginApi(credentials),
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoggingIn };
}
