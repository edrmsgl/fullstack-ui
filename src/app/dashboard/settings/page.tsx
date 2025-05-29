'use client';
import React, {useEffect, useState} from 'react'
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

type Settings = {
  _id: string;
  title: string;
  category: string;
  path: string;
};

const Settings = () => {
  const [settings, setSettins] = useState<Settings[]>([]);
  const fetchSettings = async () => {
    const res = await fetch("/api/settings");
    const data = await res.json();
    setSettins(data);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

    return (
        <div className="bg-white rounded-2xl p-5 mt-5">
            <div className='flex justify-start items-center mb-5'>
                <div className='w-3/5'>
                    <h2 className='text-3xl font-bold text-black'>Settings</h2>
                </div>
                <div className='w-2/5 flex justify-end items-center gap-3.5'>
                    <Tooltip title="Add Menu Item">
                        <Button variant="contained" className='text-xs! w-10 h-10 rounded-full! bg-indigo-600! hover:bg-indigo-700! transition-all duration-300'>
                            <AddIcon />
                        </Button>
                    </Tooltip>
                </div>
            </div>
            {settings.length > 0
        ? settings.map((item: Settings) => (
                <div key={item._id} className='flex justify-between items-center mb-3'>
                    <div className='text-lg font-semibold text-gray-800'>{item.title}</div>
                    <div className='text-sm text-gray-500'>{item.category}</div>
                </div>
            ))
        : 'yok'}
        </div>
    )
}
export default Settings;