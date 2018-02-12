const axios = require('axios');


function stopRunningEntry() {
  const apiKey = process.env.TOGGL_API_KEY;

  axios({
    method: 'get',
    url: 'https://www.toggl.com/api/v8/time_entries/current',
    auth: {
      username: apiKey,
      password: 'api_token',
    }

  })
  .then(res => {
    const resData = res.data.data;

    return resData;
  })
  .then(resData => {
    if (!resData) {
      return console.log('No entry currently running');
    }

    const entryId = resData.id;
    console.log(entryId)
    axios({
      method: 'put',
      url: 'https://www.toggl.com/api/v8/time_entries/' + entryId + '/stop',
      auth: {
        username: apiKey,
        password: 'api_token',
      }
    })
    .then(res => {
      const json = res.data;
      // console.log(res.data);
      console.log(JSON.stringify(json, null, 2));
    });
  })
  .catch(err => console.error(err))
}

module.exports = stopRunningEntry;
