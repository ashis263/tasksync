import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../layouts/MainLayout";
import { DndContext, DragOverlay, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "../../components/Column/Column";
import Task from "../../components/Task/Task";
import axios from "axios";
import moment from "moment";

const Home = () => {
  const [columns, setColumns] = useState({});
  const [activeTask, setActiveTask] = useState(null); // Track dragged task
  const [categoryModified, setCategoryModified] = useState(false);
  const { tasks, user } = useContext(TaskContext);

  useEffect(() => {
    setColumns({
      "To Do": tasks.filter(task => task.category === 'To Do'),
      "In Progress": tasks.filter(task => task.category === 'In Progress'),
      "Done": tasks.filter(task => task.category === 'Done')
    });
  }, [tasks, categoryModified]);

  const handleDragStart = (e) => {
    const task = tasks.find(task => task._id === e.active.id);
    setActiveTask(task);
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (active.id === over?.id) return;
    const taskId = active.id;
    const overId = over?.id;
    const activeTask = tasks.find(task => task._id === taskId);
    const oldCategory = activeTask.category;
    const overTask = tasks.find(task => task._id === overId);
    if (activeTask.category === overTask?.category) {
      axios.post(`http://localhost:5000/taskOrder/?email=${user.email}`, { taskId, overId });
      const activityData = {
        operation: `Reordered`,
        title: activeTask.title,
        modifiedOn: moment().format("MMMM Do YYYY, h:mm A"),
        user: user.email
      }
      axios.post('http://localhost:5000/activities', activityData);
      const updated = arrayMove(
        columns[activeTask.category],
        columns[activeTask.category].findIndex(task => task._id === taskId),
        columns[activeTask.category].findIndex(task => task._id === over.id),
      )
      setColumns({
        ...columns, [activeTask.category]: updated
      })
    } else {
      if (!overTask?.category) {
        activeTask.category = over.id
        setCategoryModified(!categoryModified)
      } else {
        activeTask.category = overTask.category
        setCategoryModified(!categoryModified)
      }
      const { _id, ...data } = activeTask;
      axios.put(`http://localhost:5000/tasks/${_id}/?email=${user.email}`, data);
      if (oldCategory !== data.category) {
        const activityData = {
          operation: `Moved from ${oldCategory} to ${data.category}`,
          title: data.title,
          modifiedOn: moment().format("MMMM Do YYYY, h:mm A"),
          user: user.email
        }
        axios.post('http://localhost:5000/activities', activityData);
      }
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  return (
    <div className="flex justify-between">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {Object.keys(columns).map(colId => (
          <Column key={colId} category={colId} tasks={columns[colId]} />
        ))}

        {/* Drag Overlay */}
        <DragOverlay>
          {activeTask ? <Task task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Home;
