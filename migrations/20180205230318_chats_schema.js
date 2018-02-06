
exports.up = function(knex, Promise) {
    return knex.schema.createTable('chats', function(t) {
        t.increments('id').unsigned().primary();
        t.integer('telegramChatId').unsigned().notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('chats');
};
