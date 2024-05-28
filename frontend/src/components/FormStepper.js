'use client'

import { useCallback, useContext, useEffect, useState } from "react"
import { Stepper, Step, StepContent, StepLabel } from "@mui/material"
import PasienForm from "./forms/PasienForm"
import ChainForm from "./forms/ChainForm"
import axios from "axios"
import NikForm from "./forms/NikForm"
import { questions } from "@/data/questions"
import AnamnesisForm from "./forms/AnamnesisForm"
import InputPajananForm from "./forms/InputPajananForm"
import DiagnosisForm from "./forms/DiagnosisForm"
import PajananForm from "./forms/PajananForm"
import FaktorindividuForm from "./forms/FaktorIndividuForm"
import PajananluarkerjaForm from "./forms/PajananluarkerjaForm"
import Hasildiagnosis from "./forms/Hasildiagnosis"

const API_ENDPOINT = 'http://localhost:3003'

const FormStepper = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [activePasien, setActivePasien] = useState(null)
  const [activeGejala, setActiveGejala] = useState(null)
  const [activeAnamnesis, setActiveAnamnesis] = useState(null)
  const [activeInputpajanan, setActiveInputpajanan] = useState(null)
  const [activeDiagnosis, setActiveDiagnosis] = useState(null)
  const [activePajanan, setActivePajanan] = useState(null)
  const [activeFaktorindividu, setActiveFaktorindividu] = useState(null)
  const [activePajananluarkerja, setActivePajananluarkerja] = useState(null)
  const [activeHasildiagnosis, setActiveHasildiagnosis] = useState(null)


  const onNikSubmit = async (nik) => {
    try {
      const response = await axios.post(`${API_ENDPOINT}/pasien/signin`, nik)
      if (response) {
        setActivePasien(response.data)
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      }
    } catch (error) {
      if (error.response.status == 404) {
        try {
          const response = await axios.post(`${API_ENDPOINT}/pasien/create`, nik);
          console.log('Response:', response.data);
          setActivePasien(response.data)
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
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

  const onChainSubmit = async (values) => {
    const categorizedWeights = {};

    questions.forEach((question, index) => {
      if (values[`question_${index}`] === 'yes') {
        if (!categorizedWeights[question.type]) {
          categorizedWeights[question.type] = 0;
        }
        categorizedWeights[question.type] += question.weight;
        if (question.follow_up) {
          question.follow_up.forEach((fu, fuIndex) => {
            if (values[`question_${index}_follow_up_${fuIndex}`] === 'yes') {
              if (!categorizedWeights[question.type]) {
                categorizedWeights[question.type] = 0;
              }
              categorizedWeights[question.type] += question.follow_up[fuIndex].weight;
            }
          })
        }
      }
    });

    try {
      const response = await axios.post(`${API_ENDPOINT}/gejala/create`, {
        pasien: activePasien._id,
        gejala_tetanus: categorizedWeights.tetanus,
        gejala_tuberkulosis: categorizedWeights.tuberkulosis,
        gejala_hepatitis_a: categorizedWeights.hepatitis_a,
        gejala_hepatitis_c: categorizedWeights.hepatitis_c
      });
      console.log('Response:', response.data);
      setActiveGejala(response.data)
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    alert(`Categorized Weights: ${JSON.stringify(categorizedWeights)}`);
  };

  const onAnamnesisSubmit = useCallback(
    async (anamnesis) => {
      try {
        let endpoint
        if (activeAnamnesis) {
          anamnesis = {
            _id: activeAnamnesis._id,
            ...anamnesis
          }
          endpoint = `${API_ENDPOINT}/anamnesis/update`
        } else {
          endpoint = `${API_ENDPOINT}/anamnesis/create`
        }
        anamnesis = {
          pasien: activePasien._id,
          ...anamnesis
        }
        console.log(anamnesis)
        const response = await axios.post(endpoint, anamnesis);
        console.log('Response:', response.data);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    [activeAnamnesis, activePasien]
  )

  const onInputpajananSubmit = useCallback(
    async (inputpajanan) => {
      try {
        let endpoint
        if (activeInputpajanan) {
          inputpajanan = {
            _id: activeInputpajanan._id,
            ...inputpajanan
          }
          endpoint = `${API_ENDPOINT}/inputpajanan/update`
        } else {
          endpoint = `${API_ENDPOINT}/inputpajanan/create`
        }
        inputpajanan = {
          pasien: activePasien._id,
          ...inputpajanan
        }
        console.log(inputpajanan)
        const response = await axios.post(endpoint, inputpajanan);
        console.log('Response:', response.data);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    [activeInputpajanan, activePasien]
  )

  const onDiagnosisSubmit = useCallback(
    async (diagnosis) => {
      try {
        let endpoint
        if (activeDiagnosis) {
          diagnosis = {
            _id: activeDiagnosis._id,
            ...diagnosis
          }
          endpoint = `${API_ENDPOINT}/diagnosis/update`
        } else {
          endpoint = `${API_ENDPOINT}/diagnosis/create`
        }
        diagnosis = {
          pasien: activePasien._id,
          ...diagnosis
        }
        console.log(diagnosis)
        const response = await axios.post(endpoint, diagnosis);
        console.log('Response:', response.data);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    [activeDiagnosis, activePasien]
  )

  const onFaktorindividuSubmit = useCallback(
    async (faktorindividu) => {
      try {
        let endpoint
        if (activeFaktorindividu) {
          faktorindividu = {
            _id: activeFaktorindividu._id,
            ...faktorindividu
          }
          endpoint = `${API_ENDPOINT}/faktorindividu/update`
        } else {
          endpoint = `${API_ENDPOINT}/faktorindividu/create`
        }
        faktorindividu = {
          pasien: activePasien._id,
          ...faktorindividu
        }
        console.log(faktorindividu)
        const response = await axios.post(endpoint, faktorindividu);
        console.log('Response:', response.data);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    [activeFaktorindividu, activePasien]
  )

  const onPajananSubmit = useCallback(
    async (pajanan) => {
      try {
        let endpoint
        if (activePajanan) {
          pajanan = {
            _id: activePajanan._id,
            ...pajanan
          }
          endpoint = `${API_ENDPOINT}/pajanan/update`
        } else {
          endpoint = `${API_ENDPOINT}/pajanan/create`
        }
        pajanan = {
          pasien: activePasien._id,
          ...pajanan
        }
        console.log(pajanan)
        const response = await axios.post(endpoint, pajanan);
        console.log('Response:', response.data);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    [activePajanan, activePasien]
  )

  const onPajananluarkerjaSubmit = useCallback(
    async (pajananluarkerja) => {
      try {
        let endpoint
        if (activePajananluarkerja) {
          pajananluarkerja = {
            _id: activePajananluarkerja._id,
            ...pajananluarkerja
          }
          endpoint = `${API_ENDPOINT}/pajananluarkerja/update`
        } else {
          endpoint = `${API_ENDPOINT}/pajananluarkerja/create`
        }
        pajananluarkerja = {
          pasien: activePasien._id,
          ...pajananluarkerja
        }
        console.log(pajananluarkerja)
        const response = await axios.post(endpoint, pajananluarkerja);
        console.log('Response:', response.data);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    [activePajananluarkerja, activePasien]
  )

  const onHasildiagnosisSubmit = useCallback(
    async (hasildiagnosis) => {
      try {
        let endpoint
        if (activeHasildiagnosis) {
          hasildiagnosis = {
            _id: activeHasildiagnosis._id,
            ...hasildiagnosis
          }
          endpoint = `${API_ENDPOINT}/hasildiagnosis/update`
        } else {
          endpoint = `${API_ENDPOINT}/hasildiagnosis/create`
        }
        hasildiagnosis = {
          pasien: activePasien._id,
          ...hasildiagnosis
        }
        console.log(hasildiagnosis)
        const response = await axios.post(endpoint, hasildiagnosis);
        console.log('Response:', response.data);
        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    [activeHasildiagnosis, activePasien]
  )

  const fetchData = async (pasienId) => {
    const gejalaPromise = await axios.get(`${API_ENDPOINT}/gejala/${pasienId}`).catch(error => console.log(error))
    const anamnesisPromise = await axios.get(`${API_ENDPOINT}/anamnesis/${pasienId}`).catch(error => console.log(error))
    const inputpajananPromise = await axios.get(`${API_ENDPOINT}/inputpajanan/${pasienId}`).catch(error => console.log(error))
    const diagnosisPromise = await axios.get(`${API_ENDPOINT}/diagnosis/${pasienId}`).catch(error => console.log(error))
    const pajananPromise = await axios.get(`${API_ENDPOINT}/pajanan/${pasienId}`).catch(error => console.log(error))
    const faktorindividuPromise = await axios.get(`${API_ENDPOINT}/faktorindividu/${pasienId}`).catch(error => console.log(error))
    const pajananluarkerjaPromise = await axios.get(`${API_ENDPOINT}/pajananluarkerja/${pasienId}`).catch(error => console.log(error))
    
    await Promise.all([
      gejalaPromise,
      anamnesisPromise,
      inputpajananPromise,
      diagnosisPromise,
      pajananPromise,
      faktorindividuPromise,
      pajananluarkerjaPromise
    ]).then((values) => {
      setActiveGejala(values[0].data)
      setActiveAnamnesis(values[1].data)
      setActiveInputpajanan(values[2].data)
      setActiveDiagnosis(values[3].data)
      setActivePajanan(values[4].data)
      setActiveFaktorindividu(values[5].data)
      setActivePajananluarkerja(values[6].data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    if (activePasien) {
      fetchData(activePasien._id)
    }
  }, [activePasien])

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      <Step>
        <StepLabel>Masukan NIK</StepLabel>
        <StepContent>
          <NikForm onSubmit={onNikSubmit} />
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Data Pasien</StepLabel>
        <StepContent>
          <PasienForm onSubmit={onPasienSubmit} activePasien={activePasien} />
        </StepContent>
      </Step>
      {!activeGejala && (
        <Step>
          <StepLabel>Gejala</StepLabel>
          <StepContent>
            <ChainForm activeGejala={activeGejala} onSubmit={onChainSubmit} />
          </StepContent>
        </Step>
      )}
      <Step>
        <StepLabel>Anamnesis</StepLabel>
        <StepContent>
          <AnamnesisForm activeGejala={activeGejala} activeAnamnesis={activeAnamnesis} onSubmit={onAnamnesisSubmit} />
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Input Pajanan</StepLabel>
        <StepContent>
          <InputPajananForm activeInputpajanan={activeInputpajanan} onSubmit={onInputpajananSubmit} />
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Hubungan anamnesis dan diagnosis klinis</StepLabel>
        <StepContent>
          <DiagnosisForm activeDiagnosis={activeDiagnosis} onSubmit={onDiagnosisSubmit} />
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Pajanan kualitatif & kuantitatif</StepLabel>
        <StepContent>
          <PajananForm activePajanan={activePajanan} onSubmit={onPajananSubmit} />
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Faktor Individu</StepLabel>
        <StepContent>
          <FaktorindividuForm activePasien={activePasien} activeFaktorindividu={activeFaktorindividu} onSubmit={onFaktorindividuSubmit} />
        </StepContent>
      </Step>

      <Step>
        <StepLabel>Pajanan luar tempat kerja</StepLabel>
        <StepContent>
          <PajananluarkerjaForm activePajananluarkerja={activePajananluarkerja} onSubmit={onPajananluarkerjaSubmit} />
        </StepContent>
      </Step>

      <Step>
        <StepLabel>Hasil diagnosis</StepLabel>
        <StepContent>
          <Hasildiagnosis activeHasildiagnosis={activeHasildiagnosis} onSubmit={onHasildiagnosisSubmit} />
        </StepContent>
      </Step>

    </Stepper>
  )
}

export default FormStepper