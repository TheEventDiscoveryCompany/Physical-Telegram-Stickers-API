
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('stickers', function(t) {
        t.string('url').notNull().alter();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('stickers', function(t) {
        t.string('url').alter();
    });
};
