import { IoLogOutOutline } from 'react-icons/io5';
import favicon from '../../assets/favicon.png'
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import { Link, NavLink } from 'react-router-dom';
import { CiMenuFries } from 'react-icons/ci';
import './navbar.css'
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../../firebase.config';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

const Navbar = ({setUser}) => {
    const auth = getAuth(app);
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
    const handleClick = () => {
        signOut(auth)
            .then(() => {
                setUser(null)
                Toast.fire({
                    icon: "success",
                    title: 'Log out sucessful!'
                });
            })
            .catch(err => {
                Toast.fire({
                    icon: "error",
                    title: err.code
                });
            });
    }
    const navlinks = <div className="lg:flex items-center gap-5">
        <li><NavLink className="active:underline active:bg-transparent" to='/'>Home</NavLink></li>
        <li><NavLink className="active:underline active:bg-transparent lg:hidden" to='/log'>Activity Log</NavLink></li>
        <li><button onClick={handleClick} className="btn text-xs ml-2 btn-sm bg-colorFour text-colorThree border-none lg:hidden"><IoLogOutOutline />Logout</button></li>
    </div>
    return (
        <nav className='shadow-md'>
            <div className='flex justify-between items-center py-2 w-11/12 mx-auto'>
                <div className='flex gap-5 lg:gap-10 items-center'>
                    <Link className='flex items-center gap-2 btn btn-ghost hover:bg-transparent px-0'>
                        <img className='w-7 lg:w-9' src={favicon} alt="" />
                        <h1 className="text-4xl lg:text-5xl text-colorOne font-medium">TaskSync</h1>
                    </Link>
                </div>
                <div className='flex justify-between items-center'>
                    <ThemeToggler></ThemeToggler>
                    <button onClick={handleClick} className="btn text-lg ml-2 max-lg:hidden bg-colorOne hover:bg-colorOne text-colorThree border-none"><IoLogOutOutline />Logout</button>
                    <div className="lg:hidden">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost pr-0">
                                <CiMenuFries className='p-0 sm:text-2xl' />
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-colorTwo rounded-box z-[1] mt-3 w-32 p-2 shadow relative right-0">
                                {navlinks}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

Navbar.propTypes = {
    setUser: PropTypes.func.isRequired
};

export default Navbar;
