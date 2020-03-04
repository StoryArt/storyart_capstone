# user management + authorization + retriction-to-forbiden-api/resource 

#Authorization
.User send request to /signin with ( username and password ) to server,
.Server authorize that (us & pw) with database and response back a authorized token
.That authorized token is attached in HEADER of e-v-e-r-y that user request in the future 
.throw a 401 unauthorized error if a client tries to access a protected resource without a valid JWT token.

# Retriction-to-forbiden-api/resource
.APIs for login, signup, and any static resources like images, scripts and stylesheets should be accessible to everyone
.Some to story history and commnet , react is open for authorized user


# Config role to protect resource
 .admin
 .sysadmin
 .user
