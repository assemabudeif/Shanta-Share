import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from './postForm';
import Preview from './preview';

function CreatePostPage() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleFormChange = (data) => {
    setFormData(data);
  };

  const handlePreviewClick = () => {
    // Navigate to the PostDetailsPage and pass formData as state
    navigate('/post/:id', { state: formData });
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://retoolapi.dev/W1fCKB/data', formData);
      console.log('Form submitted successfully:', response.data);
      // Clear the form and preview after successful submission
      setFormData({});
      // Optionally, display a success message or redirect
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error notification here
    }
  };

  return (
    <div className="flex space-x-8 p-8">
      <div className="flex-1">
        <Form onFormChange={handleFormChange} />
      </div>
      <div className="w-1/3">
      <button class="rounded-full py-1 bg-black text-white w-1/3 btn bs-tooltip-end" onClick={handlePreviewClick} >Preview</button>
      <Preview formData={formData} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default CreatePostPage;
