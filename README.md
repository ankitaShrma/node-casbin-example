# node-casbin-example

A simple example using casbin for RBAC in node.

---

# Pre-requisites:

```
Node.js
```

## Libraries used:

    - Express as server middleware
    - Mongoose
    - Casbin

### Run Project

> Dev mode : npm run dev

> Test: npm run test

> Test watch mode: npm run test:watch

Policies are defined in database in collection casbin_rule. Check main_example.csv for more info in structure.

## Issue
Whenever `initWithAdapter` function is used, all the db data is loaded even with loadFilteredPolicy(). Checked more into the code and then updated to using `newEnforcer` code with initializing with config first and only then updating with filters.
Now whenever apis are called one after another (sync call), it works perfectly.
But when the apis are called asynchronously, the policies are not loaded sometimes (check in test.js for endpoint `user/:user/domain/:domain`)

