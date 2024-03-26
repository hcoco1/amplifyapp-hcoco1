import React from 'react';
import jsPDF from 'jspdf';
import '../App.css';

const ReportGenerator = ({ notes }) => {
  const generateReport = () => {
    const doc = new jsPDF();
    let yPos = 10;

    notes.forEach((note, index) => {
      // Add text with styling
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 255); // Blue color
      doc.text(`${index + 1}. Username: ${note.username}`, 10, yPos);
      yPos += 10;

      doc.setTextColor(0); // Reset text color to black
      doc.setFontSize(10);
      doc.text(`   AFE: ${note.afe}`, 10, yPos);
      yPos += 7;
      doc.text(`   Process Path: ${note.processPath}`, 10, yPos);
      yPos += 7;
      doc.text(`   Error: ${note.error}`, 10, yPos);
      yPos += 7;
      
      // Split the Coaching text into multiple lines
      const coachingLines = doc.splitTextToSize(`   Coaching: ${note.coaching}`, 180);
      coachingLines.forEach(line => {
        doc.text(line, 10, yPos);
        yPos += 7; // Adjust vertical position for next line
      });
      
      // Split the Observations text into multiple lines
      const observationsLines = doc.splitTextToSize(`   Observations: ${note.durable}`, 180);
      observationsLines.forEach(line => {
        doc.text(line, 10, yPos);
        yPos += 7; // Adjust vertical position for next line
      });
      
      yPos += 3; // Adjust vertical position for next entry
    });

    doc.save('todo-report.pdf');
  };

  return (
    <div className="report-container">
     
      <button className="download-btn" onClick={generateReport}>Download PDF Report</button>
    </div>
  );
};

export default ReportGenerator;




