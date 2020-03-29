import React, { useState } from "react";
import { MDBInput, MDBAlert } from "mdbreact";
import UserService from "../../services/user.service";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";

import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button
} from "@material-ui/core";
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RegisterPage = () => {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [introContent, setIntroContent] = useState("");
  
  const [errorMessage, setErrorMessage] = useState("");


  async function handleSubmit(event) {
    
    event.preventDefault();
    let randomImage="https://avatars.dicebear.com/v2/avataaars/"+username+".svg"+"?options[mood][]=happy&options[mouth][]=smile&options[accessories][]=sunglasses"
   
    let user = {
      name: name,
      username: username,
      password: password,
      introContent: introContent,
      email: email,
      avatar: randomImage
    };
   
    try {
      const res = await UserService.register(user);
      if (res.data.success == true) {
        setErrorMessage(
          <MDBAlert color="success">{res.data.message}</MDBAlert>
        );
        window.setTimeout(() => {
          window.location.href = "/login";
        }, 400);
      }
    } catch (error) {
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



    <div className="signup flex justify-center w-full h-full-screen">
    <div className="p-8">
      <Card className="signup-card position-relative y-center">
        <Grid container>
          <Grid item lg={5} md={5} sm={5} xs={12}>
            <div className="p-8 flex justify-center bg-light-gray items-center h-full">
              <img
                src=""
                alt=""
              />
            </div>
          </Grid>
          <Grid item lg={7} md={7} sm={7} xs={12}>
            <div className="p-9 h-full">
              <form  onSubmit={handleSubmit}>
                {/* <TextValidator
                  className="mb-6 w-full"
                  variant="outlined"
                  label="Tên đăng nhập"
                  onChange={this.handleChange}
                  type="text"
                  name="username"
                  value={username}
                  validators={["required"]}
                  errorMessages={["Tên đăng nhập không hợp lệ"]}
                /> */}
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
                   <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={name}
                  label="tên đầy đủ"
                  onChange={e => setName(e.target.value)}
                />
                {/* <TextValidator
                  className="mb-6 w-full"
                  variant="outlined"
                  label="Email"
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  value={email}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "Bạn chưa điền email",
                    "Email không hợp lệ"
                  ]}
                /> */}

<TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="email"
                  label="Email"
                  onChange={e => setEmail(e.target.value)}
                />
               <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={password}
                  type="password"
                  label="Mật khẩu"
                  onChange={e => setPassword(e.target.value)}
                />
                {/* <FormControlLabel
                  className="mb-4"
                  name="agreement"
                  onChange={this.handleChange}
                  control={<Checkbox />}
                  label="I have read and agree to the terms of service."
                /> */}
                <div className="flex items-center">
                  <Button
                    className="capitalize"
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                   Đăng ký
                  </Button>
                  <span className="mx-2 ml-5">or</span>
                  <Button
                    className="capitalize"
                    onClick={() =>
                      this.props.history.push("/session/signin")
                    }
                  >
                  Đăng nhập
                  </Button>
                </div>
              </form>
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  </div>
    // <div className="py-5">
    //     <Container component="main" maxWidth="xs">
    //       <CssBaseline />
    //       <div className={classes.paper}>
    //         <Avatar className={classes.avatar}>
    //           <LockOutlinedIcon />
    //         </Avatar>
    //         <Typography component="h1" variant="h5">
    //           Đăng kí tài khoản
    //         </Typography>
    //         {errorMessage}
    //         <form className={classes.form} noValidate onSubmit={handleSubmit}>
    //           <Grid container spacing={2}>
    //             <Grid item xs={12} sm={6}>
    //               <TextField
    //                 name="firstName"
    //                 variant="outlined"
    //                 required
    //                 fullWidth
    //                 value={username}
    //                 onChange={e => setUsername(e.target.value)}
    //                 label="Tên đăng nhập"
    //                 autoFocus
    //               />
    //             </Grid>
    //             <Grid item xs={12} sm={6}>
    //               <TextField
    //                 variant="outlined"
    //                 required
    //                 fullWidth
    //                 value={name}
    //                 label="tên đầy đủ"
    //                 onChange={e => setName(e.target.value)}
    //               />
    //             </Grid>
    //             <Grid item xs={12} sm={6}>
    //               <TextField
    //                 variant="outlined"
    //                 required
    //                 fullWidth
    //                 type="email"
    //                 label="Email"
    //                 onChange={e => setEmail(e.target.value)}
    //               />
    //             </Grid>
    //             <Grid item xs={12} sm={6}>
    //               <TextField
    //                 variant="outlined"
    //                 required
    //                 fullWidth
    //                 value={password}
    //                 type="password"
    //                 label="Mật khẩu"
    //                 onChange={e => setPassword(e.target.value)}
    //               />
    //             </Grid>
    //             <Grid item xs={12}>
    //               <TextField
    //                 variant="outlined"
    //                 required
    //                 multiline
    //                 fullWidth
    //                 rows="3"
    //                 value={introContent}
    //                 label="Thông tin giới thiệu về bạn..."
    //                 onChange={e => setIntroContent(e.target.value)}
    //               />
    //             </Grid>
                
    //           </Grid>
    //           <Button
    //             type="submit"
    //             fullWidth
    //             variant="contained"
    //             color="primary"
    //             className={classes.submit}
    //           >
    //             Đăng ký
    //           </Button>
    //           <Grid container justify="flex-end">
    //             <Grid item>
    //               <Link to="login" variant="body2">
    //                 Nếu bạn đã có tài khoản? Vui lòng đăng nhập tại đây
    //               </Link>
    //             </Grid>
    //           </Grid>
    //         </form>
    //       </div>
          
    //     </Container>
      
    // </div>
 
 
 
 
 
 );
};

export default RegisterPage;




