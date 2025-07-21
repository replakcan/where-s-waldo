const prisma = require("../lib/prisma");

exports.findManyUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();

    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  const { name, game_time } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        game_time,
      },
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
};
