// import logo from './logo.svg';
import React from 'react';
import './App.css';
import './index.css';
// import DriverProfile from './components/driverProfile';
import CustomerViewProfile from './Components/customerViewProfile';
import DriverViewProfile from './Components/driverVeiwProfile';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PostDetailsPage from "./Pages/PostDetailsPage";
import PageNotFound from "./Pages/PageNotFound";
import DriverProfile from './Components/driverProfile';
// import ReviewCard from './components/Reviews/reviewCard';
import ReviewsList from './Components/Reviews/reviewList';
import RegistrationForm from './Components/RegistrationForm';
import NavBarComp from "./Components/NavBarComp";
import Login from "./Components/Login";
import LoginStep2 from "./Components/LoginStep2";
import DriverInfoComp from './Components/DriverInfoComp';
import SearchPage from "./Pages/SearchPage";
import Store from "./Store/Store";
import {Provider} from "react-redux";
import MyAccountPage from "./Pages/MyAccountPage";

import DriverHomePage from "./Pages/DriverHomePage";
import ClientDashboardMain from "./Pages/ClientDashboardMain";
import OrdersHistory from "./Pages/OrdersHistory"
import Dashboard from "./Pages/Dashboard"
import PostsPage from "./Pages/DriverDashboardPages/PostsPage";
import CreatePostPage from "./Pages/DriverDashboardPages/CreatPost/createPostPage";
import OrdersPage from "./Pages/DriverDashboardPages/OrdersPage";
import DashBoardOrders from "./Pages/DriverDashboardPages/DashboardOrders";
import ClientDashboardOrders from "./Pages/ClientDashboardPages/ClientDashboardOrders";
import PrivateRoutes from "./Components/PrivateRoutes";


const handleSave = (updatedDriver) => {
    console.log('Saved Driver Data:', updatedDriver);
};

// function App() {
//   return (
//     <div className="App">
//       <h1 className="text-3xl font-bold text-center mb-6">Driver Profile</h1>

//     </div>


function App() {
    const location = window.location.pathname;
    console.log(location);
    const user_type = localStorage.getItem('user_type') || '';
    const DriverDashboardRoutes = [
        {page: "", title: "Summary"},
        {page: "posts", title: "Posts"},
        {page: "orders", title: "Orders"},
        {page: "settings", title: "Settings"},

    ];
    const ClientDashboardRoutes = [
        {page: "", title: "Account"},
        {page: "orders", title: "Orders"},
        {page: "settings", title: "Settings"},
    ]

    return (
        <>
            <Provider store={Store}>

                <BrowserRouter>
                    {
                        location !== "/myaccount" &&
                        location !== "/client-dashboard" &&
                        // !location.includes('/dashboard') &&
                        // !location.includes('/client-dashboard') &&
                        <>
                            <NavBarComp/>
                            <div className="bg-transparent h-20"></div>
                        </>
                    }
                    <Routes>
                        <Route path="/" element={user_type === 'DRIVER' ? <DriverHomePage/> : user_type === 'ADMIN' ?
                            <Dashboard/> : <HomePage/>}/>
                        <Route path="/search" element={<SearchPage/>}/>
                        <Route path='/register' element={<RegistrationForm/>}/>
                        <Route path='/login' element={<Login/>}/>
                        {/*<Route path='/loginStep2'*/}
                        {/*       element={<LoginStep2/>}/>/!* <Route path="/reviewCard" element={<ReviewCard />} /> *!/*/}
                        <Route path="/reviewList" element={<ReviewsList/>}/>
                        <Route path="/driverInfoComp" element={<DriverInfoComp/>}/>
                        {/*<Route path="/myaccount" element={<MyAccountPage/>}/>*/}
                        {/*<Route path="/client-dashboard" element={<ClientDashboardMain/>}/>*/}
                        <Route path="/CreatePostPage" element={<CreatePostPage/>}/>
                        <Route path="/driverProfile/:id" element={<DriverProfile onSave={handleSave}/>}/>
                        <Route path="/driver_home" element={<DriverHomePage onSave={handleSave}/>}/>
                        <Route path="/customerViewProfile/:id" element={<CustomerViewProfile/>}/>
                        <Route path="/driverViewProfile" element={<DriverViewProfile onSave={handleSave}/>}/>
                        <Route path={"/post/:id"} element={<PostDetailsPage/>}/>
                        <Route path="/ordershistory" element={<OrdersHistory/>}/>
                        <Route path='' element={<PrivateRoutes/>} >
                            <Route path="/dashboard" element={<Dashboard pages={DriverDashboardRoutes} pathName={'/dashboard'}/>}>

                                <Route path={''} element={<div>Initial</div>}/>
                                {/*<Route path={'summary'} element={<div>Summary</div>}/>*/}
                                <Route path={"posts"} element={<PostsPage/>} />
                                {/*<Route path={"posts/:id"} element={<PostDetailsPage/>}/>*/}
                                <Route path={"posts/:id"} element={<OrdersPage/>}/>
                                <Route path={"posts/create"} element={<CreatePostPage/>}/>
                                <Route path={'orders'} element={<DashBoardOrders/>}/>
                                <Route path={'settings'} element={<div>Settings</div>}/>
                            </Route>
                            <Route path='/client-dashboard' element={<Dashboard pages={ClientDashboardRoutes} pathName={'/client-dashboard'}/> }>
                                <Route path='' element={<div>Account</div>}/>
                                <Route path={'orders'} element={<ClientDashboardOrders/>} />
                            </Route>
                        </Route>
                        <Route path="*" element={<PageNotFound/>}/>
                    </Routes>
                </BrowserRouter>
            </Provider>

        </>
    );
}

export default App;
