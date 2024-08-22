// import React from "react";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import CustomerViewProfile from "./customerViewProfile";
// import AddReview from "./Reviews/addReview";
import ReviewsList from "./Reviews/reviewList";
import '../CSS/reviewCard.css'

function DriverProfile(){
    const [driverData, setDriverData] = useState([]);
    const [carData, setCardata] = useState([]);
    const params = useParams();

    useEffect(() => {
        console.log(params.id);
         axios.get("https://retoolapi.dev/yfdrwH/data/1")
        .then((response) => {
          setDriverData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, [params.id]);
    
    useEffect(() => {
      axios.get("https://retoolapi.dev/0JlabI/data/1")
     .then((response) => {
       setCardata(response.data);
     })
     .catch((error) => {
       console.error("Error fetching data:", error);
     });
    }, [params.id]);
    return(
        <main className="container mx-20 lg:mx-auto my-16">

           <CustomerViewProfile driverData={driverData} carData={carData} />
           {/* <AddReview/> */}
           <h1 className="mt-20 mb-10 text-black reviewTitle">Reviews</h1>
           <ReviewsList/>
        </main>
    );
} export default DriverProfile