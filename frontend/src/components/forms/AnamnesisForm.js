import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Divider } from '@mui/material';
import { useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import ChainForm from './ChainForm';
import { questions } from '@/data/questions';
import { StoreContext } from '@/store';
import { observer } from 'mobx-react-lite';

const initValues = (anamnesis) => {
  return {
    pemeriksaan_fisik: anamnesis?.pemeriksaan_fisik || '',
    tingkat_pernapasan: anamnesis?.tingkat_pernapasan || '',
    abdomen: anamnesis?.abdomen || '',
    tekanan_darah: anamnesis?.tekanan_darah || '',
    pemeriksaan_penunjang: anamnesis?.pemeriksaan_penunjang || ''
  }
}

const AnamnesisForm = ({ onSubmit }) => {
  // const [isGejalaSubmitted, setIsGejalaSubmitted] = useState()
  const store = useContext(StoreContext)

  const onChainSubmit = async (values) => {

    const questionData = [];
    const categorizedGejala = {};
    const categorizedWeights = {};

    questions.forEach((question, index) => {
      questionData.push({question: question.question, answer: values[`question_${index}`]})
      if (values[`question_${index}`] === 'yes') {
        // If question used on more than one type
        if (Array.isArray(question.type)) {
          question.type.forEach((type, tIndex) => {
            if (!categorizedWeights[type]) {
              categorizedWeights[type] = 0
            }
            categorizedWeights[type] += question.weight[tIndex]

            if (!categorizedGejala[type]) {
              categorizedGejala[type] = []
            }
            categorizedGejala[type].push(question.symptom)
          })
        } else {
          if (!categorizedWeights[question.type]) {
            categorizedWeights[question.type] = 0;
          }
          categorizedWeights[question.type] += question.weight;
  
          if (!categorizedGejala[question.type]) {
            categorizedGejala[question.type] = []
          }
          categorizedGejala[question.type].push(question.symptom)
        }
        

        if (question.follow_up) {
          question.follow_up.forEach((fu, fuIndex) => {
            questionData.push({question: fu.question, answer: values[`question_${index}`]})
            if (values[`question_${index}_follow_up_${fuIndex}`] === 'yes') {
              if (Array.isArray(fu.type)) {
                fu.type.forEach((type, tIndex) => {
                  if (!categorizedWeights[type]) {
                    categorizedWeights[type] = 0
                  }
                  categorizedWeights[type] += question.follow_up[fuIndex].weight[tIndex]

                  if (!categorizedGejala[type]) {
                    categorizedGejala[type] = []
                  }
                  categorizedGejala[type].push(question.follow_up[fuIndex].symptom);
                })
              } else {
                if (!categorizedWeights[fu.type]) {
                  categorizedWeights[fu.type] = 0;
                }
                categorizedWeights[fu.type] += question.follow_up[fuIndex].weight;
  
                if (!categorizedGejala[fu.type]) {
                  categorizedGejala[fu.type] = []
                }
                categorizedGejala[fu.type].push(question.follow_up[fuIndex].symptom);
              }
              
            }
          })
        }
      }
    });

    try {
      let anamnesis = {
        pasien: store.pasien.selected._id,
        questionData: questionData,
        gejala_tetanus: {
          symptom: categorizedGejala.tetanus,
          weight: categorizedWeights.tetanus,
        },
        gejala_tuberkulosis: {
          symptom: categorizedGejala.tuberkulosis,
          weight: categorizedWeights.tuberkulosis,
        },
        gejala_hepatitis: {
          symptom: categorizedGejala.hepatitis,
          weight: categorizedWeights.hepatitis,
        },
        gejalaSubmitted: true
      }
      const { status, data } = await store.anamnesis.create(anamnesis)
      if (status !== 200) {
        return null
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const initialValues = useMemo(
    () => initValues(store.anamnesis.selected),
    [store.anamnesis]
  )

  const symptomWithMaxWeight = useMemo(
    () => {
      let labelGejala;
      let objectWithMaxWeight;
      let maxWeight = Math.max(store.anamnesis.selected?.gejala_tuberkulosis?.weight, store.anamnesis.selected?.gejala_hepatitis?.weight, store.anamnesis.selected?.gejala_tetanus?.weight);
      if (maxWeight === store.anamnesis.selected?.gejala_tuberkulosis?.weight) {
        objectWithMaxWeight = store.anamnesis.selected?.gejala_tuberkulosis;
        labelGejala = "tuberkulosis"
      } else if (maxWeight === store.anamnesis.selected?.gejala_tetanus?.weight) {
        objectWithMaxWeight = store.anamnesis.selected?.gejala_tetanus;
        labelGejala = "tetanus"
      } else {
        objectWithMaxWeight = store.anamnesis.selected?.gejala_hepatitis;
        labelGejala = "hepatitis"
      }
      return { labelGejala, ...objectWithMaxWeight }
    },
    [store.anamnesis.selected]
  )

  return (
    <>
    {store.anamnesis.selected.questionData ?
    <>
    {symptomWithMaxWeight && (
      <div className='mb-8'>
        <div className='mb-2'>
          <label htmlFor="pemeriksaan_fisik" className='block text-sm font-medium leading-6 text-gray-900'>Gejala {symptomWithMaxWeight.labelGejala}: </label>
          <ul className='list-disc my-3 ml-5'>
            {symptomWithMaxWeight.symptom.map((gejala, index) => (
              <li key={index} className='text-sm leading-6 text-gray-900'>{gejala}</li>
            ))}
          </ul>
          {/* <span className='block text-sm font-medium leading-6 text-gray-900'>Bobot: {symptomWithMaxWeight.weight}</span> */}
          <Divider />
        </div>
      </div>
    )}
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form className='space-y-4 w-full'>
          <div>
            <label htmlFor="pemeriksaan_fisik" className='block text-sm font-medium leading-6 text-gray-900'>Pemeriksaan Fisik</label>
            <div className="mt-2">
              <Field as="textarea" id="pemeriksaan_fisik" name="pemeriksaan_fisik" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="pemeriksaan_fisik" component="div" />
          </div>

          <div>
            <label htmlFor="tingkat_pernapasan" className='block text-sm font-medium leading-6 text-gray-900'>Tingkat Pernapasan</label>
            <div className="mt-2">
              <Field as="textarea" id="tingkat_pernapasan" name="tingkat_pernapasan" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="tingkat_pernapasan" component="div" />
          </div>

          <div>
            <label htmlFor="abdomen" className='block text-sm font-medium leading-6 text-gray-900'>Abdomen</label>
            <div className="mt-2">
              <Field as="textarea" id="abdomen" name="abdomen" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="abdomen" component="div" />
          </div>

          <div>
            <label htmlFor="tekanan_darah" className='block text-sm font-medium leading-6 text-gray-900'>Tekanan Darah</label>
            <div className="mt-2">
              <Field as="textarea" id="tekanan_darah" name="tekanan_darah" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="tekanan_darah" component="div" />
          </div>

          <div>
            <label htmlFor="pemeriksaan_penunjang" className='block text-sm font-medium leading-6 text-gray-900'>Pemeriksaan Penunjang</label>
            <div className="mt-2">
              <Field as="textarea" id="pemeriksaan_penunjang" name="pemeriksaan_penunjang" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <ErrorMessage className='block text-sm font-medium text-red-600' name="pemeriksaan_penunjang" component="div" />
          </div>

          <Button variant="contained" type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
    </>
    :
      <ChainForm onSubmit={onChainSubmit} />
    }
    </>
  )
}

export default observer(AnamnesisForm)