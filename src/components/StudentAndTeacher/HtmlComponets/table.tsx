// Assuming you have a Table component

import React from 'react';
import { TableProps } from '../../../types/commonType';



const Table: React.FC<TableProps> = ({ headers, data, currentPage=1, itemsPerPage=10 }) => {
  // Calculate the starting serial number for the current page
  const startSerial = (currentPage - 1) * itemsPerPage + 1;

  return (
    <div className="overflow-x-auto">
      {/* Default table layout for larger screens */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="p-3 text-left text-gray-600">#</th>
            {headers.map((header, index) => (
              <th key={index} className="p-3 text-left text-gray-600">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-200">
              <td className="p-3 text-gray-600">{startSerial + rowIndex}</td>
              {Object.values(row).map((cell: any, cellIndex) => (
                <td key={cellIndex} className="p-3 text-gray-600">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

