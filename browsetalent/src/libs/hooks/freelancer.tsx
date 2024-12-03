import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { Freelancer } from "../../redux/slices/freelauncerSlice";

const fetchAllFreelancers = async (): Promise<Freelancer[]> => {
  const response = await axiosInstance.get("/freelancers/all");
  return response.data;
};

// const addSingleFreelancer = async (
//   freelancerData: Omit<Freelancer, "id">
// ): Promise<Freelancer> => {
//   const response = await axiosInstance.post("/freelancers/add", freelancerData);
//   return response.data;
// };

// // Update freelancer by id
// const updateFreelancer = async (
//   freelancerData: Freelancer
// ): Promise<Freelancer> => {
//   const response = await axiosInstance.put(
//     `/freelancers/${freelancerData.id}`,
//     freelancerData
//   );
//   return response.data;
// };

// // Delete a freelancer by id
// const deleteFreelancer = async (
//   freelancerId: string | number
// ): Promise<void> => {
//   await axiosInstance.delete(`/freelancers/${freelancerId}`);
// };
// Custom hook to get all freelancers
export const useGetAllFreelancers = () => {
  return useQuery<Freelancer[], Error>({
    queryKey: ["allFreelancers"],
    queryFn: fetchAllFreelancers,
  });
};

// export const useAddSingleFreelancer = (p0: {
//   onSuccess: () => void;
//   onError: (error: any) => void;
// }) => {
//   const queryClient = useQueryClient();

//   return useMutation<Freelancer, Error, Omit<Freelancer, "id">>({
//     mutationFn: addSingleFreelancer,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["allFreelancers"] });
//     },
//     onError: (error) => {
//       console.error("Error adding freelancer:", error);
//       if (p0.onError) p0.onError(error);
//     },
//   });
// };

// // Custom hook to update a freelancer
// export const useUpdateFreelancer = (options?: {
//   onSuccess?: () => void;
//   onError?: (error: any) => void;
// }) => {
//   const queryClient = useQueryClient();

//   return useMutation<Freelancer, Error, Freelancer>({
//     mutationFn: updateFreelancer,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["allFreelancers"] });
//       if (options?.onSuccess) options.onSuccess();
//     },
//     onError: (error) => {
//       console.error("Error updating freelancer:", error);
//       if (options?.onError) options.onError(error);
//     },
//   });
// };

// // Custom hook to delete a freelancer
// export const useDeleteFreelancer = (p0: {
//   onSuccess: () => void;
//   onError: (error: any) => void;
// }) => {
//   const queryClient = useQueryClient();

//   return useMutation<void, Error, string | number>({
//     mutationFn: deleteFreelancer,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["allFreelancers"] });
//     },
//     onError: (error) => {
//       console.error("Error deleting freelancer:", error);
//     },
//   });
// };
