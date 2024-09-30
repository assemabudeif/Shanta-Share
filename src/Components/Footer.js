import React from 'react';
import { Link } from 'react-router-dom'; 
import { useTranslation } from 'react-i18next';

const Footer = () => {
 const { t } = useTranslation()

  return (
    <footer className="bg-black text-white py-8"> 
      <div className="max-w-[1280px] mx-auto px-4 flex justify-between">
        <div>
          <h3 className="text-2xl font-bold">{t('footer_title')}</h3> 
          &copy; {new Date().getFullYear()} {t('footer_copyright')}
          </div>
        <div className="flex gap-6"> 
        <Link to="/" className="hover:underline text-lg">{t('footer_home')}</Link> 
        <Link to="/about" className="hover:underline text-lg">{t('footer_about')}</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
