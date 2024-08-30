import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { subject: string; description: string }) => void;
}

const CreateClassroom: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  // Define validation schema using Yup
  const validationSchema = Yup.object({
    subject: Yup.string()
      .trim()
      .required('Subject is required')
      .min(3, 'Subject must be at least 3 characters'),
    description: Yup.string()
      .trim()
      .required('Description is required')
      .min(10, 'Description must be at least 10 characters'),
  });

  // Initial form values
  const initialValues = {
    subject: '',
    description: '',
  };

  // Handle form submission
  const handleSubmit = (values: { subject: string; description: string }) => {
    onSubmit(values);
    onClose();
  };

  // Manage body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Clean up on component unmount
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-4">Create New Classroom</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Subject</label>
                <Field
                  type="text"
                  name="subject"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter subject name"
                />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Description</label>
                <Field
                  as="textarea"
                  name="description"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter description"
                />
                <ErrorMessage
                  name="description"
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
                  {isSubmitting ? 'Creating...' : 'Create'}
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

export default CreateClassroom;
