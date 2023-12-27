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

async function editMenu(req, res, next) {
  try {
    const { item, price, description } = req.body;

    const createdData = await prisma.menu.create({
      data: {
        item,
        price,
        description,
      },
    });

    res.json(createdData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteMenu(req, res, next) {
  try {
    const itemId = parseInt(req.params.id);

    // Delete the menu item with the specified id
    await prisma.menu.delete({
      where: {
        id: itemId,
      },
    });

    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getMenuData,
  editMenu,
  deleteMenu,
};
