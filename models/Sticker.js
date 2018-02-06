const { Model } = require('objection');

class Sticker extends Model {
    static get tableName() {
        return 'stickers';
    }
    
    // Optional JSON schema. This is not the database schema!
    // Nothing is generated based on this. This is only used
    // for input validation. Whenever a model instance is created
    // either explicitly or implicitly it is checked against this schema.
    // http://json-schema.org/.
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['stickerGroupId', 'url'],

            properties: {
                id: {type: 'integer'},
                stickerGroupId: {type: 'integer'},
                url: {type: 'string'}
            }
        };
    }

    // This object defines the relations to other models.
    static get relationMappings() {
        // Import models here to prevent require loops.
        const StickerGroup = require('./StickerGroup');

        return {
            stickerGroup: {
                relation: Model.BelongsToOneRelation,
                // The related model. This can be either a Model
                // subclass constructor or an absolute file path
                // to a module that exports one.
                modelClass: StickerGroup,
                join: {
                    from: Sticker.tableName + '.stickerGroupId',
                    to: StickerGroup.tableName + '.id'
                }
            }
        };
    }
}

module.exports = Sticker;  