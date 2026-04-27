import React from "react";
import { FaTimes } from "react-icons/fa";
import ModalWrapperCenter from "../../../partials/modals/ModalWrapperCenter";

const ModalViewMemo = ({ item, handleClose }) => {
  return (
    <ModalWrapperCenter
      handleClose={handleClose}
      className="rounded p-8 w-[600px] max-h-[80vh] overflow-y-auto"
    >
      <button
        type="button"
        className="absolute top-3 right-4 text-gray-400 hover:text-gray-600"
        onClick={handleClose}
      >
        <FaTimes />
      </button>

      <div className="mb-6 space-y-2 text-sm">
        <div className="flex gap-2">
          <span className="font-bold w-24">To:</span>
          <span>{item.memo_to}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold w-24">From:</span>
          <span>{item.memo_from}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold w-24">Date:</span>
          <span>{item.memo_date}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold w-24">Category:</span>
          <span>{item.memo_category}</span>
        </div>
      </div>

      <hr className="mb-4" />

      <div className="text-sm whitespace-pre-wrap leading-relaxed">
        {item.memo_text}
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="px-4 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-dark hover:bg-gray-50"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </ModalWrapperCenter>
  );
};

export default ModalViewMemo;
