export const questions = [
  {
    question: "Apakah anda mengalami batuk dengan jangka waktu yang cukup panjang? (selama tiga minggu atau lebih)",
    type: "tuberkulosis",
    weight: 1,
    follow_up: [
      {
        question: "Apakah batuk yang anda alami disertai dengan munculnya dahak?",
        weight: 1
      },
      {
        question: "Apakah batuk yang anda alami disertai dengan munculnya darah?",
        weight: 1
      }
    ]
  },
  {
    question: "Apakah anda mengalami demam dengan kurun waktu yang cukup panjang? (selama tiga minggu atau lebih)",
    type: "tuberkulosis",
    weight: 1
  },
  {
    question: "Apakah anda mengalami gangguan pernapasan?",
    type: "tuberkulosis",
    weight: 1,
    follow_up: [
      {
        question: "Apakah anda mengalami sesak nafas?",
        weight: 1
      },
      {
        question: "Apakah anda mengalami nyeri dada?",
        weight: 1
      }
    ]
  },
  {
    question: "Apakah akhir - akhir ini anda mengalam penurunan nafsu makan?",
    type: "tuberkulosis",
    weight: 1
  },
  {
    question: "Apakah anda merasa bahwa otot wajah anda menjadi kaku?",
    type: "tetanus",
    weight: 1
  },
  {
    question: "Apakah anda mengalami nyeri punggung?",
    type: "tetanus",
    weight: 1
  },
  {
    question: "Apakah anda mengalami kesulitan menelan?",
    type: "tetanus",
    weight: 1
  },
  {
    question: "Apakah anda merasakan linu pada bagian leher?",
    type: "tetanus",
    weight: 1
  },
  {
    question: "Apakah anda sering mual?",
    type: "hepatitis_a",
    weight: 1
  },
  {
    question: "Apakah anda sering muntah",
    type: "hepatitis_a",
    weight: 1
  },
  {
    question: "Apakah anda mengalami diare?",
    type: "hepatitis_a",
    weight: 1
  },
  {
    question: "Apakah anda mengalami demam?",
    type: "hepatitis_a",
    weight: 1
  },
  {
    question: "Apakah air seni anda mengalami perubahan warna menjadi berwarna pekat seperti teh?",
    type: "hepatitis_a",
    weight: 1
  },
  {
    question: "Apakah anda sering merasa lemas atau gampang lelah?",
    type: "hepatitis_c",
    weight: 1
  },
  {
    question: "Apakah anda sering mengalami gangguan tidur?",
    type: "hepatitis_c",
    weight: 1
  },
  {
    question: "Apakah anda sering merasa mual?",
    type: "hepatitis_c",
    weight: 1
  },
  {
    question: "Apakah anda mengalami radang sendi?",
    type: "hepatitis_c",
    weight: 1
  },
  {
    question: "Apakah anda merasakan nyeri otot?",
    type: "hepatitis_c",
    weight: 1
  }
]