import { Outlet } from "react-router-dom";
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

export const TaskContext = createContext(null);

const MainLayout = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const { register, handleSubmit, reset } = useForm();

    const auth = getAuth(app);
    const socket = io("http://localhost:5000");


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
        const { deadline: prevDate, ...other} = formData;
        const data = {
            ...other,
            addedBy: user?.email,
            category: "To Do",
            addedOn: moment().format("MMMM Do YYYY, h:mm A"),
            deadline: moment(prevDate).format("MMMM Do YYYY, h:mm A")
        }
        socket.emit("addTask", data)
        socket.on('taskAdded', (data) => {
            Toast.fire({
                icon: "success",
                title: data
            });
            reset();
            setOpen(false);
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
            } else {
                setLoading(false)
            }
            socket.emit("getTasks", currentUser.email);
            socket.on("tasks", (tasks) => setTasks(tasks));
        });

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

    return (
        <TaskContext.Provider value={tasks}>
            <div className="min-h-lvh">
                <Navbar setUser={setUser}></Navbar>
                <div className="w-11/12 mx-auto flex max-sm:justify-center justify-end">
                    <button onClick={() => setOpen(true)} className="btn text-lg ml-2 max-lg:btn-sm bg-colorOne hover:bg-colorOne text-colorThree border-none btn-wide mt-5 lg:mt-10">Add a new task</button>
                </div>
                <div className="w-11/12 mx-auto my-5 lg:my-10 flex justify-between">
                    <Sidebar></Sidebar>
                    <div className="lg:w-[70%] border border-colorTwo rounded-xl p-5 w-full h-[70vh]">
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
                            <input type="text" placeholder="Title" {...register('title', { required: true })} className="input max-lg:input-sm input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className={`label-text`}>Description</span>
                            </label>
                            <textarea className="textarea textarea-bordered" placeholder="Description" {...register('description', { required: true })}></textarea>
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
