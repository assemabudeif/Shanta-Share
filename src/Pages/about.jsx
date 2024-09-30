import React from 'react';
import NavBarComp from '../Components/NavBarComp';
import { useTranslation } from 'react-i18next';

function AboutUs() {
  const { t } = useTranslation();

  return (
    <>
      <NavBarComp />
      <div className="bg-gray-100 text-black py-16">
        <div className="max-w-[1280px] mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">{t('about_us_title')}</h1>
          <p className="mb-8 text-lg">{t('about_us_description')}</p>

          {/* Mission Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold">{t('about_us_mission_title')}</h2>
            <p className="text-lg">{t('about_us_mission_description')}</p>
          </div>

          {/* Values Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold">{t('about_us_values_title')}</h2>
            <ul className="list-disc ml-4 text-lg">
              <li>{t('about_us_value_reliability')}</li>
              <li>{t('about_us_value_safety')}</li>
              <li>{t('about_us_value_efficiency')}</li>
              <li>{t('about_us_value_sustainability')}</li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold">{t('about_us_services_title')}</h2>
            <p className="text-lg">{t('about_us_services_description')}</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default AboutUs;
