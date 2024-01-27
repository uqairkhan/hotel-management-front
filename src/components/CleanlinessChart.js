import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const data = [
    { value: 5, label: '50 clean' },
    { value: 10, label: '45 cleaning' },
    { value: 15, label: '34 dirty' },
    { value: 15, label: '23 out' },

];

const size = {
    width: 350,
    height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 20,
}));

function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
        <StyledText x={left + width / 2} y={top + height / 2}>
            {children}
        </StyledText>
    );
}

export default function PieChartWithCenterLabel() {
    return (
        <PieChart series={[{
            data,
            innerRadius: 60,
            outerRadius: 80,
            // cx: 90,
            // cy: 100,
        }]} {...size}>
            <PieCenterLabel>
                70% Clean
            </PieCenterLabel>
        </PieChart>
    );
}