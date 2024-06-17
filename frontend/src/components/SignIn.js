'use client'

import { Box, Button, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { StoreContext } from "@/store"
import NikForm from "./forms/NikForm"
import { observer } from "mobx-react-lite"
import PasienList from "./PasienList"

const Signin = () => {
  const router = useRouter()
  const store = useContext(StoreContext)
  const [showPasienList, setShowPasienList] = useState(false)
  const [nik, setNik] = useState('')
  
  const createPasien = async (nik) => {
    const { status, data } = await store.pasien.create(nik)
    if (status == 200) {
      router.push(`/pasien/${data._id}`)
    }
  }

  const _onSubmit = async (nik) => {
    setNik(nik)
    try {
      const { status, data } = await store.pasien.signin(nik)
      
      if (status == 200) {
        setShowPasienList(true)
        // router.push(`/pasien/${data._id}`)
      } else if (status == 404) {
        createPasien(nik)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box width="100%">
      <Typography textAlign="center" variant="h3" gutterBottom>Login</Typography>
      {showPasienList ?
      <PasienList handleCreatePasien={createPasien} nik={nik} />
      :
      <NikForm onSubmit={_onSubmit} />
      }
    </Box>
  )
}

export default observer(Signin)