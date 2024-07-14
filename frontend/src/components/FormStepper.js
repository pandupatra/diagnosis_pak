'use client'

import { useCallback, useContext, useEffect, useState } from "react"
import { Stepper, Step, StepContent, StepLabel, Box, StepButton, Typography, Button, Stack, Grid } from "@mui/material"
import { card } from "@/styles/styles"
import PasienForm from "./forms/PasienForm"
import ChainForm from "./forms/ChainForm"
import axios from "axios"
import NikForm from "./forms/NikForm"
import { questions } from "@/data/questions"
import AnamnesisForm from "./forms/AnamnesisForm"
import InputPajananForm from "./forms/InputPajananForm"
import DiagnosisForm from "./forms/DiagnosisForm"
import PajananForm from "./forms/PajananForm"
import FaktorindividuForm from "./forms/FaktorindividuForm"
import PajananluarkerjaForm from "./forms/PajananluarkerjaForm"
import Hasildiagnosis from "./forms/Hasildiagnosis"
import { StoreContext } from "@/store"
import { observer } from "mobx-react-lite"
import useFillStore from "@/hooks/useFillStore"
import Hasil from "./forms/Hasil"
import { useRouter } from "next/navigation"

const API_ENDPOINT = process.env.NEXT_PUBLIC_GATEWAY_URL

const steps = [
  "Data Pasien",
  "Diagnosis Klinis",
  "Input Pajanan",
  "Hubungan anamnesis dan diagnosis klinis",
  "Pajanan kualitatif & kuantitatif",
  "Faktor Individu",
  "Pajanan luar tempat kerja",
  "Hasil diagnosis"
]

const FormStepper = () => {
  const store = useContext(StoreContext)
  const router = useRouter()

  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState({});
  const [showResult, setShowResult] = useState(false)

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);  
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const onPasienSubmit = useCallback(
    async (pasien) => {
      try {
        const response = await store.pasien.update(pasien)
        const { status, data } = await response
        if (status !== 200) {
          return null
        }
        console.log('Response:', data);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    [store.pasien]
  )

  const onAnamnesisSubmit = useCallback(
    async (anamnesis) => {
      try {
        let response
        if (store.anamnesis.selected) {
          anamnesis = {
            _id: store.anamnesis.selected._id,
            ...anamnesis
          }
          response = await store.anamnesis.update(anamnesis)
        } else {
          anamnesis = {
            pasien: store.pasien.selected._id,
            ...anamnesis
          }
          response = await store.anamnesis.create(anamnesis)
        }
        
        const { status, data } = await response
        if (status !== 200) {
          return null
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    [store.anamnesis]
  )

  const onInputpajananSubmit = useCallback(
    async (inputpajanan) => {
      try {
        let response
        if (store.inputpajanan.selected) {
          inputpajanan = {
            _id: store.inputpajanan.selected._id,
            ...inputpajanan
          }
          const { status, data } = await store.inputpajanan.update(inputpajanan)
          if (status !== 200) {
            return null
          }
        } else {
          inputpajanan = {
            pasien: store.pasien.selected._id,
            ...inputpajanan
          }
          const { status, data } = await store.inputpajanan.create(inputpajanan)
          if (status !== 200) {
            return null
          }
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    [store.inputpajanan]
  )

  const onDiagnosisSubmit = useCallback(
    async (diagnosis) => {
      try {
        let response
        if (store.diagnosis.selected) {
          diagnosis = {
            _id: store.diagnosis.selected._id,
            ...diagnosis
          }
          response = await store.diagnosis.update(diagnosis)
        } else {
          diagnosis = {
            pasien: store.pasien.selected._id,
            ...diagnosis
          }
          response = await store.diagnosis.create(diagnosis)
        }
        
        const { status, data } = await response
        if (status !== 200) {
          return null
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    [store.diagnosis]
  )

  const onFaktorindividuSubmit = useCallback(
    async (faktorindividu) => {
      try {
        let response
        if (store.faktorindividu.selected) {
          faktorindividu = {
            _id: store.faktorindividu.selected._id,
            ...faktorindividu
          }
          response = await store.faktorindividu.update(faktorindividu)
        } else {
          faktorindividu = {
            pasien: store.pasien.selected._id,
            ...faktorindividu
          }
          response = await store.faktorindividu.create(faktorindividu)
        }
        
        const { status, data } = await response
        if (status !== 200) {
          return null
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    [store.faktorindividu]
  )

  const onPajananSubmit = useCallback(
    async (pajanan) => {
      try {
        let response
        if (store.pajanan.selected) {
          pajanan = {
            _id: store.pajanan.selected._id,
            ...pajanan
          }
          response = await store.pajanan.update(pajanan)
        } else {
          pajanan = {
            pasien: store.pasien.selected._id,
            ...pajanan
          }
          response = await store.pajanan.create(pajanan)
        }
        
        const { status, data } = await response
        if (status !== 200) {
          return null
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    [store.pajanan]
  )

  const onPajananluarkerjaSubmit = useCallback(
    async (pajananluarkerja) => {
      try {
        let response
        if (store.pajananluarkerja.selected) {
          pajananluarkerja = {
            _id: store.pajananluarkerja.selected._id,
            ...pajananluarkerja
          }
          response = await store.pajananluarkerja.update(pajananluarkerja)
        } else {
          pajananluarkerja = {
            pasien: store.pasien.selected._id,
            ...pajananluarkerja
          }
          response = await store.pajananluarkerja.create(pajananluarkerja)
        }
        
        const { status, data } = await response
        if (status !== 200) {
          return null
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    [store.pajananluarkerja]
  )

  const onHasildiagnosisSubmit = useCallback(
    async (hasildiagnosis) => {
      try {
        let response
        if (store.hasildiagnosis.selected) {
          hasildiagnosis = {
            _id: store.hasildiagnosis.selected._id,
            ...hasildiagnosis
          }
          response = await store.hasildiagnosis.update(hasildiagnosis)
        } else {
          hasildiagnosis = {
            pasien: store.pasien.selected._id,
            ...hasildiagnosis
          }
          response = await store.hasildiagnosis.create(hasildiagnosis)
        }
        
        const { status, data } = await response
        if (status !== 200) {
          return null
        }
        setShowResult(true)
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    [store.hasildiagnosis]
  )

  const printHandler = useCallback(
    async () => {
      try {
        let response = await axios.get(process.env.NEXT_PUBLIC_GATEWAY_URL + '/pdf/download')
      } catch (error) {
        
      }
    },
    [store]
  )

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <PasienForm onSubmit={onPasienSubmit} />
        )
      case 1:
        return (
          <AnamnesisForm onSubmit={onAnamnesisSubmit} />
        )
      case 2:
        return (
          <InputPajananForm onSubmit={onInputpajananSubmit} />
        )
      case 3:
        return (
          <DiagnosisForm onSubmit={onDiagnosisSubmit} />
        )
      case 4:
        return (
          <PajananForm onSubmit={onPajananSubmit} />
        )
      case 5:
        return (
          <FaktorindividuForm onSubmit={onFaktorindividuSubmit} />
        )
      case 6:
        return (
          <PajananluarkerjaForm onSubmit={onPajananluarkerjaSubmit} />
        )
      case 7:
        return (
          <Hasildiagnosis onSubmit={onHasildiagnosisSubmit} setShowResult={setShowResult} />
        )
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box marginBottom={3}>
        <Button variant="contained" onClick={() => router.push('/')}>Keluar</Button>
        {showResult && (
          <>
          <Button variant="contained" sx={{ marginLeft: 2 }} onClick={() => setShowResult(false)}>Kembali ke form</Button>
          <Button variant="contained" sx={{ marginLeft: 2 }} onClick={() => window.open(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/pdf/download?pasienId=${store.pasien.selected._id}`, "_blank")}>Print</Button>
          </>
        )}
      </Box>
      {showResult ?
      <Box className="form-result" sx={{ display: "flex", justifyContent: "center" }}>
        <Box className="max-w-screen-sm w-full">
          <Box sx={card}>
            <Stack spacing={2}>
              <Grid container>
                <Grid item xs={4}><Typography>Kesimpulan: </Typography></Grid>
                <Grid item xs={8}><Typography>{store.hasildiagnosis.selected.kesimpulan}</Typography></Grid>
              </Grid>

              <Grid container>
                <Grid item xs={4}><Typography>Hasil Diagnosis PAK: </Typography></Grid>
                <Grid item xs={8}><Typography>{store.hasildiagnosis.selected.hasil_diagnosis_pak}</Typography></Grid>
              </Grid>

              <Grid container>
                <Grid item xs={4}><Typography>Rekomendasi: </Typography></Grid>
                <Grid item xs={8}><Typography>{store.hasildiagnosis.selected.rekomendasi}</Typography></Grid>
              </Grid>

              <Grid container>
                <Grid item xs={4}><Typography>evaluasi: </Typography></Grid>
                <Grid item xs={8}><Typography>{store.hasildiagnosis.selected.evaluasi}</Typography></Grid>
              </Grid>
            </Stack>
          </Box>
        </Box>
      </Box>
      :
      <Box className="form-stepper">
        <Stepper nonLinear className="mb-8" activeStep={activeStep}>
          {steps.map((step, index) => (
            <Step key={step} completed={completed[index]} disabled={index == 8}>
              <StepButton onClick={handleStep(index)} />
            </Step>
          ))}
        </Stepper>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box className="max-w-screen-sm w-full">
            <Typography textAlign="center" variant="h4" gutterBottom>{steps[activeStep]}</Typography>
            <Box sx={card}>
              {getStepContent(activeStep)}
            </Box>
          </Box>
        </Box>
      </Box>
      }
    </Box>
  )
}

export default observer(FormStepper)