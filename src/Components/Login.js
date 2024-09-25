import {useState} from 'react';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {AxiosInstance} from "../Network/AxiosInstance";
import {useSelector} from "react-redux";
import LoadingComp from "./LoadingComp";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
    // const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
    const passwordRegex = /^.{,6}$/;
    const [loginError, setLoginError] = useState('');
    const [role, setRole] = useState('client');
    const loader = useSelector(state => state.loader.loader);
    const userTypes = {
        client: 'CLIENT',
        driver: 'DRIVER',
        admin: 'ADMIN'
    };

    // const [isChecked, setIsChecked] = useState(false)

    // const handleCheckboxChange = () => {
    //     setIsChecked(!isChecked)
    // }

    // Function to validate input and navigate
    const handleLogin = (e) => {
        e.preventDefault();
        // if (emailRegex.test(email) && passwordRegex.test(password)) {
        // if (role === 'client') {
        //     ClientLogin();
        // } else if (role === 'driver') {
        //     DriverLogin();
        // }
        // }
        Login();
    };

    const Login = () => {
        AxiosInstance.post('/auth/login', {
            username: email,
            password: password
        }).then(r => {
            const type = r.data.user.user_type;
            SaveToken(r.data.access_token);
            console.log(r.data);
            localStorage.setItem('user_type', type);
            localStorage.setItem('user_image', r.data.user.profile_picture);
            localStorage.setItem('username', r.data.user.name);
            switch (type) {
                case userTypes.admin:
                    navigate("/dashboard");
                    break;
                case userTypes.client:
                    navigate("/");
                    break;
                case userTypes.driver:
                    navigate("/driver_home");
                    break;
                default:
                    break;
            }
        }).catch(e => {
            if (e.response.status === 401) {
                setLoginError('Unauthorized');
            } else if (e.response.status === 404) {
                setLoginError('Check your credentials and try again');
            } else {
                setLoginError(e.response.data.message + ' try again');
            }
        })
    }

    const ClientLogin = () => {
        AxiosInstance.post('/auth/client-login', {
            email: email,
            password: password
        }).then(r => {
            console.log(r);
            SaveToken(r.data.access_token);
            localStorage.setItem('user_type', r.data.client.user_type);
            navigate('/');
        }).catch(e => {
            if (e.response.status === 401) {
                setLoginError('Unauthorized');
            } else if (e.response.status === 404) {
                setLoginError('Check your credentials and try again');
            } else {
                setLoginError(e.response.statusText + ' try again');
            }
        })
    };


    const DriverLogin = () => {
        AxiosInstance.post('/auth/driver-login', {
            email: email,
            password: password
        }).then(r => {
            console.log(r);
            SaveToken(r.data.access_token);
            localStorage.setItem('user_type', r.data.driver.user_type);
            navigate('/driver_home');
        }).catch(e => {
            if (e.response.status === 401) {
                setLoginError('Unauthorized');
            } else if (e.response.status === 404) {
                setLoginError('Check your credentials and try again');
            } else {
                setLoginError(e.response.statusText + ' try again');
            }
        })
    };

    const SaveToken = (token) => {
        localStorage.setItem('token', token);
    }

    // Redirect to the registration page
    const handleRedirect = () => {
        navigate('/register');
    };

    const HandleChange = (e) => {
        const {name, value} = e.target;
        if (name === 'email') {
            if (value.includes('@')) {
                if (!emailRegex.test(value)) {
                    setErrors({email: 'Please enter a valid email address. Example: user@example.com'});
                } else {
                    setErrors({email: ''});
                }
            } else {
                if (!usernameRegex.test(value)) {
                    setErrors({email: 'Please enter a valid username. Minimum 3 characters'});
                } else {
                    setErrors({email: ''});
                }
            }
            setEmail(value);
        } else if (name === 'password') {
            // if (!passwordRegex.test(value)) {
            //     setErrors({password: 'Please enter a valid password. Minimum eight characters, at least one letter and one number'});
            // } else {
            //     setErrors({password: ''});
            // }
            setPassword(value);
        }
    }

    if (loader) {
        return <LoadingComp/>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="flex flex-col items-center text-center bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-semibold mb-6">Welcome Back</h1>
                {/*<div className="flex items-center mb-6">*/}
                {/*    <label className="block text-sm font-medium text-gray-700 mr-4">Login as</label>*/}
                {/*    <button type="button"*/}
                {/*            className={`text-sm font-medium text-gray-700 mr-8 ${role === 'client' ? 'border-b-2 border-blue-500' : ''} transition duration-300 ease-in-out`}*/}
                {/*            onClick={() => {*/}
                {/*                setRole('client');*/}
                {/*            }}*/}
                {/*    >*/}
                {/*        Client*/}
                {/*    </button>*/}
                {/*    <button type="button"*/}
                {/*            className={`text-sm font-medium text-gray-700 mr-8 ${role === 'driver' ? 'border-b-2 border-blue-500' : ''} transition duration-300 ease-in-out`}*/}
                {/*            onClick={() => {*/}
                {/*                setRole('driver');*/}
                {/*            }}*/}
                {/*    >*/}
                {/*        Driver*/}
                {/*    </button>*/}
                {/*</div>*/}
                <form onSubmit={handleLogin}>
                    <input
                        value={email}
                        onChange={HandleChange}
                        type="text"
                        name="email"
                        placeholder="Enter email or Username"
                        className="px-4 py-2 border rounded-md w-full mb-6 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        required
                        title="Please fill in this field."
                    />
                    {errors['email'] && <div className="text-red-500 mb-4">{errors['email']}</div>}
                    <input
                        value={password}
                        name="password"
                        onChange={HandleChange}
                        type="password"
                        placeholder="Enter password"
                        className="px-4 py-2 border rounded-md w-full mb-6 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        required
                        title="Please fill in this field."
                    />
                    {errors['password'] && <div className="text-red-500 mb-4">{errors['password']}</div>}

                    <button
                        type="submit"
                        className="bg-black text-white py-2 px-4 rounded-md w-full mb-4 hover:bg-gray-800 transition-colors"
                        // disabled={errors.email !== "" || errors.password !== ""}
                    >
                        Login
                    </button>

                    {loginError && <div className="text-red-500 mb-4">{loginError}</div>}
                </form>

                <p className="mb-2">You don't have an account?</p>
                <button
                    type="button"
                    onClick={handleRedirect}
                    className="text-blue-600 hover:underline"
                >
                    Sign up here
                </button>
            </div>
        </div>
    );
};

export default Login;
