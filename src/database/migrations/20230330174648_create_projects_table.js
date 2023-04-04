/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { onUpdateTrigger } = require("../../../knexfile");

exports.up = async (knex) => {
  await knex.schema
    .createTable("projects", (table) => {
      table.increments("id");
      table.text("title");

      table
        .integer("user_id")
        .references("users.id")
        .notNullable()
        .onDelete("CASCADE");

      table.timestamps(true, true);
    })
    .then(() => knex.raw(onUpdateTrigger("users")));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("projects");
