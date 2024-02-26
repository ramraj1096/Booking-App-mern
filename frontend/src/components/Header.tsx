import {Link} from 'react-router-dom'
import { useAppCOntext } from '../contexts/AppContext';
import SignOutButton from './SignOutButton';

const Header = () =>{
    const {isLoggedIn} = useAppCOntext();
    return <div className="bg-indigo-600 px-16 py-6">
        <div className="container mx-auto flex justify-between">
            <span className="text-3xl text-white font-bold tracking-tight">
                <Link to="/">HoliDays For You</Link>
            </span>

            <span className='flex space-x-2'>
                {
                    isLoggedIn ? <>
                        <Link 
                            to={"/my-bookings"}
                            className='flex items-center bg-gray-50 text-indigo-600 font-bold px-3 hover:bg-gray-300 hover:text-gray-600'
                            >
                                My Bookings
                        </Link>
                        <Link 
                            to={"/my-hotels"}
                            className='flex items-center bg-gray-50 text-indigo-600 font-bold px-3 hover:bg-gray-300 hover:text-gray-600'
                        >
                            My Hotels
                        </Link>
                        <SignOutButton/>
                                </> : 
                        
                        <>  
                            <Link 
                                 to="/register" 
                                 className='flex items-center bg-gray-50 text-indigo-600 font-bold px-3 hover:bg-gray-300 hover:text-gray-600'
                                >
                                 Sign Up
                            </Link>
                            <Link 
                                to="/sign-in" 
                                className='flex items-center bg-gray-50 text-indigo-600 font-bold px-3 hover:bg-gray-300 hover:text-gray-600'
                             >
                                Sign In
                            </Link>

                        </>
                }                
            </span>
        </div>
    </div>
}

export default Header;