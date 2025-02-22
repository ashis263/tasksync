import { useDrop } from "react-dnd";
import Task from "../Task/Task";
import { useContext } from "react";
import { TaskContext } from "../../layouts/MainLayout";
import moment from "moment";

const Todos = ({ tasks }) => {
    const { socket, user, Toast, setActivities, setTasks } = useContext(TaskContext);
    const draggedItem = task => {
        if (task.category !== "To Do") {
            socket.emit("movedCategory", { id: task._id, to: "To Do" });
            socket.on('categoryModified', () => {
                const activityData = {
                    operation: `Moved from ${task.category} to To Do`,
                    title: task.title,
                    modifiedOn: moment().format("MMMM Do YYYY, h:mm A"),
                    user: user.email
                }
                socket.emit('modified', activityData);
                Toast.fire({
                    icon: "success",
                    title: `${task.title} Moved from ${task.category} to To Do`
                });
                socket.emit("getTasks", user.email);
                socket.on("tasks", (tasks) => setTasks(tasks));
                socket.emit('getActivities', user.email);
                socket.on('activities', (data) => setActivities(data));
            })
        }
    }
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => draggedItem(item.task),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))
    return (
        <div ref={drop} className='min-h-[60vh]'>
            <h2 className="text-xl sm:text-3xl font-medium mb-5 border-b border-colorOne">To Do</h2>
            <div className="overflow-auto h-full">
                {
                    tasks.map(task => <Task key={task._id} task={task}></Task>)
                }
            </div>
        </div>
    );
}

export default Todos;
