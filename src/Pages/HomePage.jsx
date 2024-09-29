import {useState} from "react";
import {Link} from "react-router-dom";
import Footer from '../Components/Footer'

function HomePage() {

  const [locationsList, setLocationsList] = useState([
    'Maadi, Kornaish Al-Nile, Cairo.',
    'Madinaty, New Cairo, Cairo gov.',
    ' Manshiat Nasser, Cairo gov.'
  ]);
  const [locationsListVisible, setLocationsListVisible] = useState(false);
  const [destinationsList, setDestinationsList] = useState([
    'Maadi, Kornaish Al-Nile, Cairo.',
    'Madinaty, New Cairo, Cairo gov.',
    ' Manshiat Nasser, Cairo gov.'
  ]);
  const [destinationsListVisible, setDestinationsListVisible] = useState(false);
  return (
    <>
      {/*<------->*<------> Navbar <------->*<------>*/}
      {/*<div className="bg-black flex justify-center">*/}
      {/*  <div className='p-6 max-w-[1280px] w-full flex justify-between text-white'>*/}
      {/*    <div className='flex w-full items-center'>*/}
      {/*      <div>*/}
      {/*        <h1 className='text-2xl'>Shanta Share</h1>*/}
      {/*      </div>*/}
      {/*      /!*<div className='w-1/6'>*!/*/}

      {/*      /!*</div>*!/*/}
      {/*      <div className='mx-4 w-1/2 flex justify-evenly'>*/}
      {/*        <div className='py-2 px-4 rounded-full cursor-pointer hover:bg-gray-500 hover:bg-opacity-40'>*/}
      {/*          <span className='text-sm'> Home </span>*/}
      {/*        </div>*/}
      {/*        <div className='py-2 px-4 rounded-full cursor-pointer hover:bg-gray-500 hover:bg-opacity-40'>*/}
      {/*          <span className='text-sm'> Reserve </span>*/}
      {/*        </div>*/}
      {/*        <div className='py-2 px-4 rounded-full cursor-pointer hover:bg-gray-500 hover:bg-opacity-40'>*/}
      {/*          <span className='text-sm'> Orders </span>*/}
      {/*        </div>*/}
      {/*        <div className='py-2 px-4 rounded-full cursor-pointer hover:bg-gray-500 hover:bg-opacity-40'>*/}
      {/*          <span className='text-sm'> About </span>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className='flex w-full justify-end'>*/}
      {/*      <div>*/}
      {/*        lang*/}
      {/*      </div>*/}
      {/*      <div>*/}
      {/*        user login*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}


      {/*<------>*<------> Hero Section <------->*<------>*/}

      <div className="bg-black flex justify-center">
        <div className='p-12 max-w-[1280px] gap-3 w-full h-screen grid md:grid-cols-1 lg:grid-cols-2'>
          <div className='w-full h-full px-6 bg-transparent flex flex-col justify-center items-start'>
            <h1 className='my-3 text-5xl leading-tight font-bold  text-white'>
              Shipping All Over The Egyptian Board
            </h1>
            <span className='text-white text-xl'>Request a ride, hop in, and go.</span>
            <div className='py-3 w-full flex flex-col items-start justify-center'>
              <div className='w-full mb-4'>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Enter Location"
                  onFocus={() => {
                    setLocationsListVisible(() => true)
                  }}
                  onBlur={() => {
                    setLocationsListVisible(() => false)

                  }}
                  className='
                  block w-3/4 rounded-md
                  border-0 py-3 pl-7 pr-20
                  text-gray-900 ring-1 ring-inset
                  ring-gray-300 placeholder:text-gray-400
                  focus:ring-2 focus:ring-inset
                  focus:ring-gray-950
                  sm:text-sm sm:leading-6
                '
                />
                <div className={`relative w-full ${locationsListVisible ? '' : 'hidden'}`}>
                  <div className='absolute top-0 left-0 '>
                    <ul className="bg-white rounded-md border border-gray-100 w-full mt-2">
                      {locationsList.map((location) =>
                        <li
                          className="p-4 border-b-2 border-gray-100 relative cursor-pointer hover:bg-gray-100 hover:text-gray-900">
                          {location}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className='w-full mb-4'>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Enter Location"
                  onFocus={() => {
                    setDestinationsListVisible(() => true)
                  }}
                  onBlur={() => {
                    setDestinationsListVisible(() => false)

                  }}
                  className='
                  block w-3/4 rounded-md
                  border-0 py-3 pl-7 pr-20
                  text-gray-900 ring-1 ring-inset
                  ring-gray-300 placeholder:text-gray-400
                  focus:ring-2 focus:ring-inset
                  focus:ring-gray-950
                  sm:text-sm sm:leading-6
                '
                />
                <div className={`relative w-full  ${destinationsListVisible ? '' : 'hidden'}`}>
                  <div className='absolute top-0 left-0 '>
                    <ul className="bg-white w-full rounded-md border border-gray-100 w-3/4 mt-2">
                      {destinationsList.map((location) =>
                        <li
                          className="p-4 border-b-2 border-gray-100 relative cursor-pointer hover:bg-gray-100 hover:text-gray-900">
                          {location}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <Link to={"/search"} className={"bg-white flex justify-center w-1/2 rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 font-semibold text-xl hover:bg-gray-1000"}>
                See Prices
              </Link>
            </div>
          </div>
          <div className='w-full justify-end sm:hidden lg:flex'>
            <img
              className='w-auto h-full object-contain'
              src={require(`../assets/images/bg_home_hero.png`)}/>
          </div>
        </div>

      </div>
{/*<------>*<------> Services Section <------->*<------>*/}

<div className="flex justify-center">
  <div className='p-12 max-w-[1280px] w-full'>
    <h1 className='text-4xl font-bold text-center mb-8'>
      Our Services
    </h1>
    <div className='p-6 gap-6 w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {/* Service for Clients */}
      <div className='p-6 bg-gray-100 rounded-lg flex items-center'>
        <div className='w-3/4 flex flex-col justify-between'>
          <span className='text-2xl font-bold mb-6'>For Clients</span>
          <span className='text-lg ml-3'>Ship anything anywhere with our riders, fast and secure.</span>
        </div>
        <div className='w-[150px] flex justify-end'>
          <img className='w-[150px] h-[150px] object-contain' src={require('../assets/images/order_img.png')} alt="For Clients"/>
        </div>
      </div>
      
      {/* Service for Drivers */}
      <div className='p-6 bg-gray-100 rounded-lg flex items-center'>
        <div className='w-3/4 flex flex-col justify-between'>
          <span className='text-2xl font-bold mb-6'>For Drivers</span>
          <span className='text-lg ml-3'>Increase your income by working with us.</span>
        </div>
        <div className='w-[150px] flex justify-end'>
          <img className='w-[150px] h-[150px] object-contain' src={require('../assets/images/icon_car.png')} alt="For Drivers"/>
        </div>
      </div>

      {/* Service for Companies */}
      <div className='p-6 bg-gray-100 rounded-lg flex items-center'>
        <div className='w-3/4 flex flex-col justify-between'>
          <span className='text-2xl font-bold mb-6'>For Companies</span>
          <span className='text-lg ml-3'>Ship your products anywhere with lower costs.</span>
        </div>
        <div className='w-[150px] flex justify-end'>
          <img className='w-[150px] h-[150px] object-contain' src={require('../assets/images/motorcycle.png')} alt="For Companies"/>
        </div>
      </div>
    </div>
  </div>
</div>


      <div className="flex justify-center">
        <div className='p-12 max-w-[1280px] gap-3 w-full h-screen grid md:grid-cols-1 lg:grid-cols-2'>
          <div className='w-full justify-start sm:hidden lg:flex'>
            <img
              className='w-auto h-full object-contain'
              src={require(`../assets/images/bg_home_hero.png`)}/>
          </div>
          <div className='w-full h-full px-6 bg-transparent flex flex-col justify-center items-start'>
            <h1 className='my-3 text-5xl leading-tight font-bold'>
Deliver When You Want, Earn What You Need
          </h1>
            <span className='text-xl'>Connect with clients and transport goods between cities using your own vehicle. Start earning today!</span>
            <div className='py-3 w-full flex flex-col items-start justify-center'>
              <div className='px-4 py-2 bg-black rounded-lg'>
              <Link to="/register" className="text-white">Start Now</Link>

              </div>
            </div>
          </div>

        </div>

      </div>

      


      <Footer />

    </>
  );
}

export default HomePage;