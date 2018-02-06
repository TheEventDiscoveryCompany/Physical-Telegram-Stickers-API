
exports.up = function(knex, Promise) {
    knex.schema.dropTable('chats');
};

exports.down = function(knex, Promise) {
    return knex.schema.createTable('chats', function(t) {
        t.increments('id').unsigned().primary();
        t.integer('telegramChatId').unsigned().notNullable();
    });
};
