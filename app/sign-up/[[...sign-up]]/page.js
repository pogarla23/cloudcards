"use client"

import { SignIn, SignUp } from "@clerk/nextjs";
import { AppBar, Button, Container, Link, Toolbar, Typography, Box } from "@mui/material";

export default function SignUpPage() {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#121212', color: 'white' }}>
            <AppBar position="static" sx={{ bgcolor: '#2e2e2e' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }} >
                    <Button color="inherit">
                        <Link href="/" underline="none" color="inherit">
                            Cloud Cards
                        </Link>
                    </Button> 
                    </Typography> 

                     
                    <Button color="inherit">
                        <Link href="/sign-in" underline="none" color="inherit">
                            Login
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/sign-up" underline="none" color="inherit">
                            Sign Up
                        </Link>
                    </Button>   
                </Toolbar>
            </AppBar>

            <Container maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ bgcolor: '#2e2e2e', padding: 4, borderRadius: 2 }}
                >
                    
                    <SignUp />
                </Box>
            </Container>
        </Box>
    );
}
