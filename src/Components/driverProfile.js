import React from "react";
import CustomerViewProfile from "./customerViewProfile";
// import AddReview from "./Reviews/addReview";
import ReviewsList from "./Reviews/reviewList";
import '../CSS/reviewCard.css'

function DriverProfile(){
    return(
        <>
           <CustomerViewProfile/>
           {/* <AddReview/> */}
           <h1 className="mt-20 mb-10 text-black reviewTitle">Reviews</h1>
           <ReviewsList/>
        </>
    );
} export default DriverProfile