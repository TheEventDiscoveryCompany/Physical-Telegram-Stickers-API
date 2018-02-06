const { Model } = require('objection');

class StickerGroup extends Model {
    static get tableName() {
        return 'sticker_groups';
    }

    // Optional JSON schema. This is not the database schema!
    // Nothing is generated based on this. This is only used
    // for input validation. Whenever a model instance is created
    // either explicitly or implicitly it is checked against this schema.
    // http://json-schema.org/.
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['chatId'],

            properties: {
                id: {type: 'integer'},
                chatId: {type: 'integer'},
                urlSlug: {type: 'string'},
                isAvailable: {type: 'boolean'},
                isActive: {type: 'boolean'}
            }
        };
    }

    // This object defines the relations to other models.
    static get relationMappings() {
        // Import models here to prevent require loops.
        const Chat = require('./Chat');
        const Sticker = require('./Sticker');

        return {
            chat: {
                relation: Model.BelongsToOneRelation,
                // The related model. This can be either a Model
                // subclass constructor or an absolute file path
                // to a module that exports one.
                modelClass: Chat,
                join: {
                    from: 'StickerGroup.chatId',
                    to: 'Chat.id'
                }
            },
            stickers: {
                relation: Model.HasManyRelation,
                // The related model. This can be either a Model
                // subclass constructor or an absolute file path
                // to a module that exports one.
                modelClass: Sticker,
                join: {
                    from: 'StickerGroup.id',
                    to: 'Sticker.stickerGroupId'
                }
            },
        };
    }
}

module.exports = StickerGroup;  