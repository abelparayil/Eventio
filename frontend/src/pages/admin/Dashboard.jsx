import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <div>Dashboard</div>
      <div>
        <Link className="bg-bluePurple" to={"events"}>
          Events
        </Link>
        <Link to={"messages"}>Messages</Link>
        <Link to={"profile"}>Profile</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
