import { User } from "../models/User.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { httpStatusCode } from "../../utils/httpStatusCode.js";

//import sendMail from "./sendMail.js";
import nodemailer from "nodemailer";
const loginUser = async (req, res, next) => {
  try {
    const { body } = req;
    console.log(body.password, 60);
    // Comprobar email
    const user = await User.findOne({ user: body.user });
    console.log(user, 63);

    // Comprobar password
    const isValidPassword = await bcrypt.compare(body.password, user.password);
    // Control de LOGIN
    if (!user || !isValidPassword) {
      const error = {
        status: 401,
        message: "The email & password combination is incorrect!",
      };
      return next(error);
    }

    // TOKEN JWT
    const token = jwt.sign(
      {
        id: user._id,
        user: user.user,
      },
      req.app.get("secretKey"),
      { expiresIn: "1h" }
    );

    // Response
    return res.json({
      status: 200,
      message: httpStatusCode[200],
      data: {
        id: user._id,
        user: user.user,
        token: token,
        rol: user.rol,
      },
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
const logoutUser = async (req, res, next) => {
  try {
    req.authority = null;
    return res.json({
      status: 200,
      message: "logged out",
      token: null,
    });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

const getUserActive = async (req, res, next) => {
  try {
    const users = await User.findById();
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

// const deleteUser = async (req, res, next) => {

//   console.log('Entro');
//   try {
//     const { userId } = req.params;
//     console.log(userId,'usuario');
//     const userDelete = await User.findByIdAndDelete(userId);
//     return res.json({
//       status: 200,
//       message: httpStatusCode[200],
//       data: { user: userDelete },
//     });
//   } catch (error) {
//     return next(error);
//   }
// };

// const editUser = async (req, res, next) => {

//   const userPhoto = req.file_url;// me traigo la url de la foto
//   //console.log(userPhoto,37);
//   const bodyData = req.body;

//   if (userPhoto) { bodyData.image = userPhoto }
//   const { id: userId } = req.authority;

//   try {
//     const user = await User.findById(userId)
//     const userModify = new User(bodyData);

//     console.log(userModify,41)
//     //Para evitar que se modifique el id de mongo:
//     userModify._id = userId;
//     //buscamos por el id y le pasamos los campos a modificar
//     await User.findByIdAndUpdate(userId, userModify);

//     //retornamos respuesta de  los datos del objeto creado
//     return res.json({
//       status: 200,
//       message: httpStatusCode[200],
//       data: { user: userModify },
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

const registerUser = async (req, res, next) => {
  try {
    const { body } = req;
    console.log("Entro", body.mail);
    // Comprobar usuario
    const previousUser = await User.findOne({ mail: body.mail });
    console.log(previousUser, "previousUser");
    if (previousUser) {
      console.log("Ya existe el usuario");
      const error = new Error("The user is already registered!");
      return next(error);
    }

    // Encriptar password
    const pwdHash = await bcrypt.hash(body.password, 10);
    console.log(pwdHash, "pwdHAsh");
    // Crear usuario en DB
    const newUser = new User({
      user: body.user,
      tlf: body.tlf,
      mail: body.mail,
      password: pwdHash,
    });
    console.log(newUser, "newUser");

    const savedUser = await newUser.save();
    console.log(savedUser, "saveUser");

    // Respuesta
    return res.status(201).json({
      status: 201,
      message: httpStatusCode[201],
      data: {
        id: savedUser._id,
      },
    });
  } catch (error) {
    return next(error);
  }
};

// const assignAviso = ('/', async (req, res, next) => {

//   const { userId, avisoId, estado } = req.body;

//   try {

//     const estadoModify = await Avisos.findByIdAndUpdate(
//       avisoId,
//       {estado:estado}
//     );
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//         { $push: { assigned_avisos: avisoId } },
//         { new: true }
//     );
//     const updatedAviso = await Avisos.findByIdAndUpdate(
//       avisoId,
//         { $push: { user_assigned: userId } },
//         { new: true }
//     );
//     return res.status(200).json(updatedUser);
// } catch (error) {
//     return next(error);

// }
// })
const OrderClient =
  ("/",
  async (req, res, next) => {
    console.log("Entro");
    //const { userId, estado, avisoId, idUserOld } = req.body;
    try {
      const { userId } = req.params;
      console.log(userId);
      const userById = await User.findById(userId).populate([
        { path: "numeroPedido", select: "" },
      ]);

      return res.json({
        //  status : 200,
        //  message : httpStatusCode[200],
        data: { pedidos: userById },
      });
    } catch (error) {
      return next(error);
    }
  });

const getUserById = async (req, res, next) => {
  console.log("Entro id");
  try {
    const { id } = req.params;
    console.log(id);
    const userById = await User.findById(id);

    return res.status(200).json(userById);
    // return res.json({
    //     status: 200,
    //     message: httpStatusCode[200],
    //     data: { jobs: jobbyid },
    // });
    //res.send(jobbyid);
  } catch (error) {
    return next(error);
  }
};

const editUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id, 240);
    const pilotModify = new User(req.body);
    console.log(pilotModify, "userModify");
    //Para evitar que se modifique el id de mongo:
    pilotModify._id = id;
    const pilotUpdated = await User.findByIdAndUpdate(id, pilotModify);
    return res.json({
      status: 200,
      message: httpStatusCode[200],
      data: { pilot: pilotUpdated },
    });
  } catch (error) {
    return next(error);
  }
};

const getUserByMail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const userById = await User.findOne({ mail: email });
    return res.status(200).json(userById);
    // return res.json({
    //     status: 200,
    //     message: httpStatusCode[200],
    //     data: { jobs: userById },
    // });
    //res.send(jobbyid);
  } catch (error) {
    return next(error);
  }
};

// const resetPassword = async (req, res, next) => {
//   console.log('entro');
//   try {
//     const { email } = req.params;
//     console.log(email,'mail');
//     const newPassword = req.body.nuevaContrasena;
//     console.log(newPassword,283);
//     const previousUser = await User.findOne({ mail: email });
//     console.log(previousUser,285)
//     const pwdHash = await bcrypt.hash(newPassword, 10);

//     console.log(pwdHash,previousUser,286)
//     //Para evitar que se modifique el id de mongo:
//     // pilotModify._id = id;
//     // const pilotUpdated = await User.findByIdAndUpdate(
//     //   id,
//     //   pilotModify
//     // );
//     // return res.json({
//     //   status: 200,
//     //   message: httpStatusCode[200],
//     //   data: { pilot: pilotUpdated },
//     // });
//   } catch (error) {
//     return next(error);
//   }
// };
const resetPassword = async (req, res, next) => {
  console.log("entro");

  try {
    const { email } = req.params;
    // Send email notification
    console.log(email, "email");

    //return res.status(200).send('User has been created and Email sent')
    console.log(email, "mail");
    //const newPassword = req.body.nuevaContrasena;
    // console.log(newPassword, 283);
    const previousUser = await User.findOne({ mail: email });
    // console.log(previousUser, 285);
    //await sendMail(email);
    if (!previousUser) {
      return res.status(404).json({
        status: 404,
        message: "Usuario no encontrado",
      });
    }
    //const user = await User.findOne({ user: body.user });
    const token = jwt.sign(
      {
        id: previousUser._id,
        user: previousUser.user,
      },
      req.app.get("secretKey"),
      { expiresIn: "1h" }
    );
    // const pwdHash = await bcrypt.hash(newPassword, 10);
    // previousUser.password = pwdHash;
    // console.log(previousUser);
    // await previousUser.save();
    //mail
    const config = {
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "oscarsmb@gmail.com",
        pass: "ewqt tsig kcdc pgjl",
      },
    };
    const mensaje = {
      from: "Coexist",
      to: email,
      subject: "Correo de Prubeas",
      //text: `https://angular-e-commerce-ruby.vercel.app/user/new${token}`
      text: `https://angular-e-commerce-ruby.vercel.app/user/new/${token}`,
    };

    const transport = nodemailer.createTransport(config);

    const info = await transport.sendMail(mensaje);
    // return res.status(200).json({
    //   status: 200,
    //   message: 'Contraseña actualizada con éxito',
    // });
    return res.json({
      status: 200,
      message: httpStatusCode[200],
      data: { previousUser: previousUser },
    });
  } catch (error) {
    return next(error);
  }
};

const changePassword = async (req, res, next) => {
  // const id = req.params;
  // const newPassword = req.body;
  // console.log(id, 369);
  // console.log(newPassword);
  const id = req.params.id.toString(); // Convertir a cadena si es necesario
  const nuevaContrasena = req.body.nuevaContrasena.toString(); // Convertir a cadena si es necesario
  console.log(id, nuevaContrasena,789);
   const userById = await User.findById(id);
   console.log(userById);
   const pwdHash = await bcrypt.hash(nuevaContrasena, 10);
   console.log(pwdHash);
   userById.password = pwdHash;
   await userById.save();

   //     console.log(pwdHash,previousUser,286)

  // return res.json({
  //   //  status : 200,
  //   //  message : httpStatusCode[200],
  //   data: { pedidos: userById },
  // });

  // const config ={
  //   host:'smtp.gmail.com',
  //   port : 587,
  //   auth: {
  //     user:'oscarsmb@gmail.com',
  //     pass:'ewqt tsig kcdc pgjl'
  //   }
  // }
  // const mensaje ={
  //   from: 'Coexist',
  //   to: emailSend,
  //   subject: 'Correo d eprubeas',
  //   text: 'Envio de correo de prueba'
  // }

  // const transport = nodemailer.createTransport(config);

  // const info = await transport.sendMail(mensaje);

  //console.log(info);
};

export {
  loginUser,
  logoutUser,
  registerUser,
  OrderClient,
  getUsers,
  getUserById,
  editUser,
  getUserByMail,
  resetPassword,
  changePassword,
};
