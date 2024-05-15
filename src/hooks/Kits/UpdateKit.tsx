import { Kit } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateKit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["kits"],
    mutationFn: (newKit: Kit) => {
      const kits = JSON.parse(
        window.localStorage.getItem("kits") ?? "[]"
      ) as Kit[];
      const kitIndex = kits.findIndex((kit) => kit.id === newKit.id);

      if (kitIndex === -1) return Promise.reject(false);

      kits[kitIndex] = newKit;
      window.localStorage.setItem("kits", JSON.stringify(kits));
      return Promise.resolve(kits);
    },
    onSuccess: (kits: Kit[]) => {
      queryClient.setQueryData(["kits", "product"], kits);
    },
  });
};
