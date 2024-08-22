import React, { useState } from 'react';
import ProfileSidebar from '../profile/profileSidebar'
import useRole from '../../../hooks/RoleState';


const ProfileManagement = () => {
  const role=useRole()
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    gender: '',
    phone: '',
    password: '',
    qualification: '',
    experiences: [{ institute: '', yearFrom: '', yearTo: '' }],
    photo: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
    if (index !== undefined) {
      const newExperiences = [...formData.experiences];
      newExperiences[index] = {
        ...newExperiences[index],
        [e.target.name]: e.target.value,
      };
      setFormData({
        ...formData,
        experiences: newExperiences,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleAddExperience = () => {
    setFormData({
      ...formData,
      experiences: [...formData.experiences, { institute: '', yearFrom: '', yearTo: '' }],
    });
  };

  const handleRemoveExperience = (index: number) => {
    const newExperiences = formData.experiences.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      experiences: newExperiences,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        // photo: e.target.files[0],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit form data logic
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-50">
        <div className='w-64'>
        <ProfileSidebar />
        </div>
      <div className="flex flex-col w-full">
       
        <div className="flex justify-center items-center w-full mt-8">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Teacher Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border mb-2 bg-gray-200 flex items-center justify-center">
                    {formData.photo ? (
                      <img
                        src={URL.createObjectURL(formData.photo)}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="block text-gray-600 mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-600 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-600 mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-md"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-600 mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-600 mb-1">Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Experiences</h3>
                <div className="space-y-4">
                  {formData.experiences.map((experience, index) => (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                      <div className="flex flex-col">
                        <label className="block text-gray-600 mb-1">Institute</label>
                        <input
                          type="text"
                          name="institute"
                          value={experience.institute}
                          onChange={(e) => handleChange(e, index)}
                          className="p-3 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="block text-gray-600 mb-1">From</label>
                        <input
                          type="date"
                          name="yearFrom"
                          value={experience.yearFrom}
                          onChange={(e) => handleChange(e, index)}
                          className="p-3 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="block text-gray-600 mb-1">To</label>
                        <input
                          type="date"
                          name="yearTo"
                          value={experience.yearTo}
                          onChange={(e) => handleChange(e, index)}
                          className="p-3 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleRemoveExperience(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={handleAddExperience}
                    className="bg-[#2E236C] text-white px-4 py-2 rounded-md hover:bg-[#1D1F6C] transition-colors text-sm"
                  >
                    Add Experience
                  </button>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-[#2E236C] text-white px-5 py-2 rounded-md hover:bg-[#1D1F6C] transition-colors"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
