import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Card from '../../components/ui/Card';
import Skeleton from '../../components/ui/Skeleton';

// Register Chart.js components
ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
);

// TODO: Replace with proper icons if desired for selects/inputs

// Sample Historical Patient Data
const samplePatientData = {
  bp: [
    { date: '2023-01-01', systolic: 120, diastolic: 80 },
    { date: '2023-01-15', systolic: 122, diastolic: 81 },
    { date: '2023-02-01', systolic: 118, diastolic: 79 },
    { date: '2023-02-15', systolic: 125, diastolic: 83 },
    { date: '2023-03-01', systolic: 123, diastolic: 80 },
  ],
  sugar: [
    { date: '2023-01-01', value: 90 },
    { date: '2023-01-15', value: 95 },
    { date: '2023-02-01', value: 105 },
    { date: '2023-02-15', value: 100 },
    { date: '2023-03-01', value: 92 },
  ],
  weight: [
    { date: '2023-01-01', value: 70 },
    { date: '2023-01-15', value: 70.5 },
    { date: '2023-02-01', value: 69.8 },
    { date: '2023-02-15', value: 71 },
    { date: '2023-03-01', value: 70.2 },
  ],
};

export default function GraphsCharts() {
  const [selectedVital, setSelectedVital] = useState('bp');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [chartData, setChartData] = useState({ datasets: [] });
  const [isLoading, setIsLoading] = useState(false); // Set true for skeleton

  // Effect to set initial date range (e.g., last 3 months)
  useEffect(() => {
    const dataForVital = samplePatientData[selectedVital];
    if (dataForVital && dataForVital.length > 0) {
      const sortedData = [...dataForVital].sort((a, b) => new Date(b.date) - new Date(a.date));
      const latestDate = new Date(sortedData[0].date);
      const threeMonthsPrior = new Date(latestDate);
      threeMonthsPrior.setMonth(latestDate.getMonth() - 3);
      setDateRange({
        start: threeMonthsPrior.toISOString().split('T')[0],
        end: latestDate.toISOString().split('T')[0],
      });
    } else {
      setDateRange({ start: '', end: '' });
    }
  }, [selectedVital]);

  // Effect to update chart data based on selection and range
  useEffect(() => {
    setIsLoading(true);
    const dataForVital = samplePatientData[selectedVital] || [];
    let filteredData = dataForVital.filter(d => 
      (!dateRange.start || new Date(d.date) >= new Date(dateRange.start)) && 
      (!dateRange.end || new Date(d.date) <= new Date(dateRange.end))
    ).sort((a, b) => new Date(a.date) - new Date(b.date)); // Ensure chronological order for chart

    const labels = filteredData.map(d => new Date(d.date).toLocaleDateString('en-CA')); // Use 'en-CA' for YYYY-MM-DD format or similar
    let datasets = [];
    let yAxisLabel = 'Value';

    if (selectedVital === 'bp') {
      yAxisLabel = 'Pressure (mmHg)';
      datasets = [
        { label: 'Systolic', data: filteredData.map(d => d.systolic), borderColor: '#ef4444', backgroundColor: '#ef4444', tension: 0.1 },
        { label: 'Diastolic', data: filteredData.map(d => d.diastolic), borderColor: '#3b82f6', backgroundColor: '#3b82f6', tension: 0.1 },
      ];
    } else if (selectedVital === 'sugar') {
      yAxisLabel = 'Level (mg/dL)';
      datasets = [{ label: 'Blood Sugar', data: filteredData.map(d => d.value), borderColor: '#14b8a6', backgroundColor: '#14b8a6', tension: 0.1 }];
    } else if (selectedVital === 'weight') {
      yAxisLabel = 'Weight (kg)';
      datasets = [{ label: 'Weight', data: filteredData.map(d => d.value), borderColor: '#8b5cf6', backgroundColor: '#8b5cf6', tension: 0.1 }];
    }

    setChartData({ labels, datasets, yAxisLabel });
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 500);

  }, [selectedVital, dateRange]);

  const handleVitalChange = (event) => {
    setSelectedVital(event.target.value);
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setDateRange(prevRange => ({ ...prevRange, [name]: value }));
  };

  const getChartTitle = () => {
    switch(selectedVital) {
      case 'bp': return "Blood Pressure Trend";
      case 'sugar': return "Blood Sugar Trend";
      case 'weight': return "Weight Trend";
      default: return "Health Trend";
    }
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { usePointStyle: true, pointStyle: 'circle' } },
      title: { display: false }, // Title is in the Card header
      tooltip: { 
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 4,
      }
    },
    scales: {
      x: { title: { display: false }, grid: { display: false } }, // Remove X-axis title and grid
      y: { 
        title: { display: true, text: chartData.yAxisLabel, font: { size: 12 } },
        grid: { color: '#e2e8f0' }, // Use slate-200 for grid lines
        beginAtZero: selectedVital !== 'bp' 
      }
    },
    elements: {
      point: { radius: 3, hoverRadius: 5 },
      line: { borderWidth: 2 }
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 bg-slate-100 min-h-full">
      {/* Header */}
      <header className="pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-800">Health Vitals & Trends</h1>
        <p className="text-lg text-slate-600 mt-1">Visualize your recorded health data over time.</p>
      </header>

      {/* Controls Section - Refactored */}
      <Card className="p-4 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* Vital Selection */}
          <div>
            <label htmlFor="vital-select" className="block text-sm font-medium text-slate-700 mb-1">Vital Sign</label>
            <select 
              id="vital-select"
              value={selectedVital}
              onChange={handleVitalChange}
              className="w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-sm"
            >
              <option value="bp">Blood Pressure</option>
              <option value="sugar">Blood Sugar</option>
              <option value="weight">Weight</option>
            </select>
          </div>
          
          {/* Date Range Selection */}
          <div>
             <label htmlFor="start-date" className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
            <input 
              type="date" 
              id="start-date"
              name="start"
              value={dateRange.start}
              onChange={handleDateChange}
              className="w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-sm"
              max={dateRange.end || undefined}
            />
          </div>
          <div>
             <label htmlFor="end-date" className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
            <input 
              type="date" 
              id="end-date"
              name="end"
              value={dateRange.end}
              onChange={handleDateChange}
              className="w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-sm"
              min={dateRange.start || undefined}
            />
          </div>
        </div>
      </Card>

      {/* Chart Section - Minor adjustments */}
      <Card className="p-4 sm:p-6 bg-white">
         <h2 className="text-lg sm:text-xl font-semibold text-slate-700 mb-4 text-center">{getChartTitle()}</h2>
         {isLoading ? (
           <div className="h-80 md:h-96 flex items-center justify-center"><Skeleton height="100%" width="100%" /></div>
         ) : chartData.labels && chartData.labels.length > 0 ? (
            <div className="relative w-full h-80 md:h-96">
                <Line data={chartData} options={chartOptions} />
            </div>
         ) : (
             <div className="flex items-center justify-center h-80 md:h-96">
                <p className="text-slate-500 text-center"><span className="text-2xl block mb-2">📊</span>No data available for the selected criteria.</p>
             </div>
         )}
      </Card>
    </div>
  );
} 