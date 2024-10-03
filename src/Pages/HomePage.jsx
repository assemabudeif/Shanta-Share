import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function HomePage() {

  const [allLocations, setAllLocations] = useState([]);
  const [locationsList, setLocationsList] = useState([
    'Maadi, Kornaish Al-Nile, Cairo.',
    'Madinaty, New Cairo, Cairo gov.',
    ' Manshiat Nasser, Cairo gov.'
  ]);
  const [locationsListVisible, setLocationsListVisible] = useState(false);
  const [locationSearchValue, setLocationSearchValue] = useState('');
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [destinationsList, setDestinationsList] = useState([
    'Maadi, Kornaish Al-Nile, Cairo.',
    'Madinaty, New Cairo, Cairo gov.',
    ' Manshiat Nasser, Cairo gov.'
  ]);
  const [destinationsListVisible, setDestinationsListVisible] = useState(false);
  const [destinationSearchValue, setDestinationSearchValue] = useState('');
  const [selectedDestinationId, setSelectedDestinationId] = useState();

  const handelLocationInputChange = (e) => {
    setLocationSearchValue(e.target.value)
    setLocationsList(
      allLocations.filter((location) => {
        return location?.name?.toLowerCase()?.includes(e.target.value?.toLowerCase()) || location?.government?.name?.toLowerCase().includes(e.target.value?.toLowerCase());
      })
    );
  }

  const handelDestinationInputChange = (e) => {
    setDestinationSearchValue(e.target.value);
    setDestinationsList(
      allLocations.filter((location) => {
        return location?.name?.toLowerCase()?.includes(e.target.value?.toLowerCase()) || location?.government?.name?.toLowerCase().includes(e.target.value?.toLowerCase());
      })
    );
  }

  const handelLocationOptionClicked = (location) => {
    setSelectedLocationId(location.id);
    setLocationSearchValue(`${location.name}, ${location.government.name}`);
    setLocationsList(allLocations);
  }

  const handelDestinationOptionClicked = (location) => {
    setSelectedDestinationId(location.id);
    setDestinationSearchValue(`${location.name}, ${location.government.name}`);
    setDestinationsList(allLocations);
  }

  const fetchGovernments = async () => {
    try {
      const response = await fetch('http://localhost:8000/cities/');
      const data = await response.json();
      setAllLocations(data);
      setDestinationsList(data);
      setLocationsList(data);
    } catch (error) {
      console.error('Error fetching governments:', error);
    }
  };

  useEffect(() => {
    fetchGovernments();
  }, []);

  const { t } = useTranslation()
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
            <h1 className='my-3 text-5xl leading-tight font-bold  text-white'>{t('shipping_all_over_egypt')}</h1>
            <span className='text-white text-xl'>{t('request_ride')}</span>
            <div className='py-3 w-full flex flex-col items-start justify-center'>
              <div className='w-full mb-4'>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={locationSearchValue}
                  placeholder={t('enter_location')}
                  onFocus={() => {
                    setLocationsListVisible(() => true)
                  }}
                  onBlur={() => {
                    setTimeout(()=>{
                      setLocationsListVisible(false)
                    }, 300);
                  }}
                  onChange={handelLocationInputChange}
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
                          className="p-4 border-b-2 border-gray-100 relative cursor-pointer hover:bg-gray-100 hover:text-gray-900"
                          onClick={() => handelLocationOptionClicked(location)}
                        >
                          {location?.name}, {location.government?.name}
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
                  value={destinationSearchValue}
                  placeholder={t('enter_destination')}
                  onFocus={() => {
                    setDestinationsListVisible(true)
                  }}
                  onBlur={() => {
                    setTimeout(()=>{
                      setDestinationsListVisible(false)
                    }, 300)
                  }}
                  onChange={handelDestinationInputChange}
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
                          key={location.id}
                          onClick={() => handelDestinationOptionClicked(location)}
                          className="p-4 border-b-2 border-gray-100 relative cursor-pointer hover:bg-gray-100 hover:text-gray-900"
                        >
                          {location?.name}, {location.government?.name}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <Link
                to={`/search?from_id=${selectedLocationId}&to_id=${selectedDestinationId}`}
                className={"bg-white flex justify-center w-1/2 rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 font-semibold text-xl hover:bg-gray-1000"}
              >
              {t('see_prices')}</Link>
            </div>
          </div>
          <div className='w-full justify-end sm:hidden lg:flex'>
            <img
              className='w-auto h-full object-contain'
              src={require(`../assets/images/bg_home_hero.png`)} />
          </div>
        </div>

      </div>

      {/*<------>*<------> Services Section <------->*<------>*/}

      <div className="flex justify-center">
        <div className='p-12 max-w-[1280px] w-full'>
          <h1 className='text-3xl font-bold'>
          {t('our_services')}
          </h1>
          <div className='p-6 gap-3 w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            <div className='p-4 bg-gray-100 rounded-lg flex'>
              <div className='w-3/4 flex flex-col justify-between'>
                <span className='text-xl font-bold mb-2'>{t('for_clients')}</span>
                <span>{t('ship_anything')}</span>

              </div>
              <div className=''>
                <img className='' src={require('../assets/images/icon_car.png')} />
              </div>

            </div>
            <div className='p-4 bg-gray-100 rounded-lg flex'>
              <div className='w-3/4 flex flex-col justify-between'>
                <span className='text-xl font-bold mb-2'>{t('for_drivers')}</span>
                <span>{t('increase_income')}</span>

              </div>
              <div className=''>
                <img className='' src={require('../assets/images/icon_car.png')} />
              </div>

            </div>
            <div className='p-4 bg-gray-100 rounded-lg flex'>
              <div className='w-3/4 flex flex-col justify-between'>
                <span className='text-xl font-bold mb-2'>{t('for_companies')}</span>
                <span>{t('ship_products')} </span>

              </div>
              <div className=''>
                <img className='' src={require('../assets/images/icon_car.png')} />
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
              src={require(`../assets/images/bg_home_hero.png`)} />
          </div>
          <div className='w-full h-full px-6 bg-transparent flex flex-col justify-center items-start'>
            <h1 className='my-3 text-5xl leading-tight font-bold'>
            {t('deliver_when_you_want')}
            </h1>
            <span className='text-xl'>{t('connect_with_clients')}</span>
            <div className='py-3 w-full flex flex-col items-start justify-center'>
              <div className='px-4 py-2 bg-black rounded-lg'>
                <Link to="/register" className="text-white">{t('start_now')}</Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}

export default HomePage;