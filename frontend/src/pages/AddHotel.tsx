import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppCOntext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";

const AddHotel = () => {
  const navigate = useNavigate();
  const { showToast } = useAppCOntext();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel added successfully!", type: "SUCCESS" });
      navigate("/my-hotels")
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <>
        <h1 className="text-3xl px-16 font-bold mb-3">
            Add Hotel
        </h1>
    <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
  
  </>;
};

export default AddHotel;