const axios = require('axios');
const Papa = require('papaparse');

const fetchOnlineDataFromUrl = async (url) => {
  try {
    const response = await axios.get(url);
    const csvData = response.data;

    return new Promise((resolve, reject) => {
      Papa.parse(csvData, {
        header: true,
        complete: (result) => {
          resolve(result.data);
        },
        error: (error) => {
          reject(error.message);
        }
      });
    });
  } catch (error) {
    return { error: error };
  }
};

const logDataUrlObjectMapper = async (payload) => {
  const { url } = payload;

  try {
    const rawLogData = await fetchOnlineDataFromUrl(url);
    return rawLogData;
  } catch (error) {
    return { error: error };
  }
};

module.exports = {
  logDataUrlObjectMapper
};
