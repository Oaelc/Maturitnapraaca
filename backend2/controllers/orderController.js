const prisma = require("../lib/prisma");

async function makeOrder(req, res) {
  try {
    const { reservation_id, menu_id } = req.body;

    // Assuming menu_id is an array of menu item IDs
    for (let id of menu_id) {
      await prisma.order.create({
        data: {
          reservationId: reservation_id,
          menuId: id,
        },
      });
    }

    res.status(200).json({ message: 'Order created successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  makeOrder,
};
