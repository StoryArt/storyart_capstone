import React from 'react';
import { TableContainer, TableHead, Table, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';
import DateTimeUtils from '../../../utils/datetime';

const CensorshipHistory = (props) => {
    const { censorships } = props;

    return (
        <TableContainer component={Paper}>
              <Table aria-label="caption table">
                <caption>Lịch sử kiểm duyệt</caption>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="center">User note</TableCell>
                    <TableCell align="center">Admin note</TableCell>
                    <TableCell align="center">Thòi gian tạo</TableCell>
                    <TableCell align="center">Thời gian xử lý</TableCell>
                    <TableCell align="center">Trạng thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { censorships.map((c, index) => (
                    <TableRow key={c.id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{c.userNote}</TableCell>
                      <TableCell align="center">{c.adminNote}</TableCell>
                      <TableCell align="center">{DateTimeUtils.getDateTime(c.createdAt)}</TableCell>
                      <TableCell align="center">{DateTimeUtils.getDateTime(c.handledAt)}</TableCell>
                      <TableCell align="center">{c.censorshipStatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

    );
};


export default CensorshipHistory;