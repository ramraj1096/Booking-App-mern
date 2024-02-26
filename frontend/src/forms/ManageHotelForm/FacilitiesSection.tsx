import { hotelFacilities } from "../../config/hotel-options-config"
import { HotelFormData } from "./ManageHotelForm"
import { useFormContext } from "react-hook-form";

const FacilitiesSection = () => {
    const {register,
            formState: {errors}
    } = useFormContext<HotelFormData>();
  return (
    <div className="px-16">
        <h2 className="text-2xl font-bold mb-3">Facilities</h2>

        <div className="grid grid-cols-5 gap-3">
            {hotelFacilities.map((facility)=> (
                <label  className="flex-sm flex gap-1 text-gray-700">
                    <input type="checkbox" value ={facility} {...register("facilities", {
                        validate: (facilities)=>{
                            if (facilities && facilities.length >0) {
                                return true
                            }
                            else {
                                return "Atleast one facility is required";
                            }
                        }
                    })}/>
                    {facility}
                </label>
            ))}
        </div>
        {errors.facilities && (
            <span className="text-red-500 text-sm font-bold">
                {errors.facilities.message}
            </span>
        )}
    </div>
  )
}

export default FacilitiesSection;