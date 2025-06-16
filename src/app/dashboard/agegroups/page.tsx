'use client';
import React from 'react';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Drawer, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AgeGroups from '@/models/agegroups';

type AgeGroups = {
  _id: string;
  name: string;
  minAge: number;
  maxAge: number;
  description: string
};

const AgeGroups = () => {
  const [name, setName] = useState("");
  const [minAge, setminAge] = useState("");
  const [maxAge, setmaxAge] = React.useState<string | undefined>(undefined);
  const [description, setdescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [agegroups, setagegroups] = useState<AgeGroups[]>([]);
  const [open, setOpen] = React.useState<{ [key: string]: boolean }>({ right: false, left: false, top: false, bottom: false });
  const [confirm, setConfirm] = React.useState(false);
  const handleOpen = (direction: string, isOpen: boolean) => () => { setOpen(prev => ({ ...prev, [direction]: isOpen })); };
  const handleClose = (direction: string) => () => {
    setOpen(prev => ({ ...prev, [direction]: false }));
    setName("");
    setminAge("");
    setmaxAge("");
    setdescription("");
  };
  const handleOpenConfirm = () => setConfirm(true);
  const handleCloseConfirm = () => setConfirm(false);
  const fetchAgeGroups = async () => {
    const res = await fetch("/api/agegroups");
    const data = await res.json();
    setagegroups(data);
  };

  useEffect(() => {
    fetchAgeGroups();
  }, []);


  const handleAddUser = async () => {
    if (!name || !minAge || !maxAge || !description) {
      alert("Tüm alanlar zorunludur.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/agegroups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, minAge, maxAge, description }),
    });
    if (res.ok) {
      setName("");
      setminAge("");
      setmaxAge("");
      setdescription("");
      fetchAgeGroups();
      handleClose('right')();
      alert("Yaş grubu başarıyla eklendi.");
    } else {
      const error = await res.json();
      alert(error.message || "Yaş grubu eklenemedi.");
    }
    setLoading(false);
  };

  const handleDeleteStudent = async (id: string) => {
    try {
      const res = await fetch('/api/agegroups/' + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert("Yaş grubu başarıyla silindi.");
        handleCloseConfirm();
        fetchAgeGroups();
      } else {
        const error = await res.json();
        alert(error.message || "Yaş grubu silinirken hata oluştu.");
      }
    } catch (error) {
      alert("Beklenmeyen bir hata oluştu: " + String(error));
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 mt-5">
      <div className='flex justify-start items-center mb-5'>
        <div className='w-3/5'>
          <h2 className='text-3xl font-bold text-black'>Yaş Grupları</h2>
        </div>
        <div className='w-2/5 flex justify-end items-center gap-3.5'>
          <Tooltip title="Filtrele">
            <Button variant="contained" className='text-xs! w-10 h-10 rounded-full! bg-indigo-600! hover:bg-indigo-700! transition-all duration-300' onClick={() => window.location.href = '/signup'}>
              <FilterAltIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Ekle">
            <Button onClick={handleOpen('right', true)} variant="contained" className='text-xs! w-10 h-10 rounded-full! bg-indigo-600! hover:bg-indigo-700! transition-all duration-300'>
              <AddIcon />
            </Button>
          </Tooltip>
        </div>
      </div>

      {agegroups.length > 0
        ? <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Adı</TableCell>
                <TableCell>Yaş Aralığı</TableCell>
                <TableCell>Açıklama</TableCell>
                <TableCell>İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agegroups.map((agegroupstItem) => (
                <TableRow key={agegroupstItem._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{agegroupstItem._id}</TableCell>
                  <TableCell>{agegroupstItem.name}</TableCell>
                  <TableCell>{agegroupstItem.minAge} - {agegroupstItem.maxAge}</TableCell>
                  <TableCell>{agegroupstItem.description}</TableCell>
                  <TableCell>
                    <div className='flex justify-start items-center gap-2'>
                      <Button size='small' variant="contained" onClick={handleOpen('right', true)} className='text-xs! bg-green-300! hover:bg-green-700! transition-all duration-300 shadow-none!'>
                        Güncelle
                      </Button>
                      <Dialog
                        open={confirm}
                        onClose={handleCloseConfirm}
                      >
                        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                          Grubu Sil
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Grubu silmek istediğine eminmisin? Bu işlem geri alınamaz!.
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button autoFocus onClick={handleCloseConfirm}>
                            Vazgeç
                          </Button>
                          <Button variant="contained" onClick={handleDeleteStudent.bind(null, agegroupstItem._id)} className='bg-red-600 hover:bg-red-700 transition-all duration-300'>Sil</Button>
                        </DialogActions>
                      </Dialog>
                      <Button size='small' variant="contained" onClick={handleOpenConfirm} className='text-xs! bg-red-300! hover:bg-red-700! transition-all duration-300 shadow-none!'>
                        Sil
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        : 'yok'}


      <Drawer sx={{ '& .MuiDrawer-paper': { width: 900, boxSizing: 'border-box' } }}
        anchor={'right'}
        open={open['right']}
        onClose={handleClose('right')}
        className="relative"
      >
        <div className='p-5'>
          <h2 className='text-2xl font-bold'>Yaş Grubu Ekle</h2>
          <div className='mt-10'>
            <div className='mb-7 text-gray-500'>
              <span className='text-xs text-red-500 font-semibold'>*</span> ile işaretli alanlar zorunludur.
            </div>
            <div className='flex justify-start items-center mb-3 gap-5'>
              <label className='text-sm font-semibold min-w-28'>Adı</label>
              <span className='text-xs text-red-500 font-semibold w-[5px]'>*</span>
              <input disabled={loading} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Adı' className='w-96 h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0' />
            </div>


            <div className='flex justify-start items-center mb-3 gap-5'>
              <label className='text-sm font-semibold min-w-28'>Alt Yaş</label>
              <span className='text-xs text-red-500 font-semibold w-[5px]'>*</span>
              <input disabled={loading} type="text" value={minAge} onChange={(e) => setminAge(e.target.value)} placeholder='Alt Yaş' className='w-96 h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0' />
            </div>


            <div className='flex justify-start items-center mb-3 gap-5'>
              <label className='text-sm font-semibold min-w-28'>Üst Yaş</label>
              <span className='text-xs text-red-500 font-semibold w-[5px]'>*</span>
              <input disabled={loading} type="text" value={maxAge} onChange={(e) => setmaxAge(e.target.value)} placeholder='Üst Yaş' className='w-96 h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0' />
            </div>


            <div className='flex justify-start items-center mb-3 gap-5'>
              <label className='text-sm font-semibold min-w-28'>Açıklama</label>
              <span className='text-xs text-red-500 font-semibold w-1.5'>*</span>
              <input disabled={loading} type="text" value={description} onChange={(e) => setdescription(e.target.value)} placeholder='Açıklama' className='w-96 h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0' />
            </div>

            <div className='flex justify-center lg:justify-end items-center mb-3 gap-5 mt-10'>
              <Button onClick={handleClose('right')} className="min-w-24! h-10! text-white! text-center! text-base! font-semibold! leading-6! rounded-full! hover:bg-slate-900! transition-all! duration-700! bg-slate-600! cursor-pointer!">KAPAT</Button>
              <Button onClick={handleAddUser} disabled={loading} className="min-w-24! h-10! text-white! text-center! text-base! font-semibold! leading-6! rounded-full! hover:bg-indigo-900! transition-all! duration-700! bg-indigo-600! shadow-sm! cursor-pointer! outline-0!">EKLE</Button>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default AgeGroups