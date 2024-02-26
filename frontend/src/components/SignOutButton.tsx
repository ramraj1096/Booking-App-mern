import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client';
import { useAppCOntext } from "../contexts/AppContext";

const SignOutButton = () => {
    const queryClient = useQueryClient();
    const {showToast} = useAppCOntext();
    
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async()=> {
            await queryClient.invalidateQueries("validateToken");
            showToast({message: "Logged Out Successfully", type: "SUCCESS"})
        },

        onError: (error: Error) => {
            showToast({message: error.message, type: "ERROR"})
        }
    });

    const handleClick = () => {
        mutation.mutate();
    }
  return (
    <button 
        onClick={handleClick}
        className='flex items-center bg-gray-50 text-indigo-600 font-bold px-3 hover:bg-gray-300 hover:text-gray-600'>
        Sign Out
    </button>
  )
}

export default SignOutButton;