import React, {useState, useEffect, PureComponent} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {IoCarSharp} from "react-icons/io5";
import {BsFilePostFill} from "react-icons/bs";
import {HiUsers} from "react-icons/hi2";
import {useTranslation} from 'react-i18next';
import '../CSS/users.css'
import {AxiosInstance} from "../Network/AxiosInstance";
import {useSelector} from "react-redux";
import LoadingComp from "./LoadingComp";

function DashboardSummary() {
    const {t, i18n} = useTranslation();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const [isTotalUsers, setIsTotalUsers] = useState(true);
    const [clients, setClients] = useState({clients: 0});
    const [drivers, setDrivers] = useState({drivers: 0});
    const [totals, setTotals] = useState({orders: 0, posts: 0});
    const totalUsers = clients.clients + drivers.drivers;
    const [data, setData] = useState([]);
    const loader = useSelector(state => state.loader.loader);
    const handleSwitch = () => {
        setIsTotalUsers(!isTotalUsers);
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        AxiosInstance.get('/reviews/get_totals/', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                setTotals(response.data);
                setClients(response.data);
                setDrivers(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the totals!", error);
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        AxiosInstance.get('/reviews/get_annual_statistics/', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the totals!", error);
            });
    }, []);

    if (loader) {
        return (<LoadingComp/>);
    }


    return (
        <div className="p-4 text-sm">
            {/* <div className={`flex justify-center mb-4 bg-gray-100 p-4 rounded-lg ${isFormVisible ? 'hidden' : ''}`}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className=" py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-lg search"
                />
            </div> */}
            <div className='flex gap-4 w-full'>
                <div className='bg-gray-100 rounded-sm p-4 flex-1 border border-gray-100 flex items-center'>
                    <div className='rounded-full h-12 w-12 flex items-center justify-center bg-black'><IoCarSharp
                        className='text-2xl text-white'/></div>
                    <div className='pl-4'>
                        <span
                            className='text-lg text-gray-500 font-light font-semibold'><b>{t("summary.Total Orders")}</b></span>
                        <div className='flex items-center ml-5'><strong
                            className='text-xl text-gray-700 font-semibold'>{totals.orders}</strong></div>
                    </div>
                </div>
                <div className='bg-gray-100 rounded-sm p-4 flex-1 border border-gray-100 flex items-center'>
                    <div className='rounded-full h-12 w-12 flex items-center justify-center bg-black'><BsFilePostFill
                        className='text-2xl text-white'/></div>
                    <div className='pl-4'>
                        <span
                            className='text-lg text-gray-500 font-light font-semibold'><b>{t("summary.Total Posts")}</b></span>
                        <div className='flex items-center ml-5'><strong
                            className='text-xl text-gray-700 font-semibold'>{totals.posts}</strong></div>
                    </div>
                </div>
                <div className='bg-gray-100 rounded-sm p-4 flex-1 border border-gray-100 flex items-center'>
                    <div
                        className='rounded-full h-12 w-12 flex items-center justify-center bg-black cursor-pointer'
                        onClick={handleSwitch}>
                        <HiUsers className='text-2xl text-white'/>
                    </div>
                    <div className='pl-4'>
                        {isTotalUsers ? (
                            <>
                            <span className='text-lg text-gray-500 font-light font-semibold'>
                            <b>{t("summary.Total Users")}</b>
                            </span>
                                <div className='flex items-center ml-5'>
                                    <strong className='text-xl text-gray-700 font-semibold'>{totalUsers}</strong>
                                </div>
                            </>
                        ) : (
                            <>
                            <span className='text-lg text-gray-500 font-light font-semibold'>
                            <b>
                              {t("summary.Clients")}
                            </b>
                            </span>
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                <span className='text-lg text-gray-500 font-light font-semibold'>
                            <b>
                              {t("summary.Drivers")}
                            </b>
                            </span>
                                <div className='flex items-center ml-5'>
                                    <strong className='text-xl text-gray-700 font-semibold'>{clients.clients}</strong>
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    <strong
                                        className='text-xl text-gray-700 font-semibold ml-4'>{drivers.drivers}</strong>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                {/* <div className='bg-gray-100 rounded-sm p-4 flex-1 border border-gray-100 flex items-center'>
                <div className='rounded-full h-12 w-12 flex items-center justify-center bg-black'><IoCarSharp className='text-2xl text-white' /></div>
                   <div className='pl-4'>
                       <span className='text-lg text-gray-500 font-light font-semibold'><b>Total Trips</b></span>
                       <div className='flex items-center ml-5'><strong className='text-xl text-gray-700 font-semibold'>40</strong></div>
                   </div>
                </div> */}

            </div>
            <div className='h-[22rem] bg-black-100 p-4 rounded-sm border border-black-100 flex flex-col flex-1 mt-10'>
                <strong className='text-gray-700 font-meduim text-lg'>{t("summary.Annual Statistics")}</strong>
                <div className='w-full mt-3 flex-1 text-xs'>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={500} height={300} data={data}
                                  margin={{top: 20, right: 10, left: -10, bottom: 0}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey="orders" stackId="a" fill="#000000"/>
                            <Bar dataKey="posts" stackId="a" fill="#666666"/>
                            <Bar dataKey="clients" stackId="a" fill="#999999"/>
                            <Bar dataKey="drivers" stackId="a" fill="#cccccc"/>

                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default DashboardSummary;