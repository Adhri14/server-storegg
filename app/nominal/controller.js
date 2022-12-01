const Nominal = require("./model");
module.exports = {
    index: async (req, res) => {
        try {
            const user = req.session.user;
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus };
            const nominal = await Nominal.find();
            res.render("admin/nominal/view_nominal", {
                title: "Nominal",
                data: nominal,
                message: alert,
                user: user.name,
            });
        } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/nominal");
        }
    },
    viewCreate: async (req, res) => {
        try {
            const user = req.session.user;
            res.render("admin/nominal/create", {
                title: "Tambah Nominal",
                user: user.name,
            });
        } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/nominal");
        }
    },
    actionCreate: async (req, res) => {
        try {
            const { coinName, coinQuantity, price } = req.body;
            let nominal = await Nominal({ coinName, coinQuantity, price });
            await nominal.save();
            req.flash("alertMessage", "Berhasil tambah nominal");
            req.flash("alertStatus", "success");
            res.redirect("/nominal");
        } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/nominal");
        }
    },
    viewEdit: async (req, res) => {
        try {
            const user = req.session.user;
            const { id } = req.params;
            let nominal = await Nominal.findOne({ _id: id });
            res.render("admin/nominal/edit", {
                nominal,
                title: "Edit Nominal",
                user: user.name,
            });
        } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/nominal");
        }
    },
    actionEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const { cointName, cointQuantity, price } = req.body;
            await Nominal.findOneAndUpdate(
                { _id: id },
                { cointName, cointQuantity, price }
            );
            req.flash("alertMessage", "Berhasil ubah nominal");
            req.flash("alertStatus", "success");
            res.redirect("/nominal");
        } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/nominal");
        }
    },
    actionDelete: async (req, res) => {
        try {
            const { id } = req.params;
            await Nominal.findOneAndDelete({ _id: id });
            req.flash("alertMessage", "Berhasil hapus nominal");
            req.flash("alertStatus", "success");
            res.redirect("/nominal");
        } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/nominal");
        }
    },
};
