import { domAnimation, motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../../lib/axios.js";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import "./AnalyticsTab.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    books: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  const [dailySalesData, setDailySalesData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get("/analytics");
        setAnalyticsData(res.data.analyticsData);
        setDailySalesData(res.data.dailySalesData);
      } catch (error) {
        console.log("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="analytics-container">
        <AnalyticsCard
          title="Total Users"
          icon={Users}
          color="blue"
          value={analyticsData.users}
        />
        <AnalyticsCard
          title="Total Products"
          icon={Package}
          color="green"
          value={analyticsData.books}
        />
        <AnalyticsCard
          title="Total Sales"
          icon={ShoppingCart}
          color="yellow"
          value={analyticsData.totalSales}
        />
        <AnalyticsCard
          title="Total Revenue"
          icon={DollarSign}
          color="red"
          value={`$${analyticsData.totalRevenue}`}
        />
      </div>
      <motion.div
        className="analytics-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Analytics</h2>
      </motion.div>

      <div className="analytics-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={dailySalesData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#D1D5DB" />
            <YAxis stroke="#D1D5DB" yAxisId="left" />
            <YAxis stroke="#D1D5DB" yAxisId="right" />

            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="Sales"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              activeDot={{ r: 8 }}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default AnalyticsTab;

const AnalyticsCard = ({ title, icon: Icon, color, value }) => {
  return (
    <motion.div
      className={`analytics-card-container ${color}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-header">
        <div>
          <p className="analytics-card-title">{title}</p>
          <h3 className="card-value">{value}</h3>
        </div>
      </div>
      <div className="card-gradient-overlay" />
      <div className="card-icon-container">
        <Icon className="card-icon" />
      </div>
    </motion.div>
  );
};
