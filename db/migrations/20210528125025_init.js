// Note that this migration file is where the actual TABLE gets created.  After having utilized PostgreSQL to create a Table in the psql, you should be able to appreciate
// How knexJS allows you to do this on the fly in a sort of JS SQL hybrid syntax.  Also note that we don't import knexjs into this file, we don't import ANYTHING.
// This file is created when when "npx knex init" is invoked, and is updated when "npx knex migreate:latest --knexfile db/knexfile.js" is invoked.


// two functions are given
// up means the changes you wish to do, creating the migration
exports.up = function(knex) {
    return knex.schema.createTable('person', table => {
        table.increments('id'); // better to have uuid here
        table.string('email').notNullable().unique(); // note the use of knex style syntax instead of SQL syntax
        // what's nice is that the notNullable and unique make sure that the user has inputted anything at all, and that it doesn't already exist in the DB.
        // this is the same as declaring "NOT NULL" argument made in SQL.
        table.string('first_name').notNullable(); // note that we must always use snake_case here (underscores separate words), this is STANDARD in SQL.
        table.string('last_name').notNullable();
        table.timestamps(true, true); // provides us with a timestamp every time we update the table
        // also add something that allows us to see WHO updated the DB as well.

    })
};
// down means rollback, undoes the migration, basically anything the exports.up function does, the exports.down function can undo.
exports.down = function(knex) {
    return knex.schema.dropTable('person'); 
};
