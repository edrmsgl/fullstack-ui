import React from 'react';
import Icon from '@/components/icon';
const UserCard = ({ icon, total, type }: { icon: string, total: string, type: string }) => {
  return (
    <div className='odd:bg-indigo-200 even:bg-yellow-200 flex-1 rounded-2xl p-4 text-black min-w-[150px]'>
      <div className='flex justify-start items-center gap-5'>
        <div className='icon w-14 h-14 rounded-full bg-white flex items-center justify-center'>
        <Icon iconName={icon} />
      </div>
      <div className='point font-bold text-2xl'>
        {total}
      </div>
      <div className='type font-semibold'>
        {type}
      </div>
      </div>
    </div>
  )
}

export default UserCard;