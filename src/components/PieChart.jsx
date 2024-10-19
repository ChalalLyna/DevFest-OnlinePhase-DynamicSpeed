import React, { useState } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import BandwidthModal from './BandwidthModal'; // Import the modal component

const chartConfig = {
    type: "pie",
    height: 240,
    series: [40, 35, 25], // Updated series to ensure it adds up to 100%: 40% for Client 1, 35% for Client 2, 25% for Not allocated
    options: {
        labels: ["Client 1", "Client 2", "Not allocated"], // Labels for the clients and the "Not allocated" part
        colors: ["#C7F5C7", "#3EA0A3", "#EEEEEE"], // Colors for Client 1, Client 2, and Not allocated
        legend: {
            position: 'bottom', // Adjust legend position
            labels: {
                colors: "#616161",
                useSeriesColors: false,
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val.toFixed(2)}%`, // Show percentage values
            style: {
                fontSize: "14px",
                fontFamily: "inherit",
                fontWeight: 500,
                colors: ["#616161"],
            },
            dropShadow: {
                enabled: false, // Disable shadow so the text is clear
            },
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: -10, // Keep the percentage labels inside the pie chart
                },
                expandOnClick: false, // Disable slice expansion on click
                donut: {
                    labels: {
                        show: false,
                    },
                },
                // Disable hover state
                hover: {
                    enabled: false, // Disable hover state entirely
                },
            },
        },
        chart: {
            toolbar: {
                show: false,
            },
        },
        stroke: {
            show: false, // Disable hover stroke effect
        },
        tooltip: {
            enabled: false, // Disable tooltips on hover
        },
        fill: {
            opacity: 1, // Ensure colors are fully visible
        },
        states: {
            hover: {
                filter: {
                    type: 'none', // Disable hover color change
                },
            },
        },
    },
};

export default function PieChartComponent() {
    const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

    const handleOpenModal = () => {
        setModalOpen(true); // Function to open the modal
    };

    const handleCloseModal = () => {
        setModalOpen(false); // Function to close the modal
    };

    return (
        <div className="bg-white w-96 rounded-md">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
                <div>
                    <h1 className="font-semibold ml-6 ">
                        Bandwidth Distribution by Client
                    </h1>
                </div>
            </CardHeader>
            <CardBody className="px-2 pb-0 mb-4">
                <Chart {...chartConfig} />
                <div className="flex justify-center mt-4 ">
                    <button
                        onClick={handleOpenModal} // Open modal on button click
                        className="bg-[#E0E0E2] text-gray-700 p-2 rounded-md text-s"
                    >
                        Change bandwidth maximum value
                    </button>
                </div>
            </CardBody>

            <BandwidthModal isOpen={isModalOpen} onClose={handleCloseModal} /> {/* Modal component */}
        </div>
    );
}
