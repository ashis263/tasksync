import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const ThemeToggler = () => {
    const [theme, setTheme] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light');
    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark') {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else {
            setTheme('light');
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);
    const handleTheme = (theme) => {
        setTheme(theme);
        localStorage.setItem('theme', theme);
    }
    return (
        <div>
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn my-1 px-0 btn-ghost hover:bg-transparent font-normal"><span className="flex pt-[1px]">Theme<IoMdArrowDropdown /></span></div>
                <ul tabIndex={0} className="dropdown-content menu bg-colorTwo rounded-box z-[1] w-24 p-2 shadow">
                    <li><button onClick={() => handleTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light')} className="">System</button></li>
                    <li><button className={theme === 'dark' ? 'font-medium ' : ''} onClick={() => handleTheme('dark')}>Dark</button></li>
                    <li><button className={theme === 'light' ? 'font-medium ' : ''} onClick={() => handleTheme('light')}>Light</button></li>
                </ul>
            </div>
        </div>
    );
}

export default ThemeToggler;
