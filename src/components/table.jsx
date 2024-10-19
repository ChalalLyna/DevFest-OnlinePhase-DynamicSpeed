import { useState } from "react";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Date", "Time", "Client-id", "Max-bw", "bw-requested", "speed"];

const TABLE_ROWS = [
    ["2024-10-19", "14:30", 1, 10, 5, 4.5],
    ["2024-10-19", "14:35", 2, 8, 6, 5.2],
    ["2024-10-19", "14:40", 3, 9, 7, 6.1],
    ["2024-10-19", "14:45", 4, 7, 4, 3.9],
    ["2024-10-19", "14:50", 5, 10, 10, 9.5],
    ["2024-10-19", "14:55", 6, 6, 3, 2.8],
    ["2024-10-19", "15:00", 7, 5, 2, 2.0],
    ["2024-10-19", "15:05", 8, 4, 1, 1.5],
    ["2024-10-19", "15:10", 9, 3, 3, 2.5],
    ["2024-10-19", "15:15", 10, 2, 2, 1.8],
];

export default function Table() {
    const [visibleRows, setVisibleRows] = useState(5); // Initial number of visible rows
    const [isExpanded, setIsExpanded] = useState(false); // State to track if the table is expanded

    // Filter states
    const [dateFilter, setDateFilter] = useState("");
    const [timeFilter, setTimeFilter] = useState("");
    const [clientIdFilter, setClientIdFilter] = useState("");

    // Filtering the rows based on the input filters
    const filteredRows = TABLE_ROWS.filter((row) => {
        const [date, time, clientId] = row;
        return (
            (!dateFilter || date.includes(dateFilter)) &&
            (!timeFilter || time.includes(timeFilter)) &&
            (!clientIdFilter || clientId.toString().includes(clientIdFilter))
        );
    });

    const handleSeeMore = () => {
        setVisibleRows(TABLE_ROWS.length); // Show all rows
        setIsExpanded(true); // Set to expanded state
    };

    const handleSeeLess = () => {
        setVisibleRows(5); // Reset to initial 5 rows
        setIsExpanded(false); // Set to not expanded state
    };

    return (
        <div className="bg-white w-1/2 p-6 rounded-md ">
            {/* Filters */}
            <div className="flex mb-4">
                <div className="w-36 mr-6">
                    <label className="block text-gray-700 text-sm mb-2">Filter by Date</label>
                    <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <div className="w-36 mr-6">
                    <label className="block text-gray-700 text-sm  mb-2">Filter by Time</label>
                    <input
                        type="time"
                        value={timeFilter}
                        onChange={(e) => setTimeFilter(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <div className="w-36">
                    <label className="block text-gray-700 text-sm mb-2">Filter by Client-id</label>
                    <input
                        type="number"
                        value={clientIdFilter}
                        onChange={(e) => setClientIdFilter(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
            </div>

            {/* Table */}
            <table className="text-center w-full">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredRows.slice(0, visibleRows).map((row, index) => {
                        const classes = "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={index}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {cell}
                                        </Typography>
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* See More / See Less buttons */}
            <div className="flex justify-center mt-4">
                {isExpanded ? ( // Show "See Less" when expanded
                    <button
                        onClick={handleSeeLess}
                        className="text-[#3EA0A3] hover:underline pr-6"
                    >
                        See Less
                    </button>
                ) : ( // Show "See More" when not expanded
                    <button
                        onClick={handleSeeMore}
                        className="text-[#3EA0A3] hover:underline pr-6 "
                    >
                        See More
                    </button>
                )}
            </div>
        </div>
    );
}
