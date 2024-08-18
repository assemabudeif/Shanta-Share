import React from "react";
import CustomerViewProfile from "./customerViewProfile";
// import AddReview from "./Reviews/addReview";
import ReviewsList from "./Reviews/reviewList";

function DriverProfile(){
    return(
        <>
           <CustomerViewProfile/>
           {/* <AddReview/> */}
           <ReviewsList/>
        </>
    );
} export default DriverProfile