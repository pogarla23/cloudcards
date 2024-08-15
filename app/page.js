"use client";
import {AppBar, Box, Button, Container, Grid, Toolbar,Typography } from "@mui/material";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Head from 'next/head'
export default function Home() {
  return (
    //container for our websites
    <Container maxWidth={"100%"}>
      <Head>
        <title>Cloud Cards</title> 
        <meta name = "description"  content="create flashcard from your text for studying"></meta>
      </Head>
    
      <AppBar position="static">
        <Toolbar>
          <Typography variant = "h6" style={{flexGrow: 1}}>
            Cloud Cards
          </Typography>
          <SignedOut>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Sign up</Button>
          </SignedOut>

          <SignedIn>
            <UserButton/>
          </SignedIn>

        </Toolbar>
      </AppBar>

      <Box sx={{textAlign: "center", my: 4}}>
        <Typography variant="h2"> Welcome To Cloud Cards</Typography> {' '}
        <Typography variant = "h5"> The easiest way to make flash cards {' '} from a single sentence </Typography>  {' '}
        <Button variant="contained" color="primary"
        sx={{mt: 2}}> Get Started </Button>
      </Box>

    <Box sx={{my: 6}}>
      <Typography variant = "h6" components="h2">Features</Typography>
      <Grid contained spacing = {4}>
        <Grid item xs = {12} md = {4}>
          <Typography variant = "h6">
            Easy Text Input
          </Typography>
          <Typography>
            {' '}
            Simply input your text and let our software do the rest. Creating flashcards has never been easier. 
          </Typography>
        </Grid>
        <Grid item xs = {12} md = {4}>
          <Typography variant = "h6">
            Smart Flash Cards
          </Typography>
          <Typography>
            {' '}
            Our AI intelligently breaks down your text
          </Typography>
        </Grid>
        <Grid item xs = {12} md = {4}>
          <Typography variant = "h6">
            Acessible Anywhere
          </Typography>
          <Typography>
            {' '}
            Simply input your text and let our software do the rest.
          </Typography>
        </Grid>
        <Grid item xs = {12} md = {4}>
          <Typography variant = "h6">
            Easy Text Input
          </Typography>
          <Typography>
            {' '}
            Simply input your text and let our software do the rest.
          </Typography>
        </Grid>
      </Grid>
    </Box>
    </Container>
  );
  //typical sass
}
