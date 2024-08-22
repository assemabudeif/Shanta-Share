export default function CarPlateNumberComp(props) {
    return (
        <div>
            <span className={"text-black font-semibold text-2xl me-8 ml-10"}>{props.carData.carBrand}</span>
            <span className={"text-black font-semibold text-2xl me-8"}>{props.carData.carModel}</span>
            <span className={"text-black font-semibold text-2xl me-8"}>{props.carData.carYear}</span>
            <br/>
            <div className={"mt-4 w-50 h-auto border-2  border-black rounded-lg relative"}>
                <div className={"vertical-line h-28"}></div>
                <div className={"h-8 bg-[#AE0000]"}></div>
                <div className={"flex self-center justify-between items-center text-center"}>
                    <span
                        className={"plate-number text-black font-semibold text-2xl"}>{props.carData.carLicensePlateNumber}</span>
                    <span
                        className={"plate-char text-black font-semibold text-2xl"}>{props.carData.carLicensePlateChar}</span>
                </div>
            </div>
        </div>
    );
}