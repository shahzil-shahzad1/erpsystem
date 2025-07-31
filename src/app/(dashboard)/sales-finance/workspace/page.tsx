"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Pacifico } from "next/font/google";
import {
  TrendingUp,
  Banknote,
  Wallet,
  Activity,
  AlertTriangle,
  CheckCircle,
  Package,
  Clock,
  User,
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
} from "lucide-react";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

const kpiMetrics = [
  { label: "Total Revenue", value: "Rs 1,25,000", change: "+12.5%", icon: TrendingUp, trend: "up" },
  { label: "Total Expenses", value: "Rs 88,000", change: "-3.2%", icon: Wallet, trend: "down" },
  { label: "Net Profit", value: "Rs 37,000", change: "+18.7%", icon: Banknote, trend: "up" },
  { label: "Profit Margin", value: "29.6%", change: "+2.1%", icon: Activity, trend: "up" },
];

const urgentTasks = [
  { task: "Payroll Processing", due: "4 days", priority: "high", icon: Clock },
  { task: "Tax Filing Deadline", due: "1 week", priority: "medium", icon: Calendar },
  { task: "Budget Review Meeting", due: "2 days", priority: "high", icon: AlertTriangle },
  { task: "Vendor Payment", due: "Tomorrow", priority: "urgent", icon: AlertTriangle },
];

const recentActivity = [
  { id: "INV‑1025", type: "Invoice", amount: "+ Rs 50,000", status: "Paid", time: "2h ago", icon: CheckCircle, color: "text-green-600" },
  { id: "EXP‑209", type: "Purchase", amount: "‑ Rs 30,000", status: "Posted", time: "4h ago", icon: Package, color: "text-blue-600" },
  { id: "PAY‑312", type: "Payment In", amount: "+ Rs 20,000", status: "Received", time: "6h ago", icon: TrendingUp, color: "text-green-600" },
];

const businessInsights = [
  { title: "Top Customer", value: "Alpha Traders", subtitle: "Rs 3,20,000 this month", icon: User },
  { title: "Best Product", value: "Steel Rods", subtitle: "45% of total sales", icon: Package },
  { title: "Outstanding", value: "Rs 45,000", subtitle: "12 pending invoices", icon: ArrowDownCircle },
  { title: "Due Payments", value: "Rs 32,000", subtitle: "5 suppliers pending", icon: ArrowUpCircle },
];

export default function WorkspacePage() {
  return (
    <div className="h-screen flex flex-col p-2 text-gray-800 dark:text-gray-200 relative z-10 overflow-hidden">
      {/* Compact Header */}
      <div className="relative rounded-xl p-2 shadow-md mb-2 flex justify-between items-center overflow-hidden">
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5 dark:from-orange-500/10 dark:via-transparent dark:to-orange-500/10 rounded-xl blur-xl animate-pulse" />
          <div className="absolute inset-0 p-[1px] rounded-xl bg-gradient-to-br from-orange-500/30 via-white/20 to-blue-500/30 dark:from-orange-500/20 dark:via-white/10 dark:to-blue-500/20">
            <div className="absolute inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl" />
          </div>
        </div>

        <div className="relative z-10 group">
          <h1 className={cn(
            "text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 dark:from-orange-400 dark:via-orange-300 dark:to-orange-400",
            pacifico.className
          )}>
            Sales & Finance Workspace
          </h1>
        </div>

        <div className="relative bg-white/50 dark:bg-gray-800/50 text-black dark:text-white font-mono px-2 py-1 rounded-xl text-xs z-10">
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            <span>Live Dashboard</span>
          </div>
        </div>
      </div>

      {/* Compact KPI Row */}
      <div className="grid grid-cols-4 gap-2 mb-2">
        {kpiMetrics.map(({ label, value, change, icon: Icon, trend }) => (
          <div key={label} className="relative p-2 rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5 dark:from-orange-500/10 dark:via-transparent dark:to-orange-500/10 rounded-xl blur-xl animate-pulse" />
              <div className="absolute inset-0 p-[1px] rounded-xl bg-gradient-to-br from-orange-500/20 via-white/10 to-blue-500/20 dark:from-orange-500/20 dark:via-white/5 dark:to-blue-500/20">
                <div className="absolute inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl" />
              </div>
            </div>

            <div className="relative z-10 text-center">
              <div className="w-6 h-6 rounded-lg bg-[#F5793B]/10 dark:bg-[#F5793B]/20 flex items-center justify-center mx-auto mb-1">
                <Icon className="w-3 h-3 text-[#F5793B]" />
              </div>
              <p className="text-[10px] font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</p>
              <p className="text-sm font-bold text-[#F5793B]">{value}</p>
              <p className={cn(
                "text-[8px] font-medium",
                trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              )}>
                {change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid - No Scroll */}
      <div className="flex-1 grid grid-cols-12 gap-2 min-h-0">
        {/* Left Column - Tasks & Activity */}
        <div className="col-span-8 grid grid-rows-2 gap-2">
          {/* Urgent Tasks - Top Half */}
          <div className="relative rounded-xl shadow-sm p-2 overflow-hidden">
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-red-500/5 dark:from-red-500/10 dark:via-transparent dark:to-red-500/10 rounded-xl blur-xl animate-pulse-slow" />
              <div className="absolute inset-0 p-[1px] rounded-xl bg-gradient-to-br from-red-500/20 via-white/10 to-red-500/20 dark:from-red-500/20 dark:via-white/5 dark:to-red-500/20">
                <div className="absolute inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl" />
              </div>
            </div>

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-lg bg-red-500/10 dark:bg-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="h-3 w-3 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xs font-semibold text-gray-800 dark:text-gray-200">Urgent Tasks</h3>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-1">
                {urgentTasks.map((task, index) => (
                  <div key={index} className="p-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <div className="flex items-center gap-1.5">
                      <div className={`p-1 rounded-full ${
                        task.priority === 'urgent' ? 'bg-red-100 dark:bg-red-900/50' :
                        task.priority === 'high' ? 'bg-orange-100 dark:bg-orange-900/50' : 'bg-yellow-100 dark:bg-yellow-900/50'
                      }`}>
                        <task.icon className={`w-2.5 h-2.5 ${
                          task.priority === 'urgent' ? 'text-red-600 dark:text-red-400' :
                          task.priority === 'high' ? 'text-orange-600 dark:text-orange-400' : 'text-yellow-600 dark:text-yellow-400'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-gray-100 text-[10px] truncate">{task.task}</p>
                        <p className="text-[8px] text-gray-600 dark:text-gray-400">Due: {task.due}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity - Bottom Half */}
          <div className="relative rounded-xl shadow-sm p-2 overflow-hidden">
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-blue-500/5 dark:from-blue-500/10 dark:via-transparent dark:to-blue-500/10 rounded-xl blur-xl animate-pulse-slow" />
              <div className="absolute inset-0 p-[1px] rounded-xl bg-gradient-to-br from-blue-500/20 via-white/10 to-blue-500/20 dark:from-blue-500/20 dark:via-white/5 dark:to-blue-500/20">
                <div className="absolute inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl" />
              </div>
            </div>

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center">
                  <Activity className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xs font-semibold text-gray-800 dark:text-gray-200">Recent Activity</h3>
              </div>

              <div className="flex-1 space-y-1">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="p-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-700">
                        <activity.icon className={`w-2.5 h-2.5 ${
                          activity.color === 'text-green-600' ? 'text-green-600 dark:text-green-400' :
                          activity.color === 'text-blue-600' ? 'text-blue-600 dark:text-blue-400' :
                          activity.color === 'text-orange-600' ? 'text-orange-600 dark:text-orange-400' :
                          activity.color
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 dark:text-gray-100 text-[10px] truncate">{activity.type}</p>
                          <span className={`font-semibold text-[10px] ${
                            activity.amount.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}>
                            {activity.amount}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-[8px] text-gray-600 dark:text-gray-400 truncate">{activity.id}</p>
                          <Badge variant="outline" className="text-[7px] px-1 py-0 h-auto">
                            {activity.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Business Insights */}
        <div className="col-span-4">
          <div className="relative rounded-xl shadow-sm p-2 overflow-hidden h-full">
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5 dark:from-green-500/10 dark:via-transparent dark:to-green-500/10 rounded-xl blur-xl animate-pulse-slow" />
              <div className="absolute inset-0 p-[1px] rounded-xl bg-gradient-to-br from-green-500/20 via-white/10 to-green-500/20 dark:from-green-500/20 dark:via-white/5 dark:to-green-500/20">
                <div className="absolute inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl" />
              </div>
            </div>

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-lg bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center">
                  <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xs font-semibold text-gray-800 dark:text-gray-200">Business Insights</h3>
              </div>

              <div className="flex-1 space-y-2">
                {businessInsights.map(({ title, value, subtitle, icon: Icon }) => (
                  <div key={title} className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-[#F5793B]/10 dark:bg-[#F5793B]/20">
                        <Icon className="w-3 h-3 text-[#F5793B]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-medium text-gray-600 dark:text-gray-400">{title}</p>
                        <p className="font-bold text-gray-900 dark:text-gray-100 text-xs truncate">{value}</p>
                        <p className="text-[8px] text-gray-600 dark:text-gray-400 truncate">{subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}