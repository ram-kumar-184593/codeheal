// placeholder for business logic related to analysis

const Analysis = require('../models/Analysis');

exports.createAnalysis = async (data) => {
  const analysis = new Analysis(data);
  return await analysis.save();
};
