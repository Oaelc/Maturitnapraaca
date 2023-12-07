const prisma = require("../lib/prisma");

async function getDailyMenu(req, res, next) {
    const { day } = req.params;
    console.log(day)
    const dailymenu = await prisma.dailymenu.findFirst({
      where:{
        day:day
      }
    })
    res.status(200).json({data:dailymenu})
}


module.exports = {
  getDailyMenu,
};
