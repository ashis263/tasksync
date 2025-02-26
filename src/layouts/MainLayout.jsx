import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { createContext, useEffect, useState } from "react";
import Login from "../components/Login/Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase.config";
import Modal from "react-responsive-modal";
import 'react-responsive-modal/styles.css';
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import moment from "moment";
import axios from "axios";

export const TaskContext = createContext(null);

const MainLayout = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [activities, setActivities] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const location = useLocation()

    const auth = getAuth(app);
    const socket = io("https://tasksync-server-production.up.railway.app/");


    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const submitForm = async (formData) => {
        const { deadline: prevDate, ...other } = formData;
        const data = {
            ...other,
            addedBy: user?.email,
            category: "To Do",
            addedOn: moment().format("MMMM Do YYYY, h:mm A"),
            deadline: moment(prevDate).format("MMMM Do YYYY, h:mm A")
        }
        axios.post('https://tasksync-server-production.up.railway.app/tasks', data)
        reset();
        setOpen(false);
        const activityData = {
            operation: "Added",
            title: formData.title,
            modifiedOn: moment().format("MMMM Do YYYY, h:mm A"),
            user: user.email,
        }
        axios.post('https://tasksync-server-production.up.railway.app/activities', activityData);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
                axios.get(`https://tasksync-server-production.up.railway.app/tasks/?email=${currentUser.email}`)
                    .then(res => setTasks(res.data));
                axios.get(`https://tasksync-server-production.up.railway.app/activities/?email=${currentUser.email}`)
                    .then(res => setActivities(res.data))
            } else {
                setLoading(false)
            }
        });

        socket.on("tasks", (tasks) => setTasks(tasks));

        return () => {
            unsubscribe()
            socket.off("tasks")
        };
    }, [])

    if (loading) {
        return (
            <div className="w-lvw h-lvh flex justify-center items-center">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    };

    if (!user) {
        return <Login></Login>
    }

    const data = {
        tasks,
        setTasks,
        socket,
        Toast,
        user, activities,
        setActivities
    }

    return (
        <TaskContext.Provider value={data}>
            <div className="min-h-lvh leading-none">
                <Navbar setUser={setUser}></Navbar>
                <div className="w-11/12 mx-auto flex max-sm:justify-center justify-end">
                    <button onClick={() => setOpen(true)} className="btn text-lg ml-2 max-lg:btn-sm bg-colorOne hover:bg-colorOne text-colorThree border-none btn-wide mt-5 lg:mt-10">Add a new task</button>
                </div>
                <div className="w-11/12 mx-auto pt-5 lg:pt-10 flex justify-between">
                    <Sidebar></Sidebar>
                    <div className={`lg:w-[74%] border border-colorTwo rounded-xl overflow-scroll w-full ${location.pathname === '/log' ? "hidden" : ''}`}>
                        <Outlet></Outlet>
                    </div>
                </div>
                <Modal open={open} onClose={() => setOpen(!open)} center>
                    <h3 className="text-2xl sm:text-4xl sm:px-20 text-center text-colorOne font-medium">Add new task</h3>
                    <form onSubmit={handleSubmit(submitForm)}>
                        <div className="form-control">
                            <label className="label">
                                <span className={`label-text`}>Title</span>
                            </label>
                            <input type="text" placeholder="Title" {...register('title', { required: true })} maxLength="50" className="input max-lg:input-sm input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className={`label-text`}>Description</span>
                            </label>
                            <textarea className="textarea textarea-bordered" placeholder="Description" maxLength="200" {...register('description', { required: true })}></textarea>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className={`label-text`}>Finish Before</span>
                            </label>
                            <input type="date" placeholder="Date" {...register('deadline', { required: true })} className="input max-lg:input-sm input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn max-lg:btn-sm btn-outline text-colorOne lg:text-xl">Add</button>
                        </div>
                    </form>
                </Modal>
            </div>
        </TaskContext.Provider>
    );
}

export default MainLayout;
