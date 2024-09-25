import React, {useState} from "react";
import CircularProgress from "./LoadingProgressCircular";

function OrderItem(props = {post:{}, acceptCallback: (data) => {}, rejectCallback: (data) => {}}) {

  const [acceptLoading, setAcceptLoading] = useState(false);
  // const [acceptLoading, setAcceptLoading] = useState(false);

  const handelAcceptAction = (id) => {
    setAcceptLoading(true);
    changeStatus(id, 'in_progress', (data)=>{
      props.acceptCallback(data);
      setAcceptLoading(false)}, ()=>setAcceptLoading(false));
  }
  const handelRejectAction = (id) => {
    changeStatus(id, 'rejected', (data) => {
      props.rejectCallback(data);
    });
  }

  const changeStatus = (id, status, resolve = ()=>{}, reject = ()=>{}) => {
    const params = {
      order_id: id,
      order_status: 'in_progress',
    }
    const config = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    }
    const queryString = new URLSearchParams(params).toString();
    fetch(`http://127.0.0.1:8000/orders/update-status/?${queryString}`, config)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        resolve(data)
      })
      .catch(error => {
        reject(error);
        console.error('Error fetching posts:', error);
      });
  }

  return (
    <>
      <div className="bg-gray-100 border-2 border-black rounded-2xl grid grid-cols-12 ">

        <img src={'http://localhost:8000' + props.post.cargo_image} className="col-span-4 h-[100%] rounded-l-2xl object-cover"/>

        <div className="col-span-8 p-4  flex flex-col justify-between ">
          <div className={"relative  w-full flex flex-col justify-between  "}>
            <div className="absolute right-0 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path
                  d="M10 18C10.2652 18 10.5196 17.8946 10.7071 17.7071C10.8946 17.5196 11 17.2652 11 17V11C11 10.7348 10.8946 10.4804 10.7071 10.2929C10.5196 10.1054 10.2652 10 10 10C9.73478 10 9.48043 10.1054 9.29289 10.2929C9.10536 10.4804 9 10.7348 9 11V17C9 17.2652 9.10536 17.5196 9.29289 17.7071C9.48043 17.8946 9.73478 18 10 18ZM20 6H16V5C16 4.20435 15.6839 3.44129 15.1213 2.87868C14.5587 2.31607 13.7956 2 13 2H11C10.2044 2 9.44129 2.31607 8.87868 2.87868C8.31607 3.44129 8 4.20435 8 5V6H4C3.73478 6 3.48043 6.10536 3.29289 6.29289C3.10536 6.48043 3 6.73478 3 7C3 7.26522 3.10536 7.51957 3.29289 7.70711C3.48043 7.89464 3.73478 8 4 8H5V19C5 19.7956 5.31607 20.5587 5.87868 21.1213C6.44129 21.6839 7.20435 22 8 22H16C16.7956 22 17.5587 21.6839 18.1213 21.1213C18.6839 20.5587 19 19.7956 19 19V8H20C20.2652 8 20.5196 7.89464 20.7071 7.70711C20.8946 7.51957 21 7.26522 21 7C21 6.73478 20.8946 6.48043 20.7071 6.29289C20.5196 6.10536 20.2652 6 20 6ZM10 5C10 4.73478 10.1054 4.48043 10.2929 4.29289C10.4804 4.10536 10.7348 4 11 4H13C13.2652 4 13.5196 4.10536 13.7071 4.29289C13.8946 4.48043 14 4.73478 14 5V6H10V5ZM17 19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20H8C7.73478 20 7.48043 19.8946 7.29289 19.7071C7.10536 19.5196 7 19.2652 7 19V8H17V19ZM14 18C14.2652 18 14.5196 17.8946 14.7071 17.7071C14.8946 17.5196 15 17.2652 15 17V11C15 10.7348 14.8946 10.4804 14.7071 10.2929C14.5196 10.1054 14.2652 10 14 10C13.7348 10 13.4804 10.1054 13.2929 10.2929C13.1054 10.4804 13 10.7348 13 11V17C13 17.2652 13.1054 17.5196 13.2929 17.7071C13.4804 17.8946 13.7348 18 14 18Z"
                  fill="#1B1B1B"/>
              </svg>
            </div>
            <div className="mb-2">
              <span className={"text-2xl font-semibold"}>
                Pickup

                <span className={"text-xl font-semibold"}>
                      <br/> {props.post.pickup_address_line}
                </span>
                <span className={"text-xl font-normal"}>
                      <br/> {props.post.pickup_time}
                </span>
              </span>
            </div>

            <div>
              <span className="text-2xl font-semibold">
                 Destination

                <span className={"text-xl font-semibold"}>
                      <br/> {props.post.delivery_address_line}
                </span>
                <span className="text-xl font-normal">
                     <br/> {props.post.arrival_time}
                  </span>
              </span>
            </div>
          </div>

          <div className="bg-pink-200 w-full h-full my-4">
            {props.post.client_notes}
          </div>


          <div className={"bg-green-200 flex  justify-between"}>
            <div className="w flex items-center">
              <span className="font-bold text-lg">{props.post.client.name}</span>
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
            <div className={"flex  justify-between"}>
              <button
                className="rounded-full py-2 px-12 bg-black text-white hover:shadow-gray-500 shadow-sm"
                onClick={() => handelAcceptAction(props.post.id)}
              >
                {acceptLoading
                  ? <div className='flex items-center justify-center w-full'>
                    <CircularProgress/>
                  </div>
                  : 'Accept'
                }
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default OrderItem;