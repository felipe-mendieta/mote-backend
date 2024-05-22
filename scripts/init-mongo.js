// Conectar a la base de datos 'engagement'
db = db.getSiblingDB('engagement');

// Crear los documentos de la colección 'questions'
var questions = [
  {
    _id: ObjectId("6577c3fd7be3e4528aac626e"),
    type: "Multiple Option",
    question: "¿Qué aspecto destacarías como el más relevante de la conferencia?",
    answers: [
      { option: 1, text: "Los casos de estudio", correct: false, _id: ObjectId("6577c3fd7be3e4528aac626f") },
      { option: 2, text: "La dinámica de presentación", correct: false, _id: ObjectId("6577c3fd7be3e4528aac6270") },
      { option: 3, text: "La información nueva", correct: false, _id: ObjectId("6577c3fd7be3e4528aac6271") },
      { option: 4, text: "La experiencia del conferencista", correct: true, _id: ObjectId("6577c3fd7be3e4528aac6272") }
    ],
    __v: 0
  },
  {
    _id: ObjectId("6577c3fd7be3e4528aac6273"),
    type: "Single Option",
    question: "¿Qué tan claro fue el contenido presentado durante la conferencia?",
    answers: [
      { option: 1, text: "Muy claro", correct: false, _id: ObjectId("6577c3fd7be3e4528aac6274") },
      { option: 2, text: "Claro", correct: false, _id: ObjectId("6577c3fd7be3e4528aac6275") },
      { option: 3, _id: ObjectId("6577f5fb182a446fbcc5240b"), correct: false, text: "Neutral" },
      { option: 4, text: "Poco claro", correct: false, _id: ObjectId("6577f684182a446fbcc5240c") },
      { option: 5, text: "Nada claro", correct: false, _id: ObjectId("6577f71d182a446fbcc5240d") }
    ],
    __v: 0
  },
  {
    _id: ObjectId("6577c3fd7be3e4528aac6269"),
    type: "Single Option",
    question: "¿En qué medida la conferencia te ha motivado a aplicar estrategias de transformación digital en tu entorno laboral o personal?",
    answers: [
      { option: 1, text: "Mucho", correct: false, _id: ObjectId("6577c3fd7be3e4528aac626a") },
      { option: 2, text: "Bastante", correct: false, _id: ObjectId("6577c3fd7be3e4528aac626b") },
      { option: 3, text: "Algo", correct: false, _id: ObjectId("6577c3fd7be3e4528aac626c") },
      { option: 4, text: "Poco", correct: false, _id: ObjectId("6577c3fd7be3e4528aac626d") },
      { option: 5, text: "Nada", correct: false, _id: ObjectId("6577f54b182a446fbcc5240a") }
    ],
    __v: 0
  },
  {
    _id: ObjectId("6595c89f4d53ba532e03b82d"),
    type: "Single Option",
    question: "¿Con qué frecuencia participas activamente en las discusiones durante las clases?",
    answers: [
      { option: 1, text: "Diariamente", correct: false, _id: ObjectId("6577c3fd7be3e4528aac6274") },
      { option: 2, text: "A menudo", correct: false, _id: ObjectId("6577c3fd7be3e4528aac6275") },
      { option: 3, _id: ObjectId("6577f5fb182a446fbcc5240b"), correct: false, text: "Ocasionalmente" },
      { option: 4, text: "Raramente", correct: false, _id: ObjectId("6577f684182a446fbcc5240c") },
      { option: 5, text: "Nunca", correct: false, _id: ObjectId("6577f71d182a446fbcc5240d") }
    ],
    __v: 0
  },
  {
    _id: ObjectId("6595c93c4d53ba532e03b82f"),
    type: "Likert",
    question: "¿Cómo describirías tu nivel de interés en los temas tratados en esta clase?",
    answers: [
      { option: 1, text: "Muy interesado/a", correct: false, _id: ObjectId("6577c3fd7be3e4528aac6274") },
      { option: 2, text: "Interesado/a", correct: false, _id: ObjectId("6577c3fd7be3e4528aac6275") },
      { option: 3, _id: ObjectId("6577f5fb182a446fbcc5240b"), correct: false, text: "Neutral" },
      { option: 4, text: "Poco interesado/a", correct: false, _id: ObjectId("6577f684182a446fbcc5240c") },
      { option: 5, text: "Nada interesado/a", correct: false, _id: ObjectId("6577f71d182a446fbcc5240d") }
    ],
    __v: 0
  },
  {
    _id: ObjectId("6595c9914d53ba532e03b830"),
    type: "Single Option",
    question: "¿Qué tan útiles encuentras las actividades y métodos de enseñanza utilizados en esta clase para fomentar tu participación y aprendizaje?",
    answers: [
      { option: 1, text: "Muy útiles", correct: false, _id: ObjectId("6577c3fd7be3e4528aac6274") },
      { option: 2, text: "Útiles", correct: false, _id: ObjectId("6577c3fd7be3e4528aac6275") },
      { option: 3, _id: ObjectId("6577f5fb182a446fbcc5240b"), correct: false, text: "Moderadamente útiles" },
      { option: 4, text: "Poco útiles", correct: false, _id: ObjectId("6577f684182a446fbcc5240c") },
      { option: 5, text: "Nada útiles", correct: false, _id: ObjectId("6577f71d182a446fbcc5240d") }
    ],
    __v: 0
  },
  {
    _id: ObjectId("65ce996e09f052e45a26d456"),
    type: "Likert",
    question: "¿Presté atención a mis estudios?",
    answers: [
      { option: 1, text: "Muy interesado/a", correct: false, _id: ObjectId("6577c3fd7be3e4528aac6274") },
      { option: 2, text: "Interesado/a", correct: false, _id: ObjectId("6577c3fd7be3e4528aac6275") },
      { option: 3, _id: ObjectId("6577f5fb182a446fbcc5240b"), correct: false, text: "Neutral" },
      { option: 4, text: "Poco interesado/a", correct: false, _id: ObjectId("6577f684182a446fbcc5240c") },
      { option: 5, text: "Nada interesado/a", correct: false, _id: ObjectId("6577f71d182a446fbcc5240d") }
    ],
    __v: 0
  },
  {
    _id: ObjectId("65ce9a1509f052e45a26d457"),
    type: "Likert",
    question: "¿Cuando trabajábamos en algo en clase, sentía interés?",
    answers: [
      { option: 1, text: "Muy interesado/a", correct: false, _id: ObjectId("6577c3fd7be3e4528aac6274") },
      { option: 2, text: "Interesado/a", correct: false, _id: ObjectId("6577c3fd7be3e4528aac6275") },
      { option: 3, _id: ObjectId("6577f5fb182a446fbcc5240b"), correct: false, text: "Neutral" },
      { option: 4, text: "Poco interesado/a", correct: false, _id: ObjectId("6577f684182a446fbcc5240c") },
      { option: 5, text: "Nada interesado/a", correct: false, _id: ObjectId("6577f71d182a446fbcc5240d") }
    ],
    __v: 0
  },
  {
    _id: ObjectId("65ce9a6509f052e45a26d458"),
    type: "Likert",
    question: "¿Me comprometí con el tema en cuestión?",
    answers: [
      { option: 1, text: "Muy interesado/a", correct: false, _id: ObjectId("6577c3fd7be3e4528aac6274") },
      { option: 2, text: "Interesado/a", correct: false, _id: ObjectId("6577c3fd7be3e4528aac6275") },
      { option: 3, _id: ObjectId("6577f5fb182a446fbcc5240b"), correct: false, text: "Neutral" },
      { option: 4, text: "Poco interesado/a", correct: false, _id: ObjectId("6577f684182a446fbcc5240c") },
      { option: 5, text: "Nada interesado/a", correct: false, _id: ObjectId("6577f71d182a446fbcc5240d") }
    ],
    __v: 0
  }
];

// Insertar los documentos en la colección 'questions'
db.questions.insertMany(questions);

// Crear los documentos de la colección 'polls'
var polls = [
  {
    _id: ObjectId("6577c3fd7be3e4528aac6277"),
    pollTitle: "Engagement Poll",
    questions: [
      ObjectId("6595c89f4d53ba532e03b82d"),
      ObjectId("6595c93c4d53ba532e03b82f"),
      ObjectId("6595c9914d53ba532e03b830")
    ],
    startDate: ISODate("2023-12-12T17:56:13.860Z"),
    __v: 0
  },
  {
    _id: ObjectId("65ce97ee09f052e45a26d453"),
    pollTitle: "Engagement Poll 2",
    questions: [
      ObjectId("65ce996e09f052e45a26d456"),
      ObjectId("65ce9a1509f052e45a26d457"),
      ObjectId("65ce9a6509f052e45a26d458")
    ],
    startDate: ISODate("2023-12-12T17:56:13.860Z"),
    __v: 0
  }
];

// Insertar los documentos en la colección 'polls'
db.polls.insertMany(polls);
