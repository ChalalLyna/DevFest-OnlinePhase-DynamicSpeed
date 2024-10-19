'use client';

import { Card, DonutChart, List, ListItem } from '@tremor/react';
import { useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const data = [
  {
    client: 'Client 1',
    bandwidth: 4.5, // Client 1's consumption in kbps
  },
  {
    client: 'Client 2',
    bandwidth: 5.5, // Client 2's consumption in kbps
  },
];

const totalBandwidth = 10; // Max bandwidth in kbps

// Formatter for displaying bandwidth
const bandwidthFormatter = (number) => {
  return `${number.toFixed(1)} kbps`;
};

export default function Circles() {
  const chartData = data.map((client) => ({
    name: client.client,
    amount: client.bandwidth,
    share: `${((client.bandwidth / totalBandwidth) * 100).toFixed(1)}%`,
  }));

  return (
    <>
      <div className="sm:mx-auto sm:max-w-lg bg-white rounded-md">
        <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Bandwidth Usage by Client
        </h3>
        <div className='flex '>
        <DonutChart
          className="mt-8"
          data={chartData}
          category="amount"
          index="name"
          valueFormatter={bandwidthFormatter}
          showTooltip={false}
          colors={['#00bcd4', '#2196f3']}
        />
        <DonutChart
          className="mt-8"
          data={chartData}
          category="amount"
          index="name"
          valueFormatter={bandwidthFormatter}
          showTooltip={false}
          colors={['#00bcd4', '#2196f3']}
        />
        </div>
        
       
        <List className="mt-2">
          {chartData.map((item) => (
            <ListItem key={item.name} className="space-x-6">
              <div className="flex items-center space-x-2.5 truncate">
                <span
                  className={classNames(
                    'w-2.5 h-2.5 rounded-full',
                    item.name === 'Client 1' ? 'bg-blue-400' : 'bg-blue-600',
                  )}
                  aria-hidden={true}
                />
                <span className="truncate dark:text-dark-tremor-content-emphasis">
                  {item.name}
                </span>
              </div>
              
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
}
