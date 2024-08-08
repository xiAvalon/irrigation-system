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
    if (!date) throw '';
    const [year, month, day] = date.split('-');
    if (!year || !month || !day) throw '';
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



