import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProfileSidebar from './profileSidebar';
import useRole from '../../../hooks/RoleState';
import ApiController from '../../../Api/apiCalls';
import convertToFormData from '../../../utils/formdataConverter';
import { TeacherProfileFormData, StudentProfileFormData, Experience, Graduation } from '../../../types/commonType';
import { TeacherData, teacherLogin, teacherLogout } from '../../../features/teacher/teacherSlice';
import { userData, userLogin } from '../../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Initial values for form state
const initialTeacherFormState: TeacherProfileFormData = {
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

const initialStudentFormState: StudentProfileFormData = {
  name: '',
  gender: '',
  phone: '',
  photo: null,
};

// Validation functions
const validateTeacher = (values: TeacherProfileFormData) => {
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

const validateStudent = (values: StudentProfileFormData) => {
  const errors: any = {};
  if (!values.name) errors.name = 'Name is required';
  if (!values.gender) errors.gender = 'Gender is required';
  if (!/^\d{10}$/.test(values.phone)) errors.phone = 'Phone number must be exactly 10 digits';
  if (!values.photo) errors.photo = 'Profile photo is required';
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

// Profile Image Preview Component
const ProfileImagePreview: React.FC<{ photo: File | null }> = ({ photo }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (photo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(photo);
    } else {
      setPreviewUrl(null);
    }
  }, [photo]);

  return (
    <div className="mb-4">
      {previewUrl ? (
        <img src={previewUrl} alt="Profile Preview" className="w-32 h-32 rounded-full object-cover" />
      ) : (
        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}
    </div>
  );
};

// Experience Section Component
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
  const dispatch=useDispatch()
  const role = useRole();
  const navigate=useNavigate()
  const user = useSelector(userData);
  const userId = user?._id;
  const teacher=useSelector(TeacherData)
  const teacherId=teacher?._id
  const teacherStatus=teacher?.Approvel.isApproved
  const [formValues, setFormValues] = useState<TeacherProfileFormData | StudentProfileFormData>(
    role === 'Teacher' ? initialTeacherFormState : initialStudentFormState
  );


      useEffect(()=>{
    
        const fetchData=async()=>{
          if(role=="Teacher")
            {
              const teacher=await ApiController.teacherData(teacherId)
            
              if(teacher.status==200)
              {
            
                  dispatch(teacherLogin(teacher.data))
              }
   
            }else if(role=="Student")
            {
             
             const student=await ApiController.studentData(userId)
             if (student.status==200) {
                  dispatch(userLogin(student.data))
             }
            }
        }
        fetchData()
        
      },[])
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
      if ('experiences' in prevState) {
        const updatedExperiences = [...prevState.experiences];
        updatedExperiences[index] = {
          ...updatedExperiences[index],
          [fieldName]: value,
        };
        return { ...prevState, experiences: updatedExperiences };
      }
      return prevState;
    });
  };

  const handleAddExperience = () => {
    setFormValues(prevState => {
      if ('experiences' in prevState) {
        return {
          ...prevState,
          experiences: [
            ...prevState.experiences,
            { institute: '', yearFrom: '', yearTo: '' }
          ],
        };
      }
      return prevState;
    });
  };

  const handleRemoveExperience = (index: number) => {
    setFormValues(prevState => {
      if ('experiences' in prevState) {
        return {
          ...prevState,
          experiences: prevState.experiences.filter((_, i) => i !== index),
        };
      }
      return prevState;
    });
  };

  const handleEducationChange = (section: 'graduation' | 'postGraduation', e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prevState => {
      if (section in prevState) {
        return {
          ...prevState,
          [section]: {
            ...(prevState as any)[section],
            [name.split('.')[1]]: value,
          },
        };
      }
      return prevState;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = role === 'Teacher' 
      ? validateTeacher(formValues as TeacherProfileFormData) 
      : validateStudent(formValues as StudentProfileFormData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const formData = convertToFormData(formValues);
      if (role === 'Teacher') {
        await ApiController.updateTeacherProfile(formData, teacherId);
      } else {
        await ApiController.updateStudentProfile(formData, userId);
      }
      toast.success('Profile updated successfully');
      if(!teacherStatus)
      {
        navigate('teacher/profile/update-profilo')
      }
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-50">
      {teacherStatus ?(<div className='w-20 md:w-64'><ProfileSidebar /></div>):null}
      <div className="flex flex-col w-full pl-20 pt-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-semibold">Profile Management</h2>
          <ProfileImagePreview photo={(formValues as any).photo} />
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
          {role === 'Teacher' && (
            <>
              <ExperienceSection
                data={(formValues as TeacherProfileFormData).experiences}
                handleChange={handleExperienceChange}
                handleAdd={handleAddExperience}
                handleRemove={handleRemoveExperience}
                errors={errors}
              />
              <EducationSection
                sectionName="graduation"
                data={(formValues as TeacherProfileFormData).graduation}
                handleChange={handleEducationChange}
                errors={errors}
              />
              <EducationSection
                sectionName="postGraduation"
                data={(formValues as TeacherProfileFormData).postGraduation}
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
            </>
          )}
          <FileInput
            label="Profile Photo"
            name="photo"
            onChange={handleChange}
            accept=".jpg,.jpeg,.png"
            error={errors['photo']}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileManagement;