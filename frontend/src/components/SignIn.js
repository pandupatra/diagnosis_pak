'use client'

import { Box, Button, Typography } from "@mui/material"
import { useContext } from "react"
import { useRouter } from "next/navigation"
import { StoreContext } from "@/store"
import NikForm from "./forms/NikForm"
import { observer } from "mobx-react-lite"

const initialValues = {
  nik: ""
}

const Signin = () => {
  const router = useRouter()
  const store = useContext(StoreContext)

  const _onSubmit = async (nik) => {
    console.log(nik)
    try {
      const { status, data } = await store.pasien.signin(nik)
      if (status == 200) {
        router.push(`/pasien/${data._id}`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box width="100%">
      <Typography textAlign="center" variant="h3" gutterBottom>Login</Typography>
      <NikForm onSubmit={_onSubmit} />
    </Box>
  )
}

export default observer(Signin)