import { Kit } from "@/models";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useKits: () => UseQueryResult<Kit[], Error> = () =>
  useQuery({
    queryKey: ["kits"],
    queryFn: () => {
      const kits = window.localStorage.getItem("kits");
      return JSON.parse(kits ?? "[]") as Kit[];
    },
  });
