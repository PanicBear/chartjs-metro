import Chart, { ChartConfiguration, TooltipItem } from 'chart.js/auto';
import type { NextPage } from 'next';
import { raw } from 'next/dist/build/webpack/loaders/next-middleware-wasm-loader';
import { createRef, MutableRefObject, useEffect, useRef } from 'react';

type Station = {
  name: string;
  lng: number;
  lat: number;
  x: number;
  y: number;
};

const MRT3: Station[] = [
  { name: 'North Avenue', lng: 14.6521761, lat: 121.0322232, x: 5, y: 14 },
  { name: 'Quezon Ave.', lng: 14.642784, lat: 121.0380526, x: 6, y: 13 },
  { name: 'Kamuning', lng: 14.6351192, lat: 121.0432239, x: 7, y: 12 },
  { name: 'Cubao', lng: 14.6192257, lat: 121.0511349, x: 8, y: 11 },
  { name: 'Santolan', lng: 14.607444, lat: 121.0565669, x: 8, y: 9 },
  { name: 'Ortigas', lng: 14.5878163, lat: 121.0568337, x: 8, y: 7 },
  { name: 'Shaw Blvd.', lng: 14.5810861, lat: 121.053691, x: 7, y: 6 },
  { name: 'Boni', lng: 14.5737264, lat: 121.0480613, x: 6, y: 5 },
  { name: 'Guadalupe', lng: 14.5666846, lat: 121.045334, x: 5, y: 4 },
  { name: 'Buendia', lng: 14.554467, lat: 121.0343599, x: 4, y: 3 },
  { name: 'Ayala', lng: 14.548984, lat: 121.0278799, x: 3, y: 2 },
  { name: 'Magallanes', lng: 14.541403, lat: 121.018481, x: 2, y: 1 },
  { name: 'Taft', lng: 14.537602, lat: 121.001186, x: 0, y: 0 },
];

const Home: NextPage = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);

  const colors = {
    yellow: {
      default: 'rgba(251, 192, 45, 1)',
      half: 'rgba(251, 192, 45, 0.5)',
      quarter: 'rgba(251, 192, 45, 0.25)',
    },
    purple: {
      default: 'rgba(149, 76, 233, 1)',
      half: 'rgba(149, 76, 233, 0.5)',
      quarter: 'rgba(149, 76, 233, 0.25)',
    },
    indigo: {
      default: 'rgba(80, 102, 120, 1)',
      quarter: 'rgba(80, 102, 120, 0.25)',
    },
  };

  const tooltipHandler = (tooltipItems: TooltipItem<'line'>[]) => {
    console.log(tooltipItems);
    return tooltipItems.map(({ raw }: any) => raw.name);
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
            data: MRT3,
            borderWidth: 4,
            borderColor: colors.yellow.default,
            pointRadius: 3,
          },
        ],
      },
      options: {
        aspectRatio: 1,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            titleMarginBottom: 0,
            callbacks: {
              title: tooltipHandler,
              label: () => '',
            },
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
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  });
  return (
    <div style={{ padding: '16px' }}>
      <canvas id="myChart" ref={canvasEl} height="100" />
    </div>
  );
};

export default Home;
