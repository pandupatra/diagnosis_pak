'use client'

import { StoreContext } from "@/store"
import { Box, Button, Divider, List, ListItem, ListItemButton, ListItemText, ListSubheader } from "@mui/material"
import { observer } from "mobx-react-lite"
import moment from "moment"
import { useRouter } from "next/navigation"
import { useContext } from "react"

const PasienList = ({ handleCreatePasien, nik }) => {
  const store = useContext(StoreContext)
  const router = useRouter()

  const handleClick = (pasien) => {
    store.pasien.setSelected(pasien)
    router.push(`/pasien/${pasien._id}`)
  }

  return (
    <Box>
      <List>
        {store.pasien.items.map((pasien) => (
          <ListItem key={pasien._id} disableGutters>
            <ListItemButton onClick={() => handleClick(pasien)}>
              <ListItemText primary={pasien.nama || "Tanpa nama"} secondary={moment(pasien.created_at).format("DD/MM/YYYY")} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Button sx={{ marginTop: "1rem" }} variant="contained" onClick={() => handleCreatePasien(nik)}>Masukan form baru</Button>
    </Box>
  )
}

export default observer(PasienList)