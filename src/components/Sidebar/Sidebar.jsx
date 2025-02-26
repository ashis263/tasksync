import { useContext, useEffect } from "react";
import { TaskContext } from "../../layouts/MainLayout";
import Activity from "../Activity/Activity";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
    const { socket, user, activities, setActivities } = useContext(TaskContext);
    const location = useLocation();
    useEffect(() => {
        socket.emit('getActivities', user.email);
        socket.on('activities', (data) => setActivities(data))
        return () => socket.off(activities);
    }, [])
    return (
        <aside className={`${location.pathname === '/log' ? "w-full" : 'max-lg:hidden'} border border-colorTwo rounded-xl p-5 flex flex-col h-lvh  lg:w-1/4`}>
            <h2 className="text-xl sm:text-3xl font-medium mb-5 border-b border-colorOne">Activity Log</h2>
            <div className=" h-full overflow-auto">
                <div className="">
                    {activities.map(item => <Activity key={item._id} activity={item}></Activity>)}
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
