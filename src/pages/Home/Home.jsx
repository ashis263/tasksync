import { useContext } from "react";
import { TaskContext } from "../../layouts/MainLayout";
import Task from "../../components/Task/Item";

const Home = () => {
  const { tasks } = useContext(TaskContext);
  const todo = tasks.filter(task => task.category === 'To Do');
  const inProgess = tasks.filter(task => task.category === 'In Progress');
  const done = tasks.filter(task => task.category === 'Done');
  return (
      <div className="flex justify-between h-[calc(100%-50px)]">
        <div className="w-[32%]">
          <h2 className="text-xl sm:text-3xl font-medium mb-5 border-b border-colorOne">To Do</h2>
          <div className="overflow-auto h-full">
            {
              todo.map(task => <Task key={task._id} task={task}></Task>)
            }
          </div>
        </div>
        <div className="w-[32%]">
          <h2 className="text-xl sm:text-3xl font-medium mb-5 border-b border-colorOne">In Progress</h2>
          <div className="overflow-auto h-full">
            {
              inProgess.map(task => <Task key={task._id} task={task}></Task>)
            }
          </div>
        </div>
        <div className="w-[32%]">
          <h2 className="text-xl sm:text-3xl font-medium mb-5 border-b border-colorOne">Done</h2>
          <div className="overflow-auto h-full">
            {
              done.map(task => <Task key={task._id} task={task}></Task>)
            }
          </div>
        </div>
      </div>
  );
}

export default Home;
