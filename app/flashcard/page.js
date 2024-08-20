/*
"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDocs, addDoc, deleteDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useSearchParams } from "next/navigation"
import { Box, Card, CardActionArea, CardContent, Container, Grid, Typography, Button, TextField } from "@mui/material"
import Header from "../components/header";
import { Delete } from '@mui/icons-material';
export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState({})
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const searchParams = useSearchParams()
  const search = searchParams.get('id')

  const getFlashcard = async () => {
    if (!search || !user) return
    const colRef = collection(doc(collection(db, 'users'), user.id), search)
    
    const docs = await getDocs(colRef)
    const flashcards = []
    docs.forEach((doc) => {
      flashcards.push({ id: doc.id, ...doc.data() })
    })
    setFlashcards(flashcards)
  }

  useEffect(() => {
    getFlashcard()
  }, [user, search])

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleAddCard = async () => {
    if (front && back && user && search) {
      const colRef = collection(doc(collection(db, 'users'), user.id), search)
      await addDoc(colRef, { front, back })
      setFront('')
      setBack('')
      await getFlashcard()  // Refresh the flashcards list
    }
  }

  const handleDeleteCard = async (id) => {
    if (user && search) {
      const colRef = doc(collection(doc(collection(db, 'users'), user.id), search), id)
      await deleteDoc(colRef)
      await getFlashcard()  // Refresh the flashcards list
    }
  }

  if (!isLoaded || !isSignedIn) {
    return <></>
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#121212', color: 'white' }}>
      <Container maxWidth="100vw">
        <Header page={0} />
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Create Cloudcard
          </Typography>
          <TextField
            label="Front"
            variant="outlined"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            sx={{ mb: 2, width: '100%', bgcolor: '#2e2e2e', borderRadius: '4px' }}
          />
          <TextField
            label="Back"
            variant="outlined"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            sx={{ mb: 2, width: '100%', bgcolor: '#2e2e2e', borderRadius: '4px'}}
          />
          <Button variant="contained" onClick={handleAddCard}>Add</Button>
        </Box>
        {flashcards.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ mb: 4 }}>
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
                    <CardActionArea onClick={() => handleCardClick(index)}>
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
                            backfaceVisibility: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 2,
                            boxSizing: 'border-box',
                            textAlign: 'center',
                          },
                          '& > div > div:nth-of-type(2)': {
                            transform: 'rotateY(180deg)',
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
                    <Button sx={{marginLeft: "256px"}} color="white"onClick={() => handleDeleteCard(flashcard.id)}> <Delete fontSize="large"/></Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  )
}
*/
"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDocs, addDoc, deleteDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useSearchParams } from "next/navigation"
import { Box, Card, CardActionArea, CardContent, Container, Grid, Typography, Button, TextField, IconButton } from "@mui/material"
import Header from "../components/header";
import { Delete } from '@mui/icons-material';

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState({})
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [deckName, setDeckName] = useState('')
  const searchParams = useSearchParams()
  const search = searchParams.get('id')

  const getFlashcard = async () => {
    if (!search || !user) return
    const colRef = collection(doc(collection(db, 'users'), user.id), search)
    
    const docs = await getDocs(colRef)
    const flashcards = []
    docs.forEach((doc) => {
      flashcards.push({ id: doc.id, ...doc.data() })
    })
    setFlashcards(flashcards)

    // Retrieve deck name if it is stored in Firestore
    // Assuming deck name is stored in a separate document or collection
    // Here, replace with the actual retrieval method for your deck name
    // const deckDocRef = doc(db, 'deck', search);
    // const deckDoc = await getDoc(deckDocRef);
    // if (deckDoc.exists()) {
    //   setDeckName(deckDoc.data().name);
    // }
    setDeckName(search);  // Use search as deckName for now
  }

  useEffect(() => {
    getFlashcard()
  }, [user, search])

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleAddCard = async () => {
    if (front && back && user && search) {
      const colRef = collection(doc(collection(db, 'users'), user.id), search)
      await addDoc(colRef, { front, back })
      setFront('')
      setBack('')
      await getFlashcard()  // Refresh the flashcards list
    }
  }

  const handleDeleteCard = async (id) => {
    if (user && search) {
      const colRef = doc(collection(doc(collection(db, 'users'), user.id), search), id)
      await deleteDoc(colRef)
      await getFlashcard()  // Refresh the flashcards list
    }
  }

  if (!isLoaded || !isSignedIn) {
    return <></>
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#121212', color: 'white' }}>
      <Container maxWidth="100vw">
        <Header page={0} />
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add New Flashcard
          </Typography>
          <TextField
            label="Front"
            variant="outlined"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            sx={{ mb: 2, width: '100%', bgcolor: '#2e2e2e', borderRadius: '4px' }}
          />
          <TextField
            label="Back"
            variant="outlined"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            sx={{ mb: 2, width: '100%', bgcolor: '#2e2e2e', borderRadius: '4px'}}
          />
          <Button variant="contained" onClick={handleAddCard}>Add Flashcard</Button>
        </Box>
        {flashcards.length > 0 && (
          <Box sx={{ mt: 10 }}>
            <Typography variant="h5" sx={{ mb: 4 }}>
              {deckName ? `${deckName} Preview` : 'Flashcards Preview'}
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
                    <CardActionArea onClick={() => handleCardClick(index)}>
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
                            backfaceVisibility: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 2,
                            boxSizing: 'border-box',
                            textAlign: 'center',
                          },
                          '& > div > div:nth-of-type(2)': {
                            transform: 'rotateY(180deg)',
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
                    <IconButton sx={{marginLeft: "256px", color: 'white'}} onClick={() => handleDeleteCard(flashcard.id)}> <Delete fontSize="large"/></IconButton>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  )
}
