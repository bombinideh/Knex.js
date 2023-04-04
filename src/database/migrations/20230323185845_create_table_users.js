/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { onUpdateTrigger } = require("../../../knexfile");

exports.up = async (knex) => {
  await knex.schema
    .createTable("users", function (table) {
      table.increments("id");
      table.text("username").unique().notNullable();

      table.timestamp("create_at").defaultTo(knex.fn.now());
      table.timestamp("update_at").defaultTo(knex.fn.now());
    })
    .then(() => knex.raw(onUpdateTrigger("users")));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("users");
};
