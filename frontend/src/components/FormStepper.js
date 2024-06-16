'use client'

import { useCallback, useContext, useEffect, useState } from "react"
import { Stepper, Step, StepContent, StepLabel, Box, StepButton, Typography } from "@mui/material"
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

const API_ENDPOINT = process.env.NEXT_PUBLIC_GATEWAY_URL

const steps = [
  "Data Pasien",
  "Anamnesis",
  "Input Pajanan",
  "Hubungan anamnesis dan diagnosis klinis",
  "Pajanan kualitatif & kuantitatif",
  "Faktor Individu",
  "Pajanan luar tempat kerja",
  "Hasil diagnosis",
]

const FormStepper = () => {
  const store = useContext(StoreContext)

  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState({});

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

  const onNikSubmit = async (nik) => {
    try {
      const { status, data } = await store.pasien.signin(nik)
      if (status == 200) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } catch (error) {
      if (error.response.status == 404) {
        try {
          // const response = await axios.post(`${API_ENDPOINT}/pasien/create`, nik);
          const { status, data } = await store.pasien.signin(nik)
          if (status == 200) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      }
      console.error({ errors: error.message })
    }
  }

  const onPasienSubmit = async (pasien) => {
    try {
      const response = await axios.post(`${API_ENDPOINT}/pasien/update`, pasien);
      console.log('Response:', response.data);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

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
          response = await store.inputpajanan.update(inputpajanan)
        } else {
          inputpajanan = {
            pasien: store.pasien.selected._id,
            ...inputpajanan
          }
          response = await store.inputpajanan.create(inputpajanan)
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
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    [store.hasildiagnosis]
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
          <Hasildiagnosis onSubmit={onHasildiagnosisSubmit} />
        )
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear className="mb-8" activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step} completed={completed[index]}>
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
  )
}

export default observer(FormStepper)