import React, {useEffect, useState} from 'react';
import {FaCheck} from 'react-icons/fa';
import {AxiosInstance} from "../Network/AxiosInstance";
import {useSelector} from 'react-redux';
import LoadingComp from './LoadingComp';
import {useNavigate} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const RegistrationForm = () => {
        const [step, setStep] = useState(1);
        const { t, i18n } = useTranslation();
        const [role, setRole] = useState('driver');
        const [formData, setFormData] = useState({
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            birthDate: '',
            mobile: '',
            personalImage: null,
            nationality_id: {
                nationality_id_number: 0, issued_date: "", expiration_date: "", front_image_url: "", back_image_url: ""
            },
            driver_license_ids: [{
                license_number: "", issued_date: "", expiration_date: "", front_image_url: "", back_image_url: ""
            }],
            car_ids: [{
                make: "", model: "", year: 0
            }]
        });
        const [errors, setErrors] = useState({});
        const [successMessage, setSuccessMessage] = useState('');
        const [governments, setGovernments] = useState([]);
        const [cities, setCities] = useState([]);
        const loader = useSelector(state => state.loader.loader);
        const navigate = useNavigate();


        //------------------------------------------------------------
        const fetchGovernments = async () => {
            try {
                const response = await fetch('http://localhost:8000/governments/');
                const data = await response.json();
                setGovernments(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching governments:', error);
            }
        };

        useEffect(() => {
            fetchGovernments();
        }, []);

        useEffect(() => {
            if (formData.government) {
                // Fetch cities based on the selected government
                fetch(`http://localhost:8000/cities?government_id=${formData.government}`)
                    .then(response => response.json())
                    .then(data => setCities(data))
                    .catch(error => console.error('Error fetching cities:', error));
            }
        }, [formData.government]);
        //------------------------------------------------------------

        // ========   Regular Expression and Data Validation   ==========


        const regex = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
            name: /^[a-zA-Z]+$/,
            address: /^[a-zA-Z0-9\s,'-]+$/,
            city: /^[a-zA-Z0-9\s]+$/,
            mobile: /^[0-9]{10,15}$/,
            government: /^[a-zA-Z0-9\s]+$/,
            vehicle: /^[a-zA-Z0-9\s,'-]+$/,
        };

        const validateField = (name, value) => {
            let error = '';
            switch (name) {
                case 'email':
                    if (!value) {
                        error = t('Email is required.');
                    } else if (!regex.email.test(value)) {
                        error = t('Invalid email address.');
                    }
                    break;
                case 'password':
                    if (!value) {
                        error = t('Password is required.');
                    } else if (!regex.password.test(value)) {
                        error = t('Password must be at least 6 characters long, include at least one number, one lowercase letter, and one uppercase letter.');;
                    }
                    break;
                case 'confirmPassword':
                    if (!value) {
                        error = t('Confirm Password is required.');;
                    } else if (value !== formData.password) {
                        error = t('Passwords do not match.');
                    }
                    break;
                case 'firstName':
                case 'lastName':
                    if (!value) {
                        error = t('This field is required.');
                    } else if (!regex.name.test(value)) {
                        error = t('Name must contain only letters.');
                    }
                    break;
                case 'address':
                    if (!value) {
                        error = t('Address is required.');
                    } else if (!regex.address.test(value)) {
                        error = t('Address is not valid.');
                    }
                    break;
                case 'vehicle':
                    if (!value) {
                        error = t('Vehicle information is required.');
                    } else if (!regex.vehicle.test(value)) {
                        error = t('Vehicle information is not valid.');
                    }
                    break;
                case 'city':
                    if (!value) {
                        error = t('City is required.');
                    } else if (!regex.city.test(value)) {
                        error = t('City must contain only letters.');
                    }
                    break;
                case 'mobile':
                    if (!value) {
                        error = t('Mobile number is required.');
                    } else if (!regex.mobile.test(value)) {
                        error = t('Government name is not valid.');
                    }
                    break;
                case 'government':
                    if (!value) {
                        error = t('Government field is required.');
                    } else if (!regex.government.test(value)) {
                        error = t('Government name is not valid.');
                    }
                    break;

                case 'idImage':
                case 'personalImage':
                case 'licenseImage':
                    if (!value) {
                        error = t('This field is required.');
                    }
                    break;
                default:
                    break;
            }
            return error;
        };


        // ==================== Handle Input =====================


        const handleChange = async (e) => {
            const name = e.target.name;
            const value = e.target.value;
            const type = e.target.type;
            const files = e.target.files;
            let error = '';

            if (type === 'file') {
                console.log('File:', convertImageToBase64(files[0]));

                setFormData({...formData, [name]: await convertImageToBase64(files[0])});
            } else {
                setFormData({...formData, [name]: value});
                error = validateField(name, value);
            }
            setErrors({...errors, [name]: error});
        };

        const handleNationalityIdChange = async (e) => {
            const name = e.target.name;
            const value = e.target.value;
            const type = e.target.type;
            const files = e.target.files;

            if (type === 'file') {
                setFormData({
                    ...formData, nationality_id: {
                        ...formData.nationality_id, [name]: await convertImageToBase64(files[0])
                    }
                });
            } else setFormData({
                ...formData, nationality_id: {
                    ...formData.nationality_id, [name]: value
                }
            });
        };

        const handleDriverLicenseIdsChange = async (e) => {
            const name = e.target.name;
            const value = e.target.value;
            const files = e.target.files;
            let form = formData;
            switch (name) {
                case 'license_number':
                    form.driver_license_ids[0].license_number = value;

                    break;
                case 'issued_date':
                    form.driver_license_ids[0].issued_date = value;
                    break;
                case 'expiration_date':
                    form.driver_license_ids[0].expiration_date = value;
                    break;
                case 'front_image_url':
                    form.driver_license_ids[0].front_image_url = await convertImageToBase64(files[0]);
                    break;
                case 'back_image_url':
                    form.driver_license_ids[0].back_image_url = await convertImageToBase64(files[0]);
                    break;
                default:
                    console.log('default');
                    break;
            }
            console.log(form);
            setFormData({
                ...form
            });
        }

        const handleCarIdsChange = async (e) => {
            const name = e.target.name;
            const value = e.target.value;
            let form = formData;
            switch (name) {
                case 'make':
                    console.log(value);
                    form.car_ids[0].make = value;
                    break;
                case 'model':
                    form.car_ids[0].model = value;
                    break;
                case 'year':
                    form.car_ids[0].year = value;
                    break;
                default:
                    console.log('default');
            }

            setFormData({
                ...form
            });
        };


// ================== Steps Validation ==========================


// Handle Step Navigation
        const handleNext = (e) => {
            e.preventDefault();
            let errorMessages = {};

            if (!role) errorMessages.role = 'Role is required.';
            if ((role === 'driver' && step < 6) && Object.values(errorMessages).every(msg => msg === '')) {
                setStep(step + 1);
                console.log(step);
                return
            }

            if (step === 2) {
                errorMessages = {
                    ...errorMessages,
                    email: validateField('email', formData.email),
                    password: validateField('password', formData.password),
                    confirmPassword: validateField('confirmPassword', formData.confirmPassword),
                    firstName: validateField('firstName', formData.firstName),
                    lastName: validateField('lastName', formData.lastName),
                };
            } else if (step === 3) {
                if (role === 'client') {
                    errorMessages = {
                        ...errorMessages,
                        address: validateField('address', formData.address),
                        city: validateField('city', formData.city),
                        age: validateField('age', formData.birthDate),
                        mobile: validateField('mobile', formData.mobile),
                    };
                } else if (role === 'driver') {
                    errorMessages = {
                        ...errorMessages,
                        address: validateField('address', formData.address),
                        city: validateField('city', formData.city),
                        mobile: validateField('mobile', formData.mobile),
                        government: validateField('government', formData.government),
                        vehicle: validateField('vehicle', formData.vehicle),
                        personalImage: validateField('personalImage', formData.personalImage),
                        idImage: validateField('idImage', formData.idImage),
                        licenseImage: validateField('licenseImage', formData.licenseImage),
                    };
                }
            }
            setErrors(errorMessages);
            if (Object.values(errorMessages).every(msg => msg === '')) {
                setStep(step + 1);
            }

        };


// =======  handle back buttonon ======

        const handlePrev = () => {
            if (step > 1) {
                setStep(step - 1);
            }
        };


// =======  Submit button ======


        const handleSubmit = (e) => {
            e.preventDefault();
            if (step === 4 && role === 'client') {
                ClientRegistration();
            } else if (role === 'driver' && step === 6) {
                DriverRegistration();
            }
        };


        const ClientRegistration = () => {
            try {
                AxiosInstance.post('/auth/client-register', {
                    "email": formData.email,
                    "password": formData.password,
                    "name": `${formData.firstName} ${formData.lastName}`,
                    "profile_picture": formData.personalImage,
                    "city_ids": [formData.city],
                    "phone_numbers": [{
                        "phone_number": formData.mobile
                    }],
                    "address_line": formData.address,
                    "birth_date": formData.birthDate
                }).then((response) => {

                    if (response.status === 201) {
                        navigate('/login');
                    } else {
                        console.error(response.data);
                    }
                })
            } catch (error) {

                console.error(error);
            }

        }

        const DriverRegistration = () => {
            try {
                AxiosInstance.post('/auth/driver-register', {
                    "email": formData.email,
                    "password": formData.password,
                    "name": `${formData.firstName} ${formData.lastName}`,
                    "profile_picture": formData.personalImage,
                    "city_ids": [formData.city],
                    "phone_numbers": [{
                        "phone_number": formData.mobile
                    },],
                    "address_line": formData.address,
                    "birth_date": formData.birthDate,
                    "nationality_id": {
                        "nationality_id_number": formData.nationality_id.nationality_id_number,
                        "issued_date": formData.nationality_id.issued_date,
                        "expiration_date": formData.nationality_id.expiration_date,
                        "front_image_url": formData.nationality_id.front_image_url,
                        "back_image_url": formData.nationality_id.back_image_url
                    },
                    "driver_license_ids": [{
                        "license_number": formData.driver_license_ids[0].license_number,
                        "issued_date": formData.driver_license_ids[0].issued_date,
                        "expiration_date": formData.driver_license_ids[0].expiration_date,
                        "front_image_url": formData.driver_license_ids[0].front_image_url,
                        "back_image_url": formData.driver_license_ids[0].back_image_url,
                    }],
                    "car_ids": [{
                        "make": formData.car_ids[0].make,
                        "model": formData.car_ids[0].model,
                        "year": formData.car_ids[0].year
                    }]

                }).then((response) => {

                    if (response.status === 201) {
                        navigate('/login');
                    } else {
                        console.error(response.data);
                    }
                })
            } catch (error) {

                console.error(error);
            }

        }

        const renderAlert = (field) => (errors[field] ? (
            <div className="text-red-600 text-sm mt-1">{errors[field]}</div>) : null);


// ============== Confirmation Before user submit    ================

        const renderConfirmation = () => (<div>
                <h2 className="text-2xl font-bold mb-4">{t('confirmDetails')}</h2>
                <div className="space-y-4">
                    <div>
                        <strong>{t('email')}</strong> {formData.email}
                    </div>
                    <div>
                        <strong>{t('name')}</strong> {formData.firstName} {formData.lastName}
                    </div>
                    <div>
                        <strong>{t('birthDate')}</strong> {formData.birthDate}
                    </div>
                    <div>
                        <strong>{t('address')}</strong> {formData.address}, {formData.city}, {formData.government}
                    </div>
                    <div>
                        <strong>{t('mobile')}</strong> {formData.mobile}
                    </div>
                    {/*{role === 'driver' && (<>*/}
                    {/*    <div>*/}
                    {/*        <strong>Vehicle:</strong> {formData.vehicle}*/}
                    {/*    </div>*/}
                    {/* <div>
              <strong>Personal Image:</strong> {formData.personalImage ? formData.personalImage.name : 'Not uploaded'}
            </div>
            <div>
              <strong>ID Image:</strong> {formData.idImage ? formData.idImage.name : 'Not uploaded'}
            </div>
            <div>
              <strong>License ID Image:</strong> {formData.licenseImage ? formData.licenseImage.name : 'Not uploaded'}
            </div> */}

                    {/*</>)}*/}
                </div>
                {successMessage ? (<div className="mb-4 p-4 rounded-lg bg-yellow-100 text-yellow-700">
                    {successMessage}
                </div>) : (<div className="flex justify-between mt-10">
                    <button
                        type="button"
                        onClick={() => setStep(role === 'driver' ? 5 : 3)}
                        className="bg-gray-400 text-white py-2 px-4 rounded-lg"
                    >
                                                {t('back')}

                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-black text-white py-2 px-4 rounded-lg"
                    >
                        {t('confirm')}
                        </button>
                </div>)}
            </div>

        )

        const convertImageToBase64 = (image) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        };

// =============== Driver License Ids render ================

        const renderNationalityId = () => {
            return (
                <div>
                    <h2 className="text-2xl font-bold mb-4">{t('nationalityId')}</h2>
                    <form onSubmit={handleNext}>
                        <div className="space-y-4">
                            {role === 'driver' && (
                                <>
                                    <div>
                                        <label className="block text-gray-700 mb-2">{t('nationalityIdNumber')}</label>
                                        <input
                                            type="number"
                                            name="nationality_id_number"
                                            value={formData.nationality_id.nationality_id_number}
                                            onChange={handleNationalityIdChange}
                                            required
                                            className="border rounded-lg py-2 px-4 w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">{t('nationalityIdIssuedDate')}</label>
                                        <input
                                            type="date"
                                            name="issued_date"
                                            value={formData.nationality_id.issued_date}
                                            required
                                            onChange={handleNationalityIdChange}
                                            className="border rounded-lg py-2 px-4 w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">{t('nationalityIdExpirationDate')}</label>
                                        <input
                                            type="date"
                                            name="expiration_date"
                                            value={formData.nationality_id.expiration_date}
                                            required
                                            onChange={handleNationalityIdChange}
                                            className="border rounded-lg py-2 px-4 w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">{t('frontImage')}</label>
                                        <input
                                            type="file"
                                            name="front_image_url"
                                            required
                                            onChange={handleNationalityIdChange}
                                            className="border rounded-lg py-2 px-4 w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">{t('backImage')}</label>
                                        <input
                                            type="file"
                                            name="back_image_url"
                                            required
                                            onChange={handleNationalityIdChange}
                                            className="border rounded-lg py-2 px-4 w-full"
                                        />
                                    </div>
                                </>
                            )}
                            <div className="flex justify-between mt-10">
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    className="bg-gray-400 text-white py-2 px-4 rounded-lg"
                                >
                                    {t('back')}
                                </button>
                                <button
                                    type="submit"
                                    className="bg-black text-white py-2 px-4 rounded-lg"
                                >
                                    {t('next')}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
        const renderDriverLicenseIds = () => {
            return (
                <div>
                    <h2 className="text-2xl font-bold mb-4">{t('driverLicense')}</h2>
                    <form onSubmit={handleNext}>
                        <div className="space-y-4">
                            {role === 'driver' && (
                                <>
                                    <div>
                                        <label className="block text-gray-700 mb-2">{t('licenseNumber')}</label>
                                        <input
                                            type="number"
                                            name="license_number"
                                            value={formData.driver_license_ids[0].license_number}
                                            onChange={handleDriverLicenseIdsChange}
                                            required
                                            className="border rounded-lg py-2 px-4 w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">{t('licenseIssuedDate')}</label>
                                        <input
                                            type="date"
                                            name="issued_date"
                                            value={formData.driver_license_ids[0].issued_date}
                                            required
                                            onChange={handleDriverLicenseIdsChange}
                                            className="border rounded-lg py-2 px-4 w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">{t('licenseExpirationDate')}</label>
                                        <input
                                            type="date"
                                            name="expiration_date"
                                            value={formData.driver_license_ids[0].expiration_date}
                                            required
                                            onChange={handleDriverLicenseIdsChange}
                                            className="border rounded-lg py-2 px-4 w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">{t('frontImage')}</label>
                                        <input
                                            type="file"
                                            name="front_image_url"
                                            required
                                            onChange={handleDriverLicenseIdsChange}
                                            className="border rounded-lg py-2 px-4 w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">{t('backImage')}</label>
                                        <input
                                            type="file"
                                            name="back_image_url"
                                            required
                                            onChange={handleDriverLicenseIdsChange}
                                            className="border rounded-lg py-2 px-4 w-full"
                                        />
                                    </div>
                                </>
                            )}
                            <div className="flex justify-between mt-10">
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    className="bg-gray-400 text-white py-2 px-4 rounded-lg"
                                >
                                    {t('back')}
                                </button>
                                <button
                                    type="submit"
                                    className="bg-black text-white py-2 px-4 rounded-lg"
                                >
                                    {t('next')}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }

// ============== Landing Page ================
        if (loader) {
            return <LoadingComp/>
        }

        return (<div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-16">
            <button onClick={() => console.log(formData)}>
            </button>
            <div className="flex items-center mb-8">
                {role === 'client' ? ['Role Selection', 'Login Info', 'Client Info', 'Confirmation'].map((text, index) => (
                    <React.Fragment key={index}>
                        <div
                            className={`w-12 h-12 flex items-center justify-center rounded-full ${step >= index + 1 ? 'bg-black text-white' : 'bg-gray-300 text-gray-700'}`}>
                            {step > index + 1 ? <FaCheck/> : index + 1}
                        </div>
                        {index < 3 && <div className="w-1/4 h-1 bg-gray-300"></div>}
                    </React.Fragment>)) : ['Role Selection', 'Login Info', 'Driver Info', 'Nationality Info', 'License Info', 'Confirmation'].map((text, index) => (
                    <React.Fragment key={index}>
                        <div
                            className={`w-12 h-10 flex items-center justify-center rounded-full ${step >= index + 1 ? 'bg-black text-white' : 'bg-gray-300 text-gray-700'}`}>
                            {step > index + 1 ? <FaCheck/> : index + 1}
                        </div>
                        {index < 5 && <div className="w-1/6 h-1 bg-gray-300"></div>}
                    </React.Fragment>))}
            </div>
            {step === 1 && (<div>
                <h2 className="text-2xl font-bold mb-4">{t('Select Your Role')}</h2>
                <div className="flex flex-col items-center space-y-4">
                    <button
                        type="button"
                        onClick={() => setRole('client')}
                        className={`text-2xl px-4 py-2 rounded-lg ${role === 'client' ? 'bg-black text-white' : 'bg-gray-200'}`}
                    >
                                                    {t('Client')}

                    </button>
                    <button
                        type="button"
                        onClick={() => setRole('driver')}
                        className={`text-2xl px-4 py-2 rounded-lg ${role === 'driver' ? 'bg-black text-white' : 'bg-gray-200'}`}
                    >
                            {t('Driver')}
                            </button>
                    {renderAlert('role')}
                </div>
                <div className="flex justify-end mt-10">
                    <button
                        type="button"
                        onClick={handleNext}
                        className="bg-black text-white py-2 px-4 rounded-lg"
                    >
                            {t('Next')}
                            </button>
                </div>

            </div>)}

            {step === 2 && (<div>
                <h2 className="text-2xl font-bold mb-4">{t('Enter Your Login Information')}</h2>
                <form onSubmit={handleNext}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-2">{t('First Name')}</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="border rounded-lg py-2 px-4 w-full"
                            />
                            {renderAlert('firstName')}
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">{t('Last Name')}</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="border rounded-lg py-2 px-4 w-full"
                            />
                            {renderAlert('lastName')}
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">{t('Email')}</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border rounded-lg py-2 px-4 w-full"
                            />
                            {renderAlert('email')}
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">{t('Password')}</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="border rounded-lg py-2 px-4 w-full"
                            />
                            {renderAlert('password')}
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">{t('Confirm Password')}</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="border rounded-lg py-2 px-4 w-full"
                            />
                            {renderAlert('confirmPassword')}
                        </div>
                        <div className="flex justify-between mt-10">
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="bg-gray-400 text-white py-2 px-4 rounded-lg"
                            >
                                    {t('Back')}
                                    </button>
                            <button
                                type="submit"
                                className="bg-black text-white py-2 px-4 rounded-lg"
                            >
                                    {t('Next')}
                                    </button>
                        </div>
                    </div>
                </form>
            </div>)}

            {step === 3 && (<div>
                <h2 className="text-2xl font-bold mb-4">{role === 'client' ? t('Client Information') : t('Driver Information')}</h2>                <form onSubmit={handleNext}>
                    <div className="space-y-4">
                        {role === 'client' && (<>
                            <div>
                                <label className="block text-gray-700 mb-2">{t('Government')}</label>
                                <select
                                    name="government"
                                    value={formData.government}
                                    onChange={handleChange}
                                    className="border rounded-lg py-2 px-4 w-full"
                                >
                                    <option value="">{t('Select a Government')}</option>
                                    {governments.map((gov) => (<option key={gov.id} value={gov.id}>
                                        {gov.name}
                                    </option>))}
                                </select>
                                {renderAlert('government')}
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">{t('City')}</label>
                                {/*<input*/}
                                {/*  type="text"*/}
                                {/*  name="city"*/}
                                {/*  value={formData.city}*/}
                                {/*  onChange={handleChange}*/}
                                {/*  className="border rounded-lg py-2 px-4 w-full"*/}
                                {/*/>*/}
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="border rounded-lg py-2 px-4 w-full"
                                    disabled={!formData.government} // Disable if no government is selected
                                >
                                    <option value="">{t('Select a city')}</option>
                                    {cities.map(city => (<option key={city.id} value={city.id}>
                                        {city.name}
                                    </option>))}
                                </select>
                                {renderAlert('city')}
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">{t('Address')}</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="border rounded-lg py-2 px-4 w-full"
                                />
                                {renderAlert('address')}
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">{t('Birth Date')}</label>
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                    className="border rounded-lg py-2 px-4 w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">{t('Mobile Number')}</label>
                                <input
                                    type="text"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    className="border rounded-lg py-2 px-4 w-full"
                                />
                                {renderAlert('mobile')}
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">{t('Personal Image')}</label>
                                <input
                                    type="file"
                                    name="personalImage"
                                    onChange={handleChange}
                                    className="border rounded-lg py-2 px-4 w-full"
                                />
                                {renderAlert('personalImage')}
                            </div>
                        </>)}
                        {role === 'driver' && (<>
                            <div>
                                <label className="block text-gray-700 mb-2">{t('Government')}</label>
                                <select
                                    name="government"
                                    value={formData.government}
                                    onChange={handleChange}
                                    className="border rounded-lg py-2 px-4 w-full"
                                >
                                    <option value="">{t('Select a Government')}</option>
                                    {governments.map((gov) => (<option key={gov.id} value={gov.id}>
                                        {gov.name}
                                    </option>))}
                                </select>
                                {renderAlert('government')}
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">{t('City')}</label>
                                {/*<input*/}
                                {/*  type="text"*/}
                                {/*  name="city"*/}
                                {/*  value={formData.city}*/}
                                {/*  onChange={handleChange}*/}
                                {/*  className="border rounded-lg py-2 px-4 w-full"*/}
                                {/*/>*/}
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="border rounded-lg py-2 px-4 w-full"
                                    disabled={!formData.government} // Disable if no government is selected
                                >
                                    <option value="">{t('Select a city')}</option>
                                    {cities.map(city => (<option key={city.id} value={city.id}>
                                        {city.name}
                                    </option>))}
                                </select>
                                {renderAlert('city')}
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">{t('Address')}</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="border rounded-lg py-2 px-4 w-full"
                                />
                                {renderAlert('address')}
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">{t('Birth Date')}</label>
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                    className="border rounded-lg py-2 px-4 w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">{t('Mobile Number')}</label>
                                <input
                                    type="text"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    className="border rounded-lg py-2 px-4 w-full"
                                />
                                {renderAlert('mobile')}
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">{t('Personal Image')}</label>
                                <input
                                    type="file"
                                    name="personalImage"
                                    onChange={handleChange}
                                    className="border rounded-lg py-2 px-4 w-full"
                                />
                                {renderAlert('personalImage')}
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">{t('Car Brand')}</label>
                                <input
                                    type="text"
                                    name="make"
                                    value={formData.car_ids[0].make}
                                    onChange={handleCarIdsChange}
                                    className="border rounded-lg py-2 px-4 w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">{t('Car Model')}</label>
                                <input
                                    type="text"
                                    name="model"
                                    value={formData.car_ids[0].model}
                                    onChange={handleCarIdsChange}
                                    className="border rounded-lg py-2 px-4 w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">{t('Car Year')}</label>
                                <input
                                    type="number"
                                    name="year"
                                    value={formData.car_ids[0].year}
                                    onChange={handleCarIdsChange}
                                    className="border rounded-lg py-2 px-4 w-full"
                                />
                            </div>

                        </>)}
                        <div className="flex justify-between mt-10">
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="bg-gray-400 text-white py-2 px-4 rounded-lg"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="bg-black text-white py-2 px-4 rounded-lg"
                            >
                                Next
                            </button>
                        </div>

                    </div>
                </form>
            </div>)}

            {(step === 4 && role === 'client') && renderConfirmation()}

            {step === 4 && role === 'driver' && renderNationalityId()}

            {(step === 5 && role === 'driver') && renderDriverLicenseIds()}

            {(step === 6 && role === 'driver') && renderConfirmation()}
        </div>);
    }
;

export default RegistrationForm;
