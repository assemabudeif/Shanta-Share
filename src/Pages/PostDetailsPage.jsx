import React, {useState, useEffect} from "react";
import axios from "axios";
import {useLocation, useParams} from "react-router-dom";
import DriverInfoComp from "../Components/DriverInfoComp";
import "../CSS/PostDetailsPage.css"
import CarPlateNumberComp from "../Components/CarPlateNumberComp";
import motorcycleImage from "../assets/images/motorcycle.png";
import weightImage from "../assets/images/weight.png";
import areaImage from "../assets/images/area.png";
import {BiExit} from "react-icons/bi";
import {format, parseISO} from "date-fns";
import {AxiosInstance} from "../Network/AxiosInstance";

function PostDetailsPage(props) {
    const [carData, setCardata] = useState({
        carBrand: 'Toyota',
        carModel: 'Corolla',
        carYear: 2020,
        carLicensePlateNumber: '1',
        carLicensePlateChar: 'ا س د'
    });
    const [driverData, setDriverData] = useState({
        travelPost: {
            driverPhone: '0123456789',    // Phone number of the driver
            driverImage: 'http://localhost:3000/static/media/motorcycle.d773188e212020eddb02.png', // URL for the driver's image
            driverName: 'John Doe',        // Driver's name
            driverRating: 4.8,             // Driver's rating
            id: '123',                     // Driver's ID used in the profile route
        },
        hasChat: true
    })
    const {id} = useParams();
    const location = useLocation();
    // const post = location.state;
    const [post, setPost] = useState({});
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
    const [showForm, setShowForm] = useState(false);

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
            ...formData, [name]: value
        });
        setErrors({
            ...errors, [name]: error
        });

        // onFormChange({...formData, [name]: value});
    };
    console.log("post:", post)

    // const travelPost = {
    //     id: 1,
    //     driverName: post?.name || "Ahmed",
    //     driverRating: post?.rate?.length || 0,
    //     driverImage: "https://media.licdn.com/dms/image/v2/D4D12AQGsWiQQo-hEew/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1705940048112?e=2147483647&v=beta&t=sLhAjsrcMFywuGD8D0_5t6SuboPthNoVKHVbV87PmPo",
    //     carModel: "Hilux",
    //     carBrand: "Toyota",
    //     carYear: 2010,
    //     carLicensePlateNumber: "1234",
    //     carLicensePlateChar: "ن د ر",
    //     carImage: "https://global.toyota/pages/news/images/2023/06/21/1330/20230621_01_kv_w1920.jpg",
    //     description: post?.description,
    //     from: post?.from,
    //     to: post?.to,
    //     price: post?.price,
    //     travelTime: "3 hours",
    //     availableWeight: post?.weight,
    //     travelType: "Car",
    // };


    const handleRequest = () => {
        setRequestEnabled(!requestEnabled);
        if (!requestEnabled) {
            window.setTimeout(
                () => {
                    setShowForm(true);
                },
                10
            )
        }

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

        AxiosInstance.get(`/posts/${id}`)
          .then((response) => setPost(response.data))
    }, []);

    useEffect(() => {
        if (post.id){
            setCardata(
              {
                  carBrand: post.created_by.car_ids[0].make,
                  carModel: post.created_by.car_ids[0].model,
                  carYear: post.created_by.car_ids[0].yaer,
                  carLicensePlateNumber: '1',
                  carLicensePlateChar: 'ا س د'
              }
            )
            setDriverData({
                travelPost: {
                    driverPhone: post.created_by.phone_numbers[0].phone_number,    // Phone number of the driver
                    driverImage: 'http://localhost:3000/static/media/motorcycle.d773188e212020eddb02.png', // URL for the driver's image
                    driverName: post.created_by.name,        // Driver's name
                    driverRating: post.created_by.average_rating,             // Driver's rating
                    id: post.created_by.id,                     // Driver's ID used in the profile route
                },
                hasChat: true
            })


        }
    }, [post]);

    const ShowForm = () => {
        setShowForm(!showForm);
        window.setTimeout(
            () => {
                setRequestEnabled(!requestEnabled);
            },
            1000
        )
    }

    // useEffect(() => {
    //
    //     if (!requestEnabled) {
    //         window.setTimeout(
    //             () => {
    //                 setShowForm(requestEnabled);
    //             },
    //             1000
    //         )
    //     } else {
    //         setShowForm(requestEnabled);
    //     }
    //
    // }, [requestEnabled]);


    function handleMultiImageChange(e) {
        const files = e.target.files;
        setSelectedImages([...files]);
    }

    return (

      !post.id ?
        <div className={"flex justify-center items-center h-screen"}>
            <div className={"animate-spin rounded-full h-32 w-32 border-b-2 border-black"}/>
        </div>
        :
        <main className="container mx-20 lg:mx-auto my-16">
            {/*Driver Info*/}
            <DriverInfoComp travelPost={driverData.travelPost} hasChat={driverData.hasChat}/>


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
                            {post?.from_city?.name ?? " " + ', ' + post?.from_city?.government?.name ?? " "}
                            <span className={"text-2xl font-normal"}>
                                <br/> {format(parseISO(post.pickup_time), 'yyyy-M-d h:mm a')}
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
                            {post?.to_city?.name + ', ' + post?.to_city?.government?.name}
                            <span className={"text-2xl font-normal"}>
                                <br/> {format(parseISO(post.arrival_time), 'yyyy-M-d h:mm a')}
                            </span>
                        </span>
                    </div>

                </div>

            </div>

            {/*    Description    */}
            <div className={"flex relative"}>
                {
                  !requestEnabled && (
                    <>
                        <div className={"mt-8"}>
                            <h2 className={"text-3xl font-semibold"}>Description</h2>
                            <p className={"text-lg"}>{post.description}</p>
                            <div className={"flex w-auto text-center self-center content-center mt-8"}>
                        <span>
                            <img src={weightImage} className={"w-16"}/>
                        </span>
                                <span className={"self-center text-xl font-semibold ms-2"}>
                            {post.max_weight} kg
                        </span>

                                <span className={"ms-10"}>
                            <img src={areaImage} className={"w-16"}/>
                        </span>
                                <span className={"self-center text-xl font-semibold ms-2"}>
                            {post.max_size} msq
                        </span>
                            </div>
                        </div>


                        <div className={`m-20 bg-white shadow-xl rounded-2xl px-12 py-4`}
                             style={{width: "25vw"}}>
                            <div className={"flex justify-between"}>
                                <span className={"text-3xl font-semibold "}>Total</span>
                                <span className={"text-3xl font-semibold "}>{post.price} L.E</span>
                            </div>
                            <hr className={"my-4 border-1 border-[#8B8B8B]"}/>


                            <button
                              onClick={() => handleRequest()}
                              className={"w-full py-4 bg-black text-white font-semibold text-2xl rounded-2xl shadow-lg hover:bg-black hover:bg-opacity-85"}>
                                Request Delivery
                            </button>
                        </div>
                    </>
                  )
                }
            </div>
            {requestEnabled && <div id={"request-form"}
                                    className={`position-fixed bottom-0 right-0 bg-white shadow-xl rounded-3xl  ${showForm && 'opacity-100 show'} ${!showForm && 'opacity-0'} transition-opacity duration-1000 w-full`}>

                <div className={'flex flex-col '}>
                    {<div className="p-6 rounded-lg space-y-4">
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
                            <button className={"align-top h-full"}
                                    onClick={ShowForm}>
                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      d="M16.9086 14.5L27.6711 3.75458C27.9927 3.43289 28.1735 2.99659 28.1735 2.54166C28.1735 2.08673 27.9927 1.65043 27.6711 1.32875C27.3494 1.00706 26.9131 0.82634 26.4581 0.82634C26.0032 0.82634 25.5669 1.00706 25.2452 1.32875L14.4998 12.0912L3.7544 1.32875C3.43271 1.00706 2.99641 0.82634 2.54148 0.82634C2.08655 0.82634 1.65025 1.00706 1.32856 1.32875C1.00688 1.65043 0.826158 2.08673 0.826158 2.54166C0.826158 2.99659 1.00688 3.43289 1.32856 3.75458L12.0911 14.5L1.32856 25.2454C1.16844 25.4042 1.04136 25.5932 0.954625 25.8013C0.867895 26.0095 0.823242 26.2328 0.823242 26.4583C0.823242 26.6838 0.867895 26.9071 0.954625 27.1153C1.04136 27.3235 1.16844 27.5124 1.32856 27.6712C1.48738 27.8314 1.67632 27.9585 1.8845 28.0452C2.09267 28.1319 2.31596 28.1766 2.54148 28.1766C2.767 28.1766 2.99029 28.1319 3.19847 28.0452C3.40664 27.9585 3.59559 27.8314 3.7544 27.6712L14.4998 16.9087L25.2452 27.6712C25.404 27.8314 25.593 27.9585 25.8012 28.0452C26.0093 28.1319 26.2326 28.1766 26.4581 28.1766C26.6837 28.1766 26.907 28.1319 27.1151 28.0452C27.3233 27.9585 27.5122 27.8314 27.6711 27.6712C27.8312 27.5124 27.9583 27.3235 28.045 27.1153C28.1317 26.9071 28.1764 26.6838 28.1764 26.4583C28.1764 26.2328 28.1317 26.0095 28.045 25.8013C27.9583 25.5932 27.8312 25.4042 27.6711 25.2454L16.9086 14.5Z"
                                      fill="#1B1B1B"/>
                                </svg>
                            </button>

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
                                        {selectedImages.length > 0 && (<div className="flex flex-wrap">
                                            {selectedImages.map((image, index) => (
                                              <div key={index} className="w-20 h-20 mr-2 mb-2">
                                                  <img src={URL.createObjectURL(image)} alt=""
                                                       className="w-full h-full object-cover rounded"/>
                                              </div>))}
                                        </div>)}
                                    </div>
                                    {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
                                </div>

                            </div>

                            <div className={`m-20 bg-white ${!requestEnabled && "shadow-xl rounded-2xl"} px-12 py-4`}
                                 style={{width: "25vw"}}>
                                <div className={"flex justify-between"}>
                                    <span className={"text-3xl font-semibold "}>Total</span>
                                    <span className={"text-3xl font-semibold "}>{post.price} L.E</span>
                                </div>
                                <hr className={"my-4 border-1 border-[#8B8B8B]"}/>


                                <button
                                  onClick={() => handleRequest()}
                                  className={"w-full py-4 bg-black text-white font-semibold text-2xl rounded-2xl shadow-lg hover:bg-black hover:bg-opacity-85"}>
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>}


        </main>

    );
}

export default PostDetailsPage;