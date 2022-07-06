const Payment = require("./model");
const Bank = require("../bank/model");
module.exports = {
  index: async (req, res) => {
    try {
      const user = req.session.user;
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const payment = await Payment.find().populate("banks");
      res.render("admin/payment/view_payment", {
        title: "Payment",
        payment,
        message: alert,
        user: user.name,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
  viewCreate: async (req, res) => {
    try {
      const user = req.session.user;
      const bank = await Bank.find();
      res.render("admin/payment/create", {
        title: "Tambah Payment",
        bank,
        user: user.name,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { banks, type } = req.body;
      let payment = await Payment({ banks, type });
      await payment.save();
      req.flash("alertMessage", "Berhasil tambah payment");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const user = req.session.user;
      const { id } = req.params;
      let payment = await Payment.findOne({ _id: id }).populate("banks");
      const bank = await Bank.find();
      res.render("admin/payment/edit", {
        payment,
        title: "Edit Payment",
        bank,
        user: user.name,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { type, banks } = req.body;
      await Payment.findOneAndUpdate({ _id: id }, { type, banks });
      req.flash("alertMessage", "Berhasil ubah payment");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
  actionEditStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await Payment.findOneAndUpdate({ _id: id }, { status });
      req.flash("alertMessage", "Berhasil ubah status payment");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Payment.findOneAndDelete({ _id: id });
      req.flash("alertMessage", "Berhasil hapus payment");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
};
