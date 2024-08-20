/*
"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import { Card, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material";
import Header from "../components/header";

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, 'users'), user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        console.log(collections);
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    getFlashcards();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  return (
    <Container maxWidth="md">
      <Header page={1} />
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                <CardContent>
                  <Typography variant="h6">
                    {flashcard.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

*/

"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, updateDoc, arrayRemove, arrayUnion, deleteDoc, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import { Box, Card, CardActionArea, CardContent, Container, Grid, IconButton,Typography } from "@mui/material";
import { Delete } from '@mui/icons-material';
import Header from "../components/header";

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, 'users'), user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await updateDoc(docRef, { flashcards: [] });
      }
    }
    getFlashcards();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  

  // Handle removing a single flashcard document (deck)
  const handleDeleteDeck = async (deckName) => {
    if (!user) return;
    const docRef = doc(collection(db, 'users'), user.id);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const flashcards = docSnap.data().flashcards || [];
      const deckToDelete = flashcards.find(deck => deck.name === deckName);

      if (deckToDelete) {
        await updateDoc(docRef, {
          flashcards: arrayRemove(deckToDelete)
        });

        setFlashcards(prevFlashcards => prevFlashcards.filter(deck => deck.name !== deckName));
      }
    }
  };

  
  
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#121212', color: 'white' }}>
    <Container maxWidth="md">
      <Header page={1} />
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{
              bgcolor: '#2e2e2e',
              color: 'white',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              position: 'relative',
            }}>
              <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                <CardContent>
                  <Typography variant="h6">
                    {flashcard.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
                
              
                <IconButton onClick={() => handleDeleteDeck(flashcard.name)}  sx={{ color: 'white' }}>
                  <Delete />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      

      
    </Container>
    </Box>
  );
}
