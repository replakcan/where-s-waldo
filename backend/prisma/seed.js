const prisma = require("../lib/prisma");

const targets = [
  {
    name: "Odlaw",
    topLeftX: 0.1,
    topLeftY: 0.325,
    bottomRightX: 0.113,
    bottomRightY: 0.37,
  },
  {
    name: "Whitebeard",
    topLeftX: 0.263,
    topLeftY: 0.325,
    bottomRightX: 0.278,
    bottomRightY: 0.36,
  },
  {
    name: "Wenda",
    topLeftX: 0.765,
    topLeftY: 0.38,
    bottomRightX: 0.778,
    bottomRightY: 0.405,
  },
  {
    name: "Waldo",
    topLeftX: 0.609,
    topLeftY: 0.345,
    bottomRightX: 0.628,
    bottomRightY: 0.375,
  },
  {
    name: "Woof",
    topLeftX: 0.674,
    topLeftY: 0.345,
    bottomRightX: 0.687,
    bottomRightY: 0.36,
  },
  {
    name: "key",
    topLeftX: 0.163,
    topLeftY: 0.776,
    bottomRightX: 0.169,
    bottomRightY: 0.786,
  },
  {
    name: "binoculars",
    topLeftX: 0.272,
    topLeftY: 0.616,
    bottomRightX: 0.287,
    bottomRightY: 0.631,
  },
  {
    name: "snorkel",
    topLeftX: 0.219,
    topLeftY: 0.811,
    bottomRightX: 0.237,
    bottomRightY: 0.841,
  },
  {
    name: "bone",
    topLeftX: 0.787,
    topLeftY: 0.701,
    bottomRightX: 0.796,
    bottomRightY: 0.711,
  },
  {
    name: "scroll",
    topLeftX: 0.527,
    topLeftY: 0.776,
    bottomRightX: 0.537,
    bottomRightY: 0.791,
  },
  {
    name: "camera",
    topLeftX: 0.812,
    topLeftY: 0.48,
    bottomRightX: 0.821,
    bottomRightY: 0.485,
  },
  {
    name: "ww1",
    topLeftX: 0.274,
    topLeftY: 0.49,
    bottomRightX: 0.287,
    bottomRightY: 0.515,
  },
  {
    name: "ww2",
    topLeftX: 0.356,
    topLeftY: 0.71,
    bottomRightX: 0.368,
    bottomRightY: 0.74,
  },
  {
    name: "ww3",
    topLeftX: 0.678,
    topLeftY: 0.681,
    bottomRightX: 0.693,
    bottomRightY: 0.716,
  },
  {
    name: "ww4",
    topLeftX: 0.724,
    topLeftY: 0.826,
    bottomRightX: 0.737,
    bottomRightY: 0.841,
  },
  {
    name: "ww5",
    topLeftX: 0.909,
    topLeftY: 0.326,
    bottomRightX: 0.918,
    bottomRightY: 0.336,
  },
  {
    name: "ww6",
    topLeftX: 0.631,
    topLeftY: 0.456,
    bottomRightX: 0.64,
    bottomRightY: 0.476,
  },
];

async function main() {
  for (const target of targets) {
    await prisma.target.create({ data: target });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
