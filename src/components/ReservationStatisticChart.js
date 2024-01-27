import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function SimpleLineChart({xLabels=[],series=[]}) {
  return (
    <LineChart
      //className='w-full'
      height={300}
      series={[...series]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      slotProps={
        {
          legend: {
            itemMarkWidth: 9,
            itemMarkHeight: 9,
            markGap: 3,
            itemGap: 5,
            labelStyle: {
              fontSize: 14,
            },
          },
          
        }
      }
    />
  );
}