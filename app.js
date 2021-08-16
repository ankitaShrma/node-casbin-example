require("dotenv").config();
const express = require("express");
const app = express();
const { getDefaultEnforcer } = require("./casbinHelper");
app.get("/", function (req, res) {
  res.send("Hello World");
});
// route with parameters
// matches to : /books/stephenking/category/horror
app.get("/user/:userId/domain/:domainId", async function (req, res) {
  console.log(req.params, req.url);
  try {
    const enforcer = await getDefaultEnforcer({
      user: req.params.userId,
      domain: req.params.domainId,
    });

    // const [enforced, explained] = await enforcer.enforceEx(
    //   req.params.userId,
    //   this.resource,
    //   this.method
    // );

    res.send({ length: enforcer.model.model.get("p").get("p").policy.length });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});
module.exports = app;
