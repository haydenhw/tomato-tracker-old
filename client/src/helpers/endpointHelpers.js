import { PROJECTS_PATH, TEST_BASE_URL } from '../constants/endpointConstants';

const nodeEnv = process.env.NODE_ENV;

const getEntityUrls = (baseUrl, entityPath) => ({
  development: entityPath,
  production: entityPath,
  test: baseUrl + entityPath,
});

export const projectUrls = getEntityUrls(TEST_BASE_URL, PROJECTS_PATH);

export const projectsUrl = projectUrls[nodeEnv];
