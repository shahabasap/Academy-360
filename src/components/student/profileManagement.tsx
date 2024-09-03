import * as Yup from 'yup';
import { useFormik, FormikProvider, FieldArray } from 'formik';
import React from 'react';
import ProfileSidebar from '../StudentAndTeacher/profile/profileSidebar';
import useRole from '../../hooks/RoleState';
import { StudentProfileFormData, StudentProfileManagementProps } from '../../types/commonType';

const formatDate = (date: Date | string | undefined) => {
  if (!date) return '';
  return typeof date === 'string' ? date : date.toISOString().split('T')[0];
};

const parseDate = (dateStr: string) => {
  return dateStr ? new Date(dateStr) : undefined;
};

// Validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Name is required'),
  gender: Yup.string().required('Gender is required'),
  phone: Yup.string()
    .trim()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  graduation: Yup.array().of(
    Yup.object().shape({
      college: Yup.string().trim().required('College is required'),
      course: Yup.string().trim().required('Course is required'),
      yearFrom: Yup.date().required('Start date is required'),
      yearTo: Yup.date().required('End date is required'),
      certificate: Yup.mixed().required('Certificate is required'),
    })
  ),
  photo: Yup.mixed().required('Profile photo is required'),
});

// Main component
const ProfileManagement: React.FC<any> = ({ onSubmit }) => {
  const role = useRole();

  const formik = useFormik<StudentProfileFormData>({
    initialValues: {
      username: '',
      name: '',
      gender: '',
      phone: '',
      password: '',
      graduation: [{ college: '', course: '', yearFrom: '', yearTo: '', certificate: null }],
      photo: null,
    },
    validationSchema,
    onSubmit: (values) => {
     
      try {
        onSubmit(values); // Pass the form values to the onSubmit prop
        // setStatus({ success: true });
        console.log('Submitting:', values);
      } catch (error) {
        console.error('Submission failed:', error);
        // setStatus({ success: false, message: 'Failed to submit form' });
      } finally {
        // setSubmitting(false);
      }
    },
  });

  const { values, handleChange, handleSubmit, setFieldValue, errors, touched } = formik;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const files = e.target.files;
    if (files && index !== undefined) {
      setFieldValue(`graduation.${index}.certificate`, files[0]);
    } else if (files) {
      setFieldValue('photo', files[0]);
    }
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-50">
      <div className="w-64">
        <ProfileSidebar />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-center items-center w-full mt-8">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Teacher Profile</h2>
            <FormikProvider value={formik}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Photo */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border mb-2 bg-gray-200 flex items-center justify-center">
                      {values.photo ? (
                        <img
                          src={URL.createObjectURL(values.photo)}
                          alt="Profile"
                          className="rounded-full w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </div>
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-32 h-32 rounded-full"
                    />
                  </div>
                </div>

                {/* Input Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="block text-gray-600 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-md"
                      required
                    />
                    {errors.name && touched.name && (
                      <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="block text-gray-600 mb-1">Gender</label>
                    <select
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-md"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {errors.gender && touched.gender && (
                      <div className="text-red-500 text-sm mt-1">{errors.gender}</div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="block text-gray-600 mb-1">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-md"
                    />
                    {errors.phone && touched.phone && (
                      <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
                    )}
                  </div>
                  
                </div>


                {/* Graduation Fields */}
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Graduation</h3>
                  <FieldArray name="graduation">
                    {({ push, remove }) => (
                      <>
                        {values.graduation.map((grad, index) => (
                          <div key={index} className="mb-4 border p-4 rounded-md">
                            <div className="flex flex-col mb-2">
                              <label className="block text-gray-600 mb-1">College</label>
                              <input
                                type="text"
                                name={`graduation.${index}.college`}
                                value={grad.college}
                                onChange={handleChange}
                                className="p-3 border border-gray-300 rounded-md"
                              />
                              {errors.graduation && errors.graduation[index] && touched.graduation && touched.graduation[index] && (
                                <div className="text-red-500 text-sm mt-1">{(errors.graduation as any)[index]?.college}</div>
                              )}
                            </div>
                            <div className="flex flex-col mb-2">
                              <label className="block text-gray-600 mb-1">Course</label>
                              <input
                                type="text"
                                name={`graduation.${index}.course`}
                                value={grad.course}
                                onChange={handleChange}
                                className="p-3 border border-gray-300 rounded-md"
                              />
                              {errors.graduation && errors.graduation[index] && touched.graduation && touched.graduation[index] && (
                                <div className="text-red-500 text-sm mt-1">{(errors.graduation as any)[index]?.course}</div>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-2">
                              <div className="flex flex-col">
                                <label className="block text-gray-600 mb-1">From</label>
                                <input
                                  type="date"
                                  name={`graduation.${index}.yearFrom`}
                                  value={formatDate(grad.yearFrom)}
                                  onChange={(e) => setFieldValue(`graduation.${index}.yearFrom`, parseDate(e.target.value))}
                                  className="p-3 border border-gray-300 rounded-md"
                                />
                              </div>
                              <div className="flex flex-col">
                                <label className="block text-gray-600 mb-1">To</label>
                                <input
                                  type="date"
                                  name={`graduation.${index}.yearTo`}
                                  value={formatDate(grad.yearTo)}
                                  onChange={(e) => setFieldValue(`graduation.${index}.yearTo`, parseDate(e.target.value))}
                                  className="p-3 border border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            <div className="flex flex-col mb-2">
                              <label className="block text-gray-600 mb-1">Certificate</label>
                              <input
                                type="file"
                                name={`graduation.${index}.certificate`}
                                onChange={(e) => handleFileChange(e, index)}
                                className="p-3 border border-gray-300 rounded-md"
                              />
                              {errors.graduation && errors.graduation[index] && touched.graduation && touched.graduation[index] && (
                                <div className="text-red-500 text-sm mt-1">{(errors.graduation as any)[index]?.certificate}</div>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove Graduation
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => push({ college: '', course: '', yearFrom: '', yearTo: '', certificate: null })}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Add Graduation
                        </button>
                      </>
                    )}
                  </FieldArray>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </form>
            </FormikProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
