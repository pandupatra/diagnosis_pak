'use client'

import { Container } from '@mui/material';

import SignIn from '@/components/SignIn';
import { useContext, useEffect } from 'react';
import Store from '@/store/Store';
import { StoreContext } from '@/store';

export default function Home() {
  const store = useContext(StoreContext)

  useEffect(() => {
    store.anamnesis.setSelected({})
  }, [])

  return (
    <main>
      <div className="w-full flex flex-col items-center justify-between p-24">
        <SignIn />
      </div>
    </main>
  );
}
