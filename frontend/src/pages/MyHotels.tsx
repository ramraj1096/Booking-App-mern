import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import * as apiClient from "../api-client"
import { BsBuilding, BsMap } from "react-icons/bs"
import { BiHotel, BiMoney, BiStar } from "react-icons/bi"

const MyHotels = () => {
    
    const {data: hotelData} = useQuery("fetchMyHotels", apiClient.fetchMyHotels, {
        onError: ()=> {

        }
    })

    if (!hotelData) {
        return <span>
            <div className="flex items-center justify-center text-gray-800"> 
                    <h1 className="text-3xl font-bold">
                        No Hotels Found
                    </h1>
            </div>
        </span>
    }
  return (
    <div className="px-16 space-y-5">
        <span className="flex justify-between">
            {
                hotelData.length == 0? <h1 className="text-3xl font-bold pb-3 text-gray-600">No Hotels Found</h1> :
                <h1 className="text-3xl font-bold pb-3">My Hotels</h1>
            }
            <Link 
                to={"/add-hotel"}
                className="flex justify-center bg-indigo-600 text-white text-xl font-bold p-2 hover:bg-indigo-500"
                >
                Add New Hotel
            </Link>
        </span>
        <div className="grid grid-cols-1 gap-8">
            {hotelData.map((hotel)=> (
                <div className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
                    <h2 className="text-2xl font-bold">{hotel.name}</h2>
                    <div className="text-gray-500 whitespace-pre-line ">
                        {hotel.description}
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                            <BsMap className="mr-2"/>
                            {hotel.city}, {hotel.country}
                        </div>
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                            <BsBuilding className="mr-2"/>
                            {hotel.type}
                        </div>
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                            <BiMoney className="mr-2"/>
                             {hotel.pricePerNight.toLocaleString('en-US', {
                                                                      style: 'currency',
                                                                      currency: 'INR',
                                                                    })} per night
                        </div>
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                            <BiHotel className="mr-2"/>
                            {hotel.adultCount} adults, {hotel.childCount} children
                        </div>
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                            <BiStar className="mr-2"/>
                            {hotel.starRating}
                        </div>
                    </div>

                    <span className="flex justify-end">
                        <Link 
                            to={`/edit-hotel/${hotel._id}`}
                            className="flex justify-center bg-indigo-600 text-white text-xl font-bold p-2 hover:bg-indigo-500"
                            >
                            View Details
                        </Link>
                    </span>                    
                </div>
            ))}
        </div>
    </div>
  )
}
export default MyHotels