const prisma = require("../lib/prisma");
const moment = require('moment-timezone');

async function makeReservation(req, res) {
  try {
    const { reservationDate, tableNumber, userId } = req.body;
    // Convert the incoming UTC date string back to a Date object
    const reservationDateTimeUTC = moment.utc(reservationDate).toDate();
    // Convert UTC time to local time ('Europe/Bratislava' timezone in this case)
    const reservationDateTimeLocal = moment(reservationDateTimeUTC).tz('Europe/Bratislava').toDate();

    // Check for existing reservations for this table within 1.5 hours of the requested time
    const existingReservations = await prisma.reservation.findMany({
      where: {
        table: Number(tableNumber),
        AND: [{
          reservationDate: {
            gte: new Date(reservationDateTimeLocal - 90 * 60 * 1000) // 1.5 hours before
          }
        }, {
          reservationDate: {
            lte: new Date(reservationDateTimeLocal.getTime() + 90 * 60 * 1000) // 1.5 hours after
          }
        }]
      }
    });

    if (existingReservations.length > 0) {
      return res.status(400).json({ error: 'Table is already booked for this time slot.' });
    }

    // Create new reservation with the local time
    const reservation = await prisma.reservation.create({
      data: {
        reservationDate: reservationDateTimeLocal,
        table: Number(tableNumber),
        userId: Number(userId)
      }
    });

    res.status(200).json({ reservationId: reservation.id });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { makeReservation };
