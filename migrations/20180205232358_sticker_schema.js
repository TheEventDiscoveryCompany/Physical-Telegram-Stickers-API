
exports.up = function(knex, Promise) {
    return knex.schema.createTable('stickers', function(t) {
        t.increments('id').unsigned().primary();
        t.integer('stickerGroupId').unsigned().notNullable();
        t.string('url');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('stickers');
};
