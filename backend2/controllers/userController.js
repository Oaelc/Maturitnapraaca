const prisma = require("../lib/prisma");

async function Register(req, res) {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password,
      },
    });
    console.log(user);
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}



async function getUserDetails(req, res) {
  const { username } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },

    });
    console.log(user);
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}





async function Login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const validPassword = user.password === password;

    if (!validPassword) {
      return res.status(401).json({ error: 'Password is not valid' });
    }

    req.session.user = user;
    req.session.isAuth = true;

    res.status(200).json({ message: 'You have been successfully logged in!'});
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}







async function Logout(req,res){
    req.session.destroy((err)=>{
        if(err){
          res.status(500).json({message:"Failed to logout."})
        }
        res.clearCookie('connect.sid');
        res.status(200).json({message:"Logged out sucessfuly."})
      })
    }


module.exports = { Register, Login, Logout, getUserDetails };
