import { prisma } from "./../lib/prisma.js";

const getMenuByUser = async (req, res) => {
  const userId = Number(req.user.id);
  console.log(req.user);
  const categories = await prisma.category.findMany({
    where: {
      userId,
      isActive: true,
    },
    include: {
      products: {
        where: {
          isActive: true,
        },
        orderBy: {
          name: "asc",
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  res.json({ categories });
};

export default getMenuByUser;
