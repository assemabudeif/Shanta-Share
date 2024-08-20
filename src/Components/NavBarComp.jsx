import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const navigation = [
  { name: 'Discover', href: '/', current: true },
  { name: 'Search', href: '/search', current: false },
  { name: 'Contact Us', href: '/contact-us', current: false },
  { name: 'About', href: '/about', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBarComp({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    onLogout(); // Notify parent component about logout
    navigate('/loginStep1');
  };

  return (
    <Disclosure as="nav" className="bg-black fixed top-0 w-full h-20">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <h1 className="text-2xl text-white">Shanta Share</h1>
            </div>
            <div className="hidden sm:ml-6 md:block">
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
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button className="text-white font-semibold mr-3">AR</button>
            {!isLoggedIn ? (
              <Link to="/loginStep1" className="text-white font-semibold">Join</Link>
            ) : (
              <button
                onClick={handleLogout}
                className="text-white font-semibold ml-4"
              >
                Logout
              </button>
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
          {isLoggedIn && (
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
