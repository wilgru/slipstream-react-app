import { useQuery } from "@tanstack/react-query";
import { pb } from "src/pocketbase/utils/pocketbaseConfig";
import { mapCategory } from "../utils/mapCategory";
import type { Category } from "../types/Category.type";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";

type UseGetCategoriesResponse = {
  category: Category[];
  refetchCategories: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<Category[], Error>>;
};

export const useGetCategories = (): UseGetCategoriesResponse => {
  const queryFn = async (): Promise<Category[]> => {
    const rawCategories = await pb
      .collection("categoriesWithSlipCounts")
      .getList(undefined, undefined);

    const mappedCategories = rawCategories.items.map(mapCategory);

    return mappedCategories;
  };

  // TODO: consider time caching for better performance
  const { data, refetch } = useQuery({
    queryKey: ["category.list"],
    queryFn,
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return { category: data ?? [], refetchCategories: refetch };
};
