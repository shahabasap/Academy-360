import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (classroomId: string) => void;
}

const JoinClassroomModal: React.FC<ModalProps> = ({ isOpen, onClose, onJoin }) => {
  // Define validation schema using Yup
  const validationSchema = Yup.object({
    classroomId: Yup.string()
      .trim()
      .required('Classroom ID is required')
      .min(3, 'Classroom ID must be at least 3 characters'),
  });

  // Initial form values
  const initialValues = {
    classroomId: '',
  };

  // Handle form submission
  const handleSubmit = (values: { classroomId: string }) => {
    onJoin(values.classroomId);
    onClose();
  };

  // Add/remove no-scroll class to body when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Clean up on component unmount
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-4">Join Classroom</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Classroom ID</label>
                <Field
                  type="text"
                  name="classroomId"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter classroom ID"
                />
                <ErrorMessage
                  name="classroomId"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  {isSubmitting ? 'Joining...' : 'Join'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>,
    document.body
  );
};

export default JoinClassroomModal;
