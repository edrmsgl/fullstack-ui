import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SwapVertIcon from '@mui/icons-material/SwapVert';
const Title = ({ title, icon }: { title: string, icon?: boolean }) => {
    return (
        <div className='flex justify-between items-center mb-6'>
            <div className='font-bold'>{title}</div>
            {icon ? <SwapVertIcon className='cursor-pointer text-sm' /> : <MoreHorizIcon className='cursor-pointer text-sm' />}
        </div>
    )
}

export default Title