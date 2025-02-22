import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from 'react-dnd-touch-backend';
import InProgresses from "../../components/InProgresses/InProgresses";
import Todos from "../../components/Todos/Todos";
import Done from "../../components/Done/Done";
import { useContext } from "react";
import { TaskContext } from "../../layouts/MainLayout";

const isMobile = /Mobi|Android/i.test(navigator.userAgent);

const Home = () => {
  const backend = isMobile ? TouchBackend : HTML5Backend;
  const { tasks } = useContext(TaskContext);
  const todo = tasks.filter(task => task.category === 'To Do');
  const inProgess = tasks.filter(task => task.category === 'In Progress');
  const done = tasks.filter(task => task.category === 'Done');
  return (
    <div className="flex justify-between h-[calc(100%-50px)]">
      <DndProvider backend={HTML5Backend}>
        <div className="w-[32%]">
          <Todos tasks={todo}></Todos>
        </div>
        <div className="w-[32%]">
          <InProgresses tasks={inProgess}></InProgresses>
        </div>
        <div className="w-[32%]">
          <Done tasks={done}></Done>
        </div>
      </DndProvider>
    </div>
  );
}

export default Home;
