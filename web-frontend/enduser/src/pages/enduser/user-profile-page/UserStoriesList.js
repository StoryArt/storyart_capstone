import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, MenuItem, Divider, IconButton, Tooltip } from '@material-ui/core';
import MyDropdownMenu from '../../../components/common/MyDropdownMenu';
import { CENSORSHIP_STATUS } from '../../../common/constants';
import NotFound from '../../../components/common/NotFound';
import TagList from '../../../components/common/TagList';
import { Search as SearchIcon, DataUsage as DataUsageIcon } from '@material-ui/icons';
import DateTimeUtils from '../../../utils/datetime';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import PauseIcon from '@material-ui/icons/Pause';
import { withRouter } from 'react-router-dom';

const UserStoriesList = (props) => {
    const { stories, readStory, handleDeleteStory, changePublishedStatus, editStory, onRequestCensorship } = props;

    return (
       <div>
            { stories.length > 0 && (
                <TableContainer component={Paper} >
                    <Table>
                        <caption>Tất cả truyện</caption>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Tiêu đề</TableCell>
                                <TableCell align="center">Ảnh</TableCell>
                                <TableCell align="center">Ngày tạo</TableCell>
                                <TableCell align="center">Số màn hình</TableCell>
                                <TableCell align="center">Lượt đọc</TableCell>
                                <TableCell align="center">Lượt bình luận</TableCell>
                                <TableCell align="center">Lượt đánh giá</TableCell>
                                <TableCell align="center">Đánh giá trung bình</TableCell>
                                <TableCell align="center">Trạng thái</TableCell>
                                {/* <TableCell align="center">Nhãn</TableCell> */}
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stories.map((story, index) => (
                                <TableRow key={story.id}>
                                    <TableCell align="center">{ index + 1}</TableCell>
                                    <TableCell align="center">{ story.title }</TableCell>
                                    <TableCell align="center">
                                        <img style={{ width: '80px' }}  src={story.image}/>
                                    </TableCell>
                                    <TableCell align="center">{DateTimeUtils.getDateTime(story.createdAt)}</TableCell>
                                    <TableCell align="center">
                                        <strong style={{ fontSize: '1.1em' }}>{story.numOfScreen}</strong>
                                    </TableCell>
                                    <TableCell align="center">
                                        <strong style={{ fontSize: '1.1em' }}>{story.numOfRead}</strong>
                                    </TableCell>
                                    <TableCell align="center">
                                        <strong style={{ fontSize: '1.1em' }}>{story.numOfComment}</strong>
                                    </TableCell>
                                    <TableCell align="center">
                                        <strong style={{ fontSize: '1.1em' }}>{story.numOfRate}</strong>
                                    </TableCell>
                                    <TableCell align="center">
                                        <strong style={{ fontSize: '1.1em' }}>{story.avgRate}</strong>
                                    </TableCell>
                                    <TableCell align="center">
                                        {story.published ? <span className="text-success font-weight-bold">Công khai</span> : <span className="text-danger font-weight-bold">Riêng tư</span>}
                                    </TableCell>
                                    {/* <TableCell align="center">
                                        <div style={{ maxWidth: '150px' }}>
                                            <small>
                                                <TagList tags={story.tags} />
                                            </small>
                                        </div>
                                    </TableCell> */}
                                    <TableCell>
                                        <Tooltip title="Xem thống kê" style={{ display: 'inline-block' }}>
                                            <IconButton
                                                style={{ display: 'inline-block' }}
                                                color="inherit"
                                                onClick={() => { props.history.push('/story/analystics/' + story.id) }}
                                            >
                                                <DataUsageIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                
                                    <TableCell align="center">
                                        <MyDropdownMenu>
                                            <MenuItem onClick={() => readStory(story)}>
                                                Đọc truyên
                                            </MenuItem>
                                            <MenuItem onClick={() => editStory(story)}>
                                                Cập nhật
                                            </MenuItem>
                                            <MenuItem onClick={() => changePublishedStatus(story)}>
                                                {story.published ? 'Bật chế độ riêng tư' : 'Bật chế độ công khai'}
                                            </MenuItem>
                                            {/* {story.censorshipStatus == null && ( */}
                                                <MenuItem onClick={() => onRequestCensorship(story)}>
                                                    Xem kiểm duyệt
                                                </MenuItem>
                                            {/* )} */}
                                            <Divider/>
                                            <MenuItem onClick={() => handleDeleteStory(story)}>
                                                Xóa truyện
                                            </MenuItem>
                                           
                                        </MyDropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            { stories.length === 0 && (<NotFound message="Không có truyện nào" />)}
       </div>
    );
};


export default withRouter(UserStoriesList);