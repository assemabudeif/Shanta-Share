import React, {useEffect, useState} from 'react';
import '../../CSS/createPost.css';
import { useTranslation } from 'react-i18next';


// import weightImage from "../assets/images/weight.png";


function Form({setFormData, formData, errors, setErrors, validate}) {

  const [pickupGovernments, setPickupGovernments] = useState([]);
  const [pickupCities, setPickupCities] = useState([]);
  const [arrivalGovernments, setArrivalGovernments] = useState([]);
  const [arrivalCities, setArrivalCities] = useState([]);
  const { t, i18n } = useTranslation();


  // const [formData, setFormData] = useState({
  //   from_city: '',
  //   from_address_line: '',
  //   to_city: '',
  //   to_address_line: '',
  //   pickup_time: '',
  //   arrival_time: '',
  //   max_weight: '-- Kg',
  //   max_size: '-- msq',
  //   description: ''
  // });


  const fetchGovernments = async () => {
    try {
      const response = await fetch('http://localhost:8000/governments/');
      const data = await response.json();
      setPickupGovernments(data);
      setArrivalGovernments(data);
    } catch (error) {
      console.error('Error fetching governments:', error);
    }
  };

  const handleChange = (e) => {
    const {name, value} = e.target;

    // Validate the input
    const error = validate(name, value);

    // Update form data and errors
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleChangeObject = (e) => {
    const {name, value} = e.target;
    console.log(name, value)
    // Validate the input
    const error = validate(name, JSON.parse(value));

    // Update form data and errors
    setFormData({
      ...formData,
      [name]: JSON.parse(value)
    });
    setErrors({
      ...errors,
      [name]: error
    });
  }

  useEffect(() => {
    fetchGovernments();
  }, []);

  useEffect(() => {
    console.log(formData)
    setFormData({...formData, from_city: {}});
    setPickupCities([]);
    if (formData.from_government?.id) {
      // Fetch cities based on the selected government
      console.log(`http://localhost:8000/cities?government_id=${formData.from_government.id}`);
      fetch(`http://localhost:8000/cities?government_id=${formData.from_government.id}`)
        .then(response => response.json())
        .then(data => setPickupCities(data))
        .catch(error => console.error('Error fetching cities:', error));
    }

  }, [formData.from_government]);
  useEffect(() => {
    setFormData({...formData, to_city: {}});
    setArrivalCities([]);
    if (formData.to_government?.id) {
      // Fetch cities based on the selected government
      console.log(`http://localhost:8000/cities?government_id=${formData.to_government?.id}`)
      fetch(`http://localhost:8000/cities?government_id=${formData.to_government?.id}`)
        .then(response => response.json())
        .then(data => setArrivalCities(data))
        .catch(error => console.error('Error fetching cities:', error));
    }
  }, [formData.to_government]);

  return (
    <>
      <div className="p-6 rounded-lg space-y-4">
        <h1 className="text-2xl font-semibold mb-10 titlePost">{t('createPostPage.createPost')}</h1>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium titleLocation">{t('createPostPage.pickupLocation')}</label>
            <div className="flex space-x-2">
              {/*<input*/}
              {/*  type="text"*/}
              {/*  name="from"*/}
              {/*  value={formData.from}*/}
              {/*  onChange={handleChange}*/}
              {/*  placeholder="Government"*/}
              {/*  className={`background w-1/2 p-2 border border-gray-300 rounded ${errors.from ? 'border-red-500' : ''}`}*/}
              {/*/>*/}
              <select
                name="from_government"
                value={JSON.stringify(formData.from_government)}
                onChange={handleChangeObject}
                className={`background w-1/2 p-2 border border-gray-300 rounded ${errors.from ? 'border-red-500' : ''}`}
              >
                <option value={JSON.stringify({})}>{t('createPostPage.selectGovernment')}</option>
                {pickupGovernments?.map((gov, index) => (<option key={gov.id} value={JSON.stringify(gov)}>
                  {gov.name}
                </option>))}
              </select>

              <select
                name="from_city"
                value={JSON.stringify(formData.from_city)}
                onChange={handleChangeObject}
                className={`background w-1/2 p-2 border border-gray-300 rounded ${errors.pickupCity ? 'border-red-500' : ''}`}
                disabled={!formData.from_government} // Disable if no government is selected
              >
                <option value={JSON.stringify({})}>{t('createPostPage.selectcity')}</option>
                {pickupCities.map((city) => (
                  <option key={city.id} value={JSON.stringify(city)}>
                    {city.name}
                  </option>
                ))}
              </select>
              {/*<input*/}
              {/*  type="text"*/}
              {/*  name="pickupCity"*/}
              {/*  value={formData.pickupCity}*/}
              {/*  onChange={handleChange}*/}
              {/*  placeholder="City"*/}
              {/*  className={`background w-1/2 p-2 border border-gray-300 rounded ${errors.pickupCity ? 'border-red-500' : ''}`}*/}
              {/*/>*/}
            </div>
            {errors.from_government && <div className="w-[50%] inline-block"><span className="text-red-500 text-sm w-1/2">{errors.from_government}</span></div>}
            {errors.from_city && <div className="w-[50%] inline-block"><span className="text-red-500 text-sm w-1/2">{errors.from_city}</span></div>}
            <input
              type="text"
              name="from_address_line"
              value={formData.from_address_line}
              onChange={handleChange}
              placeholder="Address line"
              className={`background w-full p-2 border rounded ${errors.from_address_line ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.from_address_line && <p className="text-red-500 text-sm">{errors.from_address_line}</p>}
          </div>

          <div className="space-y-2">
            <label className="flex text-sm font-medium titleLocation w-1/2">{t('createPostPage.pickupTime')}</label>
            <input
              type="datetime-local"
              name="pickup_time"
              value={formData.pickup_time}
              onChange={handleChange}
              className={`background w-1/2 p-2 border  rounded ${errors.pickup_time ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.pickup_time && <p className="text-red-500 text-sm">{errors.pickup_time}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium titleLocation">{t('createPostPage.destinationLocation')}</label>
            <div className="flex space-x-2">
              {/*<input*/}
              {/*  type="text"*/}
              {/*  name="to"*/}
              {/*  value={formData.to}*/}
              {/*  onChange={handleChange}*/}
              {/*  placeholder="Government"*/}
              {/*  className={`background w-1/2 p-2 border border-gray-300 rounded ${errors.to ? 'border-red-500' : ''}`}*/}
              {/*/>*/}
              {/*<input*/}
              {/*  type="text"*/}
              {/*  name="destinationCity"*/}
              {/*  value={formData.destinationCity}*/}
              {/*  onChange={handleChange}*/}
              {/*  placeholder="City"*/}
              {/*  className={`background w-1/2 p-2 border border-gray-300 rounded ${errors.destinationCity ? 'border-red-500' : ''}`}*/}
              {/*/>*/}

              <select
                name="to_government"
                value={JSON.stringify(formData.to_government)}
                onChange={handleChangeObject}
                className={`background w-1/2 p-2 border rounded ${errors.to_government ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value={JSON.stringify({})}>{('createPostPage.selectGovernment')}</option>
                {arrivalGovernments.map((gov, index) => (<option key={gov.id} value={JSON.stringify(gov)}>
                  {gov.name}
                </option>))}
              </select>

              <select
                name="to_city"
                value={JSON.stringify(formData.to_city)}
                onChange={handleChangeObject}
                className={`background w-1/2 p-2 border rounded ${errors.to_city ? 'border-red-500' : 'border-gray-300'}`}
                disabled={!formData.to_government} // Disable if no government is selected
              >
                <option value={JSON.stringify({})}>{('createPostPage.selectcity')}</option>
                {arrivalCities.map((city) => (<option key={city.id} value={JSON.stringify(city)}>
                  {city.name}
                </option>))}
              </select>

            </div>
            {errors.to_government && <div className="w-[50%] inline-block"><span className="text-red-500 text-sm w-1/2">{errors.to_government}</span></div>}
            {errors.to_city && <div className="w-[50%] inline-block"><span className="text-red-500 text-sm w-1/2">{errors.to_city}</span></div>}
            <input
              type="text"
              name="to_address_line"
              value={formData.to_address_line}
              onChange={handleChange}
              placeholder="Address line"
              className={`background w-full p-2 border rounded ${errors.to_address_line ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.to_address_line && <p className="text-red-500 text-sm">{errors.to_address_line}</p>}
          </div>

          <div className="space-y-2">
            <label className="flex w-1/2 text-sm font-medium titleLocation">{('createPostPage.arrivalTime')}</label>
            <input
              type="datetime-local"
              name="arrival_time"
              value={formData.arrival_time}
              onChange={handleChange}
              className={`background w-1/2 p-2 border rounded ${errors.arrival_time ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.arrival_time && <p className="text-red-500 text-sm">{errors.arrival_time}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium titleLocation">{t('createPostPage.availableWeightandSize')}</label>
          <div className="flex space-x-2">
            <input
              type="text"
              name="max_weight"
              value={formData.max_weight}
              placeholder="10.0 kg"
              onChange={handleChange}
              className={`background w-1/2 p-2 border rounded ${errors.max_weight ? 'border-red-500' : ' border-gray-300'}`}
            />
            <input
              type="text"
              name="max_size"
              value={formData.max_size}
              placeholder="2.0 msq"
              onChange={handleChange}
              className={` background w-1/2 p-2 border  rounded ${errors.max_size ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          {errors.max_weight && <p className="text-red-500 text-sm">{errors.max_weight}</p>}
          {errors.max_size && <p className="text-red-500 text-sm">{errors.max_size}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium titleLocation">{t('createPostPage.description')}</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write notes for clients..."
            className={`decription background w-full p-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300 '}`}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>
      </div>
    </>
  );
}

export default Form;
