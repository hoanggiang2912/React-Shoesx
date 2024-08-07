const UsersModel = require("../models/UsersModel");
const bcrypt = require("bcryptjs");
const { passwordValidator, singlePasswordValidator } = require("../validation");

exports.getAll = async () => {
  const users = await UsersModel.find({});
  return users;
};

exports.getOne = async (id) => {
  const user = await UsersModel.findById(id);
  return user;
};

exports.getById = async (id) => {
  const user = await UsersModel.findById(id);
  return user;
};

exports.getByEmail = async (email) => {
  const user = await UsersModel.findOne({ email: email });
  return user;
};

exports.update = async (id, user) => {
  const updatedUser = await UsersModel.updateOne(
    { _id: id },
    {
      $set: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        role: user.role,
        addresses: user.addresses,
        phone: user.phone,
      },
    }
  );
  return updatedUser;
};

// Function to update tokenExpiry for a user
exports.updateTokenExpiry = async (userId) => {
  try {
    const newExpiryTime = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour from now

    const updatedUser = await UsersModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          tokenExpiry: newExpiryTime,
        },
      },
      { new: true }
    ); // { new: true } option returns the document after update

    return updatedUser;
  } catch (error) {
    res.json({ message: error });
  }
};

exports.updateSecurityToken = async (id, token) => {
  try {
    const updatedUser = await UsersModel.updateOne(
      { _id: id },
      {
        $set: {
          resetToken: token,
          tokenExpiry: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
        },
      }
    );

    if (!updatedUser) return { message: "Update user failed" };

    return updatedUser;
  } catch (error) {
    console.error("Error updating security token:", error);
    return { message: error };
  }
};

// update password function --> forgot password
exports.updatePassword = async (id, password) => {
  const { error } = singlePasswordValidator({
    password,
  });

  if (error) res.json({ message: error });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await UsersModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    return updatedUser;
  } catch (error) {
    console.error("Error updating password:", error);
    res.json({ message: error });
  }
};

// change password function --> change password
exports.changePassword = async (id, password) => {
  const { error } = passwordValidator({
    oldPassword: password.oldPassword,
    newPassword: password.newPassword,
  });

  if (error) return { message: error.details[0].message };

  const hashedPassword = await bcrypt.hash(password.newPassword, 10);
  const updatedUser = await UsersModel.updateOne(
    { _id: id },
    {
      $set: {
        password: hashedPassword,
      },
    }
  );
  return updatedUser;
};

exports.updateRole = async (id, role) => {
  const updatedUser = await UsersModel.updateOne(
    { _id: id },
    {
      $set: {
        role: role,
      },
    }
  );
  return updatedUser;
};

exports.create = async (user) => {
  const newUser = new UsersModel({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    role: user.role,
    addresses: user.addresses,
    phone: user.phone,
  });

  try {
    const saveUser = await newUser.save();
    return saveUser;
  } catch (error) {
    console.error("Error creating user:", error);
    return { message: error };
  }
};

exports.delete = async (id) => {
  const removedUser = await UsersModel.deleteOne({ _id: id });
  return removedUser;
};
