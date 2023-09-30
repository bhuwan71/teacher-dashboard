import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Reports = ({ height, width, studentPerformance }) => {
  let data = [];
  let categories = [];

  if (studentPerformance?.reports?.length > 0) {
    data = studentPerformance.reports.map((item) => Object.values(item)[0]);
    categories = studentPerformance.reports.map((item) => Object.keys(item)[0]);
  }

  const options = {
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: categories,
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const series = [
    {
      name: "Student Performance",
      data: data,
    },
  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height={height}
      width={width}
    />
  );
};

export default Reports;
