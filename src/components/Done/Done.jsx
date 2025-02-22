import { useDrop } from "react-dnd";
import Task from "../Task/Task";
import { useContext } from "react";
import { TaskContext } from "../../layouts/MainLayout";

const Done = ({tasks}) => {
    const {socket} = useContext(TaskContext);
    const draggedItem = task => {
        if (task.category !== "Done"){
            socket.emit("movedCategory", {id:task._id, to: "Done"});
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
        <div>
            <div ref={drop} className='min-h-[60vh]'>
                <h2 className="text-xl sm:text-3xl font-medium mb-5 border-b border-colorOne">Done</h2>
                <div className="overflow-auto h-full">
                    {
                        tasks.map(task => <Task key={task._id} task={task}></Task>)
                    }
                </div>
            </div>
        </div>
    );
}

export default Done;
