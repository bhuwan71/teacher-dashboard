import api from '@/pages/api/axios';
import React, { useState } from 'react';
import { message } from 'antd';
const CreateZoomMeeting = () => {
    const [meetingTitle, setMeetingTitle] = useState("");

    const createMeeting = async () => {
        try {
            const res = await api.post("/createmeeting", {
                title: meetingTitle
            });

            if (res && res.data) {
                message.success(`${res.data.title} Meeting Created Successfully`);
                setMeetingTitle(" ");
            }
        } catch (error) {
            message.error("Failed to create meeting");
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            {/* <ToastContainer /> */}
            <h2 className="text-2xl font-semibold mb-4">Create Zoom Meeting</h2>
            <div className="flex flex-col">
                <label className="mb-2 text-gray-700" htmlFor="topic">Meeting Topic</label>
                <input
                    onChange={(e) => { setMeetingTitle(e.target.value) }}
                    defaultValue={meetingTitle}
                    type="text"
                    id="topic"
                    className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={() => { createMeeting() }}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 mt-4 self-start"
                >
                    Create Meet
                </button>
            </div>
        </div>
    );
};

export default CreateZoomMeeting;
