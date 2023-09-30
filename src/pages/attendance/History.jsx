import React, { useEffect, useState } from "react";
import AttendanceTable from "./comopnent/AttendanceTable";
import { DatePicker } from "antd";
import api from "../api/axios";

const History = () => {
  const [tabledata, setTableData] = useState([]);
  const sendDateRangeToBackend = (dates) => {
    if (dates.length > 0) {
      api
        .post("/attendancebydate", {
          startDate: dates[0].format("YYYY-MM-DD"),
          endDate: dates[1].format("YYYY-MM-DD"),
        })
        .then((response) => {
          const json = response.data;
          const jsonArray = Object.entries(json).map(([key, value]) => ({
            email: key,
            data: value,
          }));
          let tbobj = {
            key: "",
            no: 0,
            studentName: "",
          };
          let tempTableData = [];
          for (let i = 0; i < jsonArray.length; i++) {
            tbobj["key"] = i + 1;
            tbobj["no"] = i + 1;
            tbobj["studentName"] = jsonArray[i].email;
            for (let j = jsonArray[i].data.length - 1; j >= 0; j--) {
              let date = new Date(jsonArray[i].data[j].created_at);
              let day = date.getDate();
              tbobj[day] = jsonArray[i].data[j].present_id === null ? "A" : "P";
            }
            tempTableData.push({ ...tbobj });
          }
          setTableData(tempTableData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="bg-slate-100">
      <h2 className="font-bold text-4xl container text-blue-500 py-5 text-center">
        {" "}
        Attendance Report
      </h2>
      <div className="flex justify-end container  ">
        <DatePicker.RangePicker onChange={sendDateRangeToBackend} />
      </div>
      <div className=" mx-auto container py-10">
        <AttendanceTable data={tabledata} />
      </div>
    </div>
  );
};

export default History;
