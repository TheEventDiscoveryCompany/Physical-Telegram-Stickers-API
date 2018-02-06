const { Model } = require('objection');

class Chat extends Model {
    static get tableName() {
        return 'chats';
    }

    fullName() {
        return this.firstName + ' ' + this.lastName;
    }
    
    // Optional JSON schema. This is not the database schema!
    // Nothing is generated based on this. This is only used
    // for input validation. Whenever a model instance is created
    // either explicitly or implicitly it is checked against this schema.
    // http://json-schema.org/.
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['telegramChatId'],

            properties: {
                id: {type: 'integer'},
                telegramChatId: {type: 'integer'}
            }
        };
    }

    // This object defines the relations to other models.
    static get relationMappings() {
        // Import models here to prevent require loops.
        const StickerGroup = require('./StickerGroup');

        return {
            stickerGroups: {
                relation: Model.HasManyRelation,
                // The related model. This can be either a Model
                // subclass constructor or an absolute file path
                // to a module that exports one.
                modelClass: StickerGroup,
                join: {
                    from: 'Chat.id',
                    to: 'StickerGroup.chatId'
                }
            }
        };
    }
}

module.exports = Chat;  