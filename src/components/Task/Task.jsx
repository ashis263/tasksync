import PropTypes from 'prop-types';
import { useContext } from 'react';
import { TaskContext } from '../../layouts/MainLayout';
import moment from 'moment';
import { useDrag } from 'react-dnd';

const Task = ({ task }) => {
    const { socket, Toast, user, setTasks, setActivities } = useContext(TaskContext);
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { task: task },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))
    const handleDelete = () => {
        socket.emit('deleteTask', task._id);
        socket.on('taskDeleted', () => {
            const data = {
                operation: "Deleted",
                title: task.title,
                modifiedOn: moment().format("MMMM Do YYYY, h:mm A"),
                user: task.addedBy
            }
            socket.emit('modified', data);
            Toast.fire({
                icon: "success",
                title: 'Task deleted'
            });

            socket.emit("getTasks", user.email);
            socket.on("tasks", (tasks) => setTasks(tasks));
            socket.emit('getActivities', user.email);
            socket.on('activities', (data) => setActivities(data));
        })
    }
    return (
        <div ref={drag} className={`rounded-xl p-5 border shadow-lg shadow-colorOne border-colorOne flex flex-col justify-between text-justify mb-2 h-[50vh] overflow-scroll sm:h-[30vh] ${isDragging ? "opacity-25" : ''}`}>            <h3 className='text-xl font-bold text-colorOne'>{task.title}</h3>
            <p className='overflow-auto'>{task.description}</p>
            <p className='font-mono text-xs my-2'>Deadline:<br />{task.deadline}</p>
            <button onClick={handleDelete} className='btn-sm btn w-full bg-colorOne text-colorThree hover:bg-colorOne'>Delete</button>
        </div>
    );
};


Task.propTypes = {
    task: PropTypes.object.isRequired
};


export default Task;
