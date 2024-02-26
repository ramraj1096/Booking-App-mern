import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppCOntext } from "../contexts/AppContext";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppCOntext();

  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }

  );

  const { mutate, isLoading } = useMutation(apiClient.updatedHotelById, {
    onSuccess: () => {

      showToast({ message: "Changes Saved Successfully!", type: "SUCCESS" });

    },
    onError: () => {

      showToast({ message: "Error Saving Hotel", type: "ERROR" });

    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <>
    <h1 className="text-3xl px-16 font-bold mb-3">
       Edit Hotel
    </h1>
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
    </>
  );
};

export default EditHotel;