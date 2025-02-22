import { useDrop } from 'react-dnd';
import Task from '../Task/Task';

const InProgresses = ({tasks}) => {
    const draggedItem = task => {
        console.log(task);
    }
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => draggedItem(item.task),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))
    return (
        <div className="">
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
