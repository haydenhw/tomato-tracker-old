const axios = require('axios');
const util = require('util');

const print = (object) => {
  console.log(util.inspect(object, {showHidden: false, depth: null, colors: true}), '\n')
};

function Postman(domain) {
  this.domain = domain;
}

Postman.prototype.get = async function (path, config = {}) {
  try {
    const url = this.domain + path;
    console.log('\n', 'GET Request To:', url, '\n');
    const {data} = await axios(url, config);
    return data;
  } catch (err) {
    console.log('\n', err.message, '\n');
  }
};


Postman.prototype.post = async function (path, body = {}, config = {}) {
  try {
    const url = this.domain + path;
    console.log('\n', 'POST Request To:', url, '\n');
    const response = await axios.post(url, body, config);
    console.log('\n', 'Response status:', response.status, '\n');
    console.log('\n', 'Response data:', response.data, '\n');
    return response;
  } catch (err) {
    console.log('\n', 'ERROR:');
    console.log('\n', err.response.data, '\n');
  }
};

Postman.prototype.patch = async function (path, body = {}, config = {}) {
  try {
    const url = this.domain + path;
    console.log('\n', 'PATCH Request To:', url, '\n');
    const response = await axios.patch(url, body, config);
    console.log('\n', 'Response status:', response.status, '\n');
    console.log('\n', 'Response data:', response.data, '\n');
    return response
  } catch (err) {
    console.log('\n', 'ERROR:');
    console.log('\n', err.response.data, '\n');
  }
}

Postman.prototype.put = async function (path, body = {}, config = {}) {
  try {
    const url = this.domain + path;
    console.log('\n', 'PUT Request To:', url, '\n');
    const response = await axios.put(url, body, config);
    console.log('\n', 'Response status:', response.status, '\n');
    console.log('\n', 'Response data:', response.data, '\n');
    return response
  } catch (err) {
    console.log('\n', 'ERROR:');
    console.log('\n', err.response.data, '\n');
  }
}

Postman.prototype.delete = async function (path, body = {}, config = {}) {
  try {
    const url = this.domain + path;
    console.log('\n', 'DELETE Request To:', url, '\n');
    const response = await axios.delete(url);
    console.log('\n', 'Response status:', response.status, '\n');
    console.log('\n', 'Response data:', response.data, '\n');
    return response
  } catch (err) {
    console.log('\n', 'ERROR:');
    console.log('\n', err.response.data, '\n');
  }
}

module.exports = Postman;

