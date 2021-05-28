Production Coder Tutorial on youtube demonstrating how to utilize KnexJS with PostgreSQL server.
The video can be found at:

https://www.youtube.com/watch?v=wfrn21E2NaU

KnexJS is a module that allows for the quick interfacing of NodeJS and it's syntax with a wide variety of commonly used SQL databases.
This includes SQL databases such as mysql/mariadb, postgresql, sqlite and others.

There was quite alot covered in this tutorial and not only am I not at this time able to completely wrap my mind around everything
(or remember much for that matter), but by the end Postman refused to post to localhost:8080 even though nodemon was running a server on it without any errors reported..this could be something in my code or the a problem with Postman, and I am not sure what.

Running our program once it is done with:

npm run dev 
A command I was unaware of until now, it has always been nodemon index.js or something like that so far.  Essentially it looks into the package.json file and looks for the scripts tag called "dev" and runs it.

On the use of scripts in our package.json file:
As noted above, our package.json file includes a "scripts" key which refers to an object as a value.  Within that object, we have commands we can refer to with npm run "script" in this case (although I think they may serve more than just this purpose).

Returns nodemon happily running a server on port 8080, but an attempt at a POST request from Postman returns an error that:

Error: connect ECONNREFUSED 127.0.0.1:8080

Other than that however, we have been able to create a Table on postgreSQL utilizing the methods taught herein and so it was a somewhat
worthwhile tutorial.

Points of interest include the concept of migration

the npx command:

At one point in the tutorial (11:30), productioncoder invokes this in the command line, and afterwards places it in our scripts section of package.json to be invoked upon npm run dev later when we are finished.

"npx knex migrate:latest --knexfile db/knexfile.js"

Firstly let's talk about what he did first, which was invoke:

npx knex init

This does a couple of things, first and foremost it creates the knex.js file, which includes an exported JSON object that interfaces with the knex module to connect our project to the database of our choice, (postgreSQL in this case).

He then goes onto create the migrations directory within the db directory.  After the npx knex migrate:etc command is invoked, a file is created within migrations folder that looks like this:

20210528125025_init.js

Note that this is timestamped with the date at the beginning and it is named init because we named it that when we invoked npx knex init.
This file includes two basic functions by default called exports.up() and exports.down() which take in an argument called knex.
By productioncoder's explanation, it is to be inferred that whatever is put into this exports.up() function will execute and in this case return the table.  exports.down() function should always be a sort of reflection exports.up() meaning in this case, since we created a table, it drops or deletes that table.  This last function exports.down() is there so that we can quickly undo a migration should we need to (according to the docs, anyway).

the concept of migration in knexJS
KnexJS has great documentation, I only wish I could wrap my mind around it all.  Database Migration with KnexJS is covered in detail here:

http://perkframework.com/v1/guides/database-migrations-knex.html

But I will try and explain the details to myself, because it helps...
Essentially migration creates a modulated system by which version control is handled within the program itself.  Essentially every change made to our DB can be controlled from functions defined within a migration file, which in knexJS projects is found within a subdirectory called db/migrations.  By multiple definitions of migrations files, the changes to the DB are not only logged, but specifically defined as a particular action.  For example one might have a migration file that creates a table (like in our program here), or it could create a new row (and undo it), or it could create a new column (and undo it), etc. etc.  Admittedly I am still having trouble wrapping my mind around how all of these directories exactly talk to each other, as there is alot of importing and exporting going on everywhere and although it looks cleaner at the end of the day, without it ALL being in front of me at once, I cannot visualize how it all works (which currently I find frustrating).

the return to the concept of the controller:

The concept of the controller was first introduced to me at the very beginning in Head First Javascript.  The concept is simple enough, there is Model, View, Controller.  Wikipedia does a good enough job of explaining it:

########################
Model
    The central component of the pattern. It is the application's dynamic data structure, independent of the user interface. It directly manages the data, logic and rules of the application.
View
    Any representation of information such as a chart, diagram or table. Multiple views of the same information are possible, such as a bar chart for management and a tabular view for accountants.
Controller
    Accepts input and converts it to commands for the model or view.

In addition to dividing the application into these components, the model–view–controller design defines the interactions between them.

    The model is responsible for managing the data of the application. It receives user input from the controller.
    The view renders presentation of the model in a particular format.
    The controller responds to the user input and performs interactions on the data model objects. The controller receives the input, optionally validates it and then passes the input to the model.
########################

Within the context of our program however, the controller also refers to a folder called /controller with a file called person.js in it.  This person.js then requires another person.js from the /service subdirectory, which in turn also requires yet another person.js file from the /dao subdirectory, which itself also requires a file called db.js from the subdirectory /db.  Each of these files is small and includes the creation of a class which is what is exported from each file.

I'm not going to pretend here.  This is where my knowledge is really starting to fall apart.  There is just too much referencing to different files, I know it keeps things clean so that you don't have everything in one file and you can easily modify things and track down errors, but damn, I'd be remiss to to not admit I'm having a tough time here at this point.  I can break each method down in comments to further understand what is happening, but essentially it creates the function on how to add a new person to our database, passes that person object up the chain to actually invoke that function and return its results, which are then further passed up the chain where it finally creates and adds the person to the DB table that was created when we run npm run dev... but I know I'm missing a whole lot to this at this point.

the concept of routes:

the dividing up of our program into different subdirectories which point to different files that point to different files that point to different files...:

Yeah... see above.

Summary:

It took some digging around after taking a break, but eventually I figured out through using curl command and also Postman, that it wasn't a problem with postman...I had accidentally switched the index.js files within the main directory / and the routes directory /routes.  I also had a typo where I exported 'route' rather than 'router' which through the program off.  I also attempted to post 'John' twice by accident after playing around in raw PostgreSQL just to get the hang of the psql cli in which I inputted 'John' manually.  At the end of the day the program worked after I fiddled with it quite abit, it just goes to show that programming is unforgiving in many respects, and this is Javascript...which from what I've gathered is one of the most forgiving languages by far...

This taught me alot about troubleshooting and navigating throughout a decently organized program.  Very little code is actually written into a single document!  This is an important lesson.  Many files, less code per file seems to be a theme to pay attention to.  I'm not saying there can't be files with a long lengthy amount of code (we've seen it in others projects!), but it is something I'm noticing productioncoder's organization.  This is kind of what our peers wanted us to do with our ToDo App when he talked about dividing up read write etc.. now we're getting into the weeds here because we're dealing in read/write layers that our peers talked about as like a cake.  The database sends and receives data from the user, but it's a few layers deep in between as one can see here.  I know I don't really get it yet, but this is a step in the right direction and I did do all of this over the course of a few hours playing around with quite a few things I didn't even know existed before, so good job me! lol.

Going forward it will be important to not only understand how to organize these file structures, but WHY they are organized in this way.  Most of the time there is an opinionated way that the module developers who created these packages intended their module to be used, and there are definitely a myriad of uses and tricks to uilizing these modules efficiently and succinctly.

For now, I'm going to bask in the success of having at least introduced myself somewhat successfully to these concepts and learning some basic curl commands in the meanwhile so that for basic testing I don't necessarily have to rely on Postman.
