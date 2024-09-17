import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProfileSidebar from './profileSidebar';
import useRole from '../../../hooks/RoleState';
import ApiController from '../../../Api/apiCalls';
import convertToFormData from '../../../utils/formdataConverter';
import { TeacherProfileFormData, StudentProfileFormData, Experience, Graduation, FormState } from '../../../types/commonType';
import { selectTeacher, TeacherData } from '../../../features/teacher/teacherSlice';
import { userData } from '../../../features/user/userSlice';
import useUserData from '../../../hooks/useUserData ';


// Validation functions
const validateTeacher = (values: TeacherProfileFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!values.name) errors.name = 'Name is required';
  if (!values.gender) errors.gender = 'Gender is required';
  if (!/^\d{10}$/.test(values.phone)) errors.phone = 'Phone number must be exactly 10 digits';
  // if (!values.photo) errors.photo = 'Profile photo is required';

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

const validateStudent = (values: StudentProfileFormData): Record<string, string> => {
  const errors: Record<string, string> = {};
  if (!values.name) errors.name = 'Name is required';
  if (!values.gender) errors.gender = 'Gender is required';
  if (!/^\d{10}$/.test(values.phone)) errors.phone = 'Phone number must be exactly 10 digits';
  // if (!values.photo) errors.photo = 'Profile photo is required';
  return errors;
};
// Input Field Component
const InputField: React.FC<{ 
  label: string, 
  name: string, 
  value: string, 
  onChange: React.ChangeEventHandler<HTMLInputElement>, 
  type?: string, 
  error?: string 
}> = ({ label, name, value, onChange, type = 'text', error }) => (
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
const FileInput: React.FC<{ 
  label: string, 
  name: string, 
  onChange: React.ChangeEventHandler<HTMLInputElement>, 
  accept: string, 
  error?: string 
}> = ({ label, name, onChange, accept, error }) => (
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
const ProfileImagePreview: React.FC<{ photo: File | null,url:string }> = ({ photo,url }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(url);

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
    if(url)
    {
      setPreviewUrl(url)
    }
  }, [photo,url]);

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
  data = [],
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
      value={data.college ? data.college:''}
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
      value={data?.yearTo}
      onChange={(e) => handleChange(sectionName, e)}
      type="date"
      error={errors[`${sectionName}.yearTo`]}
    />
  </div>
);

const ProfileManagement: React.FC = () => {
  const role = useRole();
  const { user, showSidebar } = useUserData(role as string)
  const teacher = useSelector(TeacherData);
  const teacherId = teacher._id;
  const student = useSelector(userData);
  const studentId = student._id;
 
  // Type guard for Teacher profile data
  const isTeacher = (user: FormState | null): user is TeacherProfileFormData => {
    return role === 'Teacher' && user !== null;
  };

 
  const [formValues, setFormValues] = useState<FormState>(() => {
    if (role === 'Teacher') {
      return {
        name: user?.name || '',
        gender: user?.gender || '',
        phone: user?.phone || '',
        experiences: [{ institute: '', yearFrom: '', yearTo: '' }],
        graduation: { college: '', course: '', yearFrom: '', yearTo: '' },
        postGraduation: { college: '', course: '', yearFrom: '', yearTo: '' },
        ugCertificate: null,
        pgCertificate: null,
        photo: null,
        photourl: '',
        pgurl: '',
        ugurl: ''
      } as TeacherProfileFormData;
    } else {
      // Default to Student type if not Teacher
      return {
        name: user?.name || '',
        gender: user?.gender || '',
        phone: user?.phone || '',
        photo: null,
        photourl: user?.photo || ''
      } as StudentProfileFormData;
    }
  });

  useEffect(() => {
    if (user) {
      setFormValues((prev) => {
        if (role === 'Teacher' && isTeacher(user)) {
          return {
            name: user.name || '',
            gender: user.gender || '',
            phone: user.phone || '',
            experiences: user.experiences.map(exp => ({
              institute: exp.institute || '',
              yearFrom: exp.yearFrom.split('T')[0], // Remove time part
              yearTo: exp.yearTo.split('T')[0]
            })),
            graduation: {
              college: user.graduation.college || '',
              course: user.graduation.course || '',
              yearFrom: user.graduation.yearFrom.split('T')[0],
              yearTo: user.graduation.yearTo.split('T')[0]
            },
            postGraduation: {
              college: user.postGraduation.college || '',
              course: user.postGraduation.course  ||'',
              yearFrom: user.postGraduation.yearFrom.split('T')[0],
              yearTo: user.postGraduation.yearTo.split('T')[0]
            },
            ugCertificate: null,
            pgCertificate: null,
            photo: null,
            photourl: user.photo || '',
            pgurl: user.pgCertificate || '',
            ugurl: user.ugCertificate || ''
          } as FormState;
        } else if (role === 'Student') {
          return {
            name: user.name || '',
            gender: user.gender || '',
            phone: user.phone || '',
            photo: null,
            photourl: user.photo || ''
          } as FormState;
        }
        return prev as FormState;
      });
    }
  }, [user, role]);

 
   
  const CertificatePreview: React.FC<{ file: File | null; url: string }> = ({ file, url }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
    useEffect(() => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else if (url) {
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    }, [file, url]);
  
    return (
      <div className="mb-4">
        {previewUrl ? (
          <embed src={previewUrl}  className="w-full h-64 border rounded-lg" />
        ) : (
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            No Certificate Selected
          </div>
        )}
      </div>
    );
  };

 
  const [errors, setErrors] = useState<Record<string, string>>({});
 
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    if (type === 'file' && files) {
      const file = files[0];
      setFormValues(prevState => ({ ...prevState, [name]: file || null }));
    } else {
      setFormValues(prevState => ({ ...prevState, [name]: value }));
    }
  }, []);

  const handleExperienceChange = useCallback((index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name.split('.')[1];
    setFormValues(prevState => {
      if ('experiences' in prevState) {
        const updatedExperiences = [...prevState.experiences];
        updatedExperiences[index] = {
          ...updatedExperiences[index],
          [fieldName]: value,
        };
        return {...prevState, experiences: updatedExperiences };
      }
      return prevState;
    });
  }, []);

  const handleAddExperience = useCallback(() => {
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
  }, []);

  const handleRemoveExperience = useCallback((index: number) => {
    setFormValues(prevState => {
      if ('experiences' in prevState) {
        return {
          ...prevState,
          experiences: prevState.experiences.filter((_, i) => i !== index),
        };
      }
      return prevState;
    });
  }, []);

  const handleEducationChange = useCallback((section: 'graduation' | 'postGraduation', e: React.ChangeEvent<HTMLInputElement>) => {
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
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {

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
        await ApiController.updateTeacherProfile(teacherId, formData)
        .then((response)=>{
          console.log("data",response)
        }).catch((error)=>{
          console.log("teacher eror",error)
        })
      } else {
        await ApiController.updateStudentProfile(studentId, formData);
      }
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
    }
  }, [role, formValues, teacherId, studentId]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {showSidebar && (
        <div className="hidden md:block w-64">
          <ProfileSidebar />
        </div>
      )}
      <div className="flex-grow flex justify-center items-start py-8 px-4 md:px-8">
        <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              error={errors.name}
            />
            <div className="flex flex-col">
              <label className="block text-gray-600 mb-1">Gender</label>
              <select
                name="gender"
                value={formValues.gender}
                onChange={handleSelectChange}
                className={`border p-2 rounded ${errors.gender ? 'border-red-500' : ''}`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
            </div>
            <InputField
              label="Phone Number"
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
              error={errors.phone}
            />
            <FileInput
              label="Profile Photo"
              name="photo"
              onChange={handleChange}
              accept="image/*"
              error={errors.photo}
            />
             <ProfileImagePreview photo={formValues.photo as any} url={formValues.photourl as string} />
            
            {role === 'Teacher' && isTeacher(formValues) && (
              <>
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
                  accept="image/*"
                  error={errors.ugCertificate}
                />
                 <CertificatePreview file={formValues.ugCertificate} url={formValues.pgurl}/>
                <FileInput
                  label="PG Certificate"
                  name="pgCertificate"
                  onChange={handleChange}
                  accept="image/*"
                  error={errors.pgCertificate}
                />
                 <CertificatePreview file={formValues.pgCertificate} url={formValues.ugurl} />
              </>
            )}

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded w-full"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;