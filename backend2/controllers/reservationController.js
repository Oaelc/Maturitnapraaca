// reservationController.js

const prisma = require("../lib/prisma");

async function makeReservation(req, res, next) {
  try {
    const { reservationDate, tableNumber } = req.body;
    const userId = 1; // You may get the user ID from the authentication system

    const reservation = await prisma.reservation.create({
      data: {
        reservationDate,
        table: Number(tableNumber),
        userId,
      },
    });

    res.json(reservation);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  makeReservation,
};
