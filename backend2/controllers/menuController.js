
const prisma = require("../lib/prisma");
async function getMenuData(req, res, next) {
  try {
    const menuData = await prisma.menu.findMany();
    res.json(menuData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getMenuData,
};
