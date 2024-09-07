import React, {useState, useEffect} from "react";
import axios from "axios";
import {useLocation, useParams} from "react-router-dom";
import DriverInfoComp from "../Components/DriverInfoComp";
import "../CSS/PostDetailsPage.css"
import CarPlateNumberComp from "../Components/CarPlateNumberComp";
import motorcycleImage from "../assets/images/motorcycle.png";
import weightImage from "../assets/images/weight.png";
import areaImage from "../assets/images/area.png";

function PostDetailsPage(props) {
    const [carData, setCardata] = useState([]);
    // const {id} = useParams();
    const location = useLocation();
    const post = location.state;
    const [requestEnabled, setRequestEnabled] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [formData, setFormData] = useState({
        from: '',
        pickupCity: '',
        pickupTime: '',
        to: '',
        destinationCity: '',
        arrivalTime: '',
        weight: '10.0 Kg',
        size: '2.0 msq',
        description: ''
    });

    const [errors, setErrors] = useState({});

    const validate = (name, value) => {
        let error = '';
        if (!value) {
            error = `${name} is required`;
        } else if ((name === 'from' || name === 'to') && value.length < 2) {
            error = `${name} must be at least 2 characters long`;
        } else if ((name === 'weight' || name === 'size') && isNaN(value)) {
            error = `${name} must be a number`;
        }
        return error;
    };

    const handleChange = (e) => {
        const {name, value} = e.target;

        // Validate the input
        const error = validate(name, value);

        // Update form data and errors
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: error
        });

        // onFormChange({...formData, [name]: value});
    };
    console.log("post:", post)

    const travelPost = {
        id: 1,
        driverName: post?.name || "Ahmed",
        driverRating: post?.rate?.length || 0,
        driverImage: "https://media.licdn.com/dms/image/v2/D4D12AQGsWiQQo-hEew/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1705940048112?e=2147483647&v=beta&t=sLhAjsrcMFywuGD8D0_5t6SuboPthNoVKHVbV87PmPo",
        carModel: "Hilux",
        carBrand: "Toyota",
        carYear: 2010,
        carLicensePlateNumber: "1234",
        carLicensePlateChar: "ن د ر",
        carImage: "https://global.toyota/pages/news/images/2023/06/21/1330/20230621_01_kv_w1920.jpg",
        description: post?.description,
        from: post?.from,
        to: post?.to,
        price: post?.price,
        travelTime: "3 hours",
        availableWeight: post?.weight,
        travelType: "Car",
    };

    const handleRequest = () => {
        setRequestEnabled(!requestEnabled);
        console.log(requestEnabled, "requestEnabled");
    }

    useEffect(() => {
        axios.get("https://retoolapi.dev/0JlabI/data/1")
            .then((response) => {
                setCardata(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useEffect(() => {

    }, [requestEnabled]);


    function handleMultiImageChange(e) {
        const files = e.target.files;
        setSelectedImages([...files]);
    }

    return (<main className="container mx-20 lg:mx-auto my-16">
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
        <div className={"flex"}>
            {!requestEnabled && <div className={"mt-8"}>
                <h2 className={"text-3xl font-semibold"}>Description</h2>
                <p className={"text-lg"}>{travelPost.description}</p>
                <div className={"flex w-auto text-center self-center content-center mt-8"}>
                        <span>
                            <img src={weightImage} className={"w-16"}/>
                        </span>
                    <span className={"self-center text-xl font-semibold ms-2"}>
                            {travelPost.availableWeight} kg
                        </span>

                    <span className={"ms-10"}>
                            <img src={areaImage} className={"w-16"}/>
                        </span>
                    <span className={"self-center text-xl font-semibold ms-2"}>
                            0.5 msq
                        </span>
                </div>
            </div>}
            {/*     Price    */}
            <div
                className={` ${requestEnabled && "position-fixed bottom-0 right-0 bg-white shadow-xl rounded-3xl "} transition-all duration-1000`}
                style={{width: requestEnabled ? "100vw" : 0}}>

                <div className={'flex flex-col '}>
                    {
                        requestEnabled && <div className="p-6 rounded-lg space-y-4">
                            <div className="flex flex-row w-full">
                                <div className={'w-1/2'}>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium titleLocation">Pickup Location</label>
                                        <div className="flex space-x-2">
                                            <input
                                                type="text"
                                                name="from"
                                                value={formData.from}
                                                onChange={handleChange}
                                                placeholder="Government"
                                                className={`background w-1/2 p-2 border border-gray-300 rounded ${errors.from ? 'border-red-500' : ''}`}
                                            />
                                            <input
                                                type="text"
                                                name="pickupCity"
                                                value={formData.pickupCity}
                                                onChange={handleChange}
                                                placeholder="City"
                                                className={`background w-1/2 p-2 border border-gray-300 rounded ${errors.pickupCity ? 'border-red-500' : ''}`}
                                            />
                                        </div>
                                        {errors.from && <p className="text-red-500 text-sm">{errors.from}</p>}
                                        <input
                                            type="text"
                                            name="pickupAddress"
                                            value={formData.pickupAddress}
                                            onChange={handleChange}
                                            placeholder="Address line"
                                            className={`background w-full p-2 border border-gray-300 rounded ${errors.pickupAddress ? 'border-red-500' : ''}`}
                                        />
                                        {errors.pickupAddress &&
                                            <p className="text-red-500 text-sm">{errors.pickupAddress}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex text-sm font-medium titleLocation w-1/2">Pickup Time</label>
                                        <input
                                            type="datetime-local"
                                            name="pickupTime"
                                            value={formData.pickupTime}
                                            onChange={handleChange}
                                            className={`background w-1/2 p-2 border border-gray-300 rounded ${errors.pickupTime ? 'border-red-500' : ''}`}
                                        />
                                        {errors.pickupTime && <p className="text-red-500 text-sm">{errors.pickupTime}</p>}
                                    </div>
                                </div>
                                <div className={'w-1/2 px-4'}>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium titleLocation">Arrival Location</label>
                                        <div className="flex space-x-2">
                                            <input
                                                type="text"
                                                name="to"
                                                value={formData.to}
                                                onChange={handleChange}
                                                placeholder="Government"
                                                className={`background w-1/2 p-2 border border-gray-300 rounded ${errors.to ? 'border-red-500' : ''}`}
                                            />
                                            <input
                                                type="text"
                                                name="destinationCity"
                                                value={formData.destinationCity}
                                                onChange={handleChange}
                                                placeholder="City"
                                                className={`background w-1/2 p-2 border border-gray-300 rounded ${errors.destinationCity ? 'border-red-500' : ''}`}
                                            />
                                        </div>
                                        {errors.to && <p className="text-red-500 text-sm">{errors.to}</p>}
                                        <input
                                            type="text"
                                            name="destinationAddress"
                                            value={formData.destinationAddress}
                                            onChange={handleChange}
                                            placeholder="Address line"
                                            className={`background w-full p-2 border border-gray-300 rounded ${errors.destinationAddress ? 'border-red-500' : ''}`}
                                        />
                                        {errors.destinationAddress &&
                                            <p className="text-red-500 text-sm">{errors.destinationAddress}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex w-1/2 text-sm font-medium titleLocation">Arrival Time</label>
                                        <input
                                            type="datetime-local"
                                            name="arrivalTime"
                                            value={formData.arrivalTime}
                                            onChange={handleChange}
                                            className={`background w-1/2 p-2 border border-gray-300 rounded ${errors.arrivalTime ? 'border-red-500' : ''}`}
                                        />
                                        {errors.arrivalTime && <p className="text-red-500 text-sm">{errors.arrivalTime}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row w-full">
                                <div className="space-y-2 w-1/2">
                                    <label className="text-sm font-medium titleLocation">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Write notes for clients..."
                                        className={`background w-full p-2 border border-gray-300 rounded ${errors.description ? 'border-red-500' : ''}`}
                                        style={{
                                            height: "80%",
                                        }}
                                    />
                                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                                </div>
                                <div>
                                    <div className="flex flex-col space-y-2 ms-3">
                                        <label className="text-sm font-medium titleLocation">Cargo Image</label>
                                        <div className="flex flex-col space-x-2 justify-between w-full">

                                            <input
                                                className={"mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-black file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-black focus:outline-none disabled:pointer-events-none disabled:opacity-60"}
                                                type="file"
                                                name="images"
                                                accept=".jpg, .jpeg, .png"
                                                multiple
                                                onChange={handleMultiImageChange}
                                            />
                                            <p className="text-xs text-gray-500 text-start mb-5">PNG, JPG, JPEG</p>
                                            {selectedImages.length > 0 && (
                                                <div className="flex flex-wrap">
                                                    {selectedImages.map((image, index) => (
                                                        <div key={index} className="w-20 h-20 mr-2 mb-2">
                                                            <img src={URL.createObjectURL(image)} alt=""
                                                                 className="w-full h-full object-cover rounded"/>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
                                    </div>

                                </div>

                                <div className={`m-20 bg-white ${!requestEnabled && "shadow-xl rounded-2xl"} px-12 py-4`}
                                     style={{width: "25vw"}}>
                                    <div className={"flex justify-between"}>
                                        <span className={"text-3xl font-semibold "}>Total</span>
                                        <span className={"text-3xl font-semibold "}>{travelPost.price} L.E</span>
                                    </div>
                                    <hr className={"my-4 border-1 border-[#8B8B8B]"}/>


                                    <button
                                        onClick={() => handleRequest()}
                                        className={"w-full py-4 bg-black text-white font-semibold text-2xl rounded-2xl shadow-lg hover:bg-black hover:bg-opacity-85"}>
                                        Request Delivery
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        !requestEnabled &&
                        <div className={`m-20 bg-white ${!requestEnabled && "shadow-xl rounded-2xl"} px-12 py-4`}
                             style={{width: "25vw"}}>
                            <div className={"flex justify-between"}>
                                <span className={"text-3xl font-semibold "}>Total</span>
                                <span className={"text-3xl font-semibold "}>{travelPost.price} L.E</span>
                            </div>
                            <hr className={"my-4 border-1 border-[#8B8B8B]"}/>


                            <button
                                onClick={() => handleRequest()}
                                className={"w-full py-4 bg-black text-white font-semibold text-2xl rounded-2xl shadow-lg hover:bg-black hover:bg-opacity-85"}>
                                Request Delivery
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>


    </main>);
}

export default PostDetailsPage;