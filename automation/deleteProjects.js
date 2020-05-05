/* eslint-disable no-trailing-spaces,no-underscore-dangle,no-plusplus */

const axios = require('axios');
const { PROJECT_URL } = require('./config');

(async () => {
  const url = PROJECT_URL ;
  const numToDelete = process.argv[2];

  if (numToDelete == null) {
    throw new Error('Please specify the number of projects to delete');
  }

  const { data } = await axios(url);

  for (let i = 0; i < numToDelete; i++) {
    const projectId = data.projects[i]._id;
    const response = await axios.delete(`${url}/${projectId}`);
    console.log('Response status', response.status);
  }
})();
