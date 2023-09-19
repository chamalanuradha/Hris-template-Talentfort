import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

export default function Graph3() {
  const [state, setState] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: []
      }
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/graph3');
        const data = response.data;

        const categories = data.map((item) => item.department);
        const series = data.map((item) => item.totalLoanAmount);

        setState((prevState) => ({
          ...prevState,
          series: [ {
            name: 'LoanAmount',
            data: series,
          },],
          options: {
            ...prevState.options,
            xaxis: {
              categories: categories,
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
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={350}
      />
    </div>
  );
}
