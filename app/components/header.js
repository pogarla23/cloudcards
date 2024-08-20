"use client";

import * as React from 'react';
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';

// Accept 'page' prop to determine which link to show
export default function Header({ page }) {
  return (
    <AppBar position="static" sx={{ bgcolor: "#2C2C2C", boxShadow: "none", borderBottom: "1px solid #444" }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" passHref>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color: "#E0E0E0", textDecoration: 'none' }}>
            <HomeIcon sx={{ fontSize: 30 }} />
          </Typography>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {page === 0 && (
            <Link href="/flashcards" passHref>
              <Button color="inherit" sx={{ borderRadius: 4, textTransform: 'none', px: 2 }}>
                <DashboardIcon sx={{ mr: 1 }} /> Dashboard
              </Button>
            </Link>
          )}
          {page === 1 && (
            <Link href="/generate" passHref>
              <Button color="inherit" sx={{ borderRadius: 4, textTransform: 'none', px: 2 }}>
                <AddBoxIcon sx={{ mr: 1, fontSize: "30px" }} /> Generate
              </Button>
            </Link>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
