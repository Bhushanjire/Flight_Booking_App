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
    }
}));
const Profile = () => {
    const classes = useStyles();
    const { id } = useParams();
    const [data, setData] = useState(
        {
            firstName: "",
            lastName: "",
            emailId: "",
            mobileNo: "",
            gender: "",
            bookingIds: []
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
                                <Grid item xs={4}> 
                                    <img src="https://homepages.cae.wisc.edu/~ece533/images/fruits.png" className={`rounded-circle ${profileStyle.img}`} alt="Cinque Terre" />
                                </Grid>
                                <Grid item xs={4}> </Grid>

                                <Grid item xs={3} className={profileStyle.glabel}>First Name :</Grid>
                                <Grid item xs={6}>{data?.firstName}</Grid>
                                <Grid item xs={3}>&nbsp;</Grid>

                                <Grid item xs={3} className={profileStyle.glabel}>Last Name :</Grid>
                                <Grid item xs={6}>{data?.lastName}</Grid>
                                <Grid item xs={3}>&nbsp;</Grid>

                                <Grid item xs={3} className={profileStyle.glabel}>Email ID :</Grid>
                                <Grid item xs={6}>{data?.emailId}</Grid>
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
        </>)
}
export default Profile;