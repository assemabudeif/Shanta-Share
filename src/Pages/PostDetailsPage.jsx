import {useNavigate, useParams} from "react-router-dom";
import {PhoneIcon, StarIcon} from "@heroicons/react/24/solid";

function PostDetailsPage() {
    const { id } = useParams();
    const navigator = useNavigate();
  
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

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<StarIcon key={i} className="w-5 h-5 text-yellow-500" />);
        }

        if (halfStar) {
            stars.push(<StarIcon key="half" className="w-5 h-5 text-yellow-500 opacity-50" />);
        }

        return stars;
    };

    const callDriver = () => {
        window.location.href = `tel:${travelPost.driverPhone}`;
    }

    const showProfile = () => {
        navigator(`/driverProfile/${travelPost.id}`);
    }

    return (
        <main className="container mx-auto p-4">
            <div className="bg-white shadow-2xl rounded-2xl p-8">
                <div className="flex flex-col md:flex-row items-center mb-6">
                    <img src={travelPost.driverImage} alt="Driver" className="w-32 h-32 rounded-full mr-5 shadow-lg" />
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold text-blue-800">{travelPost.driverName}</h2>
                        <div className="flex items-center justify-center md:justify-start mt-2">
                            {renderStars(travelPost.driverRating)}
                            <span className="ml-2 text-black-600 font-semibold">{travelPost.driverRating}</span>
                        </div>
                        <p className="text-gray-600 mt-2">{travelPost.driverPhone}</p>
                        <div className="flex mt-4 space-x-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600" onClick={callDriver}>
                               <PhoneIcon className={"w-5 h-5"} />
                            </button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600" onClick={showProfile}>
                                Show Profile
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mb-6">
                    <img src={travelPost.carImage} alt="Car" className="w-full object-cover rounded-lg shadow-lg" />
                </div>
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-blue-800">Car Details</h3>
                    <p className="mt-2">
                     <span className={"text-gray-600"}>Model: </span>
                        {travelPost.carModel}
                    </p>
                    <p className="mt-1">
                        <span className={"text-gray-600"}>License Plate: </span>
                        {travelPost.carLicensePlate}
                    </p>
                </div>
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-blue-800">Travel Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <p className="text-black-600">
                            <span className={"text-gray-600"}>From: </span>
                            {travelPost.from}</p>
                        <p className="text-black-600">
                            <span className={"text-gray-600"}>To: </span>
                            {travelPost.to}</p>
                        <p className="text-black-600">
                            <span className={"text-gray-600"}>Date: </span>
                            {travelPost.date}</p>
                        <p className="text-black-600">
                            <span className={"text-gray-600"}>Time: </span>
                            {travelPost.time}</p>
                        <p className="text-black-600">
                            <span className={"text-gray-600"}>Price: </span>
                            {travelPost.price} EGP</p>
                        <p className="text-black-600">
                            <span className={"text-gray-600"}>Travel Time: </span>
                            {travelPost.travelTime}</p>
                        <p className="text-black-600">
                            <span className={"text-gray-600"}>Available Weight: </span>
                            {travelPost.availableWeight} kg</p>
                        <p className="text-black-600">
                            <span className={"text-gray-600"}>Travel Type: </span>
                            {travelPost.travelType}</p>

                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-blue-800">Description</h3>
                    <p className="mt-2">{travelPost.description}</p>
                </div>
            </div>
        </main>
    );
}

export default PostDetailsPage;