import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Task from '../Task/Task'
import { useDroppable } from '@dnd-kit/core';

const Column = ({tasks, category}) => {
    const {setNodeRef} = useDroppable({id:category});
    return (
        <div ref={setNodeRef} className={`p-5 flex-1 flex flex-col`}>
            <h2 className="text-xl sm:text-3xl font-medium mb-5 border-b border-colorOne">{category}</h2>
            <div className="h-full overflow-auto">
                <SortableContext items={tasks.map(task => task._id)}>
                    {
                        tasks.map(task => <Task key={task._id} task={task} />)
                    }
                </SortableContext>
            </div>
        </div>
    );
}

export default Column;
