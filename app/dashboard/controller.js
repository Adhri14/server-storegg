module.exports = {
  index: async (req, res) => {
    try {
      res.render("index", { title: "Home" });
    } catch (error) {
      console.log(error);
    }
  },
};
