const Bank = require("./model");
module.exports = {
  index: async (req, res) => {
    try {
      const user = req.session.user;
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const bank = await Bank.find();
      res.render("admin/bank/view_bank", {
        title: "Bank",
        bank,
        message: alert,
        user: user.name,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
  viewCreate: async (req, res) => {
    try {
      const user = req.session.user;
      res.render("admin/bank/create", {
        title: "Tambah Bank",
        user: user.name,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, bankName, noRekening } = req.body;
      let nominal = await Bank({ name, bankName, noRekening });
      await nominal.save();
      req.flash("alertMessage", "Berhasil tambah nominal");
      req.flash("alertStatus", "success");
      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const user = req.session.user;
      const { id } = req.params;
      let bank = await Bank.findOne({ _id: id });
      res.render("admin/bank/edit", {
        bank,
        title: "Edit Bank",
        user: user.name,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, bankName, noRekening } = req.body;
      await Bank.findOneAndUpdate({ _id: id }, { name, bankName, noRekening });
      req.flash("alertMessage", "Berhasil ubah bank");
      req.flash("alertStatus", "success");
      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Bank.findOneAndDelete({ _id: id });
      req.flash("alertMessage", "Berhasil hapus bank");
      req.flash("alertStatus", "success");
      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
};
