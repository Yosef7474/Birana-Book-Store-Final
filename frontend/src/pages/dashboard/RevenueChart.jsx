import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const RevenueChart = () => {
  const revenueData = [500, 700, 800, 600, 750, 900, 650, 870, 960, 1020, 1100, 1150];

  // Pie chart data structure
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue: Birr',
        data: revenueData,
        backgroundColor: [
          'rgba(34, 197, 94, 0.7)', 
          'rgba(250, 204, 21, 0.7)', 
          'rgba(34, 150, 243, 0.7)', 
          'rgba(219, 39, 119, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(99, 102, 241, 0.7)',
          'rgba(255, 106, 0, 0.7)',
          'rgba(255, 82, 82, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(156, 163, 175, 0.7)',
          'rgba(34, 197, 94, 0.7)', 
          'rgba(255, 204, 204, 0.7)'
        ], 
        borderColor: [
          'rgba(34, 197, 94, 1)', 
          'rgba(250, 204, 21, 1)', 
          'rgba(34, 150, 243, 1)', 
          'rgba(219, 39, 119, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(99, 102, 241, 1)',
          'rgba(255, 106, 0, 1)',
          'rgba(255, 82, 82, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(156, 163, 175, 1)',
          'rgba(34, 197, 94, 1)', 
          'rgba(255, 204, 204, 1)'
        ], 
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Revenue Distribution',
      },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto justify-center p-4 bg-gray-700 shadow-lg rounded-lg">
      <h2 className="text-center text-2xl font-bold text-white mb-4">Monthly Revenue Distribution</h2>
      <div className='hidden md:block'>
        <Pie data={data} options={options} className='' />
      </div>
    </div>
  );
};

export default RevenueChart;
