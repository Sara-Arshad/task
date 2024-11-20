import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

interface Category {
  id: string | number;
  name: string;
  image: string;
  price: string;
  service: string;
}

const fetchAllCategories = async (): Promise<Category[]> => {
  const response = await axiosInstance.get("/categories/all");
  return response.data;
};

const addSingleCategory = async (
  categoryData: Omit<Category, "id">
): Promise<Category> => {
  const response = await axiosInstance.post("/categories/add", categoryData);
  return response.data;
};

const updateCategory = async (categoryData: Category): Promise<Category> => {
  const response = await axiosInstance.put(
    `/categories/update/${categoryData.id}`,
    {
      name: categoryData.name,
      image: categoryData.image,
      price: categoryData.price,
    }
  );
  return response.data;
};

const deleteCategory = async (categoryId: string | number): Promise<void> => {
  await axiosInstance.delete(`/categories/delete/${categoryId}`);
};

export const useGetAllCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ["allCategories"],
    queryFn: fetchAllCategories,
  });
};

export const useAddSingleCategory = (p0: {
  onSuccess: () => void;
  onError: (error: unknown) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, Omit<Category, "id">>({
    mutationFn: addSingleCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCategories"] });
    },
    onError: (error) => {
      console.error("Error adding category:", error);
      if (p0.onError) p0.onError(error);
    },
  });
};

export const useUpdateCategory = (options?: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, Category>({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCategories"] });
      if (options?.onSuccess) options.onSuccess();
    },
    onError: (error) => {
      console.error("Error updating category:", error);
      if (options?.onError) options.onError(error);
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string | number>({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCategories"] });
    },
    onError: (error) => {
      console.error("Error deleting category:", error);
    },
  });
};
