import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import './ErrorSummary.css'; // Import the CSS file

const ErrorSummary = ({ notes, className }) => {
  // Define the fields and values you want to count
  const fieldsToCount = [
    { field: 'error', value: 'Rebin Error Indicator' },
    { field: 'error', value: 'Induct Error Indicator' },
    { field: 'error', value: 'Induct Shortage' },
    { field: 'error', value: 'Wrong Box' },
    { field: 'error', value: 'Slam Kickout' },
    { field: 'error', value: 'Pack Item Missing' },
    { field: 'error', value: 'Pack Item Damaged' },
    { field: 'error', value: 'Pack Item Unscannable' },
    { field: 'error', value: 'Shipment Exception' },
    // Extend this array based on your data model and requirements
  ];

  // Function to count the occurrences of a value in a given field
  const countNotes = (field, value) => {
    return notes.filter(note => note[field] === value).length;
  };

  const totalErrors = fieldsToCount.reduce((acc, item) => acc + countNotes(item.field, item.value), 0);

  // Data for the pie chart
  const data = fieldsToCount.map(item => ({
    name: item.value,
    value: countNotes(item.field, item.value) // 'value' is used by Pie chart
  }));

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00bfff', '#ff4040', '#008080', '#800080', '#008000'];

  return (
    <div className={`audits-summary-container ${className}`}>
      <div>
        <h2 className="audits-summary-title">Errors</h2>
      </div>
      
      <div className="audits-summary-chart">
        <PieChart width={500} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
             /* label={({ percent }) => ` ${(percent * 100).toFixed(0)}%`}  */
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        
          <Legend />
        </PieChart>
      </div>

      {/* Display counts */}
      <div className="audits-summary-counts">
        {fieldsToCount.map(({ field, value }) => (
          <div key={`${field}-${value}`} className="audits-summary-item">
            <p>{`${value}: ${countNotes(field, value)}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorSummary;
