import React from "react";
import '../CSS/driverProfile.css';
import { useTranslation } from 'react-i18next';

function DriverDetailsInfo(props) {
  const { t, i18n } = useTranslation();
  return (
    <div className="grid grid-cols-3 gap-20 d-md-grid">
      <div className="detailsInfo mr-20">
        {/* <span className="text-gray font-semibold text-l ml-20 titleInfo">{t("driverProfile.From")} <span className="text-gray valueInfo">{props.travelPost.city_ids[0].name}, {props.travelPost.city_ids[0].government?.name}</span></span><br /> */}
        {/* <span className="text-gray font-semibold text-l ml-20 titleInfo">{t("driverProfile.LicenceType")} <span className="valueInfo">{props.travelPost.licenseType}</span></span> */}
      </div>
      <div className="col-span-2 flex justify-center">
        <div className="text-end">
          <div className="flex space-x-20 gap-20">
            {/* <div className="text-end">
              <span className="block text-2xl font-bold fontSize">{props.travelPost.totalTrips}</span>
              <span className="text-gray-500 ml-2">{t("driverProfile.Trips")}</span>
            </div> */}
            <div>
              <span className="block text-2xl font-bold fontSize">{props.travelPost.average_rating}</span>
              <span className="text-gray-500 ml-0">{t("driverProfile.Rating")}</span>
            </div>
            <div>
              <span className="block text-2xl font-bold ml-2 fontSize">{Math.ceil((new Date() - new Date(props.travelPost.created_at)) / (1000 * 60 * 60 * 24 * 365.25))}</span>
              <span className="text-gray-500 ml-0">{t("driverProfile.Years")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverDetailsInfo;
