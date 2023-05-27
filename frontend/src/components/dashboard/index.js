import React from "react";
import { Container, Grid, Button,ButtonGroup } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
 
const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});
const style2 = {
    p: 2,
    margin: 'auto',
    maxWidth: 500,
    flexGrow: 1,
    backgroundColor: (theme) =>
        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
}

const Index = () => {
    const navigate = useNavigate();
    let localData = JSON.parse(localStorage.getItem('userData'))
    const logOutHandler = ()=>{
        localStorage.removeItem('userData')
        navigate("/");
    }
    return (
        <Container maxWidth="md" sx={{ mt: 3 }}>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6} lg={10} md={10}>
                </Grid>
                <Grid item xs={6} lg={2} md={2}>
                    <ButtonGroup variant="contained" aria-label="text button group">
                        <Button type="button" onClick={() => { logOutHandler() }} color="error">Logout</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Container>
    );
}

                export default Index;



