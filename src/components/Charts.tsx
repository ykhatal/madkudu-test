'use client';

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  data: Kudu[]
}

interface Accumulator {
  continent: { [key: string]: number },
  horn: { [key: string]: number },
}


function getSplitByContinentData(continentData: { [key: string]: number }) {
  return {
    labels: Object.keys(continentData),
    datasets: [
      {
        label: 'Split by continent',
        data: Object.values(continentData),
        backgroundColor: [
          'rgb(46, 204, 113)',
          'rgb(241, 196, 15)',
        ],
      },
    ],
  };
}

function getSplitByHornType(hornData: { [key: string]: number }) {
  return {
    labels: Object.keys(hornData),
    datasets: [
      {
        label: 'Split by horn',
        data: hornData,
        backgroundColor: 'rgb(26, 188, 156)',
      },
    ],
  };
}

export default function Charts({ data }: Props) {
  const split = data.reduce((a: Accumulator, c: Kudu) => {
    a.continent[c.continent] = a.continent[c.continent] === undefined ? 0 : a.continent[c.continent] + 1;
    a.horn[c.horns] = a.horn[c.horns] === undefined ? 0 : a.horn[c.horns] + 1;
    return a;
  }, { continent: {}, horn: {} } as Accumulator);

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 md:w-3/4 w-full md:p-20 p-5">
      <div className="flex items-center p-40">
        <Pie
          data={getSplitByContinentData(split.continent)}
        />

      </div>
      <div className="flex items-center p-5">
        <Bar
          data={getSplitByHornType(split.horn)}
        />
      </div>
    </div>
  );
}
