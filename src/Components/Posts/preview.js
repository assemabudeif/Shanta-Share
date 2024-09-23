import React from 'react';
import { useTranslation } from 'react-i18next';
function Preview({onSubmit, formData, handleCalculateFEEs, isFormReady, deliveryFEEs}) {
  const { t, i18n } = useTranslation();
    const handleInputChange=()=>{

    }

  return (
    <div className="p-6 bg-white-50 shadow-md rounded-lg space-y-4 preview flex flex-col justify-between h-full">
      {/* <h3 className="text-xl font-semibold mb-4">Preview</h3> */}
      <div className='space-y-4'>
      <div className="space-y-2">
        <strong className="block">{t("preview.Pickup")}</strong>
        <p className='color-text'>{formData.from_address_line|| t('preview.Address line')}, {formData.from_city?.name ?? t('preview.City')}, {formData.from_government?.name ?? t('preview.Government')}</p>
        <p className='color-text'>{formData.pickup_time || 'DD/MM/YYYY - HH:MM'}</p>
      </div>
      <div className="space-y-2">
        <strong className="block">{t("preview.Destination")}</strong>
        <p className='color-text'>{formData.to_address_line|| t('preview.Address line')}, {formData.to_city?.name ?? t('preview.City')}, {formData.to_government?.name ?? t('preview.Government')} </p>
        <p className='color-text'>{formData.arrival_time  || 'DD/MM/YYYY - HH:MM'}</p>
      </div>
      <div className="space-y-2">
        <strong className="block">{t("preview.Available weight and size")}</strong>
        <div className='flex items-center space-x-20'>
        <p className='color-text input-with-icon-weight2'>{formData.max_weight || '10.0 kg'}</p>
        <p className='color-text input-with-icon-area2'>{formData.max_size || '2.0 msq'}</p>
        </div>
      </div>
      <div className="space-y-2">
        <strong className="block">{t("preview.Description")}</strong>
        <p className='color-text'>{formData.description || t('preview.Write notes for clients...')}</p>
      </div>
      </div>
      <div className="mt-auto space-y-4">
        <div className="flex items-center space-x-2">
          <strong className="block text-lg w-2/3 fee">{deliveryFEEs || '-- L.E'}</strong>
          <button class={`rounded-full py-2 px-4  text-white w-1/3 ${!isFormReady ? 'bg-black' : 'bg-gray-500'} `} onClick={handleCalculateFEEs} disabled={isFormReady}>{t("preview.Calculate Price")}</button>
          {/* <button className="w-full py-2 px-4 bg-black text-white rounded">Calculate Price</button> */}
        </div>
        <hr />
        <button className={`w-full py-2 px-4  text-white rounded-full ${isFormReady ? 'bg-black' : 'bg-gray-500'}  `} disabled={!isFormReady} onClick={onSubmit}>{t("preview.Confirm Post")}</button>
      </div>
    </div>
  );
}

export default Preview;
