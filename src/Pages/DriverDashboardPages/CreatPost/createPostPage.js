import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Form from './postForm';
import Preview from './preview';
import {AxiosInstance} from "../../../Network/AxiosInstance";

function CreatePostPage2() {
  const [formData, setFormData] = useState({
    from_government: {},
    from_city: {},
    from_address_line: '',
    to_government: {},
    to_city: {},
    to_address_line: '',
    pickup_time: '',
    arrival_time: '',
    max_weight: '-- Kg',
    max_size: '-- msq',
    description: '',


  });
  const [errors, setErrors] = useState({});
  const [isFormReady, setIsFormReady] = useState(false);
  const [deliveryFEEs, setDeliveryFEEs] = useState(0);
  const [calcDeliveryFeesLoading, setCalcDeliveryFeesLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const navigate = useNavigate();

  const validate = (name, value) => {
    let error = '';
    if (name === 'isFormReady') return '';
    if (!value) {
      error = `${name} is required`;
    } else if ((name === 'from' || name === 'to') && value.length < 2) {
      error = `${name} must be at least 2 characters long`;
    } else if ((name === 'max_weight' || name === 'max_size') && isNaN(value)) {
      error = `${name} must be a number`;
    } else if (
      (name === 'from_government' || name === 'to_government' || name === 'from_city' || name === 'to_city') &&
      (!value['id'])
    )
      return `select ${name}`
    return error;
  };

  // const handleFormChange = (data) => {
  //   setFormData({...formData, isFormReady: false});
  //   setFormData(data);
  // };
  //
  // const handleErrorsChange = (error) => {
  //
  // }
  const handlePreviewClick = () => {
    navigate('/post/:id', {state: formData});
  };

  const handleCalculateFEEs = () => {
    setErrors({isFormReady: false})
    let tempErrors = {}
    let isFormValid = true;
    for (const key in formData) {
      let error = validate(key, formData[key]);
      if (error.length > 0) {
        console.log('form is not valid', key, error)
        isFormValid = false;
      }
      tempErrors[key] = error;
    }

    setErrors({
      ...tempErrors
    });

    if (!isFormValid) return;

    setCalcDeliveryFeesLoading(true);
    const url = `/posts/calculate_fees/`;
    const params = {
      city1_id: formData.from_city.id,
      city2_id: formData.to_city.id,
      max_weight: formData.max_weight,
      max_size: formData.max_size,
    };
    AxiosInstance.get(url, {params}).then((response) => {
      setDeliveryFEEs(response.data.delivery_fees);
      setIsFormReady(true);
      setCalcDeliveryFeesLoading(false)
    }).catch((error) => {
      console.log(error);
      setCalcDeliveryFeesLoading(false)
    })
  }
  const handleSubmit = async () => {
    // try {
    //   const response = await axios.post('https://retoolapi.dev/W1fCKB/data', formData);
    //   console.log('Form submitted successfully:', response.data);
    //   setFormData({});
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    // }
    const url = `/posts/create/`;
    const body = {
      ...formData,
      from_city: formData.from_city.id,
      to_city: formData.to_city.id,
    };
    const params = {
      city1_id: formData.from_city.id,
      city2_id: formData.to_city.id,
      max_weight: formData.max_weight,
      max_size: formData.max_size,
    };
    console.log(body);
    setConfirmLoading(true);
    AxiosInstance.post(
      url,
      body,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          }
      }
    )
    .then(response => {
      //TODO: navigate to post preview
      navigate(`/dashboard/posts/${response.data.data.id}`)
      setConfirmLoading(false);
    })
    .catch((e) => {
      console.log(e);
      setConfirmLoading(false);
    })

    console.log('submit')
  };

  useEffect((old) => {
    setIsFormReady(false)
    setDeliveryFEEs(0.0)
  }, [formData]);

  return (
    <div className="flex space-x-8 p-8">
      <div className="flex-1">
        <Form formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} validate={validate} />
      </div>
      <div className="w-1/3">
        {/*<button className="rounded-full py-1 bg-black text-white w-1/3 btn bs-tooltip-end"*/}
        {/*        onClick={handlePreviewClick}>Preview*/}
        {/*</button>*/}
        <Preview
          formData={formData}
          onSubmit={handleSubmit}
          handleCalculateFEEs={handleCalculateFEEs}
          isFormReady={isFormReady}
          deliveryFEEs={deliveryFEEs}
          isCalcDeliveryLoading={calcDeliveryFeesLoading}
          confirmLoading={confirmLoading}
        />
      </div>
    </div>
  );
}

export default CreatePostPage2;
