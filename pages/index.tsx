import Chart, { ChartConfiguration, TooltipItem } from 'chart.js/auto';
import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import ChartDatalabels from 'chartjs-plugin-datalabels';

type Station = {
  name: string;
  lng: number;
  lat: number;
  x: number;
  y: number;
};

const LRT1: Station[] = [
  { name: 'North Ave.', lng: 0, lat: 0, x: 0, y: 0 },
  { name: 'Roosevelt', lng: 0, lat: 0, x: 0, y: 0 },
  { name: 'Balintawak', lng: 0, lat: 0, x: 0, y: 0 },
  { name: 'Monumento', lng: 0, lat: 0, x: 0, y: 0 },
  { name: '5th Ave.', lng: 0, lat: 0, x: 0, y: 0 },
  { name: 'R. Papa', lng: 0, lat: 0, x: 0, y: 0 },
  { name: 'Abad Santos', lng: 0, lat: 0, x: 0, y: 0 },
  { name: 'Blumentritt', lng: 0, lat: 0, x: 0, y: 0 },
  { name: 'Tayuman', lng: 0, lat: 0, x: 0, y: 0 },
  { name: 'Bambang', lng: 0, lat: 0, x: 0, y: 0 },
  { name: 'Doroteo jose', lng: 0, lat: 0, x: 0, y: 0 },
  { name: 'Carriedo', lng: 0, lat: 0, x: 0, y: 0 },
  { name: 'Central Terminal', lng: 0, lat: 0, x: 0, y: 0 },
  { name: 'United nations', lng: 0, lat: 0, x: 0, y: 0 },
  { name: 'Pedro Gil', lng: 0, lat: 0, x: 0, y: 0 },
  { name: 'Quirino Ave.', lng: 0, lat: 0, x: 0, y: 0 },
  { name: 'Vito Cruz', lng: 0, lat: 0, x: 0, y: 0 },
  { name: 'Gil Puyat', lng: 0, lat: 0, x: 0, y: 0 },
  { name: 'Libertad', lng: 0, lat: 0, x: 0, y: 0 },
  { name: 'EDSA', lng: 0, lat: 0, x: 0, y: 0 },
  { name: 'Baclaran', lng: 0, lat: 0, x: 0, y: 0 },
];

const LRT2: Station[] = [
  { name: 'Recto', lng: 14.603497, lat: 120.983403, x: 0, y: 8 },
  { name: 'Legarda', lng: 14.60085, lat: 120.992692, x: 1, y: 8 },
  { name: 'Pureza', lng: 14.601667, lat: 121.005194, x: 2, y: 8 },
  { name: 'V.mapa', lng: 14.603889, lat: 121.016944, x: 3, y: 8 },
  { name: 'J.Ruiz', lng: 14.610556, lat: 121.026111, x: 5, y: 8 },
  { name: 'Gilmore', lng: 14.613333, lat: 121.033889, x: 6, y: 9 },
  { name: 'Betty Go Belmonte', lng: 14.618333, lat: 121.0425, x: 7, y: 10 },
  { name: 'Cubao', lng: 14.622678, lat: 121.052636, x: 8, y: 11 },
  { name: 'Anonas', lng: 14.628, lat: 121.064694, x: 9, y: 11 },
  { name: 'Katipunan', lng: 14.631097, lat: 121.072958, x: 10, y: 11 },
  { name: 'Santolan	', lng: 14.622139, lat: 121.085917, x: 11, y: 10 },
  { name: 'Marikina	', lng: 14.620278, lat: 121.100278, x: 12, y: 10 },
  { name: 'Antiplo', lng: 14.624722, lat: 121.121111, x: 13, y: 10 },
];

const MRT3: Station[] = [
  { name: 'North Avenue', lng: 14.652444, lat: 121.032167, x: 5, y: 14 },
  { name: 'Quezon Ave.', lng: 14.642444, lat: 121.038674, x: 6, y: 13 },
  { name: 'Kamuning', lng: 14.635144, lat: 121.043361, x: 7, y: 12 },
  { name: 'Cubao', lng: 14.619431, lat: 121.051036, x: 8, y: 11 },
  { name: 'Santolan', lng: 14.607711, lat: 121.0565669, x: 8, y: 9 },
  { name: 'Ortigas', lng: 14.5876, lat: 121.0566, x: 8, y: 7 },
  { name: 'Shaw Blvd.', lng: 14.581397, lat: 121.053681, x: 7, y: 6 },
  { name: 'Boni', lng: 14.573764, lat: 121.048167, x: 6, y: 5 },
  { name: 'Guadalupe', lng: 14.566861, lat: 121.045467, x: 5, y: 4 },
  { name: 'Buendia', lng: 14.554203, lat: 121.034094, x: 4, y: 3 },
  { name: 'Ayala', lng: 14.548942, lat: 121.027672, x: 3, y: 2 },
  { name: 'Magallanes', lng: 14.541786, lat: 121.019233, x: 2, y: 1 },
  { name: 'Taft', lng: 14.537517, lat: 121.001406, x: 1, y: 0 },
];

const Home: NextPage = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);

  const colors = {
    teal: {
      default: 'rgba(77, 182, 172, 1)',
      half: 'rgba(77, 182, 172, 0.5)',
    },
    yellow: {
      default: 'rgba(251, 192, 45, 1)',
      half: 'rgba(251, 192, 45, 0.5)',
    },
    indigo: {
      default: 'rgba(66, 165, 245, 1)',
      quarter: 'rgba(66, 165, 245, 0.25)',
    },
  };

  useEffect(() => {
    if (!canvasEl.current) return;
    const ctx: CanvasRenderingContext2D | null = canvasEl.current.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: new Array(15).fill(0).map((_, idx) => idx),
        datasets: [
          {
            data: LRT1,
            borderColor: colors.teal.default,
          },
          {
            data: LRT2,
            borderColor: colors.indigo.default,
          },
          {
            data: MRT3,
            borderColor: colors.yellow.default,
          },
        ],
      },
      options: {
        onClick: pointClickHandler,
        aspectRatio: 1,
        datasets: {
          line: {
            fill: false,
            pointRadius: 6,
            borderWidth: 4,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
          decimation: {
            samples: 1,
          },
          datalabels: {
            listeners: {
              click: pointClickHandler,
            },
            formatter: function (value, context) {
              return value.name;
            },
            rotation: 330,
            font: {
              weight: 'bold',
              size: 8,
              lineHeight: 0,
            },
            color: ['black'],
          },
        },
        scales: {
          x: {
            display: false,
            grid: {
              display: false,
            },
          },
          y: {
            display: false,
            grid: {
              display: false,
            },
          },
        },
      },
    };

    Chart.register(ChartDatalabels);

    const myChart = new Chart(ctx, config);

    function pointClickHandler(e: any) {
      const points = myChart.getElementsAtEventForMode(e, 'nearest', { intersect: false }, true);
      if (points.length) {
        const firstPoint = points[0];
        const value = myChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
        console.log(value);
      }
    }

    return function cleanup() {
      myChart.destroy();
    };
  });
  return (
    <div style={{ padding: '16px' }}>
      <canvas id="myChart" ref={canvasEl} height="100" />
    </div>
  );
};

export default Home;
