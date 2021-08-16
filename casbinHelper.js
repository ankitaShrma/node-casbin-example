const { newEnforcer } = require("casbin");
const { MongooseAdapter } = require("casbin-mongoose-adapter");

let enforcer;

const getDefaultEnforcer = async ({ domain, user }) => {
  try {
    const adapter = await MongooseAdapter.newAdapter(
      process.env.MONGO_DB,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        autoIndex: false,
      },
      {
        synced: true,
        autoCommit: true,
        filtered: true,
      }
    );
    let filters = {
      $or: [
        { p_type: "p" },
        { p_type: "g", v0: `user:${user}`, v2: `domain:${domain}` },
        { p_type: "g2", v0: `domain:${domain}` },
      ],
    };

    enforcer = await newEnforcer("model_conf.conf");
    await enforcer.setAdapter(adapter);

    await enforcer.loadFilteredPolicy(filters);
    // adding function used on role grouping matching

    await enforcer.buildRoleLinks();

    return enforcer;
  } catch (err) {
    throw err;
  }
};

module.exports = { getDefaultEnforcer };
