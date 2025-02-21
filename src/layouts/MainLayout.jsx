import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import Login from "../components/Login/Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase.config";

const MainLayout = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if(currentUser){
                setUser(currentUser);
                setLoading(false);
            }else{
                setLoading(false)
            }
        });

        return () => unsubscribe();
    }, [])

    if(loading){
        return(
            <div className="w-lvw h-lvh flex justify-center items-center">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    };

    if(!user){
        return <Login></Login>
    }

    return (
        <div className="min-h-lvh">
            <Navbar setUser={setUser}></Navbar>
            <div className="w-11/12 mx-auto flex max-sm:justify-center justify-end">
                <button className="btn text-lg ml-2 max-lg:btn-sm bg-colorOne hover:bg-colorOne text-colorThree border-none btn-wide mt-5 lg:mt-10">Add a new task</button>
            </div>
            <div className="w-11/12 mx-auto my-5 lg:my-10 flex justify-between">
                <Sidebar></Sidebar>
                <div className="lg:w-[70%] border border-colorTwo rounded-xl p-5 w-full h-[70vh]">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
