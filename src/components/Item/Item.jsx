import PropTypes from 'prop-types';
import { useContext } from 'react';
import { TaskContext } from '../../layouts/MainLayout';
import moment from 'moment';

const Item = ({ item }) => {
    const {socket, Toast, modified, setModified} = useContext(TaskContext);
    const handleDelete = () => {
        socket.emit('deleteTask', item._id);
        socket.on('taskDeleted', () => {
            const data = {
                operation: "Deleted",
                title: item.title,
                modifiedOn: moment().format("MMMM Do YYYY, h:mm A"),
                user: item.addedBy
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
        <div className='rounded-xl p-5 border border-colorOne text-justify mb-2'>
            <h3 className='text-xl font-bold text-colorOne'>{item.title}</h3>
            <p className='overflow-auto'>{item.description}</p>
            <p className='font-mono text-xs my-2'>Deadline:<br/>{item.deadline}</p>
            <button onClick={handleDelete} className='btn-sm btn w-full bg-colorOne text-colorThree hover:bg-colorOne'>Delete</button>
        </div>
    );
};


Item.propTypes = {
    item: PropTypes.object.isRequired
};


export default Item;
