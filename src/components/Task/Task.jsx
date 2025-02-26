import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { TaskContext } from '../../layouts/MainLayout';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Task = ({ task }) => {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(TaskContext);
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: task._id
    })
    // const { setNodeRef, attributes, listeners, transform } = useDraggable({
    //     id: task._id
    // });
    const handleDelete = () => {
        axios.delete(`http://localhost:5000/tasks/${task._id}/?email=${user.email}`);
        const activityData = {
            operation: "Deleted",
            title: task.title,
            modifiedOn: moment().format("MMMM Do YYYY, h:mm A"),
            user: user.email
        }
        axios.post('http://localhost:5000/activities', activityData);
    }
    const handleEdit = () => {
        setOpen(true);
    }
    const submitForm = async (formData) => {
        const { deadline: prevDate, ...other } = formData;
        const data = {
            ...other,
            deadline: moment(prevDate).format("MMMM Do YYYY, h:mm A"),
        }
        axios.put(`http://localhost:5000/tasks/${task._id}/?email=${user.email}`, data);
        reset();
        setOpen(false);
        const activityData = {
            operation: "Updated",
            title: task.title,
            modifiedOn: moment().format("MMMM Do YYYY, h:mm A"),
            user: user.email
        }
        axios.post('http://localhost:5000/activities', activityData);
    }
    return (
        <div ref={setNodeRef} {...attributes} style={{ transform: CSS.Transform.toString(transform), transition,
            opacity: isDragging ? 0.5 : 1,  // Ensure it remains visible
            zIndex: isDragging ? 1000 : "auto",  }} className={`rounded-xl p-5 border shadow-lg shadow-colorOne border-colorOne flex flex-col justify-between text-justify mb-2 h-[50vh] overflow-scroll sm:h-[30vh] bg-colorThree dark:bg-colorFour`}>
            <div {...listeners}>
                <h3 className='text-lg font-bold text-colorOne leading-none'>{task.title}</h3>
                <p className='overflow-auto text-xs'>{task.description}</p>
                <p className='font-mono text-xs text-gray-500 my-2'>{task.deadline}</p>
            </div>
            <div className='flex justify-between'>
                <button onClick={handleDelete} className='btn-sm btn bg-colorOne text-colorThree hover:bg-colorOne'>Delete</button>
                <button onClick={handleEdit} className='btn-sm btn bg-colorOne text-colorThree hover:bg-colorOne'>Update</button>
            </div>
            <Modal open={open} onClose={() => setOpen(!open)} center>
                <h3 className="text-2xl sm:text-4xl sm:px-20 text-center text-colorOne font-medium">Update task</h3>
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Title</span>
                        </label>
                        <input type="text" defaultValue={task.title} placeholder="Title" {...register('title', { required: true })} maxLength="50" className="input max-lg:input-sm input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Description</span>
                        </label>
                        <textarea defaultValue={task.description} maxLength="200" className="textarea textarea-bordered" placeholder="Description" {...register('description', { required: true })}></textarea>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Finish Before</span>
                        </label>
                        <input defaultValue={task.deadline} type="date" placeholder="Date" {...register('deadline', { required: true })} className="input max-lg:input-sm input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Category</span>
                        </label>
                        <select type="checkbox" placeholder="Date" {...register('category', { required: true })} className="input max-lg:input-sm input-bordered" required>
                            <option selected={task.category === "To Do"}>To Do</option>
                            <option selected={task.category === "In Progress"}>In Progress</option>
                            <option selected={task.category === "Done"}>Done</option>
                        </select>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn max-lg:btn-sm btn-outline text-colorOne lg:text-xl">Update</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};


Task.propTypes = {
    task: PropTypes.object.isRequired
};


export default Task;
