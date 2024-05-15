import { Kit } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteKit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["kits"],
    mutationFn: (id: string) => {
      if (!id) return Promise.reject(false);

      const kits = JSON.parse(
        window.localStorage.getItem("kits") ?? "[]"
      ) as Kit[];

      if (!kits.length) return Promise.reject(false);

      const newKits = kits.filter((kit) => kit.id !== id);
      window.localStorage.setItem("kits", JSON.stringify(newKits));
      return Promise.resolve(newKits);
    },
    onSuccess: (kits: Kit[]) => {
      queryClient.setQueryData(["kits"], kits);
    },
  });
};
