import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChalkboardTeacher, FaUserGraduate, FaBook } from 'react-icons/fa';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-indigo-100 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 leading-tight mb-4">
              A classroom to explore your knowledge
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover a world of learning at your fingertips with our comprehensive
              educational platform. Whether you're a student, educator, or lifelong
              learner, our site offers an extensive collection of resources.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                className="bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                onClick={() => navigate("/login")}
              >
                I am a student
              </button>
              <button
                className="bg-purple-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:bg-purple-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                onClick={() => navigate("/teacher")}
              >
                I am a teacher
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="/src/assets/home1.png"
              alt="Education illustration"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: FaChalkboardTeacher, label: "Classrooms", count: "1000+" },
            { icon: FaUserGraduate, label: "Students", count: "1000+" },
            { icon: FaBook, label: "Teachers", count: "1000+" },
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              <item.icon className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
              <div className="text-3xl font-bold text-indigo-800 mb-2">{item.count}</div>
              <div className="text-gray-600 font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {["LIVE CLASSES", "ONLINE EXAMS", "CLASSROOM MATERIALS"].map((title, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden my-8 mx-4 md:mx-8 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
          <div className="flex flex-col md:flex-row p-6">
            <div className="flex-grow self-center md:w-1/2 mb-4 md:mb-0 md:pr-6">
              <h2 className="text-indigo-800 font-bold text-2xl text-center mb-4">
                {title}
              </h2>
              <p className="text-gray-600 text-center">
                {index === 0 && "Experience dynamic, real-time lessons with GradeWenb's Live Classes! Engage with expert teachers and classmates from home, using high-definition video and interactive tools like digital whiteboards and instant polls."}
                {index === 1 && "GradeWenb's Online Exams feature offers secure, seamless assessments with a user-friendly interface and automated proctoring. Instant grading and detailed analytics provide immediate feedback, making testing efficient and modern."}
                {index === 2 && "GradeWenb lets teachers effortlessly share essential learning resources like documents, presentations, and videos with students. Simplify access to materials and keep everyone connected seamlessly!"}
              </p>
            </div>
            <div className="flex-grow-0 flex items-center justify-center md:w-1/2">
              <img className="max-w-full h-auto rounded-lg shadow-md" src={`src/assets/Group${index === 0 ? '' : ` (${index})`}.png`} alt={title} />
            </div>
          </div>
        </div>
      ))}

      <footer className="bg-indigo-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c522e88c6638c0b4a264864e3dff4760219e84ec988d5b7551347e65d1b74e2?"
                className="h-12 mb-4"
                alt="Logo"
              />
            </div>
            {["Company", "Resources", "Contact"].map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-lg mb-4">{section}</h3>
                <ul className="space-y-2">
                  {["About us", "Terms of service", "Security", "Blog", "Content Proof", "Glossary", "Kozhikode", "Cyber Park, Pattambi", "676132", "aca@gmail.com"].slice(index * 3, (index + 1) * 3).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;