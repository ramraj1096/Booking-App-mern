import {
  BrowserRouter as Router,
  Route,
  Routes,
  
} from "react-router-dom";
import Layout from './Layouts/layout'
import Register from "./pages/Register";
import Layout2 from "./Layouts/layoutforall";
import SignIn from "./pages/SignIn";
import { useAppCOntext } from "./contexts/AppContext";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";

const App = () => {
  const {isLoggedIn} = useAppCOntext();
  return (
    <Router>
      <Routes>
        <Route
          path='/' 
          element={
          <Layout>
            <Home/>
          </Layout>}
        />
        <Route
          path='/search' 
          element={
          <Layout>
            <Search/>
          </Layout>}
        />
        <Route
          path="/detail/:hotelId"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        />

        

        <Route 
          path='/sign-in' 
          element={
            <Layout2>
              <SignIn/>
            </Layout2>}
        />

        <Route 
          path='/register' 
          element={
            <Layout2>
              <Register/>
            </Layout2>}
        />

        {
          isLoggedIn && <>
            <Route 
            path='/add-hotel' 
            element={
              <Layout2>
                <AddHotel/>
              </Layout2>}
            />

            <Route 
            path='/my-hotels' 
            element={
              <Layout2>
                <MyHotels/>
              </Layout2>}
            />

            <Route 
              path={`/edit-hotel/:hotelId`} 
              element={
              <Layout2>
                <EditHotel/>
              </Layout2>}
            />

            <Route 
              path={`/hotel/:hotelId/booking`} 
              element={
              <Layout2>
                <Booking/>
              </Layout2>}
            />

              <Route
              path="/my-bookings"
              element={
                <Layout2>
                  <MyBookings />
                </Layout2>
              }
            />
          </>
        }



        <Route 
          path='/*' 
          element={
            <Layout2>
              <span className="text-3xl px-16 flex justify-center py-8 ">Page Not Found</span>
            </Layout2>}
        />
      </Routes>
    </Router>
  )
}

export default App