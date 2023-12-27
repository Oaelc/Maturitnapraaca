const prisma = require("../lib/prisma");

async function getDailyMenu(req, res, next) {
  const { day } = req.params;
  try {
    const dailymenu = await prisma.dailymenu.findMany({
      where: {
        day: day,
      },
    });
    res.status(200).json(dailymenu); // Send back the array of items
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAllMenuData(req, res, next) {
  try {
    const allMenuData = await prisma.dailymenu.findMany();
    res.json(allMenuData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteMenuItem(req, res, next) {
  const { id } = req.params;

  try {
    // Use Prisma to delete the menu item with the given ID
    const deletedItem = await prisma.dailymenu.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({ message: 'Menu item deleted successfully', deletedItem });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function editdailymenu(req, res, next) {
  const { id } = req.params;
  const { item, price, description, day } = req.body;

  console.log('Received request with day:', day);

  try {
    if (id) {
      // If ID is present, update the menu item
      const updatedItem = await prisma.dailymenu.update({
        where: {
          id: parseInt(id),
        },
        data: {
          item,
          price,
          description,
          day,
        },
      });

      res.status(200).json({ message: 'Menu item updated successfully', updatedItem });
    } else {
      // If ID is not present, add a new menu item
      const newItem = await prisma.dailymenu.create({
        data: {
          item,
          price,
          description,
          day,
        },
      });

      const allMenuData = await prisma.dailymenu.findMany();
      res.status(201).json({ message: 'Menu item added successfully', menuItems: allMenuData });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getDailyMenu,
  getAllMenuData,
  deleteMenuItem,
  editdailymenu,
};
