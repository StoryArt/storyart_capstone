import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, CardHeader, IconButton, Input, FormControl, InputLabel, CardActionArea, 
    CardActions, CardContent, CardMedia, Button, Typography, Card } from '@material-ui/core';
import { Favorite as FavoriteIcon, MoreVert as MoreVertIcon } from '@material-ui/icons';

import { Skeleton } from '@material-ui/lab';
import DateTimeUtils from '../../../utils/datetime';

const useStyles = makeStyles({
    root: {
    
    },
    button: {
      float: 'right'
    },
    actions: {
        textAlign: 'right'
    },
    avatar: {
        width: '100px',
        height: '100px'
    }
});


const UserProfileHeader = (props) => {
    const classes = useStyles();
    const { user, canEdit } = props;

    const navigateRoute = (route) => props.history.push(route);

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="https://picsum.photos/200/300"
                title="Contemplative Reptile"
                />
                <CardContent>
                    <CardHeader
                        avatar={
                            <Avatar className={classes.avatar} aria-label="recipe" >
                                { user.avatar }
                            </Avatar>
                        }
                        // action={
                        //     <IconButton aria-label="settings">
                        //         <MoreVertIcon />
                        //     </IconButton>
                        // }
                        title={user.name}
                        subheader={DateTimeUtils.getDate(user.createdAt)}
                    />
                    <Typography variant="body2" color="textSecondary" component="p">
                        { user.introContent }
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.actions}>
                <Button style={{ float: 'right' }} className={classes.button} size="small" color="primary">
                     Chia sẻ
                </Button>
               {canEdit && (
                <Button onClick={() => navigateRoute('/user/edit-profile')} size="small" color="secondary">
                    Cập nhât 
                </Button>
               )}
            </CardActions>
        </Card>
                
    );
};

export default withRouter(UserProfileHeader);
