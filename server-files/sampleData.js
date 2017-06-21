const shortid = require('shortid');

const sampleData = {
    projects: [
        {
            _id: '589fa040358e8c0be63b9622',
            shortId: shortid.generate(),
            projectName: 'Node Capstone',
            __v: 0,
            tasks: [
                {
                    recordedTime: 130,
                    taskName: 'User Stories',
                    _id: '589fa0dd358e8c0be63b9623',
                    shortId: shortid.generate(),
                    log: null,
                },
                {
                    recordedTime: 95,
                    taskName: 'MVP Design',
                    _id: '589fa0e4358e8c0be63b9624',
                    shortId: shortid.generate(),
                    log: null,
                },
                {
                    recordedTime: 345,
                    taskName: 'API Testing and Implementation',
                    _id: '589fa10d358e8c0be63b9625',
                    shortId: shortid.generate(),
                    log: null,
                },
                {
                    recordedTime: 270,
                    taskName: 'User Feedback / Iteration',
                    _id: '589fa232358e8c0be63b9629',
                    shortId: shortid.generate(),
                    log: null,
                },
                {
                    recordedTime: 125,
                    taskName: 'Documentation/ Clean Up',
                    _id: '589fa269358e8c0be63b962a',
                    shortId: shortid.generate(),
                    log: null,
                },
            ],
        },
        {
            _id: '589fa353358e8c0be63b962c',
            shortId: shortid.generate(),
            projectName: 'Eng 312 Essay',
            __v: 0,
            tasks: [
                {
                    recordedTime: 0,
                    taskName: 'Brainstorming',
                    _id: '589fa35b358e8c0be63b962d',
                    shortId: shortid.generate(),
                    log: [],
                },
                {
                    recordedTime: 0,
                    taskName: 'Outline',
                    _id: '589fa35e358e8c0be63b962e',
                    shortId: shortid.generate(),
                    log: [],
                },
                {
                    recordedTime: 0,
                    taskName: 'Rough Draft',
                    _id: '589fa363358e8c0be63b962f',
                    shortId: shortid.generate(),
                    log: [],
                },
                {
                    recordedTime: 0,
                    taskName: 'Peer Editing',
                    _id: '589fa37c358e8c0be63b9630',
                    shortId: shortid.generate(),
                    log: [],
                },
                {
                    recordedTime: 0,
                    taskName: 'Final Draft',
                    _id: '589fa389358e8c0be63b9631',
                    shortId: shortid.generate(),
                    log: [],
                },
            ],
        },
    ],
};

module.exports = { sampleData };
