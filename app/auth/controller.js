const Player = require("../player/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  signUp: async (req, res, next) => {
    try {
      const payload = req.body;
      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on("end", async () => {
          try {
            const player = new Player({
              name: payload.name,
              username: payload.username,
              email: payload.email,
              phoneNumber: payload.phoneNumber,
              favorite: payload.favorite,
              password: payload.password,
              avatar: filename,
            });
            await player.save();
            delete player._doc.password;

            res
              .status(201)
              .json({ message: "Registrasi berhasil", data: player });
          } catch (err) {
            res.status(500).json({ message: err.message });
          }
        });
      } else {
        const player = new Player(payload);
        await player.save();
        delete player._doc.password;

        res.status(201).json({
          message: "Registrasi berhasil",
          data: { user: player },
        });
      }
    } catch (error) {
      if (error && error.name === "ValidationError") {
        return res.status(422).json({
          error: 1,
          message: error.message,
          fields: error.errors,
        });
      }
      next(error);
    }
  },
  signin: (req, res, next) => {
    const { email, password } = req.body;
    Player.findOne({ email })
      .then((player) => {
        if (player) {
          const checkPassword = bycript.compareSync(password, player.password);
          if (checkPassword) {
            const token = jwt.sign(
              {
                player: {
                  id: player.id,
                  name: player.name,
                  username: player.username,
                  email: player.email,
                  avatar: player.avatar,
                  phoneNumber: player.phoneNumber,
                },
              },
              config.jwtKey
            );
            delete player._doc.password;
            res.status(200).json({
              message: "Berhasil Login",
              data: { token, user: player },
            });
          } else {
            res
              .status(403)
              .json({ message: "Password yang anda masukkan tidak sama" });
          }
        } else {
          res
            .status(403)
            .json({ message: "Email yang anda masukkan belum terdaftar!" });
        }
      })
      .catch((error) => {
        res
          .status(500)
          .json({ message: error.message || "Terjadi kesalahan pada server!" });
        next();
      });
  },
  signout: (req, res) => {
    // if (!req.session) {
    //   return res.status(404).json({ message: "User tidak ditemukan" });
    // }
    res.status(200).json({ data: "Message" });
  },
};
