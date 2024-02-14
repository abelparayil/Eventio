import { Outlet } from "react-router-dom";
import AdminSideBar from "../../components/ui/AdminSideBar";

const Dashboard = () => {
  return (
    <div className="h-screen bg-mainBg flex gap-2">
      <AdminSideBar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
