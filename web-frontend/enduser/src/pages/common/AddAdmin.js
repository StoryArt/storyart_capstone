import React, { useState } from "react";
import { MDBInput, MDBAlert } from "mdbreact";
import { Link } from "react-router-dom";
import UserService from "../../services/user.service";
import { setAuthHeader } from "../../config/auth";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const AddAdmin = () => {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [intro_content, setIntro_content] = useState("");
 

  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    let user = {
      username: username,
      password: password,
      intro_content: intro_content,
      email: email,
      name: name
    };
    try {
    setAuthHeader(localStorage.getItem("jwt-token"));

      const res = await UserService.addAdmin(user);

      console.log(res.data);
      
      if (res.data.success == true) {
        window.setTimeout(function() {
          // Move to a new location or you can do something else
          setErrorMessage(
            <MDBAlert color="success">{res.data.message}</MDBAlert>
          );

          window.location.href = "/admin/admin";
        }, 2000);
      }
    } catch (error) {
      console.log(JSON.stringify(error));

      var err;
      if (typeof error.response.data.errors != "undefined") {
        err = error.response.data.errors[0].defaultMessage;
      } else if (typeof error.response.data.message == "string") {
        err = error.response.data.message;
      }

      setErrorMessage(<MDBAlert color="danger">{err}</MDBAlert>);
    }
  }

  return (
    // <div className="pt-5">
    //   <h3 className="text-center text-bold">+ Administrator</h3>
    //   <div className="container">
    //     <div className="row mt-5">
    //       <div className="col-sm-8 mx-auto">
    //         <div className="card">
    //           <div className="card-body">
    //             {errorMessage}

    //             <form onSubmit={handleSubmit}>
    //               <div className="row">
    //                 <div className="col-sm-6">
    //                   <MDBInput
    //                     value={username}
    //                     label="Ten dang nhap"
    //                     onChange={e => setUsername(e.target.value)}
    //                   />
    //                 </div>
    //                 <div className="col-sm-6">
    //                   <MDBInput
    //                     value={name}
    //                     label="Ten day du"
    //                     onChange={e => setName(e.target.value)}
    //                   />
    //                 </div>
    //                 <div className="col-sm-6">
    //                   <MDBInput
    //                     value={email}
    //                     type="email"
    //                     label="Email"
    //                     onChange={e => setEmail(e.target.value)}
    //                   />
    //                 </div>
    //                 <div className="col-sm-6">
    //                   <MDBInput
    //                     value={password}
    //                     type="password"
    //                     label="Mat khau"
    //                     onChange={e => setPassword(e.target.value)}
    //                   />
    //                 </div>
    //                 <div className="col-12">
    //                   <MDBInput
    //                     type="textarea"
    //                     rows="3"
    //                     value={intro_content}
    //                     label="Nhap thong tin gioi thieu"
    //                     onChange={e => setIntro_content(e.target.value)}
    //                   />
    //                 </div>
    //               </div>
    //               <button
    //                 className="btn btn-success float-right ml-0"
    //                 type="submit"
    //               >
    //                 Lưu
    //               </button>

    //               <div className="clearfix"></div>
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="py-5">
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          + Tạo tài khoản quản trị viên
        </Typography>
        {errorMessage}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                variant="outlined"
                required
                fullWidth
                value={username}
                onChange={e => setUsername(e.target.value)}
                label="Tên đăng nhập"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={name}
                label="tên đầy đủ"
                onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="email"
                label="Email"
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={password}
                type="password"
                label="Mật khẩu"
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                multiline
                fullWidth
                rows="3"
                value={introContent}
                label="Thông tin giới thiệu về bạn..."
                onChange={e => setIntroContent(e.target.value)}
              />
            </Grid> */}
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Lưu
          </Button>
          {/* <Grid container justify="flex-end">
            <Grid item>
              <Link to="login" variant="body2">
                Nếu bạn đã có tài khoản? Vui lòng đăng nhập tại đây
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      
    </Container>
  
</div>
  );
};

export default AddAdmin;
