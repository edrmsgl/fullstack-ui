import React from 'react'
import Title from './title'
import { Checkbox} from '@mui/material';

const TasksData = [
  { name: "Emily Brown", date: "2025-05-12", status: "Started" },
  { name: "John Smith", date: "2025-05-03", status: "Completed" },
  { name: "Jessica Miller", date: "2025-05-10", status: "In Progress" },
  { name: "David Lee", date: "2025-05-01", status: "Not Started" },
  { name: "Alice Johnson", date: "2025-05-14", status: "Started" },
  { name: "Michael Wilson", date: "2025-05-05", status: "In Progress" },
  { name: "Sarah Davis", date: "2025-05-08", status: "Completed" },
  { name: "Laura Taylor", date: "2025-05-07", status: "Not Started" },
  { name: "Chris Moore", date: "2025-05-09", status: "Started" },
  { name: "Bob Williams", date: "2025-05-11", status: "Completed" },
  { name: "Olivia King", date: "2025-05-06", status: "Not Started" },
  { name: "Ethan Clark", date: "2025-05-13", status: "Started" }
];


const tasksStatusClass = (status: string) => {
  switch (status) {
    case 'Started':
      return 'bg-slate-200';
    case 'Completed':
      return 'bg-green-200';
    case 'In Progress':
      return 'bg-sky-200';
    case 'Not Started':
      return 'bg-red-200';
    default:
      return '';
  }
};

const Tasks = ({ title }: { title: string }) => {
  return (
    <div className='bg-white rounded-2xl w-full p-4'>
      <Title title={title} />
      <div className='w-full max-h-[470] overflow-y-auto'>
        {TasksData.map((taskItem, index) => (
          <div className='my-2' key={index}>
            <div className={'flex justify-center items-center rounded-md gap-2.5 relative'}>
              <Checkbox className='' />
              <div className='w-2/3'>
                <div className='font-bold text-[16px]'>{taskItem.name}</div>
                <div className='text-gray-700 text-[12px]'>{taskItem.date}</div>
              </div>
              <div className='w-1/3 flex justify-center item-center'>
                <div className={'min-w-[80px] text-[12px] font-normal p-1 rounded-md block text-center'.concat(' ', tasksStatusClass(taskItem.status))}>
                  {taskItem.status}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tasks;