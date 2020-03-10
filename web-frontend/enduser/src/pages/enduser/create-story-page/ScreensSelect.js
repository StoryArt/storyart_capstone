import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';


const ScreensSelect = (props) => {
    const { screens, onChange, value, placeholder } = props;

    return (
        <FormControl variant="outlined" style={{ width: '100%' }}>
            <InputLabel>{placeholder}</InputLabel>
            <Select
                value={value}
                onChange={onChange}
            >
                {screens.map((screen, index) => (
                    <MenuItem key={screen.id} value={screen.id}>
                        Man hinh {index + 1} ({ screen.title.length > 0 ? screen.title : 'Chua co tieu de' })
                    </MenuItem>
                ))}
        </Select>
      </FormControl>
    );
};


export default ScreensSelect;
