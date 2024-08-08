// BlockUnblockConfirmationModal.tsx
import React from 'react';

interface BlockUnblockConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  action: 'block' | 'unblock';
}

const BlockUnblockConfirmationModal: React.FC<BlockUnblockConfirmationModalProps> = ({ isOpen, onClose, onConfirm, action }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-4 rounded-md'>
        <p>Are you sure you want to {action} this teacher?</p>
        <div className='flex justify-end space-x-2 mt-4'>
          <button className='px-4 py-2 bg-gray-300 rounded-md' onClick={onClose}>Cancel</button>
          <button className='px-4 py-2 bg-red-500 text-white rounded-md' onClick={onConfirm}>{action === 'block' ? 'Block' : 'Unblock'}</button>
        </div>
      </div>
    </div>
  );
};

export default BlockUnblockConfirmationModal;
