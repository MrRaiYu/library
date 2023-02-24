import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { Book, Send } from '@mui/icons-material';
import "./createBook.css"
import { useNavigate } from "react-router-dom";
import { useDropzone } from 'react-dropzone';
import { InputLabel, OutlinedInput } from '@mui/material';



const theme = createTheme();

export default function CreateBooks() {


    const [file, setFile] = useState<any>();
    const handleInputChange = (event: any) => {
        setFile(event.target.files[0]);
    };



    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [error, setError] = useState<any>();
    const [imageId, setImageId] = useState("");
    const navigate = useNavigate();

    const book_cover = async () => {
        let formData = new FormData();
        formData.append("files", file);
        axios({
            method: "post",
            url: `${import.meta.env.VITE_API_URL}/upload`,
            data: formData,
        }).then(({ data }) => {
            console.log(data);
        });
    };
    const createBook = () => {
        axios.post(`${import.meta.env.VITE_API_URL}/livres`, {
            data: {
                title: title,
                author: author,
                // book_cover: imageId
            }
        })
            .then(({ data }) => {
                navigate("/");
            })
            .catch((error) => {
                setError(error.response.data);
            });

    }



    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <Book />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Ajout d'un livre
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="title"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Titre"
                                    autoFocus
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="author"
                                    label="Auteur(s)"
                                    name="author"
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <InputLabel>Tag</InputLabel>
                                <select
                                id="tag"
                                multiple
                                onChange= { handleInputChange }
                                renderValue={(book) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>

                                    </Box>
                                )}
                                />
                            </Grid> */}
                            {/* <Grid item xs={12} className="upload">
                                <TextField
                                    required
                                    fullWidth
                                    name="book_cover"
                                    type="file"
                                    id="bookcover"
                                    onChange={(e) => setImageId(e.target.value)}
                                    onInput={handleInputChange}
                                />
                            </Grid> */}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={(e) => {
                                e.preventDefault();
                                createBook();
                                // book_cover();
                            }}

                        >
                            Ajouter
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}