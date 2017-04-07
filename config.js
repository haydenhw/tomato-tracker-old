require('dotenv').config()

exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       'mongodb://hayden321:46869269a@ds155130.mlab.com:55130/new-fullstack-boilerplate-test';
              
exports.PORT = process.env.PORT || 3001;
