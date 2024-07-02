// import React, { useEffect, useState, useMemo, useCallback } from 'react';
// import axios from 'axios';
// import { useTable, useBlockLayout } from 'react-table';
// import './DataDisplay.css';

// function DataDisplay({ initialDate }) {
//   const [date, setDate] = useState(initialDate || '');
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

//   const formatDate = useCallback((date) => {
//     if (!date) return '';
//     const [year, month, day] = date.split('-');
//     return `${year}-${month}-${day}`;
//   }, []);

//   const fetchData = useCallback(async (selectedDate) => {
//     try {
//       const formattedDate = formatDate(selectedDate);
//       // const response = await axios.get(`${process.env.API_URL}/api/data/${formattedDate}`);
//       const response = await axios.get(`http://localhost:5000/api/data/${formattedDate}`);
//       console.log(response.data); // Log the response data
//       setData(response.data);
//       setError(null);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError(error);
//     }
//   }, [formatDate]);

//   useEffect(() => {
//     if (date) {
//       fetchData(date);
//     }
//   }, [date, fetchData]);

//   const columns = useMemo(
//     () => [
//       { Header: 'ID', accessor: 'id' },
//       { Header: 'Time', accessor: 'time_value' },
//       { Header: 'Voltage L1', accessor: 'voltage_l1' },
//       { Header: 'Voltage L2', accessor: 'voltage_l2' },
//       { Header: 'Voltage L3', accessor: 'voltage_l3' },
//       { Header: 'Intel Flow', accessor: 'intel_flow' },
//       { Header: 'Discharge Flow', accessor: 'discharge_flow' },
//       { Header: 'Main Line Pressure', accessor: 'main_line_pressure' },
//       { Header: 'Surge Vessel Pressure', accessor: 'surge_vessel_pressure' },
//       { Header: 'Tank1 Level', accessor: 'tank1_level' },
//       { Header: 'Tank2 Level', accessor: 'tank2_level' },
//       { Header: 'Pump1 Amphere', accessor: 'pump1_amphere' },
//       { Header: 'Pump1 RPM', accessor: 'pump1_rpm' },
//       { Header: 'Pump1 Motor Temp', accessor: 'pump1_motor_temp' },
//       { Header: 'Pump1 Pump Temp', accessor: 'pump1_pump_temp' },
//       { Header: 'Pump1 SP', accessor: 'pump1_sp' },
//       { Header: 'Pump1 DP', accessor: 'pump1_dp' },
//       { Header: 'Pump1 Frequency', accessor: 'pump1_frequency' },
//       { Header: 'Pump1 Vibration', accessor: 'pump1_vibration' },
//       { Header: 'Pump2 Amphere', accessor: 'pump2_amphere' },
//       { Header: 'Pump2 RPM', accessor: 'pump2_rpm' },
//       { Header: 'Pump2 Motor Temp', accessor: 'pump2_motor_temp' },
//       { Header: 'Pump2 Pump Temp', accessor: 'pump2_pump_temp' },
//       { Header: 'Pump2 SP', accessor: 'pump2_sp' },
//       { Header: 'Pump2 DP', accessor: 'pump2_dp' },
//       { Header: 'Pump2 Frequency', accessor: 'pump2_frequency' },
//       { Header: 'Pump2 Vibration', accessor: 'pump2_vibration' },
//       { Header: 'Pump3 Amphere', accessor: 'pump3_amphere' },
//       { Header: 'Pump3 RPM', accessor: 'pump3_rpm' },
//       { Header: 'Pump3 Motor Temp', accessor: 'pump3_motor_temp' },
//       { Header: 'Pump3 Pump Temp', accessor: 'pump3_pump_temp' },
//       { Header: 'Pump3 SP', accessor: 'pump3_sp' },
//       { Header: 'Pump3 DP', accessor: 'pump3_dp' },
//       { Header: 'Pump3 Frequency', accessor: 'pump3_frequency' },
//       { Header: 'Pump3 Vibration', accessor: 'pump3_vibration' },
//       { Header: 'Pump4 Amphere', accessor: 'pump4_amphere' },
//       { Header: 'Pump4 RPM', accessor: 'pump4_rpm' },
//       { Header: 'Pump4 Motor Temp', accessor: 'pump4_motor_temp' },
//       { Header: 'Pump4 Pump Temp', accessor: 'pump4_pump_temp' },
//       { Header: 'Pump4 SP', accessor: 'pump4_sp' },
//       { Header: 'Pump4 DP', accessor: 'pump4_dp' },
//       { Header: 'Pump4 Frequency', accessor: 'pump4_frequency' },
//       { Header: 'Pump4 Vibration', accessor: 'pump4_vibration' }
//     ],
//     []
//   );

//   const tableInstance = useTable({ columns, data }, useBlockLayout);

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

//   return (
//     <div className="data-display-container">
//       <h2>Data for {date}</h2>
//       <input
//         type="date"
//         value={date}
//         onChange={e => setDate(e.target.value)}
//       />
//       {error ? (
//         <div>Error fetching data: {error.message}</div>
//       ) : data.length === 0 ? (
//         <p>No data available</p>
//       ) : (
//         <div className="table-container">
//           <table {...getTableProps()} className="data-table">
//             <thead>
//               {headerGroups.map(headerGroup => (
//                 <tr {...headerGroup.getHeaderGroupProps()}>
//                   {headerGroup.headers.map(column => (
//                     <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody {...getTableBodyProps()}>
//               {rows.map(row => {
//                 prepareRow(row);
//                 return (
//                   <tr {...row.getRowProps()}>
//                     {row.cells.map(cell => (
//                       <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                     ))}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default DataDisplay;

// import React, { useEffect, useState, useMemo, useCallback } from 'react';
// import axios from 'axios';
// import { useTable, useBlockLayout } from 'react-table';
// import './DataDisplay.css';

// function DataDisplay({ initialDate }) {
//   const [date, setDate] = useState(initialDate || '');
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

//   const formatDate = useCallback((date) => {
//     if (!date) return '';
//     const [year, month, day] = date.split('-');
//     return `${year}-${month}-${day}`;
//   }, []);

//   const fetchData = useCallback(async (selectedDate) => {
//     try {
//       const formattedDate = formatDate(selectedDate);
//       const response = await axios.get(`http://localhost:5000/api/data/${formattedDate}`);
//       console.log(response.data); // Log the response data
//       setData(response.data);
//       setError(null);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError(error);
//     }
//   }, [formatDate]);

//   useEffect(() => {
//     if (date) {
//       fetchData(date);
//     }
//   }, [date, fetchData]);

//   const columns = useMemo(
//     () => [
//       { Header: 'Time', accessor: 'time_value' },
//       {
//         Header: 'Common',
//         columns: [
//           { Header: 'Voltage L1(V)', accessor: 'voltage_l1' },
//           { Header: 'Voltage L2(V)', accessor: 'voltage_l2' },
//           { Header: 'Voltage L3(V)', accessor: 'voltage_l3' },
//           { Header: 'Inlet Flow (M3/Hr)', accessor: 'inlet_flow' },
//           { Header: 'Discharge Flow (M³/Hr)', accessor: 'discharge_flow' },
//           { Header: 'Main Line Pressure (Bar)', accessor: 'main_line_pressure' },
//           { Header: 'Surge Vessel Pressure (Bar)', accessor: 'surge_vessel_pressure' },
//         ],
//       },
//       {
//         Header: 'Tank',
//         columns: [
//           { Header: 'Tank 1 Level (M)', accessor: 'tank1_level' },
//           { Header: 'Tank 2 Level (M)', accessor: 'tank2_level' },
//           { Header: 'Tank 3 Level (M)', accessor: 'tank3_level' },
//         ],
//       },
//       {
//         Header: 'Pump 1',
//         columns: [
//           { Header: 'Amphere(A)', accessor: 'pump1_amphere' },
//           { Header: 'Speed (RPM)', accessor: 'pump1_rpm' },
//           { Header: 'Motor Temp (°C)', accessor: 'pump1_motor_temp' },
//           { Header: 'Pump Temp (°C)', accessor: 'pump1_pump_temp' },
//           { Header: 'Pressure Suction (Bar)', accessor: 'pump1_pressure_suction' },
//           { Header: 'Pressure Discharge (Bar)', accessor: 'pump1_pressure_discharge' },
//           { Header: 'Frequency (Hz)', accessor: 'pump1_frequency' },
//           { Header: 'Vibration (mm/s)', accessor: 'pump1_vibration' },
//         ],
//       },
//       {
//         Header: 'Pump 2',
//         columns: [
//           { Header: 'Amphere(A)', accessor: 'pump2_amphere' },
//           { Header: 'Speed (RPM)', accessor: 'pump2_rpm' },
//           { Header: 'Motor Temp (°C)', accessor: 'pump2_motor_temp' },
//           { Header: 'Pump Temp (°C)', accessor: 'pump2_pump_temp' },
//           { Header: 'Pressure Suction (Bar)', accessor: 'pump2_pressure_suction' },
//           { Header: 'Pressure Discharge (Bar)', accessor: 'pump2_pressure_discharge' },
//           { Header: 'Frequency (Hz)', accessor: 'pump2_frequency' },
//           { Header: 'Vibration (mm/s)', accessor: 'pump2_vibration' },
//         ],
//       },
//       {
//         Header: 'Pump 3',
//         columns: [
//           { Header: 'Amphere(A)', accessor: 'pump3_amphere' },
//           { Header: 'Speed (RPM)', accessor: 'pump3_rpm' },
//           { Header: 'Motor Temp (°C)', accessor: 'pump3_motor_temp' },
//           { Header: 'Pump Temp (°C)', accessor: 'pump3_pump_temp' },
//           { Header: 'Pressure Suction (Bar)', accessor: 'pump3_pressure_suction' },
//           { Header: 'Pressure Discharge (Bar)', accessor: 'pump3_pressure_discharge' },
//           { Header: 'Frequency (Hz)', accessor: 'pump3_frequency' },
//           { Header: 'Vibration (mm/s)', accessor: 'pump3_vibration' },
//         ],
//       },
//       {
//         Header: 'Pump 4',
//         columns: [
//           { Header: 'Amphere(A)', accessor: 'pump4_amphere' },
//           { Header: 'Speed (RPM)', accessor: 'pump4_rpm' },
//           { Header: 'Motor Temp (°C)', accessor: 'pump4_motor_temp' },
//           { Header: 'Pump Temp (°C)', accessor: 'pump4_pump_temp' },
//           { Header: 'Pressure Suction (Bar)', accessor: 'pump4_pressure_suction' },
//           { Header: 'Pressure Discharge (Bar)', accessor: 'pump4_pressure_discharge' },
//           { Header: 'Frequency (Hz)', accessor: 'pump4_frequency' },
//           { Header: 'Vibration (mm/s)', accessor: 'pump4_vibration' },
//         ],
//       },
//     ],
//     []
//   );

//   const tableInstance = useTable({ columns, data }, useBlockLayout);

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

//   return (
//     <div className="data-display-container">
//       <h2>Data for {date}</h2>
//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//       />
//       {error ? (
//         <div>Error fetching data: {error.message}</div>
//       ) : data.length === 0 ? (
//         <p>No data available</p>
//       ) : (
//         <div className="table-container">
//           <table {...getTableProps()} className="data-table">
//             <thead>
//               {headerGroups.map((headerGroup) => (
//                 <tr {...headerGroup.getHeaderGroupProps()}>
//                   {headerGroup.headers.map((column) => (
//                     <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody {...getTableBodyProps()}>
//               {rows.map((row) => {
//                 prepareRow(row);
//                 return (
//                   <tr {...row.getRowProps()}>
//                     {row.cells.map((cell) => (
//                       <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                     ))}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default DataDisplay;

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useTable, useBlockLayout } from 'react-table';
import './DataDisplay.css';
import { config } from './config';

function DataDisplay({ initialDate }) {
  const [date, setDate] = useState(initialDate || '');
  const [data, setData] = useState([]);
  const [transformedData, setTransformedData] = useState([]);
  const [times, setTimes] = useState([]);
  const [error, setError] = useState(null);

  const formatDate = useCallback((date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${year}-${month}-${day}`;
  }, []);

  const fetchData = useCallback(async (selectedDate) => {
    try {
      const formattedDate = formatDate(selectedDate);
      const response = await axios.get(`${config.API_URL}/api/data/${formattedDate}`);
      console.log(response.data); // Log the response data
      const { times, transformed } = transformData(response.data);
      setData(response.data);
      setTransformedData(transformed);
      setTimes(times);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
    }
  }, [formatDate]);

  useEffect(() => {
    if (date) {
      fetchData(date);
    }
  }, [date, fetchData]);

  const transformData = (data) => {
    const times = [...new Set(data.map(item => item.time_value))];
    const parameters = [
      'voltage_l1', 'voltage_l2', 'voltage_l3', 'inlet_flow', 'discharge_flow', 
      'main_line_pressure', 'surge_vessel_pressure', 'tank1_level', 'tank2_level', 
      'tank3_level', 'pump1_amphere', 'pump1_rpm', 'pump1_motor_temp', 
      'pump1_pump_temp', 'pump1_pressure_suction', 'pump1_pressure_discharge', 
      'pump1_frequency', 'pump1_vibration', 'pump2_amphere', 'pump2_rpm', 
      'pump2_motor_temp', 'pump2_pump_temp', 'pump2_pressure_suction', 
      'pump2_pressure_discharge', 'pump2_frequency', 'pump2_vibration', 
      'pump3_amphere', 'pump3_rpm', 'pump3_motor_temp', 'pump3_pump_temp', 
      'pump3_pressure_suction', 'pump3_pressure_discharge', 'pump3_frequency', 
      'pump3_vibration', 'pump4_amphere', 'pump4_rpm', 'pump4_motor_temp', 
      'pump4_pump_temp', 'pump4_pressure_suction', 'pump4_pressure_discharge', 
      'pump4_frequency', 'pump4_vibration'
    ];

    const transformed = parameters.map(param => {
      const row = { parameter: param };
      times.forEach(time => {
        const entry = data.find(d => d.time_value === time && d[param] !== undefined);
        row[time] = entry ? entry[param] : '';
      });
      return row;
    });

    return { times, transformed };
  };

  const columns = useMemo(
    () => [
      { Header: 'Parameters/Time', accessor: 'parameter', className: 'parameter-column' },
      ...times.map(time => ({ Header: time, accessor: time, className: 'time-column' }))
    ],
    [times]
  );

  const tableInstance = useTable({ columns, data: transformedData }, useBlockLayout);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <div className="data-display-container">
      <h2>Data for {date}</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      {error ? (
        <div>Error fetching data: {error.message}</div>
      ) : transformedData.length === 0 ? (
        <p>No data available</p>
      ) : (
        <div className="table-container">
          <table {...getTableProps()} className="data-table">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()} className={column.className}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()} className={cell.column.className}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DataDisplay;



