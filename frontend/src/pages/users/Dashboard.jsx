import { Outlet } from "react-router-dom";
import UserSideBar from "../../components/ui/admin/SideBar";

const Dashboard = () => {
  return (
    <div>
      <div>
        <UserSideBar />
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
