const ejs = require('ejs');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const templatefunctions = require('../utils/templatefunctions');
const Pasien = require('../model/pasien');
const Anamnesis = require('../model/anamnesis');
const Diagnosis = require('../model/diagnosis');
const Faktorindividu = require('../model/faktorindividu');
const Hasildiagnosis = require('../model/hasildiagnosis');
const Inputpajanan = require('../model/inputPajanan');
const Pajanan = require('../model/pajanan');
const Pajananluarkerja = require('../model/pajananluarkerja');

const getData = async (pasienId) => {
  try {
    const pasienPromise = Pasien.findOne({ _id: pasienId }).lean();
    const anamnesisPromise = Anamnesis.findOne({ pasien: pasienId }).lean();
    const diagnosisPromise = Diagnosis.findOne({ pasien: pasienId }).lean();
    const faktorindividuPromise = Faktorindividu.findOne({ pasien: pasienId }).lean();
    const hasildiagnosisPromise = Hasildiagnosis.findOne({ pasien: pasienId }).lean();
    const inputpajananPromise = Inputpajanan.findOne({ pasien: pasienId }).lean();
    const pajananPromise = Pajanan.findOne({ pasien: pasienId }).lean();
    const pajananluarkerjaPromise = Pajananluarkerja.findOne({ pasien: pasienId }).lean();

    const [
      pasien,
      anamnesis,
      diagnosis,
      faktorindividu,
      hasildiagnosis,
      inputpajanan,
      pajanan,
      pajananluarkerja
    ] = await Promise.all([
      pasienPromise,
      anamnesisPromise,
      diagnosisPromise,
      faktorindividuPromise,
      hasildiagnosisPromise,
      inputpajananPromise,
      pajananPromise,
      pajananluarkerjaPromise
    ]);

    let labelGejala;
    let objectWithMaxWeight;
    let maxWeight = Math.max(anamnesis?.gejala_tuberkulosis?.weight, anamnesis?.gejala_hepatitis?.weight, anamnesis?.gejala_tetanus?.weight);
    if (maxWeight === anamnesis?.gejala_tuberkulosis?.weight) {
      objectWithMaxWeight = anamnesis?.gejala_tuberkulosis;
      labelGejala = "tuberkulosis"
    } else if (maxWeight === anamnesis?.gejala_tetanus?.weight) {
      objectWithMaxWeight = anamnesis?.gejala_tetanus;
      labelGejala = "tetanus"
    } else if (maxWeight === anamnesis?.gejala_hepatitis?.weight) {
      objectWithMaxWeight = anamnesis?.gejala_hepatitis;
      labelGejala = "hepatitis"
    } else {
      objectWithMaxWeight = null
      labelGejala = ""
    }
    const symptomWithMaxWeight = { labelGejala, ...objectWithMaxWeight }

    return { pasien, anamnesis, symptomWithMaxWeight, diagnosis, faktorindividu, hasildiagnosis, inputpajanan, pajanan, pajananluarkerja };
  } catch (error) {
    throw new Error('Error fetching data: ' + error.message);
  }
};

module.exports = {
  index: async (req, res) => {
    const { pasienId } = req.query
    const userData = { // for example
      firstname: "linus",
      lastname: "torvalds",
      email: "foo@bar.com",
      mob: "900-900-9000"
    };

    const dataPromises = await getData(pasienId)
    console.log(dataPromises)

    const filePathName = path.resolve(__dirname, '../templates/pdf.ejs');
    const html = fs.readFileSync(filePathName, 'utf8');

    // Launch a new Chrome instance
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'] });
    const page = await browser.newPage();

    // Render the EJS template with user data
    const renderedHtml = ejs.render(html, { data: dataPromises, _: templatefunctions() });
    await page.setContent(renderedHtml, { waitUntil: 'domcontentloaded' });

    // Generate the PDF
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true, });

    // Send the PDF as a response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${pasienId}.pdf`);
    res.send(pdfBuffer);

    await browser.close();
  }
}