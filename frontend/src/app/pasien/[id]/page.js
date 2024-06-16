"use client"

import FormStepper from "@/components/FormStepper"
import useFillStore from "@/hooks/useFillStore"
import { StoreContext } from "@/store"
import { useParams, useRouter } from "next/navigation"
import { useContext, useEffect } from "react"

async function fetchData(store, pasienId) {
  return await Promise.all([
    store.anamnesis.fetch(pasienId)
  ])
}

export default function Pasien() {
  const store = useContext(StoreContext)
  const { id } = useParams()
  const router = useRouter()

  if (!store.pasien.selected._id) {
    router.push('/')
  }

  useEffect(() => {
    fetchData(store, id)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full">
        <FormStepper />
      </div>
    </main>
  )
}