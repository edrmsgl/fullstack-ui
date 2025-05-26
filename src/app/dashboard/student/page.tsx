'use client';
import React from 'react';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { Input } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Students = {
  _id: string;
  name: string;
  surname: string;
  email?: string;
  classroom?: string;
  dob?: string;
  phone?: string;
  address?: string;
};

const Student = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [classroom, setClassroom] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<Students[]>([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [confirm, setConfirm] = React.useState(false);
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

    if (!name || !email || !surname || !classroom || !dob || !phone || !address) {
      alert("Tüm alanlar zorunludur.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, surname, classroom, dob, phone, address }),
    });
    if (res.ok) {
      setName("");
      setSurname("");
      setEmail("");
      setClassroom("");
      setDob("");
      setPhone("");
      setAddress("");
      handleClose();
      fetchStudents();
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
        fetchStudents();
      } else {
        const error = await res.json();
        alert(error.message || "Kullanıcı silinirken hata oluştu.");
      }
    } catch (error) {
      alert("Beklenmeyen bir hata oluştu: " + String(error));
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 mt-5">
      <div className='flex justify-start items-center mb-5'>
        <div className='w-3/5'>
          <h2 className='text-3xl font-bold text-black'>Students</h2>
        </div>
        <div className='w-2/5 flex justify-end items-center gap-3.5'>
          <div className='hidden search relative rounded-full border border-gray-300 px-3 py-1.5 gap-2.5 lg:flex justify-center items-center'>
            <SearchIcon className='text-gray-400' />
            <Input placeholder='Search by Name or ID' className='text-xs! min-w-60' />
          </div>
          <Tooltip title="Filter Student">
            <Button variant="contained" className='text-xs! w-10 h-10 rounded-full! bg-indigo-600! hover:bg-indigo-700! transition-all duration-300' onClick={() => window.location.href = '/signup'}>
              <FilterAltIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Add Student">
            <Button onClick={handleOpen} variant="contained" className='text-xs! w-10 h-10 rounded-full! bg-indigo-600! hover:bg-indigo-700! transition-all duration-300'>
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
                <TableCell>Student ID</TableCell>
                <TableCell>Student Full Name</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>DOB</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students && students.map((studentItem) => (
                <TableRow key={studentItem._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{studentItem._id}</TableCell>
                  <TableCell>{studentItem.name}</TableCell>
                  <TableCell>{studentItem.classroom ? studentItem.classroom : '-'}</TableCell>
                  <TableCell>{studentItem.dob ? studentItem.dob : '-'}</TableCell>
                  <TableCell>{studentItem.phone ? studentItem.phone : '-'}</TableCell>
                  <TableCell>{studentItem.address ? studentItem.address : '-'}</TableCell>
                  <TableCell>
                    <Dialog
                      open={confirm}
                      onClose={handleCloseConfirm}

                      aria-labelledby="draggable-dialog-title"
                    >
                      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        Delete Student
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Do you want to delete this student? This action cannot be undone.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={handleCloseConfirm}>
                          Cancel
                        </Button>
                        <Button onClick={handleDeleteStudent.bind(null, studentItem._id)} className='text-xs! bg-red-600 hover:bg-red-700 transition-all duration-300'>Delete</Button>
                      </DialogActions>
                    </Dialog>
                    <Button onClick={handleOpenConfirm} className='text-xs! bg-red-600 hover:bg-red-700 transition-all duration-300'>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        : 'yok'}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg shadow-lg w-96'>
          <h2 className='text-2xl font-bold'>Add Students</h2>
          <div className='mt-4'>
            <input disabled={loading} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='w-full h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0' />
            <input disabled={loading} type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder='Surname' className='w-full h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0' />
            <input disabled={loading} type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='w-full h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0' />
            <input disabled={loading} type="text" value={classroom} onChange={(e) => setClassroom(e.target.value)} placeholder='Classrrom' className='w-full h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0' />
            <input disabled={loading} type="text" value={dob} onChange={(e) => setDob(e.target.value)} placeholder='DOB' className='w-full h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0' />
            <input disabled={loading} type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone' className='w-full h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0' />
            <textarea disabled={loading} placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} className='w-full h-20 border border-gray-300 rounded-md px-3 mb-3'></textarea>
          </div>
          <button onClick={handleAddUser} disabled={loading} className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-indigo-200 transition-all duration-700 bg-indigo-600 shadow-sm mt-4 cursor-pointer">Sil</button>
        </Box>
      </Modal>
    </div>
  )
}

export default Student