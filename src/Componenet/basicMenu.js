import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
// import { useCallback } from 'react'
import { useSelector } from 'react-redux';

export default function NativeSelectDemo({ role, changeRole, option }) {

    const mystate = useSelector((state) => state.AllUsers)
    console.log('option====>', option)


    const handleInputChange = (event) => {
        changeRole(event.target.value)
    }
    return (
        <Box sx={{ minWidth: 20 }}>
            <FormControl >

                <NativeSelect
                    defaultValue={role}

                    inputProps={{
                        name: 'role',
                        id: 'uncontrolled-native',
                    }}
                    onChange={handleInputChange}

                >

                    <option value={option}>{option}</option>

                    <option value='admin'>Admin</option>
                    {/* <option value='user'>User</option> */}
                </NativeSelect>
            </FormControl>
        </Box>
    );
}
