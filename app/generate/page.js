"use client"

import { Box, Stack, Container, Typography, Paper, TextField, Button, Grid, Card, CardActionArea, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, Modal,DialogActions,Alert, Snackbar} from "@mui/material";



import { useUser } from '@clerk/nextjs';
import { getDoc, doc, collection, writeBatch } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { db } from "@/firebase";
import Header from "../components/header";
import Loading from '../components/loading';


export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState({});
    const [text, setText] = useState('');
    const [topic, setName] = useState('');
    const [open, setOpen] = useState(false);
    const [openModule, setModule] = useState(false);
    const handleModuleO = () => setModule(true);
    const handleModuleC = () => setModule(false);
    const [loading, setLoading] = useState(false);
    const [showSaveButton, setShowSaveButton] = useState(false);
    const [showClearButton, setClearButton] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
    const router = useRouter();

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
      };
 
    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                body: text,
            });

            if (!response.ok) {
                throw new Error('Failed to generate flashcards');
            }

            const data = await response.json();
            setFlashcards(data);
        
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while generating flashcards.');
        }finally{
            setLoading(false);
            setShowSaveButton(true);
            setClearButton(true);
        }
    }

   
    /*
    fetch('api/generate', {
        method: 'POST',
        body: text,
        })
        .then((res) => res.json())
        .then((data) => {
        setFlashcards(data)  
    })
         
    */
    const handleClear = () => {
        setFlashcards([]);
        setShowSaveButton(false);
        setClearButton(false);
    };

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const saveFlashcards = async () => {
        if (!topic.trim()) {
            alert('Please enter a name');
            return;
        }

        const batch = writeBatch(db);
        const userDocRef = doc(collection(db, 'users'), user.id);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || [];

            if (collections.find((f) => f.name === topic)) {
                alert("Flashcard collection with the same name already exists.");
                return;
            } else {
                collections.push({ name: topic });
                batch.set(userDocRef, { flashcards: collections }, { merge: true });
            }
        } else {
            batch.set(userDocRef, { flashcards: [{ name: topic }] });
        }

        const colref = collection(userDocRef, topic);
        flashcards.forEach((flashcard) => {
            const cardDocref = doc(colref);
            batch.set(cardDocref, flashcard);
        });

        setSnackbarMessage('Card stack was successfully saved!');
        setSnackbarOpen(true);
        await batch.commit();
        handleClose();
      
    }


    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#121212', color: 'white' }}>
          {loading && <Loading />}
          <Container maxWidth="md">
            <Header page={0} />
            <Box sx={{ mt: 4, mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              
              <Modal
                open={openModule}
                onClose={handleModuleC}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                
              >
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: '#2e2e2e',
                  borderRadius: 2,
                  boxShadow: 24,
                  p: 4,
                  color: 'white',
                }}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Instructions
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Type in a response (be specific), Click "Generate Flashcards"
                  </Typography>
                </Box>
              </Modal>
    
              <Paper sx={{
                p: 4,
                width: "100%",
                bgcolor: '#1f1f1f',
                color: 'white',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
              }}>
                <Box display={'flex'} marginRight={"10px"}>
                    <Button
                    onClick={handleModuleO}
                    sx={{
                    bgcolor: '#1f1f1f',
                    color: 'white',
                    '&:hover': {
                        bgcolor: '#333',
                    },
                    }}
                >
                    <Typography variant="h6">New Deck</Typography>
                    </Button>
                </Box>
                <TextField
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  label='Enter text'
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  sx={{
                    mb: 2,
                    bgcolor: '#333',
                    borderRadius: 1,
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#555',
                    },
                  }}
                />
                <Stack direction="row" spacing={2}>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleSubmit}
                    sx={{ flex: 1, bgcolor: '#4a90e2' }} // Stylish blue for "Generate"
                  >
                    Generate
                  </Button>
                  {showSaveButton && (
                    <Button
                      variant='contained'
                      color='secondary'
                      onClick={handleOpen}
                      sx={{ flexShrink: 0, bgcolor: '#7e57c2' }} // Stylish purple for "Save"
                    >
                      Save
                    </Button>
                  )}
                  {/* <Alert variant="outlined" severity="success">
  This is an outlined success Alert.
</Alert>*/}
                  {showClearButton && (
                    <Button
                      variant='contained'
                      color='error'
                      onClick={handleClear}
                      sx={{ flexShrink: 0, bgcolor: '#e57373' }} // Stylish red for "Clear"
                    >
                      Clear
                    </Button>
                  )}
                </Stack>
              </Paper>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                {snackbarMessage}
                </Alert>
            </Snackbar>


            {flashcards.length > 0 &&
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5">
                  Flashcards Preview
                </Typography>
                <Grid container spacing={3}>
                  {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index} mb={4}>
                      <Card sx={{
                        bgcolor: '#2e2e2e',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          transition: 'all 0.3s ease-in-out',
                        },
                      }}>
                        <CardActionArea onClick={() => {
                          handleCardClick(index)
                        }}>
                          <CardContent>
                            <Box sx={{
                              perspective: '1000px',
                              '& > div': {
                                transition: 'transform 0.6s',
                                transformStyle: 'preserve-3d',
                                position: 'relative',
                                width: '100%',
                                height: '200px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                              },
                              '& > div > div': {
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backfaceVisibility: "hidden",
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 2,
                                boxSizing: 'border-box',
                                textAlign: 'center',
                              },
                              '& > div > div:nth-of-type(2)': {
                                transform: 'rotateY(180deg)'
                              },
                            }}>
                              <div>
                                <div>
                                  <Typography variant='h5' component="div" sx={{
                                    fontSize: 'clamp(0.8rem, 2.5vw, 1.5rem)',
                                    lineHeight: '1.2',
                                    wordWrap: 'break-word',
                                    overflowWrap: 'break-word'
                                  }}>
                                    {flashcard.front}
                                  </Typography>
                                </div>
                                <div>
                                  <Typography variant='h5' component="div" sx={{
                                    fontSize: 'clamp(0.8rem, 2.5vw, 1.5rem)',
                                    lineHeight: '1.2',
                                    wordWrap: 'break-word',
                                    overflowWrap: 'break-word'
                                  }}>
                                    {flashcard.back}
                                  </Typography>
                                </div>
                              </div>
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            }
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle color={'white'} bgcolor={'#1f1f1f'}>New Cloud Deck</DialogTitle>
              <DialogContent sx={{bgcolor: '#1f1f1f',
                    
                    '& .MuiInputBase-input': {
                    color: 'white',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#555',
                    },}}>
                {isSignedIn && (
                  <>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Set Name"
                      type="text"
                      fullWidth
                      value={topic}
                      onChange={(e) => setName(e.target.value)}
                      variant="outlined"
                      sx={{
                        bgcolor: '#333',
                        borderRadius: 1,
                        '& .MuiInputBase-input': {
                        color: 'white',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#555',
                        },
                      }}
                    />
                  </>
                )}
              </DialogContent>
              <DialogActions  sx={{ bgcolor: '#1f1f1f' }}>
                <Button onClick={handleClose}>Cancel</Button>
                {isSignedIn && (
                  <Button onClick={saveFlashcards} color="primary">
                    Save
                  </Button>
                )}
              </DialogActions>
            </Dialog>
          </Container>
        </Box>
      );
}