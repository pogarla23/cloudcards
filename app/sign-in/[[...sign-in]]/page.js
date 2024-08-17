import { SignIn } from "@clerk/nextjs";
import { AppBar, Button, Container, Link, Toolbar, Typography, Box } from "@mui/material";

export default function SignInPage() {
    return (
        <Container maxWidth = "100vw" >
            <AppBar
                position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{flexGrow: 1}}>
                        Cloud Cards
                    </Typography>  
                    <Button color="inherit">
                        <Link href="/sign-in" passhref>
                            Login
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/sign-up" passhref>
                            Sign Up
                        </Link>
                    </Button>   
                </Toolbar>
            </AppBar>

            <Box
                display= "flex"
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Typography variant= "h4">
                    Sign In
                </Typography>
                <SignIn/>


            </Box>



        </Container>


    );
}