import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListIcon from '@mui/icons-material/List';
import { useState } from "react";
import CoPresentTwoToneIcon from '@mui/icons-material/CoPresentTwoTone';
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import { Link } from 'react-router-dom'



const data = [
    {
        name: "Profile",
        icon: <PersonAddAltTwoToneIcon />,
        path: 'profile'
    },

    {
        name: "User Attendance",
        icon: <CoPresentTwoToneIcon />,
        path: 'Home'
    },
    {
        name: "Your Attendance",
        icon: <CoPresentTwoToneIcon />,
        path: 'Student'
    },

];

export default function TemporaryDrawer() {

    const [open, setOpen] = useState(false);

    const getList = () => (
        <div style={{ width: 250 }} onClick={() => setOpen(false)}>
            <h1>Company</h1>
            <Divider style={{ marginBottom: '30px' }} />
            {data.map((item, index) => (
                <tr style={{ display: 'flex' }}>

                    <td style={{ paddingLeft: '20px', textAlign: 'center', paddingBottom: '20px' }}>{item.icon}</td>
                    <td><Link to={`/${item.path}`} style={{ color: 'black', textDecoration: 'none', marginLeft: '30px' }} > {item.name}</Link></td>

                    <td />
                </tr>
            ))
            }
        </div >
    );
    return (
        <div>
            <Button onClick={() => setOpen(true)}><ListIcon style={{ color: 'white' }} /></Button>
            <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
                {getList()}
            </Drawer>
        </div>
    );
}



