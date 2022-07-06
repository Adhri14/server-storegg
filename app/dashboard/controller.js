const Nominal = require("../nominal/model");
const Voucher = require("../voucher/model");
const Transaction = require("../transaction/model");
const Players = require("../player/model");
module.exports = {
  index: async (req, res) => {
    try {
      // console.log(req.session.user);
      const user = req.session.user;
      const dataPlayer = await Players.find();
      const nominals = await Nominal.countDocuments();
      const vouchers = await Voucher.countDocuments();
      const transaction = await Transaction.countDocuments();
      const players = await Players.countDocuments();
      res.render("index", {
        title: "Home",
        user: user.name,
        count: {
          transaction,
          nominals,
          vouchers,
          players,
        },
        users: dataPlayer,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
