// import React from "react";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import CustomerViewProfile from "./customerViewProfile";
// import AddReview from "./Reviews/addReview";
import ReviewsList from "./Reviews/reviewList";
import { useTranslation } from 'react-i18next';
import '../CSS/reviewCard.css'
import { AxiosInstance } from "../Network/AxiosInstance";
import LoadingComp from "./LoadingComp";
import { useSelector } from "react-redux";

function DriverProfile() {
  const [driverData, setDriverData] = useState([]);
  const [carData, setCarData] = useState([]);
  const params = useParams();
  const { t, i18n } = useTranslation();
  const loader = useSelector(state => state.loader.loader);

  useEffect(() => {
    console.log(params.id);
    AxiosInstance.get("/users/driver-profile/" + params.id)
      .then((response) => {
        console.log(response.data);
        setDriverData(response.data.data);
        setCarData(
          {
            carBrand: response.data.data.car_ids[0].make,
            carModel: response.data.data.car_ids[0].model,
            carYear: response.data.data.car_ids[0].yaer,
            carLicensePlateNumber: '1234',
            carLicensePlateChar: 'ا س د'
          }
        )
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (loader) {
    return (
      <LoadingComp />
    );
  }
  return (
    <main className="container mx-20 lg:mx-auto my-16">

      <CustomerViewProfile driverData={driverData} carData={carData} />
      {/* <AddReview/> */}
      <h1 className="mt-20 mb-10 text-black reviewTitle">{t("driverProfile.Reviews")}</h1>
      <ReviewsList driver_id={params.id} />
    </main>
  );
} export default DriverProfile