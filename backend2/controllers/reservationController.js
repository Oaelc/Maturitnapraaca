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
  const reservationId = Number(req.params.reservationId);
  console.log("Attempting to delete reservation with ID:", reservationId); // Console log for debugging

  try {
    const existingReservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
    });

    if (!existingReservation) {
      console.log(`Reservation with ID ${reservationId} not found`); // Additional log
      return res.status(404).json({ error: `Reservation with ID ${reservationId} not found` });
    }

    await prisma.$transaction([
      prisma.order.deleteMany({
        where: { reservationId: reservationId },
      }),
      prisma.reservation.delete({
        where: { id: reservationId },
      })
    ]);

    res.json({ message: 'Order and reservation deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const checkTableAvailability = async (req, res) => {
  try {
    const { reservationDate, tableNumber } = req.body;
    const duration = 90 * 60000; // 1.5 hours

    const requestedStartTime = new Date(reservationDate);
    const requestedEndTime = new Date(requestedStartTime.getTime() + duration);

    const overlappingReservation = await prisma.reservation.findFirst({
      where: {
        table: Number(tableNumber),
        AND: [
          {
            reservationDate: {
              lt: requestedEndTime,
            },
          },
          {
            reservationDate: {
              gte: new Date(requestedStartTime.getTime() - duration),
            },
          },
        ],
      },
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
