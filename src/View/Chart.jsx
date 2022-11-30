// import React from 'react';
// import { Bar, Line } from 'react-chartjs-2';
// import { Chart as ChartJS } from 'chart.js/auto';

// //import { CHART_COLORS, numbers } from '../Utils';

// // const config = {
// //     type: 'line',
// //     data: data,
// //     options: {
// //         responsive: true,
// //         interaction: {
// //             intersect: false,
// //             axis: 'x',
// //         },
// //         plugins: {
// //             title: {
// //                 display: true,
// //                 text: (ctx) =>
// //                     'Step ' +
// //                     ctx.chart.data.datasets[0].stepped +
// //                     ' Interpolation',
// //             },
// //         },
// //     },
// // };

// const SystemCharts = () => {
//     const data = {
//         labels: [0, 1.25, 2, 3, 5, 8, 10],
//         datasets: [
//             {
//                 label: 'BidTime',
//                 data: [1, 0, 1, 1],
//                 borderColor: 'rgb(255, 99, 132)',
//                 backgroundColor: 'rgb(255, 99, 132)',
//                 fill: false,
//                 stepped: true,
//                 barPercentage: 0.1,
//                 yAxisID: 'bidTime_1',
//             },
//             {
//                 label: 'BidTime',
//                 data: [0, 1, 0, 0],
//                 borderColor: 'rgb(255, 99, 132)',
//                 backgroundColor: 'rgb(255, 99, 132)',
//                 fill: false,
//                 stepped: true,
//                 barPercentage: 0.1,
//                 yAxisID: 'bidTime_2',
//             },
//         ],
//     };
//     const options = {
//         //maintainAspectRatio: false,
//         responsive: true,
//         scales: {
//             x: {
//                 ticks: {
//                     display: true, //this will remove all the x-axis grid lines
//                 },
//             },

//             bidTime_1: {
//                 type: 'category',
//                 labels: ['1 source', ''],
//                 offset: true,
//                 position: 'left',
//                 stack: 'demo',
//                 stackWeight: 2,
//             },
//             bidTime_2: {
//                 type: 'category',
//                 labels: ['2 source', ''],
//                 offset: true,
//                 position: 'left',
//                 stack: 'demo',
//                 stackWeight: 2,
//             },
//         },
//     };

//     return (
//         <div style={{ height: '300px' }}>
//             <Bar data={data} options={options} />
//         </div>
//     );
// };

// export default SystemCharts;
