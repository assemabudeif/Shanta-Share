import React from 'react';

function Preview({ formData, onSubmit }) {
    const handleInputChange=()=>{

    }
  return (
    <div className="p-6 bg-white-50 shadow-md rounded-lg space-y-4 preview flex flex-col justify-between h-full">
      {/* <h3 className="text-xl font-semibold mb-4">Preview</h3> */}
      <div className='space-y-4'>
      <div className="space-y-2">
        <strong className="block">Pickup</strong>
        <p className='color-text'>{formData.pickupAddress|| 'Address line'},{formData.from || 'Government'}, {formData.pickupCity || 'City'}</p>
        <p className='color-text'>{formData.pickupTime || 'DD/MM/YYYY - HH:MM'}</p>
      </div>
      <div className="space-y-2">
        <strong className="block">Destination</strong>
        <p className='color-text'>{formData.destinationAddress|| 'Address line'},{formData.to || 'Government'}, {formData.destinationCity || 'City'}</p>
        <p className='color-text'>{formData.arrivalTime || 'DD/MM/YYYY - HH:MM'}</p>
      </div>
      <div className="space-y-2">
        <strong className="block">Available weight and size</strong>
        <div className='flex items-center space-x-20'>
        <p className='color-text input-with-icon-weight2'>{formData.weight || '10.0 kg'}</p>
        <p className='color-text input-with-icon-area2'>{formData.size || '2.0 msq'}</p>
        </div>
      </div>
      <div className="space-y-2">
        <strong className="block">Description</strong>
        <p className='color-text'>{formData.description || 'Write notes for clients...'}</p>
      </div>
      </div>
      <div className="mt-auto space-y-4">
        <div className="flex items-center space-x-2">
          <strong className="block text-lg w-2/3 fee">Delivery FEE</strong>
          <button class="rounded-full py-2 px-4 bg-black text-white w-1/3" onChange={handleInputChange}>Calculate Price</button>
          {/* <button className="w-full py-2 px-4 bg-black text-white rounded">Calculate Price</button> */}
        </div>
        <hr />
        <button className="w-full py-2 px-4 bg-gray-400 text-white rounded" onClick={onSubmit}>Confirm Post</button>
      </div>
    </div>
  );
}

export default Preview;
