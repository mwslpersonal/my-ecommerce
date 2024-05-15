import { Product } from "@/models";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["product"],
    mutationFn: (stock: Product) => {
      let stocks = JSON.parse(
        window.localStorage.getItem("stocks") || "[]"
      ) as Product[];
      stocks.push(stock);
      window.localStorage.setItem("stocks", JSON.stringify(stocks));
      return Promise.resolve(stocks);
    },
    onSuccess: (data: Product[]) => {
      queryClient.setQueryData(["product"], data);
    },
  });
};
