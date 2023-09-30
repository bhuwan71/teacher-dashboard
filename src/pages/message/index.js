import NavBar from "@/component/NavBar";
import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { message } from "antd";

const Message = () => {
  const [profile, setProfile] = useState("");

  const getProfile = () => {
    api.get("/auth/users/me").then((res) => {
      setProfile(res.data);
    });
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const notice = {
      title: title,
      body: content,
    };

    api
      .post("/teacher/notification", notice)
      .then((response) => {
        message.success("Message send Sucessfully !")
        setTitle("");
        setContent("");
      })
      .catch((error) => {
        message.error("Message send Failed !");
        console.error(error); // Handle error response
      });
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
      <>
        {/* component */}
        <NavBar />

        <div className=" px-5 ml-48  ">
          <div className="flex ">
            <div className="flex   flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
              <div className="flex flex-row items-center justify-center h-12 w-full">
                <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
                <div className="h-20 w-20 rounded-full border overflow-hidden">
                  <img
                    src={profile?.avatar}
                    alt="Avatar"
                    className="h-full w-full"
                  />
                </div>
                <div className="text-sm font-semibold mt-2">
                  {profile?.firstName} {profile?.lastName}
                </div>
                <div className="flex flex-row items-center mt-3">
                  <div className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
                    <div className="h-3 w-3 bg-white rounded-full self-end mr-1" />
                  </div>
                  <div className="leading-none ml-1 text-xs">Active</div>
                </div>
              </div>
              {/* <div className="flex flex-col mt-8">
                <div className="flex flex-row items-center justify-between text-xs">
                  <span className="font-bold">Active Conversations</span>
                  <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                    4
                  </span>
                </div>
                <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                  <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                    <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                      H
                    </div>
                    <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
                  </button>
                  <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                    <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full">
                      M
                    </div>
                    <div className="ml-2 text-sm font-semibold">
                      Marta Curtis
                    </div>
                    <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
                      2
                    </div>
                  </button>
                  <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                    <div className="flex items-center justify-center h-8 w-8 bg-orange-200 rounded-full">
                      P
                    </div>
                    <div className="ml-2 text-sm font-semibold">
                      Philip Tucker
                    </div>
                  </button>
                  <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                    <div className="flex items-center justify-center h-8 w-8 bg-pink-200 rounded-full">
                      C
                    </div>
                    <div className="ml-2 text-sm font-semibold">
                      Christine Reid
                    </div>
                  </button>
                  <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                    <div className="flex items-center justify-center h-8 w-8 bg-purple-200 rounded-full">
                      J
                    </div>
                    <div className="ml-2 text-sm font-semibold">
                      Jerry Guzman
                    </div>
                  </button>
                </div>
                <div className="flex flex-row items-center justify-between text-xs mt-6">
                  <span className="font-bold">Archivied</span>
                  <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                    7
                  </span>
                </div>
                <div className="flex flex-col space-y-1 mt-4 -mx-2">
                  <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                    <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                      H
                    </div>
                    <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
                  </button>
                </div>
              </div> */}
            </div>
            <div className="flex flex-col flex-auto h-full p-6">
              <div className="p-4 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">Send Notice</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="title"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Title:
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={handleTitleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="content"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Content:
                    </label>
                    <textarea
                      id="content"
                      value={content}
                      onChange={handleContentChange}
                      className="w-full h-[40vh] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Message;
