import { Product } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["product"],
    mutationFn: (id: string) => {
      const stock = JSON.parse(window.localStorage.getItem("stocks") ?? "[]");
      if (!stock.length) return Promise.reject(false);

      const productIndex = stock.find((product: Product) => product.id === id);
      if (productIndex === -1) return Promise.reject(false);

      const newStock = stock.splice(productIndex, 1);
      window.localStorage.setItem("stocks", JSON.stringify(newStock));
      return Promise.resolve(newStock);
    },
    onSuccess: (data: Product[]) => {
      queryClient.setQueryData(["product"], data);
    },
  });
};
