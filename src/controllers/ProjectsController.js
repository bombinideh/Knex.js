const knex = require("../database");

module.exports = {
  async index(req, res, next) {
    try {
      const { user_id, page } = req.query;

      const query = knex("projects")
        .limit(5)
        .offset((page - 1) * 5);

      const countObj = knex("projects").count();

      if (user_id) {
        query
          .where({ user_id })
          .join("users", "users.id", "=", "projects.user_id")
          .select("projects.*", "users.username");

        countObj.where({ user_id });
      }

      const [count] = await countObj;
      res.header("X-Total-Count", count["count"]);

      const result = await query;

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
  async create(req, res, next) {
    try {
      const { title, user_id } = req.body;

      await knex("projects").insert({
        tiiid,
      });

      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
};
