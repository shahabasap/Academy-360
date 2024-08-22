import React from 'react';

const ClassroomCard = ({ className, subject, students, image }: {
  className: string;
  subject: string;
  students: number;
  image: string;
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={image} alt={className} className="w-full h-32 sm:h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{className}</h3>
        <p className="text-gray-600">Subject: {subject}</p>
        <p className="text-gray-600">Students: {students}</p>
      </div>
    </div>
  );
};

const Classrooms = () => {
  const classroomData = [
    {
      className: 'Math 101',
      subject: 'Mathematics',
      students: 30,
      image: 'https://via.placeholder.com/300x200', // Replace with a real image URL
    },
    {
      className: 'Science 202',
      subject: 'Science',
      students: 25,
      image: 'https://via.placeholder.com/300x200', // Replace with a real image URL
    },
    {
      className: 'History 303',
      subject: 'History',
      students: 20,
      image: 'https://via.placeholder.com/300x200', // Replace with a real image URL
    },
    {
      className: 'English 404',
      subject: 'English Literature',
      students: 28,
      image: 'https://via.placeholder.com/300x200', // Replace with a real image URL
    },
  ];

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">My Classrooms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classroomData.map((classroom, index) => (
            <ClassroomCard
              key={index}
              className={classroom.className}
              subject={classroom.subject}
              students={classroom.students}
              image={classroom.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Classrooms;
