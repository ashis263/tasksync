import PropTypes from 'prop-types';
import { useContext } from 'react';
import { TaskContext } from '../../layouts/MainLayout';

const Item = ({ item }) => {
    const {socket, Toast, modified, setModified} = useContext(TaskContext);
    const handleDelete = () => {
        socket.emit('deleteTask', item._id);
        socket.on('taskDeleted', () => {
            setModified(!modified)
            Toast.fire({
                icon: "success",
                title: 'Task deleted'
            });
        })
    }
    return (
        <div className='rounded-xl p-5 shadow-lg shadow-colorOne text-justify'>
            <h3 className='text-xl font-bold'>{item.title}</h3>
            <p>{item.description}</p>
            <p className='font-mono'>Deadline:<br/>{item.deadline}</p>
            <button onClick={handleDelete} className='btn-sm btn w-full bg-colorOne text-colorThree hover:bg-colorOne'>Delete</button>
        </div>
    );
};


Item.propTypes = {
    item: PropTypes.object.isRequired
};


export default Item;
