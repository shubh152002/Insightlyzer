import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboardcard = () => {
 
  const { user } =useSelector((state)=> state.auth);

  return (
    <div className="flex-1 p-6">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
          <div className="flex items-center gap-3">
            <img
              src="null"
              alt="userlogo"
              className="w-8 h-8 rounded-full bg-gray-300"
            />
            <p>{user?.fullname}</p>
            <span>...</span>
          </div>
        </div>
        <hr className="mb-4" />
        <Outlet />
      </div>
  )
}

export default Dashboardcard
