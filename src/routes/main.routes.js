import React from 'react'
import { Routes } from 'react-router';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import ListHotelBookingManagement from '../pages/Auth/BooManagement/HotelBookingManagement/ListHotelBookingManagement';
import ListTourBookingManagement from '../pages/Auth/BooManagement/TourBookingManagement/ListTourBookingManagement';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import AddCategory from '../pages/CategoryManagement/AddCategory';
import CategoryManagement from '../pages/CategoryManagement/CategoryManagement';
import UpdateCategory from '../pages/CategoryManagement/UpdateCategory';
import ViewCategory from '../pages/CategoryManagement/ViewCategory';
import Dashboard from '../pages/Dashboard/Dashboard';
import AddHotel from '../pages/HotelManagement/AddHotel';
import ListHotelManagement from '../pages/HotelManagement/ListHotelManagement';
import UpdateHotel from '../pages/HotelManagement/UpdateHotel';
import ViewHotel from '../pages/HotelManagement/ViewHotel';
import MainLayout from '../pages/Layout/MainLayout';
import AddLocation from '../pages/Location/AddLocation';
import LocationManagement from '../pages/Location/ListLocationManagement';
import UpdateLocation from '../pages/Location/UpdateLocation';
import ViewLocation from '../pages/Location/ViewLocation';
import AddPost from '../pages/PostManagement/AddPost';
import ListPostManagement from '../pages/PostManagement/PostManagement';
import UpdatePost from '../pages/PostManagement/UpdatePost';
import ViewPost from '../pages/PostManagement/ViewPost';
import AddTour from '../pages/TourManagement/AddTour';
import ListTourManagement from '../pages/TourManagement/ListTourManagement';
import UpdateTour from '../pages/TourManagement/UpdateTour';
import ViewTour from '../pages/TourManagement/ViewTour';
import ListUserManagement from '../pages/UserManagement/ListUserManagement';
import UpdateUser from '../pages/UserManagement/UpdateUser';
import ViewUser from '../pages/UserManagement/ViewUser';
import AddVehicle from '../pages/VehicleManagement/AddVehicle';
import ListVehicleManagement from '../pages/VehicleManagement/ListVehicleManage';
import UpdateVehicle from '../pages/VehicleManagement/UpdateVehicle';
import ViewVehicle from '../pages/VehicleManagement/ViewVehicle';
function RoutesMain() {
    let { path, url } = useRouteMatch();
    return (
        <div>
            <Router>
                <Switch>
                    <Route path={`${url}/Dashboard`}><Dashboard /> </Route>


                    <Route path={`${url}/category-management/addCategory`}><AddCategory /> </Route>
                    <Route path={`${url}/category-management/viewCategory/:id`}><ViewCategory /> </Route>
                    <Route path={`${url}/category-management/updateCategory/:id`}><UpdateCategory /> </Route>
                    <Route path={`${url}/category-management`}><CategoryManagement /> </Route>


                    <Route path={`${url}/location-management/addLocation`}><AddLocation /> </Route>
                    <Route path={`${url}/location-management/viewLocation/:id`}><ViewLocation /> </Route>
                    <Route path={`${url}/location-management/updateLocation/:id`}><UpdateLocation /> </Route>
                    <Route path={`${url}/location-management`}><LocationManagement /> </Route>


                    <Route path={`${url}/tour-management/addTour`}><AddTour /> </Route>
                    <Route path={`${url}/tour-management/updateTour/:id`}><UpdateTour /> </Route>
                    <Route path={`${url}/tour-management/viewTour/:id`}><ViewTour /> </Route>
                    <Route path={`${url}/tour-management`}><ListTourManagement /> </Route>


                    <Route path={`${url}/hotel-management/addHotel`}><AddHotel /> </Route>
                    <Route path={`${url}/hotel-management/updateHotel/:id`}><UpdateHotel /> </Route>
                    <Route path={`${url}/hotel-management/viewHotel/:id`}><ViewHotel /> </Route>
                    <Route path={`${url}/hotel-management`}><ListHotelManagement /> </Route>


                    <Route path={`${url}/post-management/updatePost/:id`}><UpdatePost /> </Route>
                    <Route path={`${url}/post-management/viewPost/:id`}><ViewPost /> </Route>
                    <Route path={`${url}/post-management/addPost`}><AddPost /> </Route>
                    <Route path={`${url}/post-management`}><ListPostManagement /> </Route>


                    <Route path={`${url}/vehicle-management/updateVehicle/:id`}><UpdateVehicle /> </Route>
                    <Route path={`${url}/vehicle-management/viewVehicle/:id`}><ViewVehicle /> </Route>
                    <Route path={`${url}/vehicle-management/addVehicle`}><AddVehicle /> </Route>
                    <Route path={`${url}/vehicle-management`}> <ListVehicleManagement /> </Route>


                    <Route path={`${url}/user-management/updateUser/:id`}><UpdateUser /> </Route>
                    <Route path={`${url}/user-management/viewUser/:id`}><ViewUser /> </Route>
                    <Route path={`${url}/user-management`}><ListUserManagement /> </Route>



                    <Route path={`${url}/booking-tour-management`}><ListTourBookingManagement /> </Route>


                    <Route path={`${url}/booking-hotel-management`}> <ListHotelBookingManagement /> </Route>


                    <Route path={`${url}/booking-vehicle-management`}> <ListVehicleManagement /> </Route>


                </Switch>
            </Router>
        </div>
    )
}

export default RoutesMain