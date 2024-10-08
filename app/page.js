"use client";

import { AppBar, Box, Button, Container, Grid, Divider, Toolbar, Typography } from "@mui/material";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Head from 'next/head';
import FAQ from './components/faq';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();

  const HandleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: "POST",
      headers: {
        // origin: 'http://localhost:3000'
        'Content-Type': 'application/json',
      }    
    });

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();

    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id
    });

    if (error) {
      console.warn(error.message);
    }
  };
  

  return (
    <Container maxWidth="100%" sx={{ bgcolor: "#121212", color: "#E0E0E0", minHeight: "100vh", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Head>
        <title>Cloud Cards</title>
        <meta name="description" content="Create flashcards from your text for studying"></meta>
      </Head>

      <AppBar position="static" sx={{ bgcolor: "#1F1F1F" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Cloud Cards
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">
              Login
            </Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: "center", my: 6 }}>
        <Typography variant="h2" gutterBottom fontWeight="bold">Welcome to Cloud Cards</Typography>
        <Typography variant="h5" gutterBottom>The easiest way to make flashcards from a single prompt</Typography>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: "#6D6D6D", // Neutral grey color
            color: "#fff",
            '&:hover': {
              bgcolor: "#4A4A4A", // Darker grey for hover
            },
            borderRadius: 2,
            boxShadow: 'none',
            textTransform: 'none',
            px: 4,
            py: 1.5
          }}
          href={isSignedIn ? "/generate" : "/sign-up"}
        >
          {isSignedIn ? "Start Generating" : "Get Started"}
        </Button>
      </Box>

      <Box sx={{ my: 8 }}>
        <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">Features</Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, bgcolor: "#1F1F1F", borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold">Easy Text Input</Typography>
              <Typography>Create flashcards easily by simply inputting your text. Let our software do the rest!</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, bgcolor: "#1F1F1F", borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold">Smart Flashcards</Typography>
              <Typography>Our AI intelligently breaks down your text into concise, study-friendly flashcards.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, bgcolor: "#1F1F1F", borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold">Accessible Anywhere</Typography>
              <Typography>Access your flashcards from any device, anytime. Study on the go!</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">Pricing</Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 4, bgcolor: "#1F1F1F", borderRadius: 2, border: '1px solid #333' }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">Basic</Typography>
              <Typography variant="h6" gutterBottom>$0</Typography>
              <Typography>Access basic flashcard features with general storage.</Typography>
              <Button
                variant="outlined"
                sx={{
                  mt: 2,
                  borderColor: "#6D6D6D",
                  color: "#6D6D6D",
                  '&:hover': {
                    borderColor: "#4A4A4A",
                    color: "#4A4A4A",
                  },
                  borderRadius: 2,
                  textTransform: 'none'
                }}
                href="/sign-up"
              >
                Sign Up for Free
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ p: 4, bgcolor: "#1F1F1F", borderRadius: 2, border: '1px solid #333' }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">Pro</Typography>
              <Typography variant="h6" gutterBottom>$5/month</Typography>
              <Typography>Access advanced features with limited storage.</Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: "#6D6D6D",
                  color: "#fff",
                  '&:hover': {
                    bgcolor: "#4A4A4A",
                  },
                  borderRadius: 2,
                  boxShadow: 'none',
                  textTransform: 'none',
                  px: 4,
                  py: 1.5
                }}
                onClick={HandleSubmit}
              >
                Choose Pro
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={4} gutterBottom marginBottom={"100px"}>
            <Box sx={{ p: 4, bgcolor: "#1F1F1F", borderRadius: 2, border: '1px solid #333' }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">Enterprise</Typography>
              <Typography variant="h6" gutterBottom>Tailored for Teams</Typography>
              <Typography>Access unlimited features and storage, with personalized flashcards.</Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: "#6D6D6D",
                  color: "#fff",
                  '&:hover': {
                    bgcolor: "#4A4A4A",
                  },
                  borderRadius: 2,
                  boxShadow: 'none',
                  textTransform: 'none',
                  px: 4,
                  py: 1.5
                }}
                href="mailto: pgarlapati17@gmail.com"
              >
                Contact Sales
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Q&A Section */}
        <FAQ />
      </Box>

      <Divider sx={{ my: 4, bgcolor: "#333" }} />

      <Box sx={{ textAlign: 'center', mb: 4, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1" color="#E0E0E0">
          <strong>@CloudCards</strong>
        </Typography>
        <Typography variant="body2" color="#E0E0E0">
          <a href="https://github.com/pogarla23" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#E0E0E0' }}>
            <GitHubIcon />
          </a>
        </Typography>
      </Box>

    </Container>
  );
}
