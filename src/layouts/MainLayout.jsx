import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

const MainLayout = () => {
    return (
        <div className="min-h-lvh">
            <Navbar></Navbar>
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
