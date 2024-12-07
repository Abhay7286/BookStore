import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CreateBookForm from "../../components/CreateBook/CreateBookForm.jsx";
import BookList from "../../components/BookList/BookList.jsx";
import AnalyticsTab from "../../components/Analytics/AnalyticsTab.jsx";
import { useBookStore } from "../../store/useBookStore.js";
import "./Admin.css";
const Admin = () => {
  const tabs = [
    { id: "create", icon: <PlusCircle />, label: "Create Product" },
    { id: "books", icon: <BarChart />, label: "Books" },
    { id: "analytics", icon: <ShoppingBasket />, label: "Analytics" },
  ];

  const [activeTab, setActiveTab] = useState("create");

  const {fetchAllBooks} = useBookStore();
  useEffect(() => {
    fetchAllBooks();
  }, [fetchAllBooks]);

  return (
    <>
      <div className="admin-container">
        <motion.h1
          className="dashboard-heading"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>

        <div className="admin-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-button ${
                activeTab === tab.id
                  ? "tab-button-active"
                  : "tab-button-inactive"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === "create" && <CreateBookForm />}
          {activeTab === "books" && <BookList />}
          {activeTab === "analytics" && <AnalyticsTab />}
        </div>
      </div>
    </>
  );
};

export default Admin;
