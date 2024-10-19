import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Date", "Time", "Client ID", "Max BW", "BW Requested (Mbps)", "Speed"];

export default function Table() {
  const [rows, setRows] = useState([]); // State to store rows from API
  const [loading, setLoading] = useState(true);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      console.log("Attempting to fetch data from the API...");

      try {
        const response = await axios.get("http://localhost:5000/bandwidth");
        console.log("API response received:", response);

        const data = response.data;
        console.log("Data from API:", data);

        // Transform data into the format needed for the table
        const formattedRows = data.map((record) => {
          const date = new Date(record.timestamp);
          const formattedDate = date.toISOString().split("T")[0];
          const formattedTime = date.toTimeString().split(" ")[0].substring(0, 5);

          return [
            formattedDate, // Date
            formattedTime, // Time
            record.clientId, // Client ID
            record.bandwidthLimit.toFixed(1), // Max BW, formatted to 1 decimal place
            record.bandwidthRequested.toFixed(1), // BW requested, formatted to 1 decimal place
            record.connectionSpeed.toFixed(1) // Speed, formatted to 1 decimal place
          ];
        });

        console.log("Formatted rows for table:", formattedRows);

        setRows(formattedRows);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bandwidth data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white w-2/3 p-6 rounded-md ">
      <div>
        <h1 className="font-semibold ml-6 mb-6">Connection speed by client over time</h1>
      </div>

      {/* Table */}
      <div className="overflow-y-auto h-64">
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <table className="text-center w-full">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={TABLE_HEAD.length} className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      No data available
                    </Typography>
                  </td>
                </tr>
              ) : (
                rows.map((row, index) => (
                  <tr key={index}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="p-4 border-b border-blue-gray-50">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {cell}
                        </Typography>
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
