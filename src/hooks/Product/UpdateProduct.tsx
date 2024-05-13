import { Product } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["product"],
    mutationFn: (data: Product) => {
      const stock = JSON.parse(
        window.localStorage.getItem("stocks") ?? "[]"
      ) as Product[];
      const productIndex = stock.findIndex((product) => product.id === data.id);
      if (productIndex === -1) Promise.reject(false);

      stock[productIndex] = data;
      window.localStorage.setItem("stocks", JSON.stringify(stock));
      return Promise.resolve(stock);
    },
    onSuccess: (data: Product[]) => {
      queryClient.setQueryData(["product"], data);
    },
  });
};
