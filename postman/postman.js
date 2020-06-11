const axios = require('axios');
const Postman = require('./lib');

const pm = new Postman('http://localhost:3006/');

const api = {
  async logGet(path) {
    const data = await pm.get(path);
    console.log(require('util').inspect(data, false, null, true))
  },
  async get(path) {
    return await pm.get(path);
  },
  async post(path, body) {
    await pm.post(path, body)
  },
  async patch(path, body) {
    await pm.patch(path, body)
  },
  async put(path, body) {
    await pm.put(path, body)
  },
  async delete(path) {
    await pm.delete(path)
  }
}

const testProjects = {
  projectName: 'Newest Daily Project',
  shortId: 'abc',
  isDailyProject: true,
  tasks: [],
}

const main = async () => {
   await api.logGet('projects')
  //await api.post('projects', testProjects)
}
main();


















