import { useContext } from "react";
import { TaskContext } from "../../layouts/MainLayout";
import Item from "../../components/Item/Item";

const Home = () => {
  const { tasks } = useContext(TaskContext);
  const todo = tasks.filter(task => task.category === 'To Do');
  const inProgess = tasks.filter(task => task.category === 'In Progress');
  const done = tasks.filter(task => task.category === 'Done');
  return (
    <div className="flex justify-between h-[calc(100%-50px)]">
      <div>
        <h2 className="text-xl sm:text-3xl font-medium mb-5 border-b border-colorOne">To Do</h2>
        <div className="overflow-scroll h-full">
          {
            todo.map(item => <Item key={item._id} item={item}></Item>)
          }
        </div>
      </div>
      <div>
        <h2 className="text-xl sm:text-3xl font-medium mb-5 border-b border-colorOne">In Progress</h2>
        <div className="overflow-scroll h-full">
          {
            inProgess.map(item => <Item key={item._id} item={item}></Item>)
          }
        </div>
      </div>
      <div>
        <h2 className="text-xl sm:text-3xl font-medium mb-5 border-b border-colorOne">Done</h2>
        <div className="overflow-scroll h-full">
          {
            done.map(item => <Item key={item._id} item={item}></Item>)
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
