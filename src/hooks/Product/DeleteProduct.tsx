import { Product } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["product"],
    mutationFn: (id: string) => {
      const stock = JSON.parse(
        window.localStorage.getItem("stocks") ?? "[]"
      ) as Product[];

      if (!stock.length) return Promise.reject(false);

      const newStock = stock.filter((product) => product.id !== id);
      window.localStorage.setItem("stocks", JSON.stringify(newStock));
      return Promise.resolve(newStock);
    },
    onSuccess: (data: Product[]) => {
      queryClient.setQueryData(["product"], data);
    },
  });
};
