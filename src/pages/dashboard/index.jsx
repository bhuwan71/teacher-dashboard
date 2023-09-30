import NavBar from "@/component/NavBar";
import Attendance from "@/component/charts/Attendance";
import Reports from "@/component/charts/Reports";
import { AiOutlineCheckCircle, AiFillContainer } from "react-icons/ai";
import { GiTrophyCup } from "react-icons/gi";
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import HitMaps from "@/component/charts/HitMaps";
import CreateZoomMeeting from "@/component/CreateZoomMeeting";
import { FiLink, FiLock } from 'react-icons/fi';
import SearchInput from "./SearchInput"
const Result = () => {
  const [profile, setProfile] = useState("");
  const [meetingLink, setMeetingLink] = useState();
  const [studentPerformance, setStudentPerformance] = useState([]);
  const [noticeBoard,setNoticeBoard] = useState([]);
  const gradientColors = [
    "from-pink-500 to-purple-500",
    "from-blue-500 to-indigo-500",
    "from-green-500 to-teal-500",
    "from-yellow-500 to-orange-500",
  ];
  const fetchData = async () => {
    try {
      const [meetingRes, profileRes, studentPerformanceRes] = await Promise.all([
        api.get("/all/teacher/meetinglist"),
        api.get("/auth/users/me"),
        api.get("/stats/average_reports"),
        // api.get("/department/notification")
      ]);
    
      setMeetingLink(meetingRes?.data);
      setProfile(profileRes?.data);
      setStudentPerformance(studentPerformanceRes?.data);
      // setNoticeBoard(notice?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      <div className="bg-slate-100">
        <NavBar />
        <div className="ml-56  px-5">
          <div className="flex justify-between mb-5 items-center">
            <div className="mt-5">
              <h3 className="text-blue-600 font-bold text-3xl ">
                Welcome
                <span className="mx-2 text-sm text-red-700">
                  {" "}
                  {profile?.firstName}
                </span>
              </h3>
              <p className="text-xs font-bold text-gray-600">
                Welcome to Teacher Dashboard
              </p>
            </div>
            <div className="relative">
              <div className="flex items-center justify-center w-10 h-10 mx-2 overflow-hidden rounded-full">
                <img src={profile?.avatar} />
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 mr-1 rounded-full bg-green-500 border-2 border-white" />
            </div>
          </div>

          <SearchInput/>

          <div className="flex mx-10 justify-between items-center pt-5 ">
            <div className="px-20 py-10 text-red-800 font-bold rounded-bl-3xl  shadow bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-200 via-violet-600 to-sky-600">
              <AiFillContainer size={24} className="mt-[-20px] " />
              <p className="text-3xl font-serif font-bold pt-4 text-black mb-3">
                10
              </p>
              Total Student's
            </div>
            <div className="bg-white w-[90%] mx-10 border-gray-200   shadow p-4">
              <h2 className="font-bold font-serif text-xl">
                Studnet Performance
              </h2>
              <Reports studentPerformance={studentPerformance} height={250} width={600} />
            </div>
          </div>

          <div className="flex gap-2 my-16 ">
            <div className=" w-[45%] p-4 border border-gray-200   bg-white shadow">
              <h2 className="font-bold font-serif text-xl">
                Studnet Attendance
              </h2>
              <Attendance />
            </div>
            <div className="w-[100%] overflow-y-auto h-52 rounded-md bg-white border-gray-200 border ">
              <h2 className="font-bold p-1 bg-red-600  text-white  font-serif text-xl">
                Messages from Department
              </h2>
              <>
                {/* component */}
                {/* This is an example component */}
                <div>
                  <div
                    id="toast-default"
                    className="flex hover:bg-slate-100 cursor-pointer  items-center p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                    role="alert"
                  >
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3 text-sm font-normal">
                      Guest lacture for Teacher Tranning
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
          <div>
            <CreateZoomMeeting />
          </div>
          {/* <div className="my-5 container grid grid-cols-4 gap-5   mx-auto px-4 py-8">
            {meetingLink?.map((item, id) => {
              return <>
                <div key={item.id} className="bg-gradient-to-r from-cyan-500 to-blue-500 col-span-2 rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <h2 className="text-3xl  text-white font-bold mr-2">{item.title}</h2>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center text-gray-700 font-bold mb-2">
                      <FiLink className="mr-2" />
                      Join URL:
                    </div>
                    <a target="_blank" href={item.joinUrl} className="text-white underline">
                      {item.joinUrl}
                    </a>
                  </div>
                  <div className="mb-6 ">
                    <div className="flex items-center text-gray-700 font-bold mb-2">
                      <FiLink className="mr-2" />
                      Start URL:
                    </div>
                    <div className="w-full overflow-x-hidden">
                      <a target="_blank" href={item.startUrl}>
                        {item.startUrl}
                      </a>
                    </div>

                  </div>
                  <div>
                    <div className="flex items-center text-gray-700 font-bold mb-2">
                      <FiLock className="mr-2" />
                      Password:
                    </div>
                    <p className="text-gray-900">{item.password}</p>
                  </div>
                </div>
              </>
            })}
          </div> */}
          <div className="my-5 container grid grid-cols-4 gap-5 mx-auto px-4 py-8">
            {meetingLink?.map((meeting, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${gradientColors[index % gradientColors.length]} col-span-2 rounded-lg shadow-md p-6`}
              >
                <div className="flex items-center mb-4">
                  <h2 className="text-3xl text-white font-bold mr-2">{meeting.title}</h2>
                  {meeting.type === "link" && <FiLink className="text-white text-2xl" />}
                  {meeting.type === "video" && <FiVideo className="text-white text-2xl" />}
                  {meeting.type === "clock" && <FiClock className="text-white text-2xl" />}
                </div>
                <div className="mb-6">
                  <div className="flex items-center text-gray-700 font-bold mb-2">
                    {meeting.type === "link" && <FiLink className="mr-2" />}
                    {meeting.type === "video" && <FiVideo className="mr-2" />}
                    {meeting.type === "clock" && <FiClock className="mr-2" />}
                  </div>
                  <div className="w-[100%]">
                    <a className="block overflow-x-hidden" target="_blank" href={meeting.startUrl}>
                      {meeting.startUrl}
                    </a>
                  </div>

                </div>
                <div>
                  <div className="flex items-center text-gray-700 font-bold mb-2">
                    <FiLock className="mr-2" />
                    Password:
                  </div>
                  <p className="text-gray-900">{meeting.password}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
