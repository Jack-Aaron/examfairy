const QUESTIONS = [
  {
    id: '0000',
    question: 'Which of the following is NOT a function of the government?',
    answers: ['Establishing Order',
      'Managing Conflicts',
      'Providing Security',
      'Directing Society'],
    correctAnswer: 'Directing Society',
    topic: 'Social Studies',
    hint: 'Which of these should the government probably NOT be doing?',
    viewCt: 0,
    correctCt: 0,
    wrongCt: 0,
    score: 2,
    subquestion: ''
  },
  {
    id: '0001',
    question: 'Mr. Akundo is at the bookstore trying to find a book about History. He cannot see any signs that say "History," but there is a sign that says "Hist."',
    answers: ['Abbrevation',
      'Compound words',
      'Contractions',
      'Suffixes'],
    correctAnswer: 'Abbrevation',
    topic: 'English',
    hint: 'Abbr.',
    viewCt: 0,
    correctCt: 0,
    wrongCt: 0,
    score: 2,
    subquestion: 'This second sign is an example of:'
  },
  {
    id: '0002',
    question: 'Which sentence contains both an idiom AND a homograph?',
    answers: ['Right off the bat, Janey recognized that the habitat she and her team had entered was that of a bat.',
      'You\'ve got all your ducks in a row, kiddo, but it\'s plain to see that old plane will never fly again.',
      'Rain or shine, I\'ll either be late or tardy.',
      'Here\'s the thing about baseball - when you\'re up to bat, you had better take a swing.'],
    correctAnswer: 'Right off the bat, Janey recognized that the habitat she and her team had entered was that of a bat.',
    topic: 'English',
    hint: 'What does each sentence all already have?',
    viewCt: 0,
    correctCt: 0,
    wrongCt: 0,
    score: 2,
    subquestion: ''
  },
  {
    id: '0003',
    question: '"There\'s a man who built a rocket and flew all the way to Mars, where he encountered the Martians. They gave him secret technology for him to bring back to Earth. Then, society rapidly transforms, and finally human armies propel toward the Red Planet."',
    answers: ['Plot',
      'Themes',
      'Conflict',
      'Setting'],
    correctAnswer: 'Plot',
    topic: 'English',
    hint: 'This seems to be about the important events of a story.',
    viewCt: 0,
    correctCt: 0,
    wrongCt: 0,
    score: 2,
    subquestion: 'What have you been told mostly about this story?'
  },
  // {
  //   id: 'a3',
  //   question: 'conflict',
  //   answers: ['Cras justo odio',
  //     'Dapibus ac facilisis in',
  //     'Vestibulum at eros',
  //     'Yorfinstein fuf yud'],
  //   correctAnswer: 'Yorfinstein fuf yud',
  //   topic: 'English',
  //   hint: 'etc., Mr. and Mrs.',
  //   viewCt: 0,
  //   correctCt: 0,
  //   wrongCt: 0,
  //   score: 2,
  //   subquestion: ''
  // },
  // {
  //   id: 'a4',
  //   question: 'folk',
  //   answers: ['Cras justo odio',
  //     'Dapibus ac facilisis in',
  //     'Vestibulum at eros',
  //     'Yorfinstein fuf yud'],
  //   correctAnswer: 'Cras justo odio',
  //   topic: 'English',
  //   hint: 'etc., Mr. and Mrs.',
  //   viewCt: 0,
  //   correctCt: 0,
  //   wrongCt: 0,
  //   score: 2,
  //   subquestion: ''
  // },
  // {
  //   id: 'a5',
  //   question: 'individualism',
  //   answers: ['Cras justo odio',
  //     'Dapibus ac facilisis in',
  //     'Vestibulum at eros',
  //     'Yorfinstein fuf yud'],
  //   correctAnswer: 'Cras justo odio',
  //   topic: 'English',
  //   hint: 'etc., Mr. and Mrs.',
  //   viewCt: 0,
  //   correctCt: 0,
  //   wrongCt: 0,
  //   score: 2,
  //   subquestion: ''
  // },
  // {
  //   id: 'a6',
  //   question: 'inventiveness',
  //   answers: ['Cras justo odio',
  //     'Dapibus ac facilisis in',
  //     'Vestibulum at eros',
  //     'Yorfinstein fuf yud'],
  //   correctAnswer: 'Yorfinstein fuf yud',
  //   topic: 'English',
  //   hint: 'etc., Mr. and Mrs.',
  //   viewCt: 0,
  //   correctCt: 0,
  //   wrongCt: 0,
  //   score: 2,
  //   subquestion: ''
  // },
  // {
  //   id: 'a7',
  //   question: 'society',
  //   answers: ['Cras justo odio',
  //     'Dapibus ac facilisis in',
  //     'Vestibulum at eros',
  //     'Yorfinstein fuf yud'],
  //   correctAnswer: 'Cras justo odio',
  //   topic: 'English',
  //   hint: 'etc., Mr. and Mrs.',
  //   viewCt: 0,
  //   correctCt: 0,
  //   wrongCt: 0,
  //   score: 2,
  //   subquestion: ''
  // },
  // {
  //   id: 'a8',
  //   question: 'Who was Abigail Adams?',
  //   answers: ['Cras justo odio',
  //     'Dapibus ac facilisis in',
  //     'Vestibulum at eros',
  //     'Yorfinstein fuf yud'],
  //   correctAnswer: 'Yorfinstein fuf yud',
  //   topic: 'English',
  //   hint: 'etc., Mr. and Mrs.',
  //   viewCt: 0,
  //   correctCt: 0,
  //   wrongCt: 0,
  //   score: 2,
  //   subquestion: ''
  // },
  // {
  //   id: 'a9',
  //   question: 'Who were the Women Airforce Service Pilots (WASPs) ?',
  //   answers: ['Cras justo odio',
  //     'Dapibus ac facilisis in',
  //     'Vestibulum at eros',
  //     'Yorfinstein fuf yud'],
  //   correctAnswer: 'Dapibus ac facilisis in',
  //   topic: 'English',
  //   hint: 'etc., Mr. and Mrs.',
  //   viewCt: 0,
  //   correctCt: 0,
  //   wrongCt: 0,
  //   score: 2,
  //   subquestion: ''
  // }
  // ,
  // {
  //   id: 'aa',
  //   question: 'Who were the Navajo Code Talkers?',
  //   answers: ['Cras justo odio',
  //     'Dapibus ac facilisis in',
  //     'Vestibulum at eros',
  //     'Yorfinstein fuf yud'],
  //   correctAnswer: 'Dapibus ac facilisis in',
  //   topic: 'English',
  //   hint: 'etc., Mr. and Mrs.',
  //   viewCt: 0,
  //   correctCt: 0,
  //   wrongCt: 0,
  //   score: 2,
  //   subquestion: ''
  // },
  // {
  //   id: 'ab',
  //   question: 'Who was Sojourner Truth?',
  //   answers: ['Cras justo odio',
  //     'Dapibus ac facilisis in',
  //     'Vestibulum at eros',
  //     'Yorfinstein fuf yud'],
  //   correctAnswer: 'Vestibulum at eros',
  //   topic: 'English',
  //   hint: 'etc., Mr. and Mrs.',
  //   viewCt: 0,
  //   correctCt: 0,
  //   wrongCt: 0,
  //   score: 2,
  //   subquestion: ''
  // },
  // {
  //   id: 'ac',
  //   question: 'What are the three functions of Government?',
  //   answers: ['Cras justo odio',
  //     'Dapibus ac facilisis in',
  //     'Vestibulum at eros',
  //     'Yorfinstein fuf yud'],
  //   correctAnswer: 'Vestibulum at eros',
  //   topic: 'English',
  //   hint: 'etc., Mr. and Mrs.',
  //   viewCt: 0,
  //   correctCt: 0,
  //   wrongCt: 0,
  //   score: 2,
  //   subquestion: ''
  // },
  // {
  //   id: 'ad',
  //   question: 'apostrophe',
  //   answers: ['Cras justo odio',
  //     'Dapibus ac facilisis in',
  //     'Vestibulum at eros',
  //     'Yorfinstein fuf yud'],
  //   correctAnswer: 'Vestibulum at eros',
  //   topic: 'English',
  //   hint: 'etc., Mr. and Mrs.',
  //   viewCt: 0,
  //   correctCt: 0,
  //   wrongCt: 0,
  //   score: 2,
  //   subquestion: ''
  // }
]

export default QUESTIONS