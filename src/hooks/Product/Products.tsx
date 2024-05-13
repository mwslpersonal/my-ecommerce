import { useQuery } from "@tanstack/react-query";
import { Product } from "@/models";

export const useProducts = () =>
  useQuery<Product[]>({
    queryKey: ["product"],
    queryFn: () => JSON.parse(window.localStorage.getItem("stocks") ?? "[]"),
  });
