import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import {Link, Navigate, NavLink, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';


const navigation = [
    { name: 'navbar.discover', href: '/', current: true },
    { name: 'navbar.search', href: '/search', current: false },
    { name: 'navbar.about', href: '/about', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function NavBarComp({ isLoggedIn, onLogout }) {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const hostname = 'http://localhost:8000';

    const isLogin = localStorage.getItem('token') !== null;
    const user_type = localStorage.getItem('user_type') || '';
    const user_image = localStorage.getItem('user_image') || '';

    const handleLogout = () => {
        localStorage.clear();
        // onLogout(); // Notify parent component about logoutep1
        navigate('/login');
    };
    return (
        <Disclosure as="nav" className="bg-black fixed top-0 z-50 w-full h-20">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton
                            className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                        <NavLink to={'/'}>
                            <div className="flex flex-shrink-0 items-center">
                                <h1 className="text-2xl text-white">{t('navbar.shantaShare')}</h1>
                            </div>
                        </NavLink>
                        <div className="hidden sm:ms-6 md:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        aria-current={item.current ? 'page' : undefined}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium',
                                        )}
                                    >
                                        {t(item.name)}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-y-0 right-0 flex items-center pe-2 sm:static sm:inset-auto sm:ms-6 sm:pe-0">
                        <button onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')} className="text-white font-semibold me-3">
                            {i18n.language === 'en' ? 'AR' : 'EN'}
                        </button>
                        {!isLogin ? (
                            <Link to="/login" className="text-white font-semibold">{t('navbar.join')}</Link>


                        ) : (
                            <>
                                <Link
                                    to={`${user_type === 'DRIVER' ? '/driver-dashboard' : user_type === 'CLIENT' ? '/client-dashboard' : '/dashboard'}`}
                                    className="text-white font-semibold">
                                    <div className='h-12 w-12 bg-white rounded-full'>
                                        {
                                            user_image ? <img src={hostname + user_image} alt="profile" className="h-12 w-12 rounded-full" /> : <img src="https://via.placeholder.com/150" alt="profile" className="h-12 w-12 rounded-full" />
                                        }
                                    </div>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-white font-semibold ms-4"
                                >
                                    {t('navbar.logout')}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <DisclosurePanel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as={Link}
                            to={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                    {isLogin && (
                        <DisclosureButton
                            onClick={handleLogout}
                            className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700"
                        >
                            Logout
                        </DisclosureButton>
                    )}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
