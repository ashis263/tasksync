import PropTypes from 'prop-types';
import { useContext } from 'react';
import { TaskContext } from '../../layouts/MainLayout';
import moment from 'moment';

const Task = ({ task }) => {
    const {socket, Toast, modified, setModified} = useContext(TaskContext);
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
            setModified(!modified)
            Toast.fire({
                icon: "success",
                title: 'Task deleted'
            });
        })
    }
    return (
        <div className='rounded-xl p-5 border shadow-lg shadow-colorOne border-colorOne flex flex-col justify-between text-justify mb-2 h-[50vh] overflow-scroll sm:h-[30vh]'>
            <h3 className='text-xl font-bold text-colorOne'>{task.title}</h3>
            <p className='overflow-auto'>{task.description}</p>
            <p className='font-mono text-xs my-2'>Deadline:<br/>{task.deadline}</p>
            <button onClick={handleDelete} className='btn-sm btn w-full bg-colorOne text-colorThree hover:bg-colorOne'>Delete</button>
        </div>
    );
};


Task.propTypes = {
    task: PropTypes.object.isRequired
};


export default Task;
