import login from '../../assets/login.png'
import { getAdditionalUserInfo, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../../../firebase.config';
import Swal from 'sweetalert2';
import axios from 'axios';

const auth = getAuth(app);

const Login = () => {
    const provider = new GoogleAuthProvider();
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
        signInWithPopup(auth, provider)
            .then((res) => {
                const additionalUserInfo = getAdditionalUserInfo(res);
                if (additionalUserInfo.isNewUser) {
                    const user = res.user
                    const data = {
                        name: user.displayName,
                        email: user.email,
                        userId: user.uid,
                    };
                    axios.post('https://tasksync-server-production.up.railway.app/users', data)
                }
                Toast.fire({
                    icon: "success",
                    title: 'Log in sucessful!'
                });
            })
            .catch(err => {
                Toast.fire({
                    icon: "error",
                    title: err.code
                });
            });
    }
    return (
        <div className='flex flex-col gap-5 lg:gap-10 h-lvh items-center justify-center'>
            <div className='w-2/3 sm:w-2/4 lg:w-1/4'>
                <img src={login} alt="" />
            </div>
            <div className='flex flex-col justify-center items-center'>
                <h2 className="text-3xl sm:text-5xl font-medium mb-5">Please login to use the app!</h2>
                <button onClick={handleClick} className="btn text-lg ml-2 max-lg:btn-sm bg-colorOne hover:bg-colorOne text-colorThree border-none btn-wide">
                    <img className='w-6 sm:w-10' src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" />
                    <p>Login with Google</p>
                </button>
            </div>
        </div>
    );
};




export default Login;
