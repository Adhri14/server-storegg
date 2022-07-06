const Transaction = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      let transaction = await Transaction.find().populate("player");
      const user = req.session.user;
      res.render("admin/transaction/view_transaction", {
        transaction,
        message: alert,
        user: user.name,
        title: "Transaksi",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaction");
    }
  },
  actionApproved: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await Transaction.findOneAndUpdate({ _id: id }, { status });
      req.flash("alertMessage", "Berhasil terima transaksi");
      req.flash("alertStatus", "success");
      res.redirect("/transaction");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaction");
    }
  },
  actionRejected: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await Transaction.findOneAndUpdate({ _id: id }, { status });
      req.flash("alertMessage", "Berhasil tolak transaksi");
      req.flash("alertStatus", "success");
      res.redirect("/transaction");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaction");
    }
  },
};
