# heimdall-test
A library managment test application
# Start the app in production env
To start the application in production enviroment simply run :
```
npm run start
```
The package.json of the app has been configured to set the NODE_ENV to production and run a post production build that serves the react app on the home of the domain while the back end runs on /api

# About the application
- I preferred using typescript over javascript because of the speed of development, typescript makes me see errors at compile time rather than at run time which makes me see errors at it happens rather than spend days debugging.
- I used mobx as the primary state management tool because it has a quicker dev time than redux as redux takes a while to setup to run properly mobx can be setup almost instantaneous

# Backend Architecture
- I used the service-controller architecture when building the application for seperation of concerns and make the code cleaner. the services are the main database runners, they call or run database commands to get specific data and pass them to the controller which in turn passes them into the route to complete an endpoint
- I added book model to specify a book object and a user model to specify a user
- the user model produces a JWT token with the userId encoded in it on login and set in the cookies so the backend verifies it and knows which user it is using (req.user)
- the user model has a borrowedBooks property with a list of book Ids in it which i use to check if the user has borrowed a specific book in the frontend

# Front end architecture
- the front end was built with TS & react
- Mobx was used as the primary state tool of choice as reasons are stated above
- The front end uses axios to call /api endpoints from the backend server
- Uses useEffect to fetch certain endpoints on page render and uses query params to check if a book has been opened to display a game pane
