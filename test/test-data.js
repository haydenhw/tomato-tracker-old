const user = {
  userName: 'string',
  id: 'string',
  password: 'string',
  projectIds: ['projectId', 'projectId'],
}

const testTask  = {
  shortId: 'string',
  taskName: 'string',
  entries: ['entryid', 'entryid', 'entryid']
}

dbEntries = [{
  duration : 'integer',
  name: 'string',
  projectId: 'string',
  shortId: 'string',
  startTime: 'string',
  taskId: 'string',
}]

// from db assign dbEntries to tasks
function assignEntries(entries, tasks) {
  entries.forEach(entry => {
    // tasks[entry.taskId].entries.push(entry.shortId)
    tasks[entry.taskId].entries = [...tasks.entries, entry.taskId];
  });
}

// calc total task time
function calcTaskTime(entries, task) {
  const totalTime = task.entryIds
    .map(entryId => entries[entryId].duration)
    .reduce((a, b) => a + b)

  return totalTime;
}
// get entries
// add entry
// update entry
// delete entry



const tasks = [
  {
    shortId: 'HkgMKH56Nz',
    recordedTime: 9378,
    taskName: 'W2',
    _id: '5a60157ba26ad5001fd882ad',
    log: null
  },
  {
    shortId: 'SklLmNjpVf',
    recordedTime: 5420,
    taskName: 'W1',
    _id: '5a602420a26ad5001fd882ae',
    log: null
  },
  {
    shortId: 'rJgBKEuC4z',
    recordedTime: 9493,
    taskName: 'Th1',
    _id: '5a60f47eba849f001ffe665f',
    log: null
  },
  {
    shortId: 'SyeeaNjkSf',
    recordedTime: 5320,
    taskName: 'F1',
    _id: '5a6224c36d82b6001f4818bb',
    log: null
  },
  {
    shortId: 'BkxL7dTJHz',
    recordedTime: 7348,
    taskName: 'F2',
    _id: '5a62481f4db247001f3cb037',
    log: null
  },
  {
    shortId: 'HyeJB-xxrf',
    recordedTime: 2777,
    taskName: 'F3',
    _id: '5a6271484c586e001f2d70cc',
    log: null
  },
  {
    shortId: 'r1eiGSzxBM',
    recordedTime: 4383,
    taskName: 'F4',
    _id: '5a6295134c586e001f2d70d0',
    log: null
  }
]

//   const projects = [
//     {
//       _id: '5a5828fe3bb1b155bcf7736c',
//       projectName: 'Portfolio Jan 13',
//       shortId: 'SyUZKsrNG',
//       __v: 0,
//       tasks: [
//         {
//           shortId: 'HkgMKH56Nz',
//           recordedTime: 9378,
//           taskName: 'W2',
//           _id: '5a60157ba26ad5001fd882ad',
//           log: null
//         },
//         {
//           shortId: 'SklLmNjpVf',
//           recordedTime: 5420,
//           taskName: 'W1',
//           _id: '5a602420a26ad5001fd882ae',
//           log: null
//         },
//         {
//           shortId: 'rJgBKEuC4z',
//           recordedTime: 9493,
//           taskName: 'Th1',
//           _id: '5a60f47eba849f001ffe665f',
//           log: null
//         },
//         {
//           shortId: 'SyeeaNjkSf',
//           recordedTime: 5320,
//           taskName: 'F1',
//           _id: '5a6224c36d82b6001f4818bb',
//           log: null
//         },
//         {
//           shortId: 'BkxL7dTJHz',
//           recordedTime: 7348,
//           taskName: 'F2',
//           _id: '5a62481f4db247001f3cb037',
//           log: null
//         },
//         {
//           shortId: 'HyeJB-xxrf',
//           recordedTime: 2777,
//           taskName: 'F3',
//           _id: '5a6271484c586e001f2d70cc',
//           log: null
//         },
//         {
//           shortId: 'r1eiGSzxBM',
//           recordedTime: 4383,
//           taskName: 'F4',
//           _id: '5a6295134c586e001f2d70d0',
//           log: null
//         }
//       ]
//     },
//   {
//     _id: '5a662de07ced81001fa616e5',
//     projectName: 'Portfolio Jan 22',
//     shortId: 'S1e_JRo7BM',
//     __v: 0,
//     tasks: [
//       {
//         taskName: 'M1',
//         recordedTime: 4,
//         shortId: 'r1xM1Ai7rf',
//         _id: '5a662de07ced81001fa616e6',
//         log: []
//       },
//       {
//         shortId: 'BkgcwIyNBf',
//         recordedTime: 4556,
//         taskName: 'M2',
//         _id: '5a6666621a5687001f2ab09a',
//         log: null
//       },
//       {
//         shortId: 'SylvDtfNSM',
//         recordedTime: 3853,
//         taskName: 'M3',
//         _id: '5a66995f762cec001f169b8b',
//         log: null
//       }
//     ]
//   },
//   {
//     _id: '5a662e777ced81001fa616e7',
//     projectName: 'Monday MicroTasks',
//     shortId: 'BkgtRj7BG',
//     __v: 0,
//     tasks: [
//       {
//         shortId: 'SyxwSxh7BM',
//         recordedTime: 1204,
//         taskName: 'tweak search bar',
//         _id: '5a6630407ced81001fa616e8',
//         log: null
//       },
//       {
//         shortId: 'ryewKChXHf',
//         recordedTime: 1801,
//         taskName: 'add routing function',
//         _id: '5a663e7f7ced81001fa616e9',
//         log: null
//       },
//       {
//         shortId: 'rkgToLyVrz',
//         recordedTime: 901,
//         taskName: 'rm gray wrapper from search input',
//         _id: '5a6666c31a5687001f2ab09b',
//         log: null
//       },
//       {
//         shortId: 'HyxuhIyEHz',
//         recordedTime: 905,
//         taskName: 'add logo to search page',
//         _id: '5a6666c41a5687001f2ab09c',
//         log: null
//       },
//       {
//         shortId: 'ryxy6Lk4Sf',
//         recordedTime: 163,
//         taskName: 'center search input',
//         _id: '5a6666c41a5687001f2ab09d',
//         log: null
//       },
//       {
//         shortId: 'rkePp8kNBf',
//         recordedTime: 438,
//         taskName: 'make input larger',
//         _id: '5a6666c41a5687001f2ab09e',
//         log: null
//       },
//       {
//         shortId: 'H1gTfZgEHG',
//         recordedTime: 473,
//         taskName: 'adjust input centering',
//         _id: '5a6671181a5687001f2ab09f',
//         log: []
//       },
//       {
//         shortId: 'BkxoVXlVSz',
//         recordedTime: 0,
//         taskName: 'brain storm submit handler',
//         _id: '5a6673341a5687001f2ab0a0',
//         log: []
//       },
//       {
//         shortId: 'B1g-aUx4rG',
//         recordedTime: 431,
//         taskName: 'add/ test initial handler',
//         _id: '5a6676cb1a5687001f2ab0a1',
//         log: null
//       },
//       {
//         shortId: 'B1e9T8gNBz',
//         recordedTime: 170,
//         taskName: 'extract common form logic',
//         _id: '5a6676cb1a5687001f2ab0a2',
//         log: null
//       },
//       {
//         shortId: 'r1gGRLgNSf',
//         recordedTime: 301,
//         taskName: 'test and finalize',
//         _id: '5a6676cb1a5687001f2ab0a3',
//         log: null
//       },
//       {
//         shortId: 'H1eHQcz4BG',
//         recordedTime: 684,
//         taskName: 'planning',
//         _id: '5a669a24762cec001f169b8c',
//         log: null
//       },
//       {
//         shortId: 'S1lgTczNrf',
//         recordedTime: 763,
//         taskName: 'add / test general init handler',
//         _id: '5a669ab9762cec001f169b8d',
//         log: null
//       },
//       {
//         shortId: 'B1xHRTfNrG',
//         recordedTime: 168,
//         taskName: 'cleanup',
//         _id: '5a669dd0762cec001f169b8e',
//         log: null
//       },
//       {
//         shortId: 'rkxYPZXNrz',
//         recordedTime: 895,
//         taskName: 'handle search page error',
//         _id: '5a66a161762cec001f169b8f',
//         log: null
//       }
//     ]
//   }
// ]

module.exports = tasks;
