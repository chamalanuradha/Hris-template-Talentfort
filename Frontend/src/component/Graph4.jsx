import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

export default function Graph4() {
  const [state, setState] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Overtime Trends by Date',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [],
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8080/graph4');
          const data = response.data;
      
          const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort the data array by date in ascending order
      
          const date = sortedData.map((item) => item.date);
          const employeeCount = sortedData.map((item) => item.employeeCount);
      
          setState((prevState) => ({
            ...prevState,
            series: [
              {
                name: 'Employees',
                data: employeeCount,
              },
            ],
            options: {
              ...prevState.options,
              xaxis: {
                categories: date,
              },
            },
          }));
        } catch (error) {
          console.log(error);
        }
      };

    fetchData();
  }, []);

  return (
    <div id="chart">
      <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
    </div>
  );
}
