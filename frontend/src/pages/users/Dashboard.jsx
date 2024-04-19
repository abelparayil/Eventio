import { Outlet } from "react-router-dom";
import UserSideBar from "../../components/ui/admin/SideBar";

const Dashboard = () => {
  return (
    <div className="h-screen bg-mainBg flex gap-2">
      <UserSideBar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
