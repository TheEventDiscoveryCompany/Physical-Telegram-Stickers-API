
exports.up = function(knex, Promise) {
    return knex.schema.createTable('sticker_groups', function(t) {
        t.increments('id').unsigned().primary();
        t.integer('chatId').unsigned().notNullable();
        t.string('urlSlug').index();
        t.boolean('isAvailable').defaultTo(false).index();
        t.boolean('isActive').defaultTo(true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('sticker_groups');
};