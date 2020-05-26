import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { getCensorshipStatus } from '../../../common/constants';

const censorships = getCensorshipStatus();

const CensorshipSelect = (props) => {
    const { value, onChange } = props;

    return (
        <FormControl size="small" style={{ width: '100%' }}>
            <InputLabel>Trạng thái kiểm duyệt</InputLabel>
            <Select
                size="small"
                value={value}
                onChange={onChange}
            >
                {censorships.map((c, index) => (
                    <MenuItem key={c.value} value={c.value}>
                       {c.title}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};


export default CensorshipSelect;