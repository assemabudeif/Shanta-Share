import {useParams} from "react-router-dom";

function PostDetailsPage() {
    const {id} = useParams();
    const travelPost = {
        id: id,
        driverName: "Ahmed Ali",
        driverPhone: "01111111111",
        driverRating: 4.5,
        driverImage: "https://media.licdn.com/dms/image/v2/D4D12AQGsWiQQo-hEew/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1705940048112?e=2147483647&v=beta&t=sLhAjsrcMFywuGD8D0_5t6SuboPthNoVKHVbV87PmPo",
        carModel: "Toyota Corolla",
        carLicensePlate: "B 1234",
        carImage: "https://global.toyota/pages/news/images/2023/06/21/1330/20230621_01_kv_w1920.jpg",
        description: "I'm going to Cairo from Minya and I have 50 kg of available weight. I can pick you up from any place in Minya and drop you off at any place in Cairo.",
        from: "Minya",
        to: "Cairo",
        date: "2022-08-20",
        time: "10:00 AM",
        price: 100,
        travelTime: "3 hours",
        availableWeight: 50,
        travelType: "Car",
    };


    return (
       <>
           <main className={"container"}>
               <span
                   className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">Badge</span>


               <div className="flex flex-col items-center justify-center gap-y-6">
                   <img src={travelPost.driverImage} alt={travelPost.driverName} className="w-32 h-32 rounded-full "/>
               </div>

           </main>
       </>
    );
}

export default PostDetailsPage;