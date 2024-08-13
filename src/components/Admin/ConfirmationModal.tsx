import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white rounded-lg shadow-lg p-6 max-w-sm mx-4'>
        <h2 className='text-lg font-semibold mb-4'>Confirm Logout</h2>
        <p className='mb-6'>Are you sure you want to log out?</p>
        <div className='flex justify-end space-x-4'>
          <button
            className='bg-gray-300 text-gray-800 px-4 py-2 rounded'
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded'
            onClick={onConfirm}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
