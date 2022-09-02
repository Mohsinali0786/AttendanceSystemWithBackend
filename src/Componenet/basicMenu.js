import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
// import { useCallback } from 'react'

export default function NativeSelectDemo({ role, changeRole }) {

    const handleInputChange = (event) => {
        // console.log('running')
        changeRole(event.target.value)
    }
    // console.log('changeRole', changeRole.)
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
                    <option value='admin'>Admin</option>
                    <option value='user'>User</option>
                </NativeSelect>
            </FormControl>
        </Box>
    );
}
