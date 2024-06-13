const { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR, CREATED } = require("../../HTTPStatus");
const {
  getAllSubscriptionsService,
  createSubscriptionService,
  softDeleteSubscriptionByIdService,
  updateSubscriptionService,
  getSubscriptionByIdService
} = require("./subscription.service");

const createSubscription = async (req, res) => {
  try {
    let docs = await createSubscriptionService(req.body);
    if (docs?.error) {
      throw (docs?.error)
    }
    return res.status(CREATED).send(docs);
  } catch (error) {
    next(error);
  }
}

const getAllSubscriptions = async (req, res, next) => {

  try {
    let result = await getAllSubscriptionsService();
    if (result?.error) {
      throw (error)
    }
    return res.status(OK).send(result);
  } catch (error) {
    next(error);
  }
}

const getSubscriptionById = async (req, res, next) => {
  const { id } = req.params;
  try {
    let result = await getSubscriptionByIdService(id);
    if (result?.error) {
      throw (error)
    }
    return res.status(OK).send(result);
  } catch (error) {
    next(error);
  }
}

const updateSubscription = async (req, res, next) => {
  try {
    let result = await updateSubscriptionService(req.body);
    if (result?.error) {
      throw (error)
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

const softDeleteSubscriptionById = async (req, res, next) => {
  try {
    let result = await softDeleteSubscriptionByIdService(req.params);
    if (result?.error) {
      throw (result?.error)
    }
    return res.status(OK).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  softDeleteSubscriptionById
}