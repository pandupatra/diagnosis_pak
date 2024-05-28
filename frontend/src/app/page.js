'use client'

import axios from 'axios';
import FormStepper from "@/components/FormStepper";
import { PasienContext } from '@/context/PasienContext';
import { useContext } from 'react';
import SignIn from '@/components/SignIn';

export default function Home() {
  const {activePasien, setActivePasien} = useContext(PasienContext)
  const value = { activePasien, setActivePasien }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-screen-sm w-full">
        <PasienContext.Provider value={value}>
          <FormStepper />
        </PasienContext.Provider>
      </div>
    </main>
  );
}
