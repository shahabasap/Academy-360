import React, { useState } from "react";
import ProfileSidebar from "../profile/profileSidebar";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaUniversity,
  FaBriefcase,
} from "react-icons/fa";
import useRole from "../../../hooks/RoleState";
import useUserData from "../../../hooks/useUserData "; // Fixed import issue
import { FormState,TeacherProfileFormData} from "../../../types/commonType";

const ProfileOverview: React.FC = () => {
  const role = useRole();
  const { user } = useUserData(role as string); // Fixed typo and renamed to `useUserData`

  // Type guard for Teacher profile data
  const isTeacher = (user: FormState): user is TeacherProfileFormData => {
    return role === "Teacher";
  };

  if (!user) {
    return <div>Loading...</div>; // Fallback when user data is not yet available
  }

  return (
    <div className="flex flex-row min-h-screen bg-gray-50">
      <div className="w-20 md:w-64">
        <ProfileSidebar />
      </div>

      <div className="flex flex-col w-full p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Profile Overview
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <div className="flex items-center">
            <div
              className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center"
              style={{
                backgroundImage: `url(${user?.photo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            <div className="ml-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {user?.name || "N/A"}
              </h2>
              <p className="text-gray-600">{user?.username || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FaPhone className="text-[#2E236C] text-xl mr-4" />
              <h3 className="text-lg font-medium text-gray-800">
                Contact Information
              </h3>
            </div>
            <p className="text-gray-600">
              <strong>Phone:</strong> {user?.phone || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {user?.username || "N/A"}
            </p>
          </div>

          {isTeacher(user) ? (
            <>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <FaUniversity className="text-[#2E236C] text-xl mr-4" />
                  <h3 className="text-lg font-medium text-gray-800">
                    Qualifications (UG)
                  </h3>
                </div>
                <p className="text-gray-600">
                  <strong>College:</strong> {user?.graduation?.college || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Degree:</strong> {user?.graduation?.course || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>From:</strong> {user?.graduation?.yearFrom || "N/A"}{" "}
                  <strong>To:</strong> {user?.graduation?.yearTo || "N/A"}
                </p>
              </div>

              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <FaUniversity className="text-[#2E236C] text-xl mr-4" />
                  <h3 className="text-lg font-medium text-gray-800">
                    Qualifications (PG)
                  </h3>
                </div>
                <p className="text-gray-600">
                  <strong>College:</strong>{" "}
                  {user?.postGraduation?.college || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Degree:</strong>{" "}
                  {user?.postGraduation?.course || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>From:</strong>{" "}
                  {user?.postGraduation?.yearFrom || "N/A"} <strong>To:</strong>{" "}
                  {user?.postGraduation?.yearTo || "N/A"}
                </p>
              </div>

              {user?.experiences?.length ? (
                user.experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-lg rounded-lg p-6"
                  >
                    <div className="flex items-center mb-4">
                      <FaBriefcase className="text-[#2E236C] text-xl mr-4" />
                      <h3 className="text-lg font-medium text-gray-800">
                        Experience
                      </h3>
                    </div>
                    <p className="text-gray-600">
                      <strong>Institute:</strong> {exp.institute || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      <strong>From:</strong> {exp.yearFrom || "N/A"}{" "}
                      <strong>To:</strong> {exp.yearTo || "N/A"}
                    </p>
                  </div>
                ))
              ) : (
                <div className="bg-white shadow-lg rounded-lg p-6">
                  <p className="text-gray-600">No experiences available.</p>
                </div>
              )}
            </>
          ) : null}
        </div>

        {/* <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            About {user?.name || "N/A"}
          </h3>
          <p className="text-gray-600">
            {user?.bio || "No bio available for this user."}
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default ProfileOverview;
