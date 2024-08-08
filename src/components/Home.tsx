import React from "react";
import Nav from "./Nav";
import "../index.css";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate=useNavigate()
  return (
    <>
      <Nav />
      <div className="first-container flex flex-col md:flex-row">
  <div className="first-left-side flex-1 w-full p-5 md:p-10">
    <div>
      <div className="p-2 md:p-5">
        <h1 className="text-[#385A64] text-2xl md:text-3xl font-bold p-3">
          A classroom to explore your knowledge.
        </h1>
        <p className="font-normal px-2 md:px-5 py-2">
          Discover a world of learning at your fingertips with our comprehensive
          educational platform. Whether you're a student, educator, or lifelong
          learner, our site offers an extensive collection of resources.
        </p>
        <div className="px-2 md:px-5 flex flex-col md:flex-row">
          <button className="bg-[#295782] text-white font-medium p-2 mb-2 md:mb-0 md:mr-6" onClick={()=>navigate('/login')}>
            I am a student
          </button>
          <button className="bg-[#295782] text-white font-medium p-2" onClick={()=>navigate('/teacher')}>
            I am a teacher
          </button>
        </div>
      </div>
    </div>
    <div className="flex flex-col md:flex-row px-5 md:px-10 py-5">
      <div className="flex flex-row items-stretch border border-black-600 border-opacity-10 p-5 mb-3 md:mb-0 md:mr-3 md:flex-col">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/793f401f0e05a4edd88fb53ff5dcc10160defae87f6c52f58ffa2f374bf89b5e?"
          className="aspect-square fill-black fill-opacity-0 w-[30px] self-center"
          alt="Classrooms icon"
        />
        <div className="align-middle font-semibold ml-3">1000+</div>
        <div className="self-stretch mt-1 font-medium">Classrooms</div>
      </div>
      <div className="flex flex-row items-stretch border border-black-600 border-opacity-10 p-5 mb-3 md:mb-0 md:mr-3 md:flex-col">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f7a16ae631196cefc0b1043292b3b4aae9cd8efc82e6eaf10b41360736cd52d?"
          className="aspect-square fill-black fill-opacity-0 w-[30px] self-center"
          alt="Students icon"
        />
        <div className="align-middle font-semibold ml-3">1000+</div>
        <div className="self-stretch mt-1 font-medium">Students</div>
      </div>
      <div className="flex flex-row items-stretch border border-black-600 border-opacity-10 p-5 mb-3 md:mb-0 md:mr-3 md:flex-col">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/61d8e0507adae1434485cf885130eec69cb0df64ec9d87e5199022957de9e960?"
          className="aspect-square fill-black fill-opacity-0 w-[30px] self-center"
          alt="Teachers icon"
        />
        <div className="align-middle font-semibold ml-3">1000+</div>
        <div className="self-stretch mt-1 font-medium">Teachers</div>
      </div>
    </div>
  </div>
  <div className="banner flex-1 w-full p-5 md:p-10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-10">
      <div className="flex flex-col items-center">
        <div className="pt-5">
          <img
            src="/src/assets/home1.png"
            alt="Home-pic-1"
            className="max-w-full"
          />
        </div>
        <div className="pt-5">
          <img
            src="/src/assets/home3.png"
            alt="Home-pic-2"
            className="max-w-full mt-4"
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <img src="/src/assets/home2.png" alt="Home-pic-3" className="max-w-full" />
      </div>
    </div>
  </div>
</div>

      {/* Banners starts from here on wards------------------------------ */}
      {/* Banner-1----- */}
      <div className="live-class flex flex-col md:flex-row h-auto p-2 mt-6 mx-8 border border-black-600 ... border-opacity-10">
        <div className="flex-grow self-center">
          <h1 className="text-[#295782] font-bold text-2xl text-center  mb-2 ">
            LIVE CLASSES
          </h1>
          <p className="text-center">
            Experience dynamic, real-time lessons with GradeWenb's Live Classes!
            Engage with expert teachers and classmates from home, using
            high-definition video and interactive tools like digital whiteboards
            and instant polls. Bring the classroom energy to your screen!
          </p>
        </div>
        <div className="flex-grow-0 flex items-center justify-center p-7">
          <img className="min-w-60" src="src/assets/Group.png" alt="" />
        </div>
      </div>
      {/* Banner-2---------------------- */}
      <div className="live-class flex flex-col md:flex-row  h-auto p-2 mt-6 mx-8 border border-black-600 ... border-opacity-10">
        <div className="flex-grow-0 flex items-center justify-center p-7">
          <img className="min-w-60" src="src/assets/Group (1).png" alt="" />
        </div>
        <div className="flex-grow self-center">
          <h1 className="text-[#295782] font-bold text-2xl text-center  mb-2">
            ONLINE EXAMS
          </h1>
          <p className="text-center">
            GradeWenb's Online Exams feature offers secure, seamless assessments
            with a user-friendly interface and automated proctoring. Instant
            grading and detailed analytics provide immediate feedback, making
            testing efficient and modern for both students and teachers.
          </p>
        </div>
      </div>
      {/* Banner-3--------------------------------- */}

      <div className="live-class flex flex-col md:flex-row h-auto p-2 mt-6 mx-4 md:mx-8 border border-black-600 border-opacity-10">
  <div className="flex-grow self-center mb-4 md:mb-0">
    <h1 className="text-[#295782] font-bold text-xl md:text-2xl text-center mb-2">
      CLASSROOM MATERIALS
    </h1>
    <p className="text-center text-sm md:text-base">
      GradeWenb lets teachers effortlessly share essential learning
      resources like documents, presentations, and videos with students.
      Simplify access to materials and keep everyone connected seamlessly!
    </p>
  </div>
  <div className="flex-grow-0 flex items-center justify-center p-4 md:p-7">
    <img className="min-w-40 md:min-w-60" src="src/assets/Group (2).png" alt="Classroom Materials" />
  </div>
</div>

      <hr className="mt-5" />
      {/* Footer starts---------------------------- */}
       <div className="footer p-10">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 ">
          <div>
            <p className="text-[#295782] font-semibold"><img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c522e88c6638c0b4a264864e3dff4760219e84ec988d5b7551347e65d1b74e2?"
        className="shrink-0 mt-6 max-w-full aspect-[5.88] w-[180px]"
      />
</p>
            <p className="text-[#295782] mt-2"></p>
            <p className="text-[#295782] mt-2"></p>
            <p className="text-[#295782] mt-2"> </p>
          </div>
          <div>
            <p className="text-[#295782] font-semibold">Company</p>
            <p className="text-[#295782] mt-2">About us</p>
            <p className="text-[#295782] mt-2">Terms fo service</p>
            <p className="text-[#295782] mt-2"> Security</p>
          </div>
          <div>
            <p className="text-[#295782] font-semibold">Resources</p>
            <p className="text-[#295782] mt-2">Blog</p>
            <p className="text-[#295782] mt-2">Content Proof</p>
            <p className="text-[#295782] mt-2"> Glossary</p>
          </div>
          <div>
            <p className="text-[#295782] font-semibold">Contact</p>
            <p className="text-[#295782] mt-2">Kozhikode</p>
            <p className="text-[#295782] mt-2">Cyber Park,Pattambi</p>
            <p className="text-[#295782] mt-2"> 676132</p>
            <p className="text-[#295782] mt-2">aca@gmail.com</p>
          </div>
          
        
        </div>
       </div>
    </>
  );
};

export default NavBar;
