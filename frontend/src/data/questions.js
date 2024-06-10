export const questions = [
  {
    question: "Apakah anda mengalami batuk dengan jangka waktu yang cukup panjang? (selama tiga minggu atau lebih)",
    type: "tuberkulosis",
    gejala: "Batuk dengan jangka waktu cukup panjang",
    weight: 1,
    follow_up: [
      {
        question: "Apakah batuk yang anda alami disertai dengan munculnya dahak?",
        gejala: "Batuk berdahak",
        weight: 1
      },
      {
        question: "Apakah batuk yang anda alami disertai dengan munculnya darah?",
        gejala: "Batuk berdarah",
        weight: 1
      }
    ]
  },
  {
    question: "Apakah anda mengalami demam dengan kurun waktu yang cukup panjang? (selama tiga minggu atau lebih)",
    gejala: "Demam dengan kurun waktu cukup panjang",
    type: "tuberkulosis",
    weight: 1
  },
  {
    question: "Apakah anda mengalami gangguan pernapasan?",
    gejala: "Gangguan pernapasan",
    type: "tuberkulosis",
    weight: 1,
    follow_up: [
      {
        question: "Apakah anda mengalami sesak nafas?",
        gejala: "Sesak nafas",
        weight: 1
      },
      {
        question: "Apakah anda mengalami nyeri dada?",
        gejala: "Nyeri dada",
        weight: 1
      }
    ]
  },
  {
    question: "Apakah akhir - akhir ini anda mengalam penurunan nafsu makan?",
    gejala: "Penurunan nafsu makan",
    type: "tuberkulosis",
    weight: 1
  },
  {
    question: "Apakah anda merasa bahwa otot wajah anda menjadi kaku?",
    gejala: "Otot wajah menjadi kaku",
    type: "tetanus",
    weight: 1
  },
  {
    question: "Apakah anda mengalami nyeri punggung?",
    gejala: "Nyeri punggung",
    type: "tetanus",
    weight: 1
  },
  {
    question: "Apakah anda mengalami kesulitan menelan?",
    gejala: "Kesulitan menelan",
    type: "tetanus",
    weight: 1
  },
  {
    question: "Apakah anda merasakan linu pada bagian leher?",
    gejala: "Linu pada bagian leher",
    type: "tetanus",
    weight: 1
  },
  {
    question: "Apakah anda sering mual?",
    gejala: "Sering mual",
    type: "hepatitis_a",
    weight: 1
  },
  {
    question: "Apakah anda sering muntah",
    gejala: "Sering muntah",
    type: "hepatitis_a",
    weight: 1
  },
  {
    question: "Apakah anda mengalami diare?",
    gejala: "Diare",
    type: "hepatitis_a",
    weight: 1
  },
  {
    question: "Apakah anda mengalami demam?",
    gejala: "Demam",
    type: "hepatitis_a",
    weight: 1
  },
  {
    question: "Apakah air seni anda mengalami perubahan warna menjadi berwarna pekat seperti teh?",
    gejala: "Perubahan warna air seni",
    type: "hepatitis_a",
    weight: 1
  },
  {
    question: "Apakah anda sering merasa lemas atau gampang lelah?",
    gejala: "Gampang lelah",
    type: "hepatitis_c",
    weight: 1
  },
  {
    question: "Apakah anda sering mengalami gangguan tidur?",
    gejala: "Gangguan tidur",
    type: "hepatitis_c",
    weight: 1
  },
  {
    question: "Apakah anda sering merasa mual?",
    gejala: "Sering mual",
    type: "hepatitis_c",
    weight: 1
  },
  {
    question: "Apakah anda mengalami radang sendi?",
    gejala: "Radang sendi",
    type: "hepatitis_c",
    weight: 1
  },
  {
    question: "Apakah anda merasakan nyeri otot?",
    gejala: "Nyeri otot",
    type: "hepatitis_c",
    weight: 1
  }
]