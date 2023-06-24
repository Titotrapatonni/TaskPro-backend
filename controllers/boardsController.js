const Board = require("../models/board");
// const { HttpError } = require("../helpers");
const { controllerWrapper } = require("../decorators");

const getAllBoards = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Board.find({ owner }).populate(
    "owner",
    "_id name email"
  );
  res.json(result);
};

const addBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Board.create({ ...req.body, owner });

  res.status(201).json(result);
};

module.exports = {
  getAllBoards: controllerWrapper(getAllBoards),
  addBoard: controllerWrapper(addBoard),
};
