import {useParams} from "react-router-dom";
import {StarIcon} from "@heroicons/react/24/solid";
import DriverInfoComp from "../Components/DriverInfoComp";
import "../CSS/PostDetailsPage.css"
import CarPlateNumberComp from "../Components/CarPlateNumberComp";

function PostDetailsPage() {
    const {id} = useParams();

    const travelPost = {
        id: id,
        driverName: "Ahmed Ali",
        driverPhone: "01111111111",
        driverRating: 4.5,
        driverImage: "https://media.licdn.com/dms/image/v2/D4D12AQGsWiQQo-hEew/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1705940048112?e=2147483647&v=beta&t=sLhAjsrcMFywuGD8D0_5t6SuboPthNoVKHVbV87PmPo",
        carModel: "Hilux",
        carBrand: "Toyota",
        carYear: 2010,
        carLicensePlateNumber: "1234",
        carLicensePlateChar: "ن د ر",
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

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<StarIcon key={i} className="w-5 h-5 text-yellow-500"/>);
        }

        if (halfStar) {
            stars.push(<StarIcon key="half" className="w-5 h-5 text-yellow-500 opacity-50"/>);
        }

        return stars;
    };


    return (
        <main className="container mx-auto my-16">
            {/*Driver Info*/}
            <DriverInfoComp travelPost={travelPost} hasChat={true}/>


            {/*vehicle Info*/}
            <div className={"flex flex-wrap justify-between"}>
                {/*   plate number*/}
                <CarPlateNumberComp travelPost={travelPost}/>
            </div>


        </main>
    );
}

export default PostDetailsPage;