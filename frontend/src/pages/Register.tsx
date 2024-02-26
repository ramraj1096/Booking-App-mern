import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as apiCLient from "../api-client"
import { useAppCOntext } from "../contexts/AppContext";

export type RegisterFormData = {
    firstName : string;
    lastName: string;
    email: string;
    password: string;
    conformPassword: string;
}

const Register = () => {
    const queryClient = useQueryClient();

    const navigate = useNavigate();
    const {showToast} = useAppCOntext();
 
    const {
        register, 
        watch,
        handleSubmit, 
        formState: {errors}
    } = useForm<RegisterFormData>();

    const mutation = useMutation(apiCLient.register, {
        onSuccess: async() => {
            showToast({message : "user registered successfully", type: "SUCCESS"});
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },

        onError: (error:Error) =>{
            showToast({message : error.message, type: "ERROR"});
        }
    });
    const onSubmit = handleSubmit((data)=>{
        mutation.mutate(data);
    })


  return (
    <form className="flex flex-col gap-5 px-16 " onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Create an Account</h2>
        <div className="flex flex-col md:flex-row gap-5 ">
            <label className="text-gray-700 text-sm font-bold flex-1">
                First Name
                <input className="border rounded w-full py-1 px-2 font-normal " 
                        {...register("firstName", {required: "this field is required"})}>
                </input>
                {errors.firstName && (
                    <span className="text-red-500">{errors.firstName.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Last Name
                <input className="border rounded w-full py-1 px-2 font-normal"
                    {...register("lastName", {required: "this field is required"})}>
                </input>
                {errors.lastName && (
                    <span className="text-red-500">{errors.lastName.message}</span>
                )}
            </label>
        </div>

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

        <label className="text-gray-700 text-sm font-bold flex-1">
             Confirm Password
             <input 
                type="password" 
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("conformPassword", {
                    validate: (val) => {
                        if (!val) {
                            return "This field is required"
                        }
                        else if(watch("password") !== val) {
                            return "Password do not match"
                        }
                    }
                })}
                placeholder="******************"
                ></input>
                {errors.conformPassword && (
                    <span className="text-red-500">{errors.conformPassword.message}</span>
                )}
        </label>
        <span className="flex items-center justify-between">
            <p className=" text-gray-600">Already have an account ? <Link to={"/sign-in"} className="text-black underline hover:underline hover:text-indigo-600">Sign in here</Link></p>

            
                <button
                    type="submit"
                    className=" bg-indigo-600 hover:bg-green-700 text-white font-bold p-2 px-4 text-xl">
                    Create Account
                </button>
        </span>
    </form>
  )
}

export default Register;