import React from "react";
import { Table } from "antd";

const AttendanceTable = ({ data }) => {
  const columns = [
    {
      title: "NO",
      dataIndex: "no",
      key: "no",
      width: 100,
      fixed: "left",
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
      fixed: "left",
      width: 200,
      render: (text, record) => {
        return (
          <div className="hover:underline text-blue-500 cursor-pointer">
            {text}
          </div>
        );
      },
    },
  ];
  for (let i = 1; i <= 31; i++) {
    columns.push({
      title: i,
      width: 50,
      dataIndex: i,
      key: i,
      render: (text, record) => {
        return (
          <div className="font-sans">
            {text === "P" ? (
              <span className="text-green-700">{text}</span>
            ) : (
              <span className="text-red-700">{text}</span>
            )}
          </div>
        );
      },
    });
  }
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1500,
          y: 300,
        }}
      />
    </div>
  );
};

export default AttendanceTable;
