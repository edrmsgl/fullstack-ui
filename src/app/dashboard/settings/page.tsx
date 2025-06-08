'use client';
import React, { useEffect, useState } from 'react'
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
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
import HomeIcon from '@mui/icons-material/Home';

type Settings = {
    _id: string;
    title: string;
    icon: string;
    category: string;
    path: string;
};

const Settings = () => {
    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("");
    const [category, setCategory] = useState("");
    const [path, setPath] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [confirm, setConfirm] = React.useState(false);
    const handleOpenConfirm = () => setConfirm(true);
    const handleCloseConfirm = () => setConfirm(false);
    const [settings, setSettins] = useState<Settings[]>([]);
    const fetchSettings = async () => {
        const res = await fetch("/api/settings");
        const data = await res.json();
        setSettins(data);
    };

    useEffect(() => {
        fetchSettings();
    }, []);


    const handleAddPage = async () => {
        if (!title || !icon || !category || !path) {
            alert("Tüm alanlar zorunludur.");
            return;
        }
        setLoading(true);
        const res = await fetch("/api/settings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, icon, category, path }),
        });
        if (res.ok) {
            setTitle("");
            setIcon("");
            setCategory("");
            setPath("");
            handleClose();
            fetchSettings();
        } else {
            const error = await res.json();
            alert(error.message || "Sayfa eklenemedi.");
        }
        setLoading(false);
    };

      const handleDeletePage = async (id: string) => {
        try {
          const res = await fetch('/api/settings/' + id, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          });

          if (res.ok) {
            alert("Sayfa başarıyla silindi.");
            handleCloseConfirm();
            fetchSettings();
          } else {
            const error = await res.json();
            alert(error.message || "Sayfa silinirken hata oluştu.");
          }
        } catch (error) {
          alert("Beklenmeyen bir hata oluştu: " + String(error));
        }
      };


    return (
        <div className="bg-white rounded-2xl p-5 mt-5">
            <div className='flex justify-start items-center mb-5'>
                <div className='w-3/5'>
                    <h2 className='text-3xl font-bold text-black'>Settings</h2>
                </div>
                <div className='w-2/5 flex justify-end items-center gap-3.5'>
                    <Tooltip title="Menu Ekle">
                        <Button onClick={handleOpen} variant="contained" className='text-xs! w-10 h-10 rounded-full! bg-indigo-600! hover:bg-indigo-700! transition-all duration-300'>
                            <AddIcon />
                        </Button>
                    </Tooltip>
                </div>
            </div>


            {settings.length > 0
                ? <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sayfa ID</TableCell>
                                <TableCell>Sayfa Adı</TableCell>
                                <TableCell>Sayfa Simgesi</TableCell>
                                <TableCell>Sayfa Kategorisi</TableCell>
                                <TableCell>Sayfa Adresi</TableCell>
                                <TableCell>İşlem</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {settings && settings.map((settingsItem) => (
                                <TableRow key={settingsItem._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{settingsItem._id}</TableCell>
                                    <TableCell>{settingsItem.title}</TableCell>
                                    <TableCell>{settingsItem.icon}</TableCell>
                                    <TableCell>{settingsItem.category}</TableCell>
                                    <TableCell>{settingsItem.path}</TableCell>
                                    <TableCell>
                                        <Dialog
                                            open={confirm}
                                            onClose={handleCloseConfirm}

                                            aria-labelledby="draggable-dialog-title"
                                        >
                                            <DialogTitle>
                                                SİL
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    Sayfayı silmek istediğine eminmisin? Silme işlemi geri alınmayacaktır.
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button autoFocus onClick={handleCloseConfirm}>
                                                    Vazgeç
                                                </Button>
                                                <Button onClick={handleDeletePage.bind(null, settingsItem._id)} className='bg-red-600 hover:bg-red-700 transition-all duration-300'>SİL</Button>
                                            </DialogActions>
                                        </Dialog>
                                        <Button onClick={handleOpenConfirm} className='text-xs! bg-red-600 hover:bg-red-700 transition-all duration-300'>
                                            Sil
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
                    <h2 className='text-2xl font-bold'>Menu Ekle</h2>
                    <div className='mt-4'>
                        <input disabled={loading} type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Başlık' className='w-full h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0' />
                        <input disabled={loading} type="text" value={icon} onChange={(e) => setIcon(e.target.value)} placeholder='Simge' className='w-full h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0' />
                        <input disabled={loading} type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Kategori' className='w-full h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0' />
                        <input disabled={loading} type="text" value={path} onChange={(e) => setPath(e.target.value)} placeholder='Url' className='w-full h-10 border border-gray-300 rounded-md px-3 mb-3 outline-0' />
                    </div>
                    <button onClick={handleAddPage} disabled={loading} className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-indigo-200 transition-all duration-700 bg-indigo-600 shadow-sm mt-4 cursor-pointer">EKLE</button>
                </Box>
            </Modal>
        </div>
    )
}
export default Settings;