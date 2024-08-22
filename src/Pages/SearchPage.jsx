import React from "react";
import motorcycleImage from "../assets/images/motorcycle.png";
import {Link} from "react-router-dom";
import {ArrowLeftIcon} from "@heroicons/react/20/solid";


export default function SearchPage() {
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
                    Array.from({length: 10}).map((_, index) => (
                        <div className={"border-2 border-black rounded-2xl grid grid-cols-4 py-8"}>
                            <div className={"w-90 lg:w-64 px-10 me-8 my-8 lg:my-0 rounded-2xl"}>
                                <img src={motorcycleImage} width={"auto"} alt="car" className={"col-span-1"}/>
                            </div>
                            <div className={"col-span-3"}>
                                <div className={"flex flex-col lg:flex-row justify-between me-8 mb-4"}>
                                    <div>
                                        <span className={"text-3xl font-semibold"}>
                                            Minia, Minia gov.
                                            <span className={"text-2xl font-normal"}>
                                                <br/> Today 06:30 AM
                                            </span>
                                        </span>
                                    </div>

                                    <div>
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
                                        <span className={"text-3xl font-semibold"}>
                                            Ramses, Cairo gov.
                                            <span className={"text-2xl font-normal"}>
                                               <br/> Today 10:30 AM
                                            </span>
                                        </span>
                                    </div>

                                </div>
                                <div>
                                <div className="flex items-center justify-start mt-2">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M25.2809 10.742C25.459 10.8807 25.593 11.0682 25.6667 11.2816C25.7235 11.4949 25.7185 11.72 25.6524 11.9306C25.5863 12.1413 25.4618 12.3289 25.2934 12.4716L20.4751 17.1382L21.6417 23.7649C21.6834 23.9836 21.6616 24.2097 21.5789 24.4164C21.4962 24.6231 21.3561 24.8019 21.1751 24.9316C20.9749 25.0765 20.7339 25.1541 20.4867 25.1532C20.2987 25.1538 20.1138 25.1056 19.9501 25.0132L14.0001 21.8866L8.02672 25.0016C7.83512 25.1031 7.619 25.1493 7.40261 25.1349C7.18622 25.1205 6.97814 25.046 6.80172 24.9199C6.62072 24.7902 6.4806 24.6115 6.39791 24.4048C6.31521 24.198 6.29341 23.972 6.33506 23.7532L7.50172 17.1266L2.68339 12.4599C2.53342 12.3102 2.42704 12.1226 2.37565 11.917C2.32427 11.7115 2.32982 11.4958 2.39172 11.2932C2.45934 11.0859 2.58373 10.9016 2.75076 10.7614C2.9178 10.6212 3.1208 10.5306 3.33672 10.4999L9.97506 9.51989L12.9501 3.49989C13.0456 3.30265 13.1947 3.13629 13.3805 3.0199C13.5662 2.9035 13.7809 2.84177 14.0001 2.84177C14.2192 2.84177 14.434 2.9035 14.6197 3.0199C14.8054 3.13629 14.9545 3.30265 15.0501 3.49989L18.0251 9.53156L24.6634 10.4999C24.8883 10.5191 25.1028 10.6032 25.2809 10.742ZM18.1936 16.4254C18.2525 16.2444 18.3549 16.0806 18.4917 15.9482L21.9917 12.4599L17.0801 11.7482C16.8911 11.7219 16.7114 11.6497 16.5568 11.5378C16.4022 11.426 16.2774 11.2779 16.1934 11.1066L14.0001 6.64995V19.4061C14.0195 19.4052 14.0389 19.4047 14.0584 19.4047C14.2496 19.4047 14.4379 19.4517 14.6067 19.5416L18.9934 21.8749L18.1534 16.9866C18.1208 16.799 18.1346 16.6063 18.1936 16.4254Z"
                                              fill="#1B1B1B"/>
                                    </svg>
                                    <span
                                        className="ms-2 text-black-600 font-semibold me-8">4.5</span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.4998 16.9999C10.2369 17.0001 9.97643 16.9484 9.73346 16.8479C9.49048 16.7473 9.26972 16.5999 9.08381 16.4139L5.29981 12.7149C5.11018 12.5292 5.00207 12.2759 4.99925 12.0105C4.99644 11.7451 5.09916 11.4895 5.28481 11.2999C5.47046 11.1103 5.72384 11.0021 5.9892 10.9993C6.25457 10.9965 6.51018 11.0992 6.69981 11.2849L10.4928 14.9919L17.2988 8.29189C17.4907 8.12302 17.7401 8.03406 17.9955 8.0433C18.251 8.05254 18.4933 8.15928 18.6725 8.34158C18.8517 8.52388 18.9543 8.76789 18.9592 9.02349C18.9641 9.27909 18.8709 9.52686 18.6988 9.71589L11.9058 16.4229C11.7209 16.6068 11.5015 16.7524 11.2603 16.8514C11.019 16.9504 10.7606 17.0009 10.4998 16.9999ZM23.9998 18.9999V12.3399C24.0371 9.25734 22.9069 6.27478 20.8361 3.99106C18.7653 1.70734 15.9073 0.291528 12.8358 0.02789C11.1215 -0.0920523 9.40134 0.15763 7.79185 0.760043C6.18235 1.36246 4.72102 2.30355 3.50672 3.51964C2.29243 4.73573 1.35351 6.19846 0.753484 7.80885C0.153457 9.41924 -0.0936746 11.1397 0.0288091 12.8539C0.470809 19.2079 6.08181 23.9999 13.0828 23.9999H18.9998C20.3254 23.9983 21.5963 23.471 22.5336 22.5337C23.4709 21.5963 23.9982 20.3255 23.9998 18.9999ZM12.6998 2.02389C15.2663 2.25093 17.6517 3.4408 19.3769 5.35444C21.1021 7.26809 22.0391 9.76371 21.9998 12.3399V18.9999C21.9998 19.7955 21.6837 20.5586 21.1211 21.1212C20.5585 21.6838 19.7955 21.9999 18.9998 21.9999H13.0828C7.04881 21.9999 2.39981 18.0999 2.02481 12.7159C1.92636 11.3445 2.11178 9.96749 2.56949 8.67096C3.0272 7.37443 3.74736 6.18622 4.68498 5.18056C5.6226 4.1749 6.75754 3.3734 8.01888 2.82614C9.28022 2.27887 10.6409 1.9976 12.0158 1.99989C12.2428 1.99989 12.4718 2.00889 12.6998 2.02389Z"
                                            fill="#374957"/>
                                    </svg>
                                    <span className="ms-2 text-black-600 font-semibold">verified</span>
                                </div>
                                    <h3 className={"text-xl font-semibold mt-2"}>
                                        15kg max 0.5 msq
                                    </h3>
                                    <div className={"flex  justify-between"}>
                                        <h3 className={"text-xl font-semibold mt-2"}>
                                            Truck
                                        </h3>
                                        <div className={"flex  justify-between"}>
                                            <span className={"text-4xl font-semibold"}>
                                                150.00 L.E
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