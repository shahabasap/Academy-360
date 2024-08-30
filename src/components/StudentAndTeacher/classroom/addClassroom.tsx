import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ApiController from '../../../Api/apiCalls';
import { useSelector } from 'react-redux';
import { userData } from '../../../features/user/userSlice';
import { toast } from 'react-toastify';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;

  
}


const AddClassroomModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const validationSchema = Yup.object({
    classroomId: Yup.string()
      .trim()
      .required('Classroom ID is required')
      .min(3, 'Classroom ID must be at least 3 characters'),
  });

  const student=useSelector(userData)

  const initialValues = { classroomId: '' };

  const handleSubmit =async (values: { classroomId: string }) => {
    try {
      const {classroomId}=values
      const studentId=student._id
      const classroom= await ApiController.AddClassroomsToStudentBucket(classroomId,studentId)
      
      if(classroom.status==200)
      {
        toast.success("You were added to the classroom succcessfully")
      }

      
    } catch (error:any) {
      console.log(error)
      toast.error(`${error.response.data.error}`)

    }
    
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);

  if (!isOpen) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

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
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >
                  Join
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default AddClassroomModal;
