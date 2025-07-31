// app/(commercial)/employees/page.tsx
"use client";
import { UserPlus, Award} from 'lucide-react'; // Added Award and UserCheck icons
import { Bar, Line, Pie } from 'react-chartjs-2'; // Added Pie chart
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend } from 'chart.js'; // Added ArcElement for Pie chart

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

import { cn } from "@/lib/utils";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

import EmployeeCard from '@/components/hr/EmployeeCard';

// Dummy data for Employee Information Cards
import { employeeCardsData } from '@/lib/hrdata';

// Dummy data for Department Distribution Chart
import { departmentDistributionData } from '@/lib/hrdata';

// Dummy data for Employee Growth Chart
import { employeeGrowthData } from '@/lib/hrdata';

// Dummy data for Skill Distribution Chart
import { skillDistributionData } from '@/lib/hrdata';

// Dummy data for Recent Hires
import { recentHiresData } from '@/lib/hrdata';


const EmployeeManagementPage: React.FC = () => {
  
  return (
    <div className="min-h-screen p-6 sm:p-8 lg:p-10 font-sans text-gray-900 dark:text-white">
      {/* Header Section */}
      <div className="mb-8 inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md p-2 rounded-xl">
        <h1 className={cn("text-lg font-bold text-zinc-900 dark:text-zinc-100", pacifico.className)}>Employee Information</h1>
        <p className="text-zinc-800 dark:text-zinc-200 text-xs">Manage employee data and organizational insights</p>
      </div>

      {/* Employee Information Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {employeeCardsData.map((card, index) => (
          <EmployeeCard
            key={index}
            title={card.title}
            value={card.value}
            situation={card.situation}
            status={card.status}
            icon={card.icon}
            iconBgColor={card.iconBgColor}
            iconColor={card.iconColor}
            trend={card.trend}
          />
        ))}
      </div>

      {/* Department Distribution and Employee Growth Charts */}
      {/* This grid ensures parallel display on desktop (lg:grid-cols-2) and stacking on mobile (grid-cols-1) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"> {/* Added mb-8 for spacing */}
        {/* Department Distribution Chart */}
        <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900">
          {/* bg-gradient-to-b from-zinc-100 to-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900 */}

          <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Department Distribution</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Employee count by department</p>
          <div className="h-64">
            <Bar data={departmentDistributionData} />
             {/* options={getBarChartOptions(document.documentElement.classList.contains('dark'))} */}
          </div>
        </div>

        {/* Employee Growth Chart */}
        <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900">
          <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Employee Growth</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Hiring trends and total headcount</p>
          <div className="h-64">
            <Line data={employeeGrowthData} />
            {/* options={getChartOptions(document.documentElement.classList.contains('dark'))} */}
          </div>
        </div>
      </div>

      {/* Skill Distribution and Recent Hires Sections */}
      {/* This grid ensures parallel display on desktop (lg:grid-cols-2) and stacking on mobile (grid-cols-1) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Distribution Section */}
        <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900">
          <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white flex items-center">
            <Award size={18} className="mr-2 text-orange-600 dark:text-orange-400" />
            Skill Distribution
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Employee skill breakdown</p>
          <div className="h-64 flex flex-col md:flex-row items-center justify-center">
            <div className="w-full md:w-1/2 h-full">
              <Pie data={skillDistributionData} />
              {/* options={getPieChartOptions(document.documentElement.classList.contains('dark'))} /> */}
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-6">
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                {skillDistributionData.labels.map((label, index) => (
                  <li key={label} className="flex justify-between items-center">
                    <span className="flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: skillDistributionData.datasets[0].backgroundColor[index] }}></span>
                      {label}
                    </span>
                    <span>{skillDistributionData.datasets[0].data[index]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Hires Section */}
        <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900">
          <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white flex items-center">
            <UserPlus size={18} className="mr-2 text-orange-600 dark:text-orange-400" />
            Recent Hires
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Latest additions to the team</p>
          {recentHiresData.map((hire, index) => (
            <div key={index} className="flex items-center justify-between mb-3 last:mb-0">
              <div className="flex items-center">
                <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 flex-shrink-0">
                  {hire.avatarInitial}
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">{hire.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{hire.role}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-700 dark:text-gray-300">{hire.date}</p>
                <span className="text-green-500 text-xs font-semibold">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagementPage;
