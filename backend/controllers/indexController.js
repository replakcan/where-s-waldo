const prisma = require("../lib/prisma");

exports.getAllTargets = async (req, res, next) => {
  try {
    const targets = await prisma.target.findMany();

    res.json(targets);
  } catch (error) {
    next(error);
  }
};

exports.getTargetById = async (req, res, next) => {
  const { targetId } = req.params;

  try {
    const target = await prisma.target.findFirstOrThrow({
      where: {
        id: targetId,
      },
    });

    res.json(target);
  } catch (error) {
    next(error);
  }
};
