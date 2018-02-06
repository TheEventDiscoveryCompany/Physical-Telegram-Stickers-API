# Physical-Telegram-Stickers-API
A🅱️I for PTS yo

## Database migrations
All database modifications must be done within migration scripts, which knex conveniently provides. For more clarification visit the [knex docs](http://knexjs.org/#Migrations).

### Installing knex
Before performing any migrations, you will need to install knex globally through npm:
```bash
npm install -g knex
```

### Make a new migration
```bash
knex migrate:make migration_name
```

### Update the database with the latest migrations
```bash
knex migrate:latest
```
_Note: By default migrations are run on the development database._