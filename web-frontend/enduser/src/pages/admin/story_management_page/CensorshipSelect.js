import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { getCensorshipStatus, ORDER_BYS } from '../../../common/constants';

let censorships = getCensorshipStatus();

const CensorshipSelect = (props) => {
    const { value, onChange, timeRequestCensorship } = props;
    censorships = censorships.filter(c => {
        if(c.value === ORDER_BYS.CENSORSHIP_REQUEST_TIME && !timeRequestCensorship) return false;
        return true;
    })

    return (
        <FormControl size="small" style={{ width: '100%' }}>
            <InputLabel>Trạng thái</InputLabel>
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