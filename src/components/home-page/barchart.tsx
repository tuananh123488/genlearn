import React from 'react'
import { Bar } from 'react-chartjs-2'
import { CategoryScale, Chart, registerables } from "chart.js";

const BarChart = ({ chartData }: { chartData: any }) => {
    Chart.register(CategoryScale);
    Chart.register(...registerables);
    return (
        <div className='w-[70%]'>
            <Bar data={chartData} />
        </div>
    )
}

export default BarChart