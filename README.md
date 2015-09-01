testing some basic nodejs stuff
based on tutorial located at:
http://cwbuecheler.com/web/tutorials/2014/restful-web-app-node-express-mongodb/

will build from there once complete

need to rename /usr/bin/gyp to use the one node installs on some OS'

run with nodemon www/bin
localhost:3000

TODO: clean up routes
TODO: convert to mongoose
TODO: convert api to swagger or strongloop
TODO: templates
TODO: thing entry form
TODO: authentication
TODO: session tracking

[******************* file structure ************************]

/index.js
-/
-/signup
-/signin?
-/info
-/contact

/u.js
-/%username%
--/profile
--/todos
--/things
---/list
---/view1
---/new
---/delete
---/update

/a.js
-/admin console
-/user reports

/api.js
-/nothing
-/tag
--/new
--/delete
-/u
--/byid/:id
--/adduser
--/userupdate
--/deleteuser
-/thing
--/thingget
--/thingadd
--/thingupdate

/schema
/tags.js
--tag schema
/things
--thing schema
/users
--users schema
/session
--session schema
/templates
--template schema

[******************* data structure ******************]

users
-username
-name
-email
-location
-user level
-cleartext password (HAHAHA)
//not yet implimented
-password hash
-status note
-clear text password
-signup date


things
//not yet implimented
-ownerid
-title
-description
-tree parent
-tree level
-status
-percent needed to complete
-next step
-tags
-shared or private or annonymous or "help needed"

tags
//not yet implimented
-title
-weight

[***************** user level key ******************]
0 = admin
1 = reserved
2 = reserved
3 = reserved
4 = verified user
5 = unverified user
6 = nologin
7 = deleted