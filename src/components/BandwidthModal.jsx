import React, { useState } from 'react';

const BandwidthModal = ({ isOpen, onClose, onSubmit }) => {
    const [clientId, setClientId] = useState('');
    const [bandwidth, setBandwidth] = useState(10); // Starts with 10 kbps

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Client ID: ${clientId}, Bandwidth: ${bandwidth} kbps`);
        onSubmit(clientId, bandwidth); // Call the onSubmit function with the clientId and bandwidth
        onClose(); // Close the modal after submission
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-6 w-96">
                    <h2 className="text-lg font-bold mb-4">Change Bandwidth Max Value</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">Client ID</label>
                            <input
                                type="text"
                                id="clientId"
                                value={clientId}
                                onChange={(e) => setClientId(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="bandwidth" className="block text-sm font-medium text-gray-700">Bandwidth (10 Kbps increments)</label>
                            <input
                                type="number"
                                id="bandwidth"
                                value={bandwidth}
                                onChange={(e) => setBandwidth(Math.max(10, Math.min(e.target.value, 1000)))}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                min="10"
                                max="1000"
                                step="10"
                                required
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-[#3EA0A3] rounded-md hover:bg-[#2d9599] focus:outline-none"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default BandwidthModal;
