import Button from "@mui/material/Button";
import React from "react";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useNavigate } from 'react-router';
import { useAuthContext } from "../../context/AuthContext";
import { getToken, removeToken } from "../helper";
import styles from "./AppHeader.module.css"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface Props {
    children: React.ReactElement;
}

function HideOnScroll(props: Props) {
    const { children } = props;
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default function AppHeader() {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate("/login", { replace: true });
    };
    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll>
                <AppBar>
                    <Toolbar sx={{
                        '& button': { m: 1 }, 
                        display: { xs: "flex" },
                        flexDirection: "row",
                        justifyContent: "space-between" }}>
                        <Typography variant="h6" component="div">
                            <Button href="/" type="link">
                                <MenuBookIcon sx={{ color: "white" }} fontSize="large" />
                            </Button>
                        </Typography>
                        {getToken() ? (
                            <Typography className={styles.homeNavbar}>
                                <Button variant="contained" className={styles.profile} href="/Profile" type="link">
                                    <AccountCircleIcon sx={{ mr: 0.5 }} />
                                        Profile
                                    </Button>
                                    <Button onClick={handleLogout} variant="contained">
                                        Déconnnexion
                                    </Button>
                                
                        </Typography>
                       
                        

                        ) : (
                            <>
                                <Typography>
                                    <Button variant="contained" href="/login" type="link">
                                        Connexion
                                    </Button>
                                    <Button
                                        href="/signup" type="link" variant="contained"
                                    >
                                        Inscription
                                    </Button>
                                </Typography>
                            </>
                        )}
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </React.Fragment>
    );
}