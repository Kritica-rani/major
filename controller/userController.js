//import the user model
const User = require("../model/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

module.exports.signUp = async (req, res) => {
  try {
    //1. get the data from req.body
    const { name, email, password, confirmPassword } = req.body;

    //2. check if password and confirm password are equal
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and confirmPassword do not match!!",
        data: {},
      });
    }
    //3. check if the user exist by the given email or not
    const existingUser = await User.findOne({ email: email });
    //if existing user is there then error else create use
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
        data: {},
      });
    }
    //encrypt the password
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    //4. create the user
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "User create succesfully",
      data: {
        name,
        email,
      },
    });
  } catch (err) {
    //send the error response
    res.status(500).json({
      message: "Oops something went wrong while creating user!!",
      data: {
        err,
      },
    });
  }
};

// signin controller
module.exports.signIn = async (req, res) => {
  try {
    console.log("re", req.body);
    //1. fetch email and password from req.body
    const { email, password } = req.body;
    //2. fetch userData by using the emailID
    const user = await User.findOne({ email: email });
    //3. check whether user exist or not
    if (!user) {
      return res.status(400).json({
        message: "Please signup to use our platform!!",
        data: {},
      });
    }
    //4. compare both the credentials (user enterredpassword and paswd in db)
    const isPasswordMatched = bcrypt.compareSync(password, user.password); //method will return a boolean value
    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "email/password does not match",
        data: [],
      });
    }
    const token = jwt.sign({ email: user.email }, "secretkey", {
      expiresIn: "1h",
    });
    return res.status(200).json({
      message: "User logged in sucessfully!!",
      data: { token },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Oops something went wrong while logging in!!",
      data: {
        err,
      },
    });
  }
};
