import React, {useEffect, useState} from "react";
import motorcycleImage from "../assets/images/motorcycle.png";
import {Link} from "react-router-dom";
import {AxiosInstance} from "../Network/AxiosInstance";
import {useSelector} from "react-redux";

export default function SearchPage() {
    const [posts, setPosts] = useState([]);
    const [postError, setPostError] = useState("");
    const loading = useSelector(state => state.loader.loader);

    const GetPosts = () => {
        AxiosInstance.get("data").then((response) => {
            setPosts(response.data);
        }).catch((error) => {
            setPostError(error);
            console.error("Error fetching data:", error);
        });
    }

    useEffect(() => {
        GetPosts();

    }, []);

    if (loading) {
        return (
            <div className={"flex justify-center items-center h-screen"}>
                <div className={"animate-spin rounded-full h-32 w-32 border-b-2 border-black"}/>
            </div>
        );
    }


    return (
        <div className={"container mx-auto grid grid-cols-3 gap-16 my-8"}>
            <div className={"col-span-3 lg:col-span-1"}>
                <div className={"border-2 border-black rounded-2xl p-8"}>
                    <h3 className={"text-2xl font-semibold mb-8"}>Find your Courier</h3>
                    <input className='
                  bg-[#F3F3F3]
                  block w-full rounded-md
                  border-0 py-3 pl-7 pr-20
                  text-gray-900 ring-1 ring-inset
                  ring-transparent placeholder:text-gray-400
                  focus:ring-2 focus:ring-inset
                  focus:ring-gray-950
                  sm:text-sm sm:leading-6
                  mb-4
                ' placeholder={"Pickup Location"}/>

                    <input className='
                    bg-[#F3F3F3]
                  block w-full rounded-md
                  border-0 py-3 pl-7 pr-20
                  text-gray-900 ring-1 ring-inset
                  ring-transparent placeholder:text-gray-400
                  focus:ring-2 focus:ring-inset
                  focus:ring-gray-950
                  sm:text-sm sm:leading-6
                  mb-4
                ' placeholder={"Pickup Destination"}/>
                    <select className='
                    bg-[#F3F3F3]
                  block w-full rounded-md
                  border-0 py-3 pl-7 pr-20
                  text-gray-900 ring-1 ring-inset
                  ring-transparent placeholder:text-gray-400
                  focus:ring-2 focus:ring-inset
                  focus:ring-gray-950
                  sm:text-sm sm:leading-6
                  mb-4
                ' value={"Cargo Type"}>
                        <option value={"Cargo Type"}>Cargo Type</option>
                    </select>

                    <input className='
                    bg-[#F3F3F3]
                  block w-full rounded-md
                  border-0 py-3 pl-7 pr-20
                  text-gray-900 ring-1 ring-inset
                  ring-transparent placeholder:text-gray-400
                  focus:ring-2 focus:ring-inset
                  focus:ring-gray-950
                  sm:text-sm sm:leading-6
                  mb-4
                ' placeholder={"Cargo Weight"}/>

                    <div className={"flex justify-between"}>
                        <input className='
                    bg-[#F3F3F3]
                   w-1/4 rounded-md
                  border-0 py-3
                  text-gray-900 ring-1 ring-inset
                  ring-transparent placeholder:text-gray-400
                  focus:ring-2 focus:ring-inset
                  focus:ring-gray-950
                  sm:text-sm sm:leading-6
                  mb-4 text-center
                ' placeholder={"W cm"}/>

                        <input className='
                    bg-[#F3F3F3]
                   w-1/4 rounded-md
                  border-0 py-3
                  text-gray-900 ring-1 ring-inset
                  ring-transparent placeholder:text-gray-400
                  focus:ring-2 focus:ring-inset
                  focus:ring-gray-950
                  sm:text-sm sm:leading-6
                  mb-4 text-center
                ' placeholder={"H cm"}/>

                        <input className='
                    bg-[#F3F3F3]
                   w-1/4 rounded-md
                  border-0 py-3
                  text-gray-900 ring-1 ring-inset
                  ring-transparent placeholder:text-gray-400
                  focus:ring-2 focus:ring-inset
                  focus:ring-gray-950
                  sm:text-sm sm:leading-6
                  mb-4 text-center
                ' placeholder={"D cm"}/>

                    </div>

                    <button
                        className={"w-full py-4 bg-black text-white font-semibold text-2xl rounded-2xl shadow-lg hover:bg-black hover:bg-opacity-85"}>
                        Search
                    </button>
                </div>

            </div>

            <div className={"col-span-3 lg:col-span-2 mt-16"}>
                <ul className={"grid grid-cols-1 gap-8"}>
                    {
                        posts.map((post, index) => (
                            <div className={"border-2 border-black rounded-2xl grid grid-cols-4 py-8"}>
                                <div className={"w-90 lg:w-64 px-10 me-8 my-8 lg:my-0 rounded-2xl"}>
                                    <img src={motorcycleImage} width={"auto"} alt="car" className={"col-span-1"}/>
                                </div>
                                <div className={"col-span-3"}>
                                    <div className={"flex flex-col lg:flex-row justify-between me-8 mb-4"}>
                                        <div>
                                        <span className={"text-2xl font-semibold"}>
                                            {post.from}
                                            <span className={"text-xl font-normal"}>
                                                <br/> Today 06:30 AM
                                            </span>
                                        </span>
                                        </div>

                                        <div className={"w-28 h-28"}>
                                            <svg width="50" height="52" viewBox="0 0 50 52" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
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
                                                        <rect width="50" height="51" fill="white"
                                                              transform="translate(0 0.5)"/>
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                        </div>

                                        <div>
                                        <span className={"text-2xl font-semibold"}>
                                           {post.to}
                                            <span className={"text-xl font-normal"}>
                                               <br/> Today 10:30 AM
                                            </span>
                                        </span>
                                        </div>

                                    </div>
                                    <div>
                                        <div className="flex items-center justify-start mt-2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_26_131)">
                                                    <path
                                                        d="M23.8358 8.79431C23.6313 8.1432 23.2226 7.57522 22.6703 7.17434C22.1179 6.77346 21.4513 6.56097 20.7688 6.56831H16.3998L15.0728 2.43231C14.8641 1.78126 14.4541 1.21332 13.9018 0.810371C13.3495 0.407422 12.6835 0.190292 11.9998 0.190292C11.3162 0.190292 10.6502 0.407422 10.0979 0.810371C9.54556 1.21332 9.1355 1.78126 8.92683 2.43231L7.59983 6.56831H3.23083C2.55057 6.56927 1.88802 6.78519 1.33781 7.18521C0.787595 7.58523 0.377867 8.1489 0.167148 8.79569C-0.0435712 9.44249 -0.0445039 10.1393 0.164483 10.7867C0.37347 11.4341 0.781687 11.9988 1.33083 12.4003L4.88683 15.0003L3.53483 19.1873C3.31634 19.8367 3.31357 20.5393 3.52694 21.1904C3.7403 21.8415 4.15837 22.4062 4.71883 22.8003C5.26968 23.2071 5.93722 23.425 6.62198 23.4216C7.30674 23.4182 7.97207 23.1936 8.51883 22.7813L11.9998 20.2193L15.4818 22.7783C16.0317 23.1828 16.6956 23.4024 17.3782 23.4058C18.0608 23.4091 18.7268 23.1959 19.2806 22.7968C19.8344 22.3977 20.2473 21.8333 20.4601 21.1848C20.6729 20.5362 20.6746 19.8369 20.4648 19.1873L19.1128 15.0003L22.6728 12.4003C23.2282 12.0039 23.6412 11.4391 23.8507 10.7896C24.0602 10.1402 24.055 9.44056 23.8358 8.79431ZM21.4928 10.7853L17.3488 13.8143C17.1786 13.9385 17.052 14.1132 16.987 14.3136C16.922 14.514 16.9219 14.7299 16.9868 14.9303L18.5618 19.8003C18.6415 20.0473 18.6408 20.3132 18.5599 20.5598C18.4789 20.8064 18.3219 21.021 18.1113 21.1727C17.9007 21.3244 17.6474 21.4054 17.3878 21.4041C17.1283 21.4027 16.8759 21.3191 16.6668 21.1653L12.5918 18.1653C12.4202 18.0392 12.2128 17.9712 11.9998 17.9712C11.7869 17.9712 11.5795 18.0392 11.4078 18.1653L7.33283 21.1653C7.12391 21.3212 6.87076 21.4065 6.61009 21.4089C6.34942 21.4113 6.09477 21.3306 5.88306 21.1785C5.67134 21.0264 5.51358 20.8108 5.43262 20.563C5.35167 20.3152 5.35174 20.0481 5.43283 19.8003L7.01283 14.9303C7.07774 14.7299 7.0777 14.514 7.01269 14.3136C6.94768 14.1132 6.82104 13.9385 6.65083 13.8143L2.50683 10.7853C2.29813 10.6325 2.14306 10.4177 2.06377 10.1714C1.98448 9.92525 1.98502 9.66028 2.06531 9.4144C2.14561 9.16853 2.30155 8.95431 2.51087 8.80236C2.72019 8.65041 2.97217 8.56849 3.23083 8.56831H8.33083C8.54254 8.5683 8.74879 8.5011 8.91988 8.37638C9.09096 8.25166 9.21804 8.07587 9.28283 7.87431L10.8328 3.04331C10.9124 2.79609 11.0683 2.5805 11.2782 2.42755C11.4881 2.27461 11.7411 2.19221 12.0008 2.19221C12.2605 2.19221 12.5135 2.27461 12.7234 2.42755C12.9333 2.5805 13.0893 2.79609 13.1688 3.04331L14.7188 7.87431C14.7836 8.07587 14.9107 8.25166 15.0818 8.37638C15.2529 8.5011 15.4591 8.5683 15.6708 8.56831H20.7708C21.0295 8.56849 21.2815 8.65041 21.4908 8.80236C21.7001 8.95431 21.856 9.16853 21.9363 9.4144C22.0166 9.66028 22.0172 9.92525 21.9379 10.1714C21.8586 10.4177 21.7035 10.6325 21.4948 10.7853H21.4928Z"
                                                        fill="#374957"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_26_131">
                                                        <rect width="24" height="24" fill="white"/>
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                            <span
                                                className="ms-2 text-black-600 font-semibold me-8">{post.rate.length}</span>
                                            {
                                                post.verified && (
                                                    <>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M10.4998 16.9999C10.2369 17.0001 9.97643 16.9484 9.73346 16.8479C9.49048 16.7473 9.26972 16.5999 9.08381 16.4139L5.29981 12.7149C5.11018 12.5292 5.00207 12.2759 4.99925 12.0105C4.99644 11.7451 5.09916 11.4895 5.28481 11.2999C5.47046 11.1103 5.72384 11.0021 5.9892 10.9993C6.25457 10.9965 6.51018 11.0992 6.69981 11.2849L10.4928 14.9919L17.2988 8.29189C17.4907 8.12302 17.7401 8.03406 17.9955 8.0433C18.251 8.05254 18.4933 8.15928 18.6725 8.34158C18.8517 8.52388 18.9543 8.76789 18.9592 9.02349C18.9641 9.27909 18.8709 9.52686 18.6988 9.71589L11.9058 16.4229C11.7209 16.6068 11.5015 16.7524 11.2603 16.8514C11.019 16.9504 10.7606 17.0009 10.4998 16.9999ZM23.9998 18.9999V12.3399C24.0371 9.25734 22.9069 6.27478 20.8361 3.99106C18.7653 1.70734 15.9073 0.291528 12.8358 0.02789C11.1215 -0.0920523 9.40134 0.15763 7.79185 0.760043C6.18235 1.36246 4.72102 2.30355 3.50672 3.51964C2.29243 4.73573 1.35351 6.19846 0.753484 7.80885C0.153457 9.41924 -0.0936746 11.1397 0.0288091 12.8539C0.470809 19.2079 6.08181 23.9999 13.0828 23.9999H18.9998C20.3254 23.9983 21.5963 23.471 22.5336 22.5337C23.4709 21.5963 23.9982 20.3255 23.9998 18.9999ZM12.6998 2.02389C15.2663 2.25093 17.6517 3.4408 19.3769 5.35444C21.1021 7.26809 22.0391 9.76371 21.9998 12.3399V18.9999C21.9998 19.7955 21.6837 20.5586 21.1211 21.1212C20.5585 21.6838 19.7955 21.9999 18.9998 21.9999H13.0828C7.04881 21.9999 2.39981 18.0999 2.02481 12.7159C1.92636 11.3445 2.11178 9.96749 2.56949 8.67096C3.0272 7.37443 3.74736 6.18622 4.68498 5.18056C5.6226 4.1749 6.75754 3.3734 8.01888 2.82614C9.28022 2.27887 10.6409 1.9976 12.0158 1.99989C12.2428 1.99989 12.4718 2.00889 12.6998 2.02389Z"
                                                                fill="#374957"/>
                                                        </svg>
                                                        <span className="ms-2 text-black-600 font-semibold">verified</span>
                                                    </>)}
                                        </div>
                                        <h3 className={"text-xl font-semibold mt-2"}>
                                            {post.weight}kg max 0.5 msq
                                        </h3>
                                        <div className={"flex  justify-between"}>
                                        <h3 className={"text-xl font-semibold mt-2"}>
                                                Truck
                                            </h3>
                                            <div className={"flex  justify-between"}>
                                            <span className={"text-4xl font-semibold"}>
                                                {post.price}.00 L.E
                                            </span>
                                                <Link to={"/post/1"} className={"mx-8"}>
                                                    <svg width="16" height="28" viewBox="0 0 16 28" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M3.62229 27.414L0.800293 24.5859L11.3783 14L0.800293 3.41395L3.63029 0.585953L14.2003 11.172C14.9502 11.9221 15.3714 12.9393 15.3714 14C15.3714 15.0606 14.9502 16.0778 14.2003 16.8279L3.62229 27.414Z"
                                                            fill="#374957"/>
                                                    </svg>

                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </ul>
            </div>


        </div>);
}