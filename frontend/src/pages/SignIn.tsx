import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from '../api-client'
import { useAppCOntext } from "../contexts/AppContext";

export type SignInFormData = {
    email: string;
    password: string
}

const SignIn = () => {
    const queryClient = useQueryClient();

    const navigate = useNavigate();
    const {showToast} = useAppCOntext();

    const { 
        register,
        formState: {errors},
        handleSubmit
         } = useForm<SignInFormData>();

    const mutation = useMutation(apiClient.SignIn, {
        onSuccess: async () => {
            showToast({message : "user loggedin successfully", type: "SUCCESS"});
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
            
        },

        onError: (error:Error) =>{
            showToast({message : error.message, type: "ERROR"});
        }
    })

    const onSubmit = handleSubmit((data)=> {
        mutation.mutate(data);
    })

  return (
    <form className="flex flex-col  gap-5 px-16 " onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">
            Sign In
        </h2>

        <label className="text-gray-700 text-sm font-bold flex-1">
             Email
             <input 
                type="email" 
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("email", {required: "this field is required"})}
                ></input>
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
             Password
             <input 
                type="password" 
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("password", {required: "this field is required", 
                minLength:{
                    value:6,
                    message: "password should more or equal to 6 charectors"
                }})}
                placeholder="******************"
                
                ></input>
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
        </label> 
        <span className="flex items-center justify-between">
            <span 
                className=" text-gray-600">Don't have an account ? <Link to={"/register"} className="text-black underline hover:underline hover:text-indigo-600"
            >
                Create an Account here</Link>
            </span>
        
            <button     
                type = "submit"
                className="w-32 bg-indigo-600 hover:bg-green-700 text-white font-bold py-2 px-4 "
                >
                Sign In
            </button>
        </span>

    </form>
  )
}

export default SignIn;