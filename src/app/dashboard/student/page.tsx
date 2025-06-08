'use client';
import React from 'react';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, ButtonBase, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Drawer, Input, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

type Students = {
  _id: string;
  name: string;
  surname: string;
  picture: string;
  email: string;
  classroom: string;
  dob: string;
  phone: string;
  address: string;
};

const Student = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [picture, setPicture] = React.useState<string | undefined>(undefined);
  const [email, setEmail] = useState("");
  const [classroom, setClassroom] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<Students[]>([]);
  const [open, setOpen] = React.useState<{ [key: string]: boolean }>({ right: false, left: false, top: false, bottom: false });
  const [confirm, setConfirm] = React.useState(false);
  const handleOpen = (direction: string, isOpen: boolean) => () => { setOpen(prev => ({ ...prev, [direction]: isOpen })); };
  const handleClose = (direction: string) => () => { setOpen(prev => ({ ...prev, [direction]: false })); };
  const handleOpenConfirm = () => setConfirm(true);
  const handleCloseConfirm = () => setConfirm(false);
  const fetchStudents = async () => {
    const res = await fetch("/api/students");
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);


  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleAddUser = async () => {
    if (!isValidEmail(email)) {
      alert("Geçerli bir e-posta adresi girin.");
      return;
    }

    if (!name || !email || !picture || !surname || !classroom || !dob || !phone || !address) {
      alert("Tüm alanlar zorunludur.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, surname, picture, classroom, dob, phone, address }),
    });
    if (res.ok) {
      setName("");
      setSurname("");
      setPicture("");
      setEmail("");
      setClassroom("");
      setDob("");
      setPhone("");
      setAddress("");
      fetchStudents();
      handleClose('right')();
      alert("Öğrenci başarıyla eklendi.");
    } else {
      const error = await res.json();
      alert(error.message || "Kullanıcı eklenemedi.");
    }
    setLoading(false);
  };

  const handleDeleteStudent = async (id: string) => {
    try {
      const res = await fetch('/api/students/' + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert("Öğrenci başarıyla silindi.");
        handleCloseConfirm();
        fetchStudents();
      } else {
        const error = await res.json();
        alert(error.message || "Kullanıcı silinirken hata oluştu.");
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
  };

  return (
    <div className="bg-white rounded-2xl p-5 mt-5">
      <div className='flex justify-start items-center mb-5'>
        <div className='w-3/5'>
          <h2 className='text-3xl font-bold text-black'>Öğrenci Listesi</h2>
        </div>
        <div className='w-2/5 flex justify-end items-center gap-3.5'>
          <div className='hidden search relative rounded-full border border-gray-300 px-3 py-1.5 gap-2.5 lg:flex justify-center items-center'>
            <SearchIcon className='text-gray-400' />
            <Input placeholder='İsim yada ID ile ara' className='text-xs! min-w-60' />
          </div>
          <Tooltip title="Filter Student">
            <Button variant="contained" className='text-xs! w-10 h-10 rounded-full! bg-indigo-600! hover:bg-indigo-700! transition-all duration-300' onClick={() => window.location.href = '/signup'}>
              <FilterAltIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Add Student">
            <Button onClick={handleOpen('right', true)} variant="contained" className='text-xs! w-10 h-10 rounded-full! bg-indigo-600! hover:bg-indigo-700! transition-all duration-300'>
              <AddIcon />
            </Button>
          </Tooltip>
        </div>
      </div>

      {students.length > 0
        ? <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Öğrenci ID</TableCell>
                <TableCell>Öğrencinin Resmi</TableCell>
                <TableCell>Öğrenci Adı ve Soyadı</TableCell>
                <TableCell>Eposta Adresi</TableCell>
                <TableCell>Sınıfı</TableCell>
                <TableCell>Doğrumu Tarihi</TableCell>
                <TableCell>Cep Telefonu</TableCell>
                <TableCell>Adres Bilgisi</TableCell>
                <TableCell>İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students && students.map((studentItem) => (
                <TableRow key={studentItem._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{studentItem._id}</TableCell>
                  <TableCell>{studentItem.name} {studentItem.surname}</TableCell>
                  <TableCell>{studentItem.picture}</TableCell>
                  <TableCell>{studentItem.email}</TableCell>
                  <TableCell>{studentItem.classroom}</TableCell>
                  <TableCell>{studentItem.dob}</TableCell>
                  <TableCell>{studentItem.phone}</TableCell>
                  <TableCell>{studentItem.address}</TableCell>
                  <TableCell>
                    <div className='flex justify-start items-center gap-2'>
                      <Button size='small' variant="contained" onClick={handleOpenConfirm} className='text-xs! bg-green-300! hover:bg-green-700! transition-all duration-300 shadow-none!'>
                        Güncelle
                      </Button>
                      <Dialog
                        open={confirm}
                        onClose={handleCloseConfirm}

                        aria-labelledby="draggable-dialog-title"
                      >
                        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                          Öğrenci Sil İşlemi
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Öğrenciyi silmek istediğine eminmisin? Bu işlem geri alnımaaz!.
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button variant="contained" autoFocus onClick={handleCloseConfirm}>
                            Vazgeç
                          </Button>
                          <Button variant="contained" onClick={handleDeleteStudent.bind(null, studentItem._id)} className='text-xs! bg-red-600 hover:bg-red-700 transition-all duration-300'>Sil</Button>
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
        <button onClick={handleClose('right')} className="absolute left-5 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-indigo-200 transition-all duration-700 bg-indigo-600 cursor-pointer w-10 h-10">X</button>
        <div className='p-5'>
          <h2 className='text-2xl font-bold'>Yeni Öğrenci Ekle</h2>
          <div className='mt-4'>
            <div className='flex justify-start items-center mb-3 gap-5'>
              <label className='text-sm font-semibold min-w-28'>Adı</label>
              <span className='text-xs text-red-500 font-semibold'>*</span>
              <input disabled={loading} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Adı' className='w-96 h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0' />
            </div>


            <div className='flex justify-start items-center mb-3 gap-5'>
              <label className='text-sm font-semibold min-w-28'>Soyadı</label>
              <span className='text-xs text-red-500 font-semibold'>*</span>
              <input disabled={loading} type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder='Soyadı' className='w-96 h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0' />
            </div>

            <div className='flex justify-start items-center mb-3 gap-5'>
              <label className='text-sm font-semibold min-w-28'>Resmi</label>
              <span className='text-xs text-red-500 font-semibold'>*</span>
              <ButtonBase
                component="label"
                role={undefined}
                tabIndex={-1} // prevent label from tab focus
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
                  style={{
                    border: 0,
                    clip: 'rect(0 0 0 0)',
                    height: '1px',
                    margin: '-1px',
                    overflow: 'hidden',
                    padding: 0,
                    position: 'absolute',
                    whiteSpace: 'nowrap',
                    width: '1px',
                  }}
                  onChange={handleAvatarChange}
                />
              </ButtonBase>
            </div>


            <div className='flex justify-start items-center mb-3 gap-5'>
              <label className='text-sm font-semibold min-w-28'>Eposta Adresi</label>
              <span className='text-xs text-red-500 font-semibold'>*</span>
              <input disabled={loading} type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Eposta Adresi' className='w-96 h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0' />
            </div>


            <div className='flex justify-start items-center mb-3 gap-5'>
              <label className='text-sm font-semibold min-w-28'>Sınıfı</label>
              <span className='text-xs text-red-500 font-semibold'>*</span>
              <input disabled={loading} type="text" value={classroom} onChange={(e) => setClassroom(e.target.value)} placeholder='Sınıfı' className='w-96 h-96 border border-gray-300 rounded-md px-3 mb-3 outline-0' />
            </div>


            <div className='flex justify-start items-center mb-3 gap-5'>
              <label className='text-sm font-semibold min-w-28'>Doğum Tarihi</label>
              <span className='text-xs text-red-500 font-semibold'>*</span>
              <input disabled={loading} type="text" value={dob} onChange={(e) => setDob(e.target.value)} placeholder='Doğum Tarihi' className='w-96 h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0' />
            </div>


            <div className='flex justify-start items-center mb-3 gap-5'>
              <label className='text-sm font-semibold min-w-28'>Cep Telefonu</label>
              <span className='text-xs text-red-500 font-semibold'>*</span>
              <input disabled={loading} type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Cep Telefonu' className='w-96 h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0' />
            </div>


            <div className='flex justify-start items-center mb-3 gap-5'>
              <label className='text-sm font-semibold min-w-28'>Adres Biilgisi</label>
              <span className='text-xs text-red-500 font-semibold'>*</span>
              <textarea disabled={loading} value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Adres Biilgisi' className='w-96 h-20 border border-gray-300 rounded-md px-3 mb-3 outline-0'></textarea>
            </div>
            <div className='flex justify-start items-center mb-3 gap-5'>
              <label className='text-sm font-semibold min-w-28'>Öğrenci Resmi</label>
              <button onClick={handleAddUser} disabled={loading} className="min-w-24 h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-indigo-200 transition-all duration-700 bg-indigo-600 shadow-sm mt-4 cursor-pointer outline-0">EKLE</button>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default Student