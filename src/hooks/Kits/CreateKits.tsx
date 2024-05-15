import { Kit } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateKit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["kits"],
    mutationFn: (kit: Kit) => {
      const kits = JSON.parse(window.localStorage.getItem("kits") ?? "[]");
      window.localStorage.setItem("kits", JSON.stringify([...kits, kit]));
      return Promise.resolve([...kits, kit]);
    },
    onSuccess: (kits: Kit[]) => queryClient.setQueryData(["kits"], kits),
  });
};
