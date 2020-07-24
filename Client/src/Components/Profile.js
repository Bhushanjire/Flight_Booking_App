import React, { useState, useEffect } from 'react';
import { getUserData } from '../Services/PostLoginApi';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import profileStyle from '../Css-Module/profile.module.scss';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import maleAvatar from '../assets/images/maleAvatar.jpeg';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { updateUser } from '../Services/PostLoginApi';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card: {
        minWidth: 275,
    },
    avatar: {
        width: '100%'
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        cursor: 'pointer'
    },
}));
const Profile = () => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { id } = useParams();
    const [data, setData] = useState(
        {
            firstName: "",
            lastName: "",
            emailId: "",
            mobileNo: "",
            gender: "",
            bookingIds: [],
            photo: ""
        })

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        let postData = {
            userId: id
        }
        getUserData(postData).then((result) => {
            let apiResponce = result.data;
            setData(apiResponce.data)

        }).catch((error) => {
            console.log('Error in get user data', error);
        })


    }
    const selectImage = (event) => {
        console.log('event', event);
        document.getElementById('profileImageId').click();

    }
    const onImageChange = (event) => {
        let url = URL.createObjectURL(event.target.files[0]);
        //  setData({ ...data, photo: url })
        console.log("URL", url);
        getBase64(event.target.files[0], (base64Image) => {
            setData({ ...data, photo: base64Image })
            // console.log('base64Image', base64Image);
        })
    }

    const getBase64 = (file, callback) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            callback(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const onInputChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }
    const submitHandler = (event) => {

        console.log('submitHandler', data);
        let postData = {
            user: {
                firstName: data.firstName,
                lastName: data.lastName,
                emailId: data.emailId,
                mobileNo: data.mobileNo,
                photo: data.photo
            },
            userId: id
        }

        updateUser(postData).then((result) => {
            let apiResponce = result.data;

        }).catch((error) => {
            console.log('Error in update user', error);

        })

        handleClose();
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="sm">
                <div className={classes.root}>

                    <Card className={classes.card}>
                        <CardContent>
                            <Grid container spacing={3}>
                                {/* <Paper className={classes.paper}> */}
                                <Grid item xs={4}> </Grid>
                                <Grid item xs={7}>
                                    <Avatar alt="Remy Sharp" src={data.photo ? data.photo : maleAvatar} className={classes.large} />
                                    {/* <img src="https://homepages.cae.wisc.edu/~ece533/images/fruits.png" className={`rounded-circle ${profileStyle.img}`} alt="Cinque Terre" /> */}
                                    {/* <input type="file" name="profileImage" id="profileImageId" onChange={onImageChange} hidden accept=".jpeg,.png" /> */}
                                </Grid>
                                <Grid item xs={1}><EditIcon className={profileStyle.handCursor} onClick={handleClickOpen} /></Grid>

                                <Grid item xs={3} className={profileStyle.glabel}>First Name :</Grid>
                                <Grid item xs={6}>{data?.firstName}</Grid>
                                <Grid item xs={3}>&nbsp;</Grid>

                                <Grid item xs={3} className={profileStyle.glabel}>Last Name :</Grid>
                                <Grid item xs={6}>{data?.lastName}</Grid>
                                <Grid item xs={3}>&nbsp;</Grid>

                                <Grid item xs={3} className={profileStyle.glabel}>Email ID :</Grid>
                                <Grid item xs={6}>{data?.emailId}</Grid>
                                <Grid item xs={3}>&nbsp;</Grid>

                                <Grid item xs={3} className={profileStyle.glabel}>Mobile No. :</Grid>
                                <Grid item xs={6}>{data?.mobileNo}</Grid>
                                <Grid item xs={3}>&nbsp;</Grid>

                                <Grid item xs={3} className={profileStyle.glabel}>Gender :</Grid>
                                <Grid item xs={6}>{data?.gender}</Grid>
                                <Grid item xs={3}>&nbsp;</Grid>


                                {/* </Paper> */}
                            </Grid>
                        </CardContent>

                    </Card>



                </div>
            </Container>

            <div>
                <form onSubmit={submitHandler}>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Update</DialogTitle>
                        <DialogContent>
                            {/* <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send updates
                            occasionally.
          </DialogContentText> */}

                            <Grid item xs={4}> </Grid>
                            <Grid item xs={7}>
                                <Avatar alt="Remy Sharp" src={data.photo ? data.photo : maleAvatar} className={classes.large} onClick={selectImage} />
                                {/* <img src="https://homepages.cae.wisc.edu/~ece533/images/fruits.png" className={`rounded-circle ${profileStyle.img}`} alt="Cinque Terre" /> */}
                                <input type="file" name="profileImage" id="profileImageId" onChange={onImageChange} hidden accept=".jpeg,.png" />
                            </Grid>
                            <Grid item xs={1}>&nbsp;</Grid>

                            <Grid item md={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    type="text"
                                    fullWidth
                                    value={data.firstName}
                                    onChange={onInputChange}
                                    className={profileStyle.inputWidth}
                                />
                            </Grid>
                            <Grid item md={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    type="text"
                                    fullWidth
                                    value={data.lastName}
                                    onChange={onInputChange}
                                />
                            </Grid>
                            <Grid item md={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="emailId"
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                    value={data.emailId}
                                    onChange={onInputChange}
                                />
                            </Grid>
                            <Grid item md={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="mobileNO"
                                    label="Mobile No."
                                    type="text"
                                    fullWidth
                                    value={data.mobileNo}
                                    onChange={onInputChange}
                                />
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                            <Button type="submit" onClick={submitHandler} color="primary">Update</Button>
                        </DialogActions>
                    </Dialog>
                </form>
            </div>
        </>)
}
export default Profile;