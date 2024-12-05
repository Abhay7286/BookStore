import User from "../models/user.model.js";
import Book from "../models/book.model.js";
import Order from "../models/order.model.js";

export const getAnalyticsData = async (req, res) => {
  const totalUsers = await User.countDocument();
  const totalBooks = await Book.countDocument();

  const salesData = await Order.aggregate({
    $group: {
      _id: null,
      totalRevenue: { $sum: "$totalAmount" },
      totalSales: { $sum: 1 },
    },
  });

  const { totalRevenue, totalSales } = salesData[0] || {
    totalRevenue: 0,
    totalSales: 0,
  };

  return {
    users: totalUsers,
    books: totalBooks,
    totalSales,
    totalRevenue,
  };
};

export const getDailySalesData = async (startData, endData) => {
  try {
    const dailySalesData = await Order.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startData,
              $lt: endData,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
            sales: { $sum: 1 },
            revenue: { $sum: "$totalAmount" },
          },
        },
        {
          $sort: {
            _id: 1,
        }}
      ]);
    
      const dataArray = getDatesInRange(startData, endData);
    
      return dataArray.map((date) => {
        const foundData = dailySalesData.find((item) => item._id === date);
        return {
          date,
          sales: foundData ? foundData.sales : 0,
          revenue: foundData ? foundData.revenue : 0,
        };
      });
  } catch (error) {
    console.log("error in getDailySalesData function", error.message);
  }
};

function getDatesInRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);
  
    // Ensure both startDate and endDate are Date objects
    endDate = new Date(endDate);
  
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return dates;
};
  