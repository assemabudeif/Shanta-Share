import React, { useState, useEffect } from "react";
import axios from "axios";
import {useLocation, useParams} from "react-router-dom";
import {StarIcon} from "@heroicons/react/24/solid";
import DriverInfoComp from "../Components/DriverInfoComp";
import "../CSS/PostDetailsPage.css"
import CarPlateNumberComp from "../Components/CarPlateNumberComp";
import motorcycleImage from "../assets/images/motorcycle.png";
import weightImage from "../assets/images/weight.png";
import areaImage from "../assets/images/area.png";

function PostDetailsPage(props) {
    const [carData, setCardata] = useState([]);
    const {id} = useParams();
    const location = useLocation();
    const post = location.state;

    const travelPost = {
        id: 1,
        driverName: post.name,
        driverRating: post.rate.length,
        driverImage: "https://media.licdn.com/dms/image/v2/D4D12AQGsWiQQo-hEew/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1705940048112?e=2147483647&v=beta&t=sLhAjsrcMFywuGD8D0_5t6SuboPthNoVKHVbV87PmPo",
        carModel: "Hilux",
        carBrand: "Toyota",
        carYear: 2010,
        carLicensePlateNumber: "1234",
        carLicensePlateChar: "ن د ر",
        carImage: "https://global.toyota/pages/news/images/2023/06/21/1330/20230621_01_kv_w1920.jpg",
        description: post.description,
        from: post.from,
        to: post.to,
        price: post.price,
        travelTime: "3 hours",
        availableWeight: post.weight,
        travelType: "Car",
    };


    useEffect(() => {
        axios.get("https://retoolapi.dev/0JlabI/data/1")
       .then((response) => {
         setCardata(response.data);
       })
       .catch((error) => {
         console.error("Error fetching data:", error);
       });
      }, []);

    return (
        <main className="container mx-20 lg:mx-auto my-16">
            {/*Driver Info*/}
            <DriverInfoComp travelPost={travelPost} hasChat={true}/>


            {/*vehicle Info*/}
            <div className={"flex flex-wrap "}>
                {/*   plate number*/}
                <CarPlateNumberComp carData={carData}/>
                {/*   car image*/}
                <div className={"me-auto inline"}></div>
                <div className={"bg-[#D9D9D9] w-90 lg:w-64 px-10 me-8 my-8 lg:my-0 rounded-2xl"}>
                    <img src={motorcycleImage} width={"auto"} alt="car"/>
                </div>
                <div className={"bg-[#D9D9D9] w-90 lg:w-64 px-10 me-8 my-8 lg:my-0 rounded-2xl"}>
                    <img src={motorcycleImage} width={"auto"} alt="car"/>
                </div>
                <div className={"bg-[#D9D9D9]  w-90 lg:w-64 px-10 me-8 my-8 lg:my-0 rounded-2xl"}>
                    <img src={motorcycleImage} width={"auto"} alt="car"/>
                </div>
            </div>

            {/*    Location Info    */}
            <div className={"border-t-[1.5px] border-b-[1.5px] border-t-[#8B8B8B] border-b-[#8B8B8B] py-16 mt-8"}>

                <div className={"flex flex-col lg:flex-row justify-evenly"}>
                    <div>
                        <span className={"text-3xl font-semibold"}>
                            {travelPost.from}
                            <span className={"text-2xl font-normal"}>
                               <br/> Today 06:30 AM
                            </span>
                        </span>
                    </div>

                    <div>
                        <svg width="50" height="52" viewBox="0 0 50 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_41_102)">
                                <path
                                    d="M46.0847 21.4929L25.5117 0.499984L22.5659 3.51323L43.1388 24.4976C43.5294 24.8961 43.7488 25.4365 43.7488 26C43.7488 26.5635 43.5294 27.1039 43.1388 27.5024L22.5388 48.525L25.4847 51.5297L46.0847 30.5177C47.2563 29.3222 47.9146 27.701 47.9146 26.0106C47.9146 24.3202 47.2563 22.699 46.0847 21.5035V21.4929Z"
                                    fill="#374957"/>
                                <path
                                    d="M28.1972 24.4976L4.7118 0.540357L1.76388 3.54511L23.7785 26L1.74097 48.4782L4.6868 51.4851L28.1972 27.5024C28.5878 27.1039 28.8072 26.5635 28.8072 26C28.8072 25.4365 28.5878 24.8961 28.1972 24.4976Z"
                                    fill="#374957"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_41_102">
                                    <rect width="50" height="51" fill="white" transform="translate(0 0.5)"/>
                                </clipPath>
                            </defs>
                        </svg>

                    </div>

                    <div>
                        <span className={"text-3xl font-semibold"}>
                            {travelPost.to}
                            <span className={"text-2xl font-normal"}>
                               <br/> Today 10:30 AM
                            </span>
                        </span>
                    </div>

                </div>

            </div>

            {/*    Description    */}
            <div className={"flex justify-between"}>
                <div className={"mt-8"}>
                    <h2 className={"text-3xl font-semibold"}>Description</h2>
                    <p className={"text-lg"}>{travelPost.description}</p>
                    <div className={"flex w-auto text-center self-center content-center mt-8"}>
                        <span>
                            <img src={weightImage} className={"w-16"} />
                        </span>
                        <span className={"self-center text-xl font-semibold ms-2"}>
                            {travelPost.availableWeight} kg
                        </span>

                        <span className={"ms-10"}>
                            <img src={areaImage} className={"w-16"} />
                        </span>
                        <span className={"self-center text-xl font-semibold ms-2"}>
                            0.5 msq
                        </span>
                    </div>
                </div>
                {/*     Price    */}
                <div  >
                    <div className={"m-20 bg-white shadow-xl rounded-2xl px-12 py-4"} style={{width: "25vw"}}>
                        <div className={"flex justify-between"}>
                            <span className={"text-3xl font-semibold "}>Total</span>
                            <span className={"text-3xl font-semibold "}>{travelPost.price} L.E</span>
                        </div>
                        <hr className={"my-4 border-1 border-[#8B8B8B]"}/>

                        <button className={"w-full py-4 bg-black text-white font-semibold text-2xl rounded-2xl shadow-lg hover:bg-black hover:bg-opacity-85"}>
                            Request Delivery
                        </button>
                    </div>
                </div>
            </div>


        </main>
    );
}

export default PostDetailsPage;