import React, { useEffect } from "react";
import { Progress, Space, Rate } from "antd";
import Reports from "@/component/charts/Reports";

const StudentDetails = ({
  studentDetails,
  countAttendance,
  assighnemtReview,
}) => {
  return (
    <>
      <div className=" relative flex flex-col mx-auto  m-5">
        <img
          className="max-h-20 w-full opacity-80 absolute top-0"
          style={{ zIndex: -1 }}
          src="https://unsplash.com/photos/iFPBRwZ4I-M/download?force=true&w=640"
          alt=""
        />
        <div className="profile w-full flex m-3 ml-4 text-white">
          <img
            className="w-28 h-28 p-1 bg-white rounded-full"
            src={studentDetails?.studentId.avatar}
            alt=""
          />
          <div className="title mt-11 ml-3 font-bold flex flex-col">
            <div className="name break-words text-black"></div>
            <div className="add font-semibold text-sm italic dark">
              {studentDetails !== null && studentDetails?.studentId?.firstName}{" "}
              {studentDetails !== null && studentDetails?.studentId?.lastName}
            </div>
          </div>
        </div>
        <div className="buttons flex absolute bottom-0 font-bold right-0 text-xs text-gray-500 space-x-0 my-3.5 mr-3">
          <div className="add border rounded-l-2xl rounded-r-sm border-gray-300 p-1 px-4 cursor-pointer hover:bg-gray-700 hover:text-white">
            Roll NO : {studentDetails !== null && studentDetails?.studentId?.id}
          </div>
          <div className="add border rounded-r-2xl rounded-l-sm border-gray-300 p-1 px-4 cursor-pointer hover:bg-gray-700 hover:text-white">
            CSIT
          </div>
        </div>
        <span className="text-sm cursor-pointer text-blue-600 hover:underline">
          {studentDetails !== null && studentDetails?.studentId?.email}
        </span>
      </div>
      <div className="flex gap-10 item center">
        <div>
          <h3 className="font-bold text-lg font-serif text-red-600">
            Attendance
          </h3>
          <Space wrap>
            <Progress
              type="circle"
              percent={countAttendance}
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
            />
          </Space>
        </div>
        <div className="px-3">
          <h3 className="font-bold text-lg  text-green-500 font-serif">
            Assignment Submit
          </h3>
          <Progress type="circle" percent={assighnemtReview} />
        </div>
      </div>
      <div className="py-4">
        <h3 className="font-bold text-lg font-mono">Studnet Performance</h3>
        <Reports height={300} width={350} />
      </div>
    </>
  );
};

export default StudentDetails;
