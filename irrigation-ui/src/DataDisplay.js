import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useTable, useBlockLayout } from 'react-table';
import './DataDisplay.css';

function DataDisplay({ initialDate }) {
  const [date, setDate] = useState(initialDate || '');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const formatDate = useCallback((date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${year}-${month}-${day}`;
  }, []);

  const fetchData = useCallback(async (selectedDate) => {
    try {
      const formattedDate = formatDate(selectedDate);
      const response = await axios.get(`https://localhost:5000/api/data/${formattedDate}`);
      console.log(response.data); // Log the response data
      setData(response.data);
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

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Time', accessor: 'time_value' },
      { Header: 'Voltage L1', accessor: 'voltage_l1' },
      { Header: 'Voltage L2', accessor: 'voltage_l2' },
      { Header: 'Voltage L3', accessor: 'voltage_l3' },
      { Header: 'Intel Flow', accessor: 'intel_flow' },
      { Header: 'Discharge Flow', accessor: 'discharge_flow' },
      { Header: 'Main Line Pressure', accessor: 'main_line_pressure' },
      { Header: 'Surge Vessel Pressure', accessor: 'surge_vessel_pressure' },
      { Header: 'Tank1 Level', accessor: 'tank1_level' },
      { Header: 'Tank2 Level', accessor: 'tank2_level' },
      { Header: 'Pump1 Amphere', accessor: 'pump1_amphere' },
      { Header: 'Pump1 RPM', accessor: 'pump1_rpm' },
      { Header: 'Pump1 Motor Temp', accessor: 'pump1_motor_temp' },
      { Header: 'Pump1 Pump Temp', accessor: 'pump1_pump_temp' },
      { Header: 'Pump1 SP', accessor: 'pump1_sp' },
      { Header: 'Pump1 DP', accessor: 'pump1_dp' },
      { Header: 'Pump1 Frequency', accessor: 'pump1_frequency' },
      { Header: 'Pump1 Vibration', accessor: 'pump1_vibration' },
      { Header: 'Pump2 Amphere', accessor: 'pump2_amphere' },
      { Header: 'Pump2 RPM', accessor: 'pump2_rpm' },
      { Header: 'Pump2 Motor Temp', accessor: 'pump2_motor_temp' },
      { Header: 'Pump2 Pump Temp', accessor: 'pump2_pump_temp' },
      { Header: 'Pump2 SP', accessor: 'pump2_sp' },
      { Header: 'Pump2 DP', accessor: 'pump2_dp' },
      { Header: 'Pump2 Frequency', accessor: 'pump2_frequency' },
      { Header: 'Pump2 Vibration', accessor: 'pump2_vibration' },
      { Header: 'Pump3 Amphere', accessor: 'pump3_amphere' },
      { Header: 'Pump3 RPM', accessor: 'pump3_rpm' },
      { Header: 'Pump3 Motor Temp', accessor: 'pump3_motor_temp' },
      { Header: 'Pump3 Pump Temp', accessor: 'pump3_pump_temp' },
      { Header: 'Pump3 SP', accessor: 'pump3_sp' },
      { Header: 'Pump3 DP', accessor: 'pump3_dp' },
      { Header: 'Pump3 Frequency', accessor: 'pump3_frequency' },
      { Header: 'Pump3 Vibration', accessor: 'pump3_vibration' },
      { Header: 'Pump4 Amphere', accessor: 'pump4_amphere' },
      { Header: 'Pump4 RPM', accessor: 'pump4_rpm' },
      { Header: 'Pump4 Motor Temp', accessor: 'pump4_motor_temp' },
      { Header: 'Pump4 Pump Temp', accessor: 'pump4_pump_temp' },
      { Header: 'Pump4 SP', accessor: 'pump4_sp' },
      { Header: 'Pump4 DP', accessor: 'pump4_dp' },
      { Header: 'Pump4 Frequency', accessor: 'pump4_frequency' },
      { Header: 'Pump4 Vibration', accessor: 'pump4_vibration' }
    ],
    []
  );

  const tableInstance = useTable({ columns, data }, useBlockLayout);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <div className="data-display-container">
      <h2>Data for {date}</h2>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      {error ? (
        <div>Error fetching data: {error.message}</div>
      ) : data.length === 0 ? (
        <p>No data available</p>
      ) : (
        <div className="table-container">
          <table {...getTableProps()} className="data-table">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
