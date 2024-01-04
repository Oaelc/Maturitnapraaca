const prisma = require('../lib/prisma');

const makeReservation = async (req, res) => {
  try {
    const { reservationDate, tableNumber, userId } = req.body;
    const reservation = await prisma.reservation.create({
      data: { reservationDate, table: Number(tableNumber), userId: Number(userId) },
    });

    res.json({ reservationId: reservation.id });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

async function deleteReservation(req, res) {
  try {
    const reservationId = Number(req.params.reservationId);
    await prisma.order.deleteMany({
      where: { reservationId: reservationId },
    });
    await prisma.reservation.delete({
      where: { id: reservationId },
    });
    res.json({ message: 'Reservation and related orders deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const checkTableAvailability = async (req, res) => {
  try {
    const { reservationDate, tableNumber } = req.body;
    const duration = 60 * 60000; // 1 hour

    const requestedStartTime = new Date(reservationDate);
    const requestedEndTime = new Date(requestedStartTime.getTime() + duration);

    const overlappingReservation = await prisma.reservation.findFirst({
      where: {
        table: Number(tableNumber),
        AND: [
          {
            reservationDate: {
              lt: requestedEndTime
            }
          },
          {
            reservationDate: {
              gte: requestedStartTime
            }
          }
        ]
      }
    });

    if (overlappingReservation) {
      return res.status(409).json({ message: 'Table is already occupied at that time.' });
    }

    res.json({ message: 'Table is available.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { makeReservation, deleteReservation, checkTableAvailability };
