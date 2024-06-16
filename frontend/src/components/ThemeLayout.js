'use client'

import { ThemeProvider, CssBaseline, Container } from "@mui/material"
import { InjectStoreContext } from "@/store"
import theme from '@/styles/theme';
import Hero from "./Hero";

export default function ThemeLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <InjectStoreContext>
        <CssBaseline />
        <Hero title="PENEGAKAN DIAGNOSIS PENYAKIT AKIBAT KERJA HAZARD BIOLOGI" />
        <Container>
          {children}
        </Container>
      </InjectStoreContext>
    </ThemeProvider>
  )
}