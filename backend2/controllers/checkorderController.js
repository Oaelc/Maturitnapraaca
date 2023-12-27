const prisma = require("../lib/prisma");

async function getOrdersWithDetails(req, res) {
  try {
    const orders = await prisma.reservation.findMany({
      include: {
        user: true,
        orders: {
          include: {
            menu: true
          }
        }
      }
    });

    const ordersDetails = orders.map(order => ({
      userName: order.user.username,
      reservationDate: order.reservationDate,
      tableNumber: order.table,
      meals: order.orders.map(o => o.menu.item)
    }));

    res.status(200).json(ordersDetails);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

module.exports = { getOrdersWithDetails };
