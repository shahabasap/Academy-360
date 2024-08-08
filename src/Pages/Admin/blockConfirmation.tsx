import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg text-black">
        <p>{message}</p>
        <div className="flex justify-end mt-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={onClose}>Cancel</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
