const Category = require("./model");
module.exports = {
  index: async (req, res) => {
    try {
      const user = req.session.user;
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const categories = await Category.find();
      res.render("admin/category/view_category", {
        title: "Kategori",
        categories,
        message: alert,
        user: user.name,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },
  viewCreate: async (req, res) => {
    try {
      const user = req.session.user;
      res.render("admin/category/create", {
        title: "Tambah Kategori",
        user: user.name,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;
      let category = await Category({ name });
      await category.save();
      req.flash("alertMessage", "Berhasil tambah kategori");
      req.flash("alertStatus", "success");
      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const user = req.session.user;
      const { id } = req.params;
      let category = await Category.findOne({ _id: id });

      res.render("admin/category/edit", {
        category,
        title: "Edit Kategori",
        user: user.name,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      await Category.findOneAndUpdate({ _id: id }, { name });
      req.flash("alertMessage", "Berhasil ubah kategori");
      req.flash("alertStatus", "success");
      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Category.findOneAndDelete({ _id: id });
      req.flash("alertMessage", "Berhasil hapus kategori");
      req.flash("alertStatus", "success");
      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },
};
