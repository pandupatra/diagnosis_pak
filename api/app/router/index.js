const express = require('express');
const pasienController = require('../controller/pasienController')
const gejalaController = require('../controller/gejalaController')
const anamnesisController = require('../controller/anamnesisController')
const inputpajananController = require('../controller/inputpajananController')
const diagnosisController = require('../controller/diagnosisController')
const pajananController = require('../controller/pajananController')
const faktorindividuController = require('../controller/faktorindividuController')
const pajananluarkerjaController = require('../controller/pajananluarkerjaController')
const hasildiagnosisController = require('../controller/hasildiagnosisController')

const router = express.Router()

router.post('/pasien/signin', pasienController.signInByNik)
router.post('/pasien/create', pasienController.create)
router.post('/pasien/update', pasienController.update)

router.post('/gejala/create', gejalaController.create)
router.get('/gejala/:pasienId', gejalaController.get)

router.post('/anamnesis/create', anamnesisController.create)
router.post('/anamnesis/update', anamnesisController.update)
router.get('/anamnesis/:pasienId', anamnesisController.get)

router.post('/inputpajanan/create', inputpajananController.create)
router.post('/inputpajanan/update', inputpajananController.update)
router.get('/inputpajanan/:pasienId', inputpajananController.get)

router.post('/diagnosis/create', diagnosisController.create)
router.post('/diagnosis/update', diagnosisController.update)
router.get('/diagnosis/:pasienId', diagnosisController.get)

router.post('/pajanan/create', pajananController.create)
router.post('/pajanan/update', pajananController.update)
router.get('/pajanan/:pasienId', pajananController.get)

router.post('/faktorindividu/create', faktorindividuController.create)
router.post('/faktorindividu/update', faktorindividuController.update)
router.get('/faktorindividu/:pasienId', faktorindividuController.get)

router.post('/pajananluarkerja/create', pajananluarkerjaController.create)
router.post('/pajananluarkerja/update', pajananluarkerjaController.update)
router.get('/pajananluarkerja/:pasienId', pajananluarkerjaController.get)

router.post('/hasildiagnosis/create', hasildiagnosisController.create)
router.post('/hasildiagnosis/update', hasildiagnosisController.update)
router.get('/hasildiagnosis/:pasienId', hasildiagnosisController.get)

module.exports = router;