import api from "@/pages/api/axios";
import React, { useEffect, useState } from "react";
import NavBar from "@/component/NavBar";
import StudentDetails from "./StudentDetails";

const index = () => {
  const [students, setStudent] = useState([]);
  const [countAttendance, setCountAttendance] = useState(0);
  const [studentDetails, setStudentDetails] = useState(null);
  const [assighnemtReview, setAssignmentReview] = useState(0);

  const studetnDetilas = async (Studentid, id) => {
    try {
      const res = await api.get(`/attendance/reports/${Studentid}`);
      const resAssignment = await api.get(
        `/teacher/assignment/reports/${Studentid}`
      );
      if (res && resAssignment) {
        const present = parseInt(res.data.present);
        setCountAttendance(present);
        setAssignmentReview(resAssignment?.data?.performance);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const studentlist = async () => {
    try {
      const res = await api.get("/teacher/class");
      if (res) {
        setStudent(res.data);
        // !! this is function
        studetnDetilas(res.data[0].studentId.id);
        // !! this is state function
        setStudentDetails(res.data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    studentlist();
  }, []);

  useEffect(() => {}, [countAttendance]);

  return (
    <div>
      <div className="flex">
        <div>
          <NavBar />
        </div>
        <div className="ml-52 mt-5 px-5">
          <h1 className="text-2xl font-bold">Student list</h1>
          <div className="flex gap-20 mt-5 ">
            <div>
              {/* ====== Table Section Start */}
              <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-800 w-full text-white">
                          <tr>
                            <th
                              scope="col"
                              className="px-2 py-3  text-xs font-bold uppercase"
                            >
                              Roll No
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold  uppercase"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3  text-xs font-bold  uppercase"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3  text-xs font-bold uppercase"
                            >
                              Phone
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3  text-xs font-bold uppercase"
                            >
                              Class
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {students?.map((student, id) => {
                            return (
                              <>
                                <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800">
                                  <td className="px-6 cursor-pointer hover:underline hover:text-red-600 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                    {id + 1}
                                  </td>
                                  <td
                                    onClick={() => {
                                      studetnDetilas(
                                        students[id]?.studentId?.id
                                      );
                                      setStudentDetails(students[id]);
                                    }}
                                    className="px-6 cursor-pointer hover:underline hover:text-red-600 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"
                                  >
                                    {student?.studentId?.firstName} {""}{" "}
                                    {student?.studentId?.lastName}{" "}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                    {student?.studentId.email}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                    {student?.phoneNumber}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                    {student?.address}
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card border w-96  hover:shadow-none shadow-slate-50 shadow-md px-5 rounded-md">
              <StudentDetails
                studentDetails={studentDetails}
                countAttendance={countAttendance}
                assighnemtReview={assighnemtReview}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
