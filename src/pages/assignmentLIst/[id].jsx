import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Rate, notification } from "antd";
import NavBar from "@/component/NavBar";
import { toast } from "react-toastify";

const assignmentSubmittedList = () => {
  const router = useRouter();
  const [submittedAssignment, setSubmittedAssignment] = useState();
  const { id } = router.query;
  const fetchSubmittedAssignment = async () => {
    const res = await api.get(`/teacher/assignmentsubmited/${id}`);
    if (res) {
      setSubmittedAssignment(res.data);
    }
  };

  const ratingAPi = async (rating, assignmentId) => {
    const res = await api.patch(`/teacher/rateassignment`, {
      submitedAssignmentId: parseInt(assignmentId),
      rating: rating,
    });

    if (res.status === 204) {
      notification.success({ message: "Rated Successfully" });
    }
  };

  useEffect(() => {
    if (id) {
      fetchSubmittedAssignment();
    }
  }, [id]);
  return (
    <div className="flex">
      <div className="w-[20%]">
        <NavBar />
      </div>
      <div className="flex gap-5 flex-wrap">
        {submittedAssignment?.map((assignment) => {
          return (
            <>
              <div className="bg-white shadow-md rounded p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {assignment.studentId.firstName}{" "}
                      {assignment.studentId.lastName}
                    </h2>
                    <p className="text-gray-600">
                      {assignment.studentId.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center mb-4">
                  <img
                    src={assignment.submission}
                    alt="Submitted assignment"
                    className="w-full h-[30vh] object-cover rounded"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Rating:
                  </h3>
                  <div className="ml-2">
                    <Rate
                      allowHalf
                      onChange={(e) => {
                        ratingAPi(e, assignment.id);
                      }}
                      defaultValue={
                        assignment.rating == null
                          ? 0
                          : parseFloat(assignment.rating)
                      }
                    />
                  </div>
                </div>
                <p className="text-gray-600  my-3">
                  Submission Date:{" "}
                  {new Date(assignment.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default assignmentSubmittedList;
