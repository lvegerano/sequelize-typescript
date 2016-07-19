///<reference path="typings/node/node.d.ts"/>

export var config = {
  port: getEnvVariable('PORT', true) || 3000,
  environment: getEnvVariable('ENVIRONMENT'),
  database: {
    name: getEnvVariable('DB_NAME'),
    dialect: getEnvVariable('DB_DIALECT'),
    host: getEnvVariable('DB_HOST'),
    username: getEnvVariable('DB_USERNAME'),
    password: getEnvVariable('DB_PWD'),
  },
  soap: {
    timeout: 1000 * 60 * 5,
    providerId: 'DE*ICE',
    geoFormat: 'Google',
    evseDataEndpoint: getEnvVariable('HBS_EVSE_DATA_ENDPOINT'),
    evseStatusEndpoint: getEnvVariable('HBS_EVSE_STATUS_ENDPOINT')
  },
  cronjob: {
    evseData: '00 00 01 * * *', // every day at 01:00
    evseStatus: '00 */5 * * * *', // every 5 minutes
  },
};

function getEnvVariable(key: string, isOptional = false) {

  const variable = process.env[key];

  if (variable === void 0 && !isOptional) {

    throw new Error('Environment variable is missing: ' + key);
  }
  return variable;
}
