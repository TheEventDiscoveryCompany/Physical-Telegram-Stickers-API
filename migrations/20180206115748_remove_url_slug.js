
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('sticker_groups', function(t) {
        t.dropColumn('urlSlug');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('sticker_groups', function(t) {
        t.string('urlSlug').notNull().index();
    });
};
