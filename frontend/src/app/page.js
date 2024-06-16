'use client'

import { Container } from '@mui/material';

import SignIn from '@/components/SignIn';

export default function Home() {
  return (
    <main>
      <div className="w-full flex flex-col items-center justify-between p-24">
        <SignIn />
      </div>
    </main>
  );
}
