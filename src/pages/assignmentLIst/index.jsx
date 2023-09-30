import React, { useEffect, useState } from "react";
import api from "../api/axios";
import NavBar from "@/component/NavBar";
import { useRouter } from "next/router";

const index = () => {
  const [assignment, setAssignment] = useState(null);

  const router = useRouter();

  const handleNavigate = (id) => {
    router.push(`/assignmentLIst/${id}`);
  };

  const fetchAssignment = async () => {
    try {
      const res = await api.get("/teacher/assignment");
      const data = await res.data;
      setAssignment(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAssignment();
  }, []);
  return (
    <div>
      <div className="flex">
        <div className="w-[20%]">
          <NavBar />
        </div>
        <div className="w-full ">
          <h1 className="font-bold fixed px-20 top-[-12px] w-full  text-white rounded-md font-serif text-3xl my-3 bg-blue-800 py-2">
            Assignment List
          </h1>
          <div className="grid  grid-cols-1 mt-20 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignment != null &&
              assignment?.map((assignmentData) => (
                <div
                  key={assignmentData.id}
                  onClick={() => {
                    handleNavigate(assignmentData.id);
                  }}
                  className="bg-white cursor-pointer  overflow-hidden shadow-md"
                >
                  <img
                    src={assignmentData.pdf}
                    alt={assignmentData.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2 truncate text-gray-800">
                      {assignmentData.title}
                    </h2>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: assignmentData.word,
                      }}
                      className="text-sm text-gray-700 leading-relaxed"
                    ></div>

                    <div className="text-gray-600 text-sm mt-4">
                      Deadline:{" "}
                      {new Date(assignmentData.deadLine).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
