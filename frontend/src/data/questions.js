export const questions = [
  {
    question: "Apakah anda mengalami sakit kepala?",
    type: ["tuberkulosis", "tetanus", "hepatitis"],
    symptom: "Sakit kepala",
    weight: [5, 10, 5],
  },
  {
    question: "Apakah anda merasa punggung anda menjadi kaku?",
    symptom: "Punggung menjadi kaku",
    type: "tuberkulosis",
    weight: 5,
  },
  {
    question: "Apakah anda mengalami batuk?",
    type: "tuberkulosis",
    symptom: "Batuk dengan jangka waktu cukup panjang",
    weight: 20,
    follow_up: [
      {
        question: "Apakah batuk yang anda alami disertai dengan munculnya darah?",
        type: "tuberkulosis",
        symptom: "Batuk berdarah",
        weight: 25
      }
    ]
  },
  {
    question: "Apakah anda mengalami nyeri di dada?",
    symptom: "Nyeri dada",
    type: "tuberkulosis",
    weight: 5,
  },
  {
    question: "Apakah anda merasa mudah lelah?",
    symptom: "Mudah lelah",
    type: "tuberkulosis",
    weight: 10,
  },
  {
    question: "Apakah anda mudah berkeringat di malam hari?",
    symptom: "Mudah berkeringat di malam hari",
    type: "tuberkulosis",
    weight: 10,
  },
  {
    question: "Apakah akhir - akhir ini anda mengalami penurunan berat badan?",
    symptom: "Penurunan berat badan",
    type: ["tuberkulosis", "hepatitis"],
    weight: [10, 5]
  },
  {
    question: "Apakah anda mengalami kejang otot di daerah perut?",
    symptom: "Kejang otot di daerah perut",
    type: "tetanus",
    weight: 25,
  },
  {
    question: "Apakah anda merasa bahwa otot-otot anda menjadi kaku?",
    symptom: "Otot menjadi kaku",
    type: "tetanus",
    weight: 30
  },
  {
    question: "Apakah anda mengalami nyeri punggung?",
    symptom: "Nyeri punggung",
    type: "tetanus",
    weight: 5
  },
  {
    question: "Apakah anda mengalami kesulitan menelan?",
    symptom: "Sumbatan pada saluran pernapasan",
    type: "tetanus",
    weight: 5
  },
  {
    question: "Apakah anda merasa saluran pernapasan anda tersumbat?",
    symptom: "Sumbatan pada saluran pernapasan",
    type: "tetanus",
    weight: 5,
  },
  {
    question: "Apakah anda merasakan kaku pada bagian leher?",
    symptom: "Kaku leher",
    type: "tetanus",
    weight: 10
  },
  {
    question: "Apakah anda sering muntah?",
    symptom: "Muntah",
    type: "hepatitis",
    weight: 5
  },
  {
    question: "Apakah anda mengalami diare?",
    symptom: "Diare",
    type: "hepatitis",
    weight: 5
  },
  {
    question: "Apakah anda sering merasa mual?",
    symptom: "Mual",
    type: "hepatitis",
    weight: 10
  },
  {
    question: "Apakah anda mengalami demam?",
    symptom: "Demam",
    type: ["tuberkulosis","tetanus","hepatitis"],
    weight: [0, 10, 30],
    follow_up: [
      {
        question: "Apakah demam yang anda alami berlangsung cukup panjang? (selama tiga minggu atau lebih)",
        type: "tuberkulosis",
        symptom: "Demam dengan jangka waktu panjang",
        weight: 10
      }
    ]
  },
  {
    question: "Apakah air seni anda mengalami perubahan warna menjadi berwarna pekat seperti teh?",
    symptom: "Urin menjadi lebih coklat",
    type: "hepatitis",
    weight: 20
  },
  {
    question: "Apakah anda sering merasa lemas atau gampang lelah?",
    symptom: "Lemas",
    type: "hepatitis",
    weight: 5
  },
  {
    question: "Apakah anda sering mengalami gangguan tidur?",
    symptom: "Gangguan tidur",
    type: "hepatitis",
    weight: 5
  },
  {
    question: "Apakah anda mengalami radang sendi?",
    symptom: "Radang sendi",
    type: "hepatitis",
    weight: 5
  },
  {
    question: "Apakah anda merasakan nyeri otot?",
    symptom: "Nyeri otot",
    type: "hepatitis",
    weight: 5
  }
]