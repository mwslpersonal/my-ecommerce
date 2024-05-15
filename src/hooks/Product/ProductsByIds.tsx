import { Product } from "@/models";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useProductsByIds: (
  ids: string[]
) => UseQueryResult<Product[], Error> = (ids?: string[]) => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => {
      const stock = JSON.parse(
        window.localStorage.getItem("stocks") ?? "[]"
      ) as Product[];
      return stock.filter((product) => ids?.includes(product.id!)) ?? [];
    },
    staleTime: 0,
  });
};
