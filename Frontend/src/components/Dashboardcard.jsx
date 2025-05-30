import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";
const Dashboardcard = () => {
 
  const { user } =useSelector((state)=> state.auth);

  return (
    <div className="flex-1 p-6">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
          <div className="flex items-center gap-3">
           <FiUser />

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
