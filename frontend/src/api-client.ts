import { HotelSearchResponse, HotelType, PaymentIntentResponse, UserType } from "../../backend/src/shared/types";
import { BookingFormData } from "./forms/BookingForm/BookingForm";
import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async(): Promise<UserType> => {
    const responce = await fetch(`${API_BASE_URL}/api/users/me`, {
        credentials: "include"
    });

    if(!responce.ok) {
        throw new Error("Error fetching user");
    }
    
    return responce.json();
}

export const  register = async (formData:RegisterFormData) => {
    const responce = await fetch(`${API_BASE_URL}/api/users/register`, {
        method:'POST',
        credentials: "include",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    const responceBody = await responce.json();

    if(!responce.ok) {
        throw new Error(responceBody.message);
    }
};

export const SignIn = async (formData:SignInFormData) => {
    const responce = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    const body = await responce.json();

    if(!responce.ok) {
        throw new Error(body.message);
    }

    return body;
}

export const signOut = async() => {
    const responce = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST"
    });

    if (!responce.ok) {
        throw new Error("Error during signout");
    }
}

export const validateToken = async () => {
    const responce = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include" 
    })

    if (!responce.ok) {
        throw new Error ("Token invalid")
    }
    
    return responce.json();
}

export const addMyHotel = async (hotelFormData: FormData)=>{
    const responce = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData,
    });

    if(!responce.ok){
        throw new Error("Failed to add Hotel");
    }

    return responce.json();
}

export const fetchHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels`);
    if (!response.ok) {
      throw new Error("Error fetching hotels");
    }
    return response.json();
  };

export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const responce = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include"
    });

    if (!responce.ok) {
        throw new Error("Error Fetching Hotels");
    }
    
    return responce.json();
    
}

export const fetchMyHotelById =async (hotelId: string): Promise<HotelType> => {

    const responce = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        credentials: "include"
    });

    if(!responce.ok) {
        throw new Error("Error Fetching Hotels");
    }

    return responce.json();

}

export const updatedHotelById = async(hotelFormData: FormData)=>{
    const responce = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`, {
        method: "PUT",
        body:hotelFormData,
        credentials:"include"

    });

    if (!(await responce).ok) {
        throw new Error("Failed to update Hotel");
    }

    return responce.json();

}

export type SearchParams = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?: string;
    facilities?:string[];
    types?:string[];
    stars?:string[];
    maxPrice?:string;
    sortOption?:string;
}

export const SearchHotels = async (searchParams: SearchParams): Promise<HotelSearchResponse> =>{
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");

    queryParams.append("maxPrice",searchParams.maxPrice || "");
    queryParams.append("sortOption",searchParams.sortOption || "");


    searchParams.facilities?.forEach((facility)=> 
        queryParams.append("facilities", facility)
    );

    searchParams.types?.forEach((type)=>
    queryParams.append("types", type)
    );

    searchParams.stars?.forEach((star)=> 
        queryParams.append("stars", star)
    );


    const responce = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`);

    if (!responce.ok) {
        throw new Error("Error fetching hotels")
    }

    return responce.json();

}

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
    if (!response.ok) {
      throw new Error("Error fetching Hotels");
    }
  
    return response.json();
  };

  export const createPaymentIntent = async (
    hotelId: string,
    numberOfNights: string
  ): Promise<PaymentIntentResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
      {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ numberOfNights }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Error fetching payment intent");
    }
    return response.json();
  };

  export const createRoomBooking = async (formData: BookingFormData) => {
    const response = await fetch(
      `${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      }
    );
  
    if (!response.ok) {
      throw new Error("Error booking room");
    }
  };
  
  export const fetchMyBookings = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Unable to fetch bookings");
    }
  
    return response.json();
  };