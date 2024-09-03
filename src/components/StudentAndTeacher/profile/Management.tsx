import React, { useState } from 'react';
import ProfileSidebar from './profileSidebar';
import useRole from '../../../hooks/RoleState';
import ApiController from '../../../Api/apiCalls';
import convertToFormData from '../../../utils/formdataConverter';
import { TeacherProfileFormData, Experience, Graduation } from '../../../types/commonType';
import { useSelector } from 'react-redux';
import { TeacherData } from '../../../features/teacher/teacherSlice';
import { toast } from 'react-toastify';

// Initial values for form state
const initialFormState: TeacherProfileFormData = {
  name: '',
  gender: '',
  phone: '',
  experiences: [{ institute: '', yearFrom: '', yearTo: '' }],
  graduation: { college: '', course: '', yearFrom: '', yearTo: '' },
  postGraduation: { college: '', course: '', yearFrom: '', yearTo: '' },
  ugCertificate: null,
  pgCertificate: null,
  photo: null,
};

// Validation functions
const validate = (values: TeacherProfileFormData) => {
  const errors: any = {};

  if (!values.name) errors.name = 'Name is required';
  if (!values.gender) errors.gender = 'Gender is required';
  if (!/^\d{10}$/.test(values.phone)) errors.phone = 'Phone number must be exactly 10 digits';
  if (!values.photo) errors.photo = 'Profile photo is required';

  values.experiences.forEach((exp, index) => {
    if (!exp.institute) errors[`experiences[${index}].institute`] = 'Institute is required';
    if (!exp.yearFrom) errors[`experiences[${index}].yearFrom`] = 'Start date is required';
    if (!exp.yearTo) errors[`experiences[${index}].yearTo`] = 'End date is required';
  });

  if (!values.graduation.college) errors['graduation.college'] = 'College is required';
  if (!values.graduation.course) errors['graduation.course'] = 'Course is required';
  if (!values.graduation.yearFrom) errors['graduation.yearFrom'] = 'Start date is required';
  if (!values.graduation.yearTo) errors['graduation.yearTo'] = 'End date is required';

  if (values.postGraduation.college || values.postGraduation.course || values.postGraduation.yearFrom || values.postGraduation.yearTo) {
    if (!values.postGraduation.college) errors['postGraduation.college'] = 'College is required';
    if (!values.postGraduation.course) errors['postGraduation.course'] = 'Course is required';
    if (!values.postGraduation.yearFrom) errors['postGraduation.yearFrom'] = 'Start date is required';
    if (!values.postGraduation.yearTo) errors['postGraduation.yearTo'] = 'End date is required';
  }

  return errors;
};

// Input Field Component
const InputField: React.FC<{ label: string, name: string, value: string, onChange: React.ChangeEventHandler<HTMLInputElement>, type?: string, error?: string }> = ({ label, name, value, onChange, type = 'text', error }) => (
  <div className="flex flex-col">
    <label className="block text-gray-600 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`border p-2 rounded ${error ? 'border-red-500' : ''}`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// File Input Component
const FileInput: React.FC<{ label: string, name: string, onChange: React.ChangeEventHandler<HTMLInputElement>, accept: string, error?: string }> = ({ label, name, onChange, accept, error }) => (
  <div className="flex flex-col">
    <label className="block text-gray-600 mb-1">{label}</label>
    <input
      type="file"
      name={name}
      accept={accept}
      onChange={onChange}
      className={`border p-2 rounded ${error ? 'border-red-500' : ''}`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// Section Component for experiences
const ExperienceSection: React.FC<{
  data: Experience[];
  handleChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAdd: () => void;
  handleRemove: (index: number) => void;
  errors: Record<string, string>;
}> = ({
  data,
  handleChange,
  handleAdd,
  handleRemove,
  errors
}) => (
  <div className="space-y-4">
    {data.map((item, index) => (
      <div key={index} className="border p-4 rounded-lg bg-gray-100">
        <h3 className="text-lg font-semibold">{`Experience ${index + 1}`}</h3>
        <InputField
          label="Institute"
          name={`experiences[${index}].institute`}
          value={item.institute}
          onChange={(e) => handleChange(index, e)}
          error={errors[`experiences[${index}].institute`]}
        />
        <InputField
          label="Start Date"
          name={`experiences[${index}].yearFrom`}
          value={item.yearFrom}
          onChange={(e) => handleChange(index, e)}
          type="date"
          error={errors[`experiences[${index}].yearFrom`]}
        />
        <InputField
          label="End Date"
          name={`experiences[${index}].yearTo`}
          value={item.yearTo}
          onChange={(e) => handleChange(index, e)}
          type="date"
          error={errors[`experiences[${index}].yearTo`]}
        />
        <button
          type="button"
          onClick={() => handleRemove(index)}
          className="text-red-500"
        >
          Remove
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={handleAdd}
      className="bg-blue-500 text-white py-2 px-4 rounded"
    >
      Add Experience
    </button>
  </div>
);

// Education Section Component
const EducationSection: React.FC<{
  sectionName: 'graduation' | 'postGraduation';
  data: Graduation;
  handleChange: (section: 'graduation' | 'postGraduation', e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
}> = ({ sectionName, data, handleChange, errors }) => (
  <div className="border p-4 rounded-lg bg-gray-100">
    <h3 className="text-lg font-semibold">{sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}</h3>
    <InputField
      label="College"
      name={`${sectionName}.college`}
      value={data.college}
      onChange={(e) => handleChange(sectionName, e)}
      error={errors[`${sectionName}.college`]}
    />
    <InputField
      label="Course"
      name={`${sectionName}.course`}
      value={data.course}
      onChange={(e) => handleChange(sectionName, e)}
      error={errors[`${sectionName}.course`]}
    />
    <InputField
      label="Start Date"
      name={`${sectionName}.yearFrom`}
      value={data.yearFrom}
      onChange={(e) => handleChange(sectionName, e)}
      type="date"
      error={errors[`${sectionName}.yearFrom`]}
    />
    <InputField
      label="End Date"
      name={`${sectionName}.yearTo`}
      value={data.yearTo}
      onChange={(e) => handleChange(sectionName, e)}
      type="date"
      error={errors[`${sectionName}.yearTo`]}
    />
  </div>
);

// Main component
const ProfileManagement: React.FC = () => {
  const role = useRole();
  const user = useSelector(TeacherData);
  const userId = user._id;
  const [formValues, setFormValues] = useState<TeacherProfileFormData>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    if (type === 'file' && files) {
      const file = files[0];
      setFormValues(prevState => ({ ...prevState, [name]: file || null }));
    } else {
      setFormValues(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name.split('.')[1];
    setFormValues(prevState => {
      const updatedExperiences = [...prevState.experiences];
      updatedExperiences[index] = {
        ...updatedExperiences[index],
        [fieldName]: value,
      };
      return { ...prevState, experiences: updatedExperiences };
    });
  };

  const handleAddExperience = () => {
    setFormValues(prevState => ({
      ...prevState,
      experiences: [
        ...prevState.experiences,
        { institute: '', yearFrom: '', yearTo: '' }
      ],
    }));
  };

  const handleRemoveExperience = (index: number) => {
    setFormValues(prevState => ({
      ...prevState,
      experiences: prevState.experiences.filter((_, i) => i !== index),
    }));
  };

  const handleEducationChange = (section: 'graduation' | 'postGraduation', e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [name.split('.')[1]]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const formData = convertToFormData(formValues);
      await ApiController.updateTeacherProfile(formData, userId);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  return (
    <div className="flex">
      {/* <ProfileSidebar /> */}
      <main className="p-8 w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-semibold">Profile Management</h2>
          <InputField
            label="Name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            error={errors.name}
          />
          <InputField
            label="Gender"
            name="gender"
            value={formValues.gender}
            onChange={handleChange}
            error={errors.gender}
          />
          <InputField
            label="Phone"
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
            type="tel"
            error={errors.phone}
          />
          <ExperienceSection
            data={formValues.experiences}
            handleChange={handleExperienceChange}
            handleAdd={handleAddExperience}
            handleRemove={handleRemoveExperience}
            errors={errors}
          />
          <EducationSection
            sectionName="graduation"
            data={formValues.graduation}
            handleChange={handleEducationChange}
            errors={errors}
          />
          <EducationSection
            sectionName="postGraduation"
            data={formValues.postGraduation}
            handleChange={handleEducationChange}
            errors={errors}
          />
          <FileInput
            label="UG Certificate"
            name="ugCertificate"
            onChange={handleChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            error={errors['ugCertificate']}
          />
          <FileInput
            label="PG Certificate"
            name="pgCertificate"
            onChange={handleChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            error={errors['pgCertificate']}
          />
          <FileInput
            label="Profile Photo"
            name="photo"
            onChange={handleChange}
            accept=".jpg,.jpeg,.png"
            error={errors['photo']}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </form>
      </main>
    </div>
  );
};

export default ProfileManagement;
