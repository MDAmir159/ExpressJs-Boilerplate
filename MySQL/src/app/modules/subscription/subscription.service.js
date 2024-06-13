const { v4: uuid } = require('uuid');
const {
  getAllSubscriptionQuery,
  createSubscriptionQuery,
  softDeleteSubscriptionByIdQuery,
  updateSubscriptionQuery,
  getSubscriptionByIdQuery
} = require('../../queries/subscriptionQueries');

const createSubscriptionService = async (payload) => {
  const id = uuid(); // Generate a new UUID
  const { name, pricing } = payload;

  const inputArray = [[id, name, pricing]];

  try {
    let response = await createSubscriptionQuery(inputArray);
    if (response.affectedRows !== 0 || response.changedRows !== 0) {
      return {
        id: id,
        name: name,
        pricing: pricing
      }
    }

  } catch (error) {
    return { error: error };
  }
};

const getAllSubscriptionsService = async () => {
  try {
    let docs = await getAllSubscriptionQuery();
    return docs;
  } catch (error) {
    return { error: error };
  }
};

const getSubscriptionByIdService = async (id) => {
  try {
    let docs = await getSubscriptionByIdQuery(id);
    return docs[0];
  } catch (error) {
    return { error: error };
  }
}

const updateSubscriptionService = async (payload) => {
  const { id, name, pricing } = payload;

  const inputObj = {id, name, pricing};

  try {
    let response = await updateSubscriptionQuery(inputObj);
    if (response.affectedRows !== 0 || response.changedRows !== 0) {
      return {
        id: id,
        name: name,
        pricing: pricing
      }
    }

  } catch (error) {
    return { error: error };
  }
};

const softDeleteSubscriptionByIdService = async (payload) => {
  const { id } = payload;
  try {
    const inputObj = { id };
    let docs = await softDeleteSubscriptionByIdQuery(inputObj);
    return { message: 'Successfully deleted' };
  } catch (error) {
    return { error: error };
  }
};
module.exports = {
  createSubscriptionService,
  getAllSubscriptionsService,
  getSubscriptionByIdService,
  updateSubscriptionService,
  softDeleteSubscriptionByIdService
  // getOperationByIdService
  // deleteCroppedRecordingsService
};
