const prisma = require('../lib/prisma');

async function makeOrder(req, res) {
  try {
    const { reservation_id, menu_id } = req.body;
    console.log("Received order data:", req.body);
    if (!reservation_id || !menu_id) {
      return res.status(400).json({ error: 'Missing reservation_id or menu_id' });
    }

    const newOrder = await prisma.order.create({
      data: {
        reservationId: Number(reservation_id),
        menuId: Number(menu_id),
      },
    });
    res.json(newOrder);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getOrders(req, res) {
  console.log("Fetching orders"); // Add this line
  try {
    const orders = await prisma.order.findMany({
      include: {
        reservation: {
          include: {
            user: true,
          },
        },
        menu: true,
      },
    });
    res.json(orders);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
async function deleteOrder(req, res) {
  try {
    const reservationId = Number(req.params.reservationId);
    await prisma.order.deleteMany({
      where: { reservationId: reservationId },
    });
    await prisma.reservation.delete({
      where: { id: reservationId },
    });
    res.json({ message: 'Order and reservation deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { makeOrder, getOrders, deleteOrder };
