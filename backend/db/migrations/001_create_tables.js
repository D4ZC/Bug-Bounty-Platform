exports.up = function(knex) {
  return knex.schema
    .createTable('users', table => {
      table.increments('id').primary();
      table.string('username').unique().notNullable();
      table.string('email').unique();
      table.string('password');
      table.integer('level').defaultTo(1);
      table.integer('xp').defaultTo(0);
      table.integer('bugpoints').defaultTo(0);
      table.string('avatar');
      table.string('frame');
      table.string('banner');
      table.string('title');
      table.string('background');
      table.timestamps(true, true);
    })
    .createTable('items', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('type').notNullable(); // Avatar, Frame, Banner, Title, Background
      table.string('image_url');
      table.integer('price').defaultTo(0);
      table.timestamps(true, true);
    })
    .createTable('inventory', table => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('item_id').unsigned().references('id').inTable('items').onDelete('CASCADE');
      table.boolean('equipped').defaultTo(false);
      table.timestamps(true, true);
    })
    .createTable('missions', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('description');
      table.integer('reward_bugpoints').defaultTo(0);
      table.string('type');
      table.integer('target').defaultTo(1);
      table.timestamps(true, true);
    })
    .createTable('user_missions', table => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('mission_id').unsigned().references('id').inTable('missions').onDelete('CASCADE');
      table.integer('progress').defaultTo(0);
      table.boolean('completed').defaultTo(false);
      table.boolean('claimed').defaultTo(false);
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('user_missions')
    .dropTableIfExists('missions')
    .dropTableIfExists('inventory')
    .dropTableIfExists('items')
    .dropTableIfExists('users');
}; 