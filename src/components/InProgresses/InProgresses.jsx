import { useDrop } from 'react-dnd';
import Task from '../Task/Task';
import { useContext } from 'react';
import { TaskContext } from '../../layouts/MainLayout';

const InProgresses = ({tasks}) => {
    const {socket} = useContext(TaskContext);
        const draggedItem = task => {
            if (task.category !== "In Progress"){
                socket.emit("movedCategory", {id:task._id, to: "In Progress"});
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
                <h2 className="text-xl sm:text-3xl font-medium mb-5 border-b border-colorOne">In Progress</h2>
                <div className="overflow-auto h-full">
                    {
                        tasks.map(task => <Task key={task._id} task={task}></Task>)
                    }
                </div>
            </div>
    );
}

export default InProgresses;
