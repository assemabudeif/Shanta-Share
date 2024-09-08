import Form from "../../Components/Posts/postForm";
import Preview from "../../Components/Posts/preview";
import React from "react";

function PostDetailsPage(props) {
  return (
    <>
      <div className="flex space-x-8 p-8">
        <div className="flex-1">
          <Form/>
        </div>
        <div className="w-1/3">
          <button className="rounded-full py-1 bg-black text-white w-1/3 btn bs-tooltip-end"
                  >Preview
          </button>
          <Preview formData={}/>
        </div>
      </div>
    </>
  )
}