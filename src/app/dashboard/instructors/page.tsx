'use client';
import React from 'react';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { Avatar, ButtonBase, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Drawer, MenuItem, Paper, Select } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Instructors from '@/models/instructors';
import Image from 'next/image';

type Instructors = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  ageGroup: string;
  picture: string;
};

type AgeGroup = {
  _id: string;
  name: string;
};

interface GetAgeGroupName {
  (id: string): string;
}

const Instructors = () => {
  const [fullName, setFullName] = useState("");
  const [picture, setPicture] = React.useState<string | undefined>(undefined);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ageGroups, setAgeGroups] = useState<AgeGroup[]>([]);
  const [selectedAgeGroupId, setSelectedAgeGroupId] = useState('');
  const [loading, setLoading] = useState(false);
  const [instructors, setInstructors] = useState<Instructors[]>([]);
  const [open, setOpen] = React.useState<{ [key: string]: boolean }>({ right: false, left: false, top: false, bottom: false });
  const [confirm, setConfirm] = React.useState(false);
  const handleOpen = (direction: string, isOpen: boolean) => () => { setOpen(prev => ({ ...prev, [direction]: isOpen })); };
  const handleClose = (direction: string) => () => {
    setOpen(prev => ({ ...prev, [direction]: false }));
    setFullName("");
    setEmail("");
    setPhone("");
    setPicture("");
    setAgeGroups([]);
  };
  const handleOpenConfirm = () => setConfirm(true);
  const handleCloseConfirm = () => setConfirm(false);
  const fetchAgeGroups = async () => {
    const res = await fetch("/api/agegroups");
    const data = await res.json();
    setAgeGroups(Array.isArray(data) ? data : []);
  };

  const handleChange = (event) => {
    setSelectedAgeGroupId(event.target.value);
  };

  useEffect(() => {
    fetchAgeGroups();
  }, []);

  const fetchInstructors = async () => {
    const res = await fetch("/api/instructors");
    const data = await res.json();
    setInstructors(data);
  };

  useEffect(() => {
    fetchInstructors();
  }, []);


  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleAdd = async () => {
    if (email && !isValidEmail(email)) {
      alert("Geçerli bir e-posta adresi girin.");
      return;
    }

    if (phone && !/^\d{10}$/.test(phone)) {
      alert("Telefon numarası 10 haneli olmalıdır.");
      return;
    }

    if (!fullName || !email || !phone || !picture || !selectedAgeGroupId) {
      alert("Tüm alanlar zorunludur.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/instructors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, email, phone, picture, ageGroup: selectedAgeGroupId }),
    });
    if (res.ok) {
      setFullName("");
      setEmail("");
      setPhone("");
      setPicture("");
      setAgeGroups([]);
      fetchAgeGroups();
      fetchInstructors();
      handleClose('right')();
      alert("Eğitmen başarıyla eklendi.");
    } else {
      const error = await res.json();
      alert(error.message || "Eğitmen eklenemedi.");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/instructors/' + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert("Eğitmen başarıyla silindi.");
        handleCloseConfirm();
        fetchInstructors();
      } else {
        const error = await res.json();
        alert(error.message || "Eğitmen silinirken hata oluştu.");
      }
    } catch (error) {
      alert("Beklenmeyen bir hata oluştu: " + String(error));
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    console.log("Avatar changed:", picture);
    event.target.value = '';
  };


  const getAgeGroupName: GetAgeGroupName = (id) => {
    const found = ageGroups.find((group: AgeGroup) => group._id === id);
    return found ? found.name : 'Tanımsız';
  };

  return (
    <div className="bg-white rounded-2xl p-5 mt-5">
      <div className='flex justify-start items-center mb-5'>
        <div className='w-3/5'>
          <h2 className='text-3xl font-bold text-black'>Eğitmenler</h2>
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

      {instructors.length > 0
        ? <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Adı</TableCell>
                <TableCell>Grubu</TableCell>
                <TableCell>Eposta Adresi</TableCell>
                <TableCell>İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {instructors.map((instructorstItem) => (
                <TableRow key={instructorstItem._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{instructorstItem._id}</TableCell>
                  <TableCell>{instructorstItem.fullName}</TableCell>
                  <TableCell>{getAgeGroupName(instructorstItem.ageGroup)}</TableCell>
                  <TableCell><Image src={instructorstItem.picture} alt={instructorstItem.fullName} width={40} height={40} className='rounded-full' /></TableCell>
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
                          Eğitmen Sil
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Eğitmeni silmek istediğine eminmisin? Bu işlem geri alınamaz!.
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button autoFocus onClick={handleCloseConfirm}>
                            Vazgeç
                          </Button>
                          <Button variant="contained" onClick={handleDelete.bind(null, instructorstItem._id)} className='bg-red-600 hover:bg-red-700 transition-all duration-300'>Sil</Button>
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
          <h2 className='text-2xl font-bold'>Eğitmen Ekle</h2>
          <div className='mt-10'>
            <div className='mb-7 text-gray-500'>
              <span className='text-xs text-red-500 font-semibold'>*</span> ile işaretli alanlar zorunludur.
            </div>
            <div className='flex justify-start items-center mb-3 gap-5'>
              <label className='text-sm font-semibold min-w-28'>Adı ve Soyadı</label>
              <span className='text-xs text-red-500 font-semibold w-[5px]'>*</span>
              <input disabled={loading} type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder='Adı ve Soyadı' className='w-96 h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0' />
            </div>


            <div className='flex justify-start items-center mb-3 gap-5'>
              <label className='text-sm font-semibold min-w-28'>Eposta Adresi</label>
              <span className='text-xs text-red-500 font-semibold w-[5px]'>*</span>
              <input disabled={loading} type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Eposta Adresi' className='w-96 h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0' />
            </div>


            <div className='flex justify-start items-center mb-3 gap-5'>
              <label className='text-sm font-semibold min-w-28'>Telefon Numarası</label>
              <span className='text-xs text-red-500 font-semibold w-[5px]'>*</span>
              <input disabled={loading} type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Telefon Numarası' className='w-96 h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0' />
            </div>


            <div className='flex justify-start items-center mb-3 gap-5'>
              <label className='text-sm font-semibold min-w-28'>Resmi</label>
              <span className='text-xs text-red-500 font-semibold w-[5px]'>*</span>
              <ButtonBase
                component="label"
                role={undefined}
                tabIndex={-1}
                aria-label="Avatar image"
                sx={{
                  borderRadius: '40px',
                  '&:has(:focus-visible)': {
                    outline: '2px solid',
                    outlineOffset: '2px',
                  },
                }}
              >
                <Avatar alt="Upload new avatar" src={picture} />
                <input
                  className='w-96 h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0'
                  disabled={loading}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </ButtonBase>
            </div>


            <div className='flex justify-start items-center mb-3 gap-5'>
              <label className='text-sm font-semibold min-w-28'>Yaş Grubu</label>
              <span className='text-xs text-red-500 font-semibold w-[5px]'>*</span>
              <Select
                value={selectedAgeGroupId}
                displayEmpty
                onChange={handleChange}
                inputProps={{ 'aria-label': 'Without label' }}
                className='w-96 h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0'
              >
                <MenuItem value="">
                  <em>Seçiniz</em>
                </MenuItem>
                {Array.isArray(ageGroups) && ageGroups.length > 0 && ageGroups.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className='flex justify-center lg:justify-end items-center mb-3 gap-5 mt-10'>
              <Button onClick={handleClose('right')} className="min-w-24! h-10! text-white! text-center! text-base! font-semibold! leading-6! rounded-full! hover:bg-slate-900! transition-all! duration-700! bg-slate-600! cursor-pointer!">KAPAT</Button>
              <Button onClick={handleAdd} disabled={loading} className="min-w-24! h-10! text-white! text-center! text-base! font-semibold! leading-6! rounded-full! hover:bg-indigo-900! transition-all! duration-700! bg-indigo-600! shadow-sm! cursor-pointer! outline-0!">EKLE</Button>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default Instructors