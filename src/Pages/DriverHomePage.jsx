import NavBarComp from "../Components/NavBarComp";
import React, {useEffect, useState} from "react";
import {AxiosInstance} from "../Network/AxiosInstance";
import order_img from "../assets/images/order_img.png";
import {Link} from "react-router-dom";
import {data} from "autoprefixer";
import motorcycleImage from "../assets/images/motorcycle.png";
import {useTranslation} from 'react-i18next';


import Chart from "react-apexcharts";
import {useSelector} from "react-redux";
import LoadingComp from "../Components/LoadingComp";
import LoadingProgressCircular from "../Components/LoadingProgressCircular";

function DiverHomePage() {
    const [posts, setPosts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [postError, setPostError] = useState("");
    const [orderError, setOrderError] = useState("");
    const loading = useSelector(state => state.loader.loader);

    const [orderLoading, setOrderLoading] = useState(false);
    const [postsLoading, setPostsLoading] = useState(false);

    const {t, i18n} = useTranslation();

    const GetPosts = () => {
        setPostsLoading(true);
        AxiosInstance.get("/posts/driver-posts/")
          .then((response) => {
              // console.log(response.data);
              setPosts(response.data.results);
              setPostsLoading(false);
          })
          .catch((error) => {
              setPostError(error);
              setPostsLoading(false);
              console.error("Error fetching data:", error);
          });
    }

    const GetOrders = () => {
        setOrderLoading(true);
        AxiosInstance.get("/orders/driver-orders/")
          .then((response) => {
              // console.log(response.data);
              const orders = response.data.results?.filter((order) => order.status === 'in_progress' || order.status === 'accepted');
              setOrders(orders);
              setOrderLoading(false);
          })
          .catch((error) => {
              setOrderError(error);
              setOrderLoading(false);
              console.error("Error fetching data:", error);
          });
    }

    useEffect(() => {
        GetPosts();
        GetOrders();

    }, []);

    // if (true) {
    //     return (<LoadingComp/>);
    // }

    return (
        <>
            <NavBarComp/>
            <div className="flex justify-center">

                {/*main_body_container*/}
                <div className="w-screen  max-w-[1100px]  ">

                    {/*hero_section*/}
                    <div className=" h-[33vh] mt-[6rem] p-2 flex flex-wrap">
                        <div className=" w-1/3 p-2 ">
                            <div className="w-full h-full  flex items-center justify-start ">
                                <div className="flex flex-col items-start">
                                    <span className="text-4xl">{t("driverHomePage.Hi")} <span
                                        className="font-bold"> {localStorage.getItem('username')}</span></span>
                                    <span className="text-6xl leading-tight font-bold ">1280.00£</span>
                                    <span className="text-3xl ">{t("driverHomePage.TodaysEarnings")}</span>
                                </div>
                            </div>
                        </div>
                        <div className=" w-2/3 p-2">
                            <div className="w-full h-full flex items-center justify-center ">
                                {WeeklyChart()}
                            </div>
                        </div>
                    </div>

                    {/*orders_section*/}
                    <div className="  p-2 flex flex-col">
                        {SectionHeader({title: t("driverHomePage.TodaysOrders"), link: '/driver-dashboard/orders'})}
                        <div className="w-3/4 ms-12 p-2 flex items-center flex-col">

                            {
                                orderLoading
                                  ? <div className="p-8">
                                      <LoadingProgressCircular size={12}/>
                                  </div>
                                  : orders?.length > 0
                                    ? orders.map((order, index) => {
                                        return (
                                          <div className="my-2">
                                              {OrderItem(order)}
                                          </div>
                                        )
                                    })
                                    : <div className='text-xl font-semibold '> No Orders Yet </div>
                            }

                        </div>
                    </div>

                    {/*posts_section*/}
                    <div className="p-2 flex flex-col">
                        {SectionHeader({title: t("driverHomePage.YourPosts"), link: '/driver-dashboard/posts'})}
                        <div className="w-3/4 ms-12 p-2 flex items-center flex-col">

                            {
                                postsLoading
                                  ? <div className="p-8">
                                      <LoadingProgressCircular size={12}/>
                                  </div>
                                  : posts?.length > 0
                                    ? posts.map((post, index) => {
                                        return (
                                          <div className="my-2">
                                              {PostItem(post)}
                                          </div>
                                        )
                                    })
                                    : <div className='text-xl font-semibold '> No Posts Yet </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function OrderItem(order) {
    const hostname = "http://127.0.0.1:8000";

    return (
        <>
            <div className="border-2 border-black rounded-2xl grid grid-cols-4 ">

                <img src={hostname + order.cargo_image} className="col-span-1 h-[100%] rounded-l-2xl object-cover"/>

                <div className="col-span-3 p-4  flex flex-col justify-between">
                    <div className={"w-full flex flex-col lg:flex-row justify-between items-center"}>
                        <div>
              <span className={"text-2xl font-semibold"}>
                  {order.post.from_city.name}
                  <span className={"text-xl font-normal"}>
                      <br/> {new Date(order.pickup_time).toLocaleString()}
                  </span>
              </span>
                        </div>

                        <div className={"m-4"}>
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
              <span className="text-2xl font-semibold">
                 {order.post.to_city.name}
                  <span className="text-xl font-normal">
                     <br/> {new Date(order.arrival_time).toLocaleString()}
                  </span>
              </span>
                        </div>
                    </div>

                    <div className="w-full h-full my-4">
                        {order.client_notes}
                    </div>


                    <div className={"flex  justify-between"}>
                        <div className="w flex items-center">
                            <span className="font-bold text-lg">Mr.Amr El-Saady</span>
                            <svg className="w-6 h-6 ms-8" viewBox="0 0 32 32" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_37_379)">
                                    <path
                                        d="M32 21.3333V32H21.3333C19.4628 31.9981 17.6257 31.5043 16.0062 30.5682C14.3867 29.6321 13.0419 28.2866 12.1067 26.6667C13.1118 26.6595 14.1136 26.5487 15.096 26.336C15.8442 27.2715 16.7933 28.0267 17.8731 28.5456C18.9528 29.0644 20.1354 29.3337 21.3333 29.3333H29.3333V21.3333C29.333 20.135 29.063 18.9521 28.5432 17.8723C28.0234 16.7926 27.2672 15.8437 26.3307 15.096C26.5451 14.1138 26.6577 13.112 26.6667 12.1067C28.2866 13.0419 29.6321 14.3867 30.5682 16.0062C31.5043 17.6257 31.9981 19.4628 32 21.3333ZM24 12C24 8.8174 22.7357 5.76516 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0C8.8174 0 5.76516 1.26428 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12L0 24H12C15.1815 23.9965 18.2317 22.7311 20.4814 20.4814C22.7311 18.2317 23.9965 15.1815 24 12ZM2.66667 12C2.66667 10.154 3.21406 8.34954 4.23962 6.81468C5.26518 5.27982 6.72284 4.08354 8.42829 3.37712C10.1337 2.67071 12.0104 2.48588 13.8208 2.846C15.6313 3.20613 17.2944 4.09505 18.5997 5.40034C19.905 6.70563 20.7939 8.36867 21.154 10.1792C21.5141 11.9896 21.3293 13.8663 20.6229 15.5717C19.9165 17.2772 18.7202 18.7348 17.1853 19.7604C15.6505 20.7859 13.846 21.3333 12 21.3333H2.66667V12Z"
                                        fill="#374957"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_37_379">
                                        <rect width="32" height="32" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>

                            <svg className="w-6 h-6 ms-2" viewBox="0 0 41 41" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M33.2101 22.2083C32.8343 22.2083 32.4414 22.0888 32.0655 22.0033C31.3044 21.8356 30.5565 21.613 29.8276 21.3371C29.0351 21.0488 28.1639 21.0637 27.3818 21.3791C26.5997 21.6945 25.9618 22.288 25.5909 23.0454L25.2151 23.8142C23.5512 22.8886 22.0222 21.7389 20.6709 20.3975C19.3295 19.0462 18.1799 17.5173 17.2543 15.8533L17.9718 15.375C18.7292 15.0042 19.3227 14.3663 19.6381 13.5841C19.9535 12.802 19.9684 11.9309 19.6801 11.1383C19.4089 10.4079 19.1863 9.66029 19.0139 8.90042C18.9284 8.52459 18.8601 8.13168 18.8089 7.73876C18.6014 6.53544 17.9711 5.44573 17.0315 4.66588C16.092 3.88602 14.9048 3.46726 13.6839 3.48501H8.55886C7.82262 3.4781 7.09354 3.6299 6.42124 3.93008C5.74894 4.23026 5.14922 4.67178 4.66289 5.22457C4.17656 5.77737 3.81505 6.42846 3.60297 7.13352C3.39088 7.83858 3.33321 8.58107 3.43386 9.31042C4.34396 16.4673 7.61249 23.117 12.7232 28.2091C17.8339 33.3012 24.4954 36.5455 31.6555 37.4296H32.3047C33.5644 37.4314 34.7807 36.9692 35.7214 36.1313C36.2618 35.6479 36.6935 35.0553 36.988 34.3927C37.2825 33.7301 37.4331 33.0126 37.4297 32.2875V27.1625C37.4088 25.9759 36.9767 24.8333 36.2071 23.9298C35.4376 23.0263 34.3783 22.4178 33.2101 22.2083ZM34.0643 32.4583C34.064 32.7009 34.012 32.9406 33.9119 33.1615C33.8117 33.3824 33.6657 33.5795 33.4834 33.7396C33.2931 33.9053 33.07 34.029 32.8286 34.1026C32.5872 34.1762 32.333 34.198 32.0826 34.1667C25.6847 33.3463 19.742 30.4194 15.1918 25.8476C10.6417 21.2758 7.74298 15.3192 6.95303 8.91751C6.92584 8.66727 6.94967 8.41411 7.02307 8.17334C7.09648 7.93257 7.21794 7.70918 7.38011 7.51667C7.5402 7.33445 7.73726 7.1884 7.95817 7.08825C8.17909 6.98811 8.4188 6.93615 8.66136 6.93584H13.7864C14.1836 6.927 14.5716 7.05693 14.8834 7.30325C15.1952 7.54958 15.4113 7.8969 15.4947 8.28542C15.563 8.75237 15.6484 9.21362 15.7509 9.66917C15.9483 10.5697 16.2109 11.4547 16.5368 12.3171L14.1451 13.4275C13.9406 13.5213 13.7567 13.6546 13.6038 13.8197C13.451 13.9848 13.3323 14.1785 13.2545 14.3896C13.1767 14.6007 13.1414 14.8251 13.1506 15.0499C13.1598 15.2747 13.2133 15.4955 13.308 15.6996C15.7667 20.966 20 25.1993 25.2664 27.6579C25.6823 27.8288 26.1488 27.8288 26.5647 27.6579C26.7777 27.5817 26.9735 27.4639 27.1407 27.3114C27.3079 27.159 27.4431 26.9748 27.5384 26.7696L28.5976 24.3779C29.4808 24.6938 30.3821 24.9562 31.2968 25.1638C31.7523 25.2663 32.2136 25.3517 32.6805 25.42C33.0691 25.5034 33.4164 25.7195 33.6627 26.0313C33.909 26.3431 34.0389 26.7311 34.0301 27.1283L34.0643 32.4583Z"
                                    fill="#1B1B1B"/>
                            </svg>

                        </div>
                        <div className={"text-sm font-semibold text-green-500"}>
                            {order.status}
                        </div>
                        {/*<div className={"flex  justify-between"}>*/}
                        {/*    <Link to={"/order/1"} state={order} className={""}>*/}
                        {/*        <svg width="16" height="28" viewBox="0 0 16 28" fill="none"*/}
                        {/*             xmlns="http://www.w3.org/2000/svg">*/}
                        {/*            <path*/}
                        {/*                d="M3.62229 27.414L0.800293 24.5859L11.3783 14L0.800293 3.41395L3.63029 0.585953L14.2003 11.172C14.9502 11.9221 15.3714 12.9393 15.3714 14C15.3714 15.0606 14.9502 16.0778 14.2003 16.8279L3.62229 27.414Z"*/}
                        {/*                fill="#374957"/>*/}
                        {/*        </svg>*/}
                        {/*    </Link>*/}
                        {/*</div>*/}
                    </div>

                </div>
            </div>
        </>
    )
}

function PostItem(post) {
    return (
        <>
            <div className={"border-2 border-black rounded-2xl grid grid-cols-4 py-8"}>
                <div className={"w-90 lg:w-64 px-10 me-8 my-8 lg:my-0 rounded-2xl"}>
                    <img src={motorcycleImage} width={"auto"} alt="car" className={"col-span-1"}/>
                </div>
                <div className={"col-span-3"}>
                    <div className={"flex flex-col lg:flex-row justify-between me-8 mb-4"}>
                        <div>
                                        <span className={"text-2xl font-semibold"}>
                                            {post.from_city.name}, {post.from_city['government']['name']}
                                            <span className={"text-xl font-normal"}>
                                                <br/> {new Date(post.pickup_time).toLocaleString()}
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
                                           {post.to_city.name}, {post.to_city['government']['name']}
                                            <span className={"text-xl font-normal"}>
                                               <br/> {new Date(post.arrival_time).toLocaleString()}
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
                                className="ms-2 text-black-600 font-semibold me-8">{String(post.rate).length / 2}</span>
                            {
                                //!TODO: add verified
                                // post.verified &&
                                (
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
                            {post.max_weight}kg - {post.max_size} msq
                        </h3>
                        <div className={"flex  justify-between"}>
                            <h3 className={"text-xl font-semibold mt-2"}>
                                Truck
                            </h3>
                            <div className={"flex  justify-between"}>
                                            <span className={"text-4xl font-semibold"}>
                                                {Math.round(post.delivery_fee)} L.E
                                            </span>
                                <Link to={`/driver-dashboard/posts/${post.id}`} state={post} className={"mx-8"}>
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
        </>
    )
}

function SectionHeader(props = {title: 'title', link: 'link'}) {
    return (
        <>
            <div className="py-4 mt-8 flex items-center font-bold text-3xl">
                <span>{props.title}</span>
                <Link to={props.link}>
                    <svg className="w-6 h-6 ms-4" viewBox="0 0 16 28" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3.62229 27.414L0.800293 24.5859L11.3783 14L0.800293 3.41395L3.63029 0.585953L14.2003 11.172C14.9502 11.9221 15.3714 12.9393 15.3714 14C15.3714 15.0606 14.9502 16.0778 14.2003 16.8279L3.62229 27.414Z"
                            fill="#374957"/>
                    </svg>
                </Link>
            </div>
        </>
    )
}

function WeeklyChart() {
    const chartConfig = {
        type: "bar",
        height: 240,
        series: [
            {
                name: "Sales",
                data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
            },
        ],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: "",
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#020617"],
            plotOptions: {
                bar: {
                    columnWidth: "40%",
                    borderRadius: 2,
                },
            },
            xaxis: {
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
                categories: [
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ],
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
            },
            grid: {
                show: true,
                borderColor: "#dddddd",
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 5,
                    right: 20,
                },
            },
            fill: {
                opacity: 0.8,
            },
            tooltip: {
                theme: "dark",
            },
        },
    };

    return (

        <Chart width={"250%"} {...chartConfig} />

    );
}

export default DiverHomePage;