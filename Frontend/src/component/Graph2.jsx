import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

export default function Graph2() {
  const [state, setState] = useState({
    series: [],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      colors: [], // Add your custom colors here
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/graph2'); 
        const data = response.data;

        const series = data.map((item) => item.employeeCount);
        const labels = data.map((item) => item.department);

        setState((prevState) => ({
          ...prevState,
          series,
          options: {
            ...prevState.options,
            labels,
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
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="pie"
        width={380}
        height={350}
      />
    </div>
  );
}
