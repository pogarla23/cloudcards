"use client"
import * as React from 'react';
import { Box, Container, Typography, Grid, Paper, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Cloud Cards?",
      answer: "Cloud Cards is the easiest way to make flashcards from a single prompt."
    },
    {
      question: "How do I create flashcards?",
      answer: "Simply input your text and our AI will break it down into concise, study-friendly flashcards."
    },
    {
        question: "How does Cloud Cards generate flashcards?",
        answer: "Our AI analyzes the content you provide, identifying key concepts and terms to create effective flashcards that enhance your learning experience."
    },
    {
      question: "Can I access my flashcards on any device?",
      answer: "Yes, you can access your flashcards from any device, anytime."
    },
  ];

  return (
    <Container maxWidth="md" sx={{ my: 8 }}>
      <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">Frequently Asked Questions</Typography>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {faqs.map((faq, index) => (
          <Grid item xs={12} key={index}>
            <Paper elevation={3} sx={{ p: 3, bgcolor: "#1F1F1F", color: "#E0E0E0", borderRadius: 2 }}>
              <Box onClick={() => handleToggle(index)} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight="bold">{faq.question}</Typography>
                <IconButton>
                  <ExpandMoreIcon sx={{ transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s', color:"white" }} />
                </IconButton>
              </Box>
              <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">{faq.answer}</Typography>
                </Box>
              </Collapse>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

