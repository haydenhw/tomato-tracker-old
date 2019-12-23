const shortId = require('shortid');
const axios = require('axios');

const tasks =  [
    'Learn Bioprocess',
    'Study Programming',
    'Practice Programming',
    'Other',
];

tasks.reverse();

const generateProjectName = () => {
  const	[wkday, month, calendarDay] = Date().split(' ').slice(0,3);
  return `${wkday} ${month} ${parseInt(calendarDay)}`;
}

const createTask = ({ name, key, id }) => {
    return {
        key,
        taskName: name,
        shortId: id,
        shouldDelete: false,
        recordedTime: 0,
    }
};

const createTasks = (tasks) => {
    return tasks.map(taskName => {
        return createTask({
            name: taskName,
            key: shortId.generate(),
            id: shortId.generate(),
        })
    });
};


const createProject = ({ name, tasks, id }) => {
    return {
        tasks,
        projectName: name,
        shortId: id,
    }
};

const postProject = (url, newProject) => {
    axios.post(url, newProject)
        .then((res) => {
	    if (res.status === 201) {
		    console.log(`Project '${newProject.projectName}' created successfully`);
	    } else { 
		    console.log(`Wrong status: ${res.status}`);
	    }
        })
        .catch((err) =>{
            console.log(err);
        });
};

(() => {
    const url = 'http://18.189.29.126:3002/projects';
    const _tasks = createTasks(tasks);
    const project = createProject({
        name: generateProjectName(),
        id: shortId.generate(),
        tasks: _tasks,
    });

    postProject(url, project);
})();
