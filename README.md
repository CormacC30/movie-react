# React App Assignment

###### Full Stack Development 2, HDip in Computer Science

__Name:__ Cormac Costello

__Video Demo:__ https://youtu.be/lfWlIG9c_K0

This repository contains an implementation of the Movie Fans Web Application using the React library. 

### Features

+ TV Series - Tab navigation used to view either Movies or TV series
+ 'Top Rated' Page (for movies)
+ 'On The Air' Page (for TV series) 
+ Favourite TV series
+ TabIndex navigation stored as context (client state management)
+ Site header Nav bar conditionally renders Top Rated/On the Air pages depending on whether the movie or TV tab is selected from context
+ Fantasy Movie: Basic with cast and crew details.
+ Search feature on fantasy movie for cast and crew
+ Fantasy Movies displayed on page as Cards, with edit and delete buttons
+ Filtering further modified to filter TV series with specific tv genre ids
+ Similar Movies added to the movie/TV details page.
+ Cast (Actors) component accordion dropdown on movie/tv details page
+ Crew (Directors, Producers etc) component accordion dropdown on movie/tv details page
+ Server state Caching: React Query such as in examples above and on media details page. React Query also used for similar movies on movie/tv details page, filtering amongst others.
+ Cast and Crew Biography page
+ Filmography (Movie Credits) added to actor bio pages (accordion component)
+ TV Credits added to actor bio pages (accordion component)
+ Additional Route parameterisation: e.g. including the "type": movie or tv to navigate to relevant page
+ Refactored components to be used for both movie and TV objects (i.e. DRY principals used for components)
+ Search Bar with autocomplete on landing page and (most) other pages allowing users to search database for Movies, TV and People
+ Third Party Authentication with Auth0
+ Login and Signup Pages
+ Public and Private routes
+ Deployed using Vercel: https://movie-react-eosin.vercel.app/

### Setup requirements (for non standard setup after cloning repo).

- Add Environment Variables to .env in project root directory:
- From your TMDB account use environment variable VITE_TMDB_KEY=<key>
- Set up account with Auth0 (if you don't already have one)
- Go to in developer mode go to settings, copy your client id and domain
- Add environment variables VITE_AUTH0_DOMAIN=<domain> and VITE_AUTH0_CLIENT_ID=<client_id>
- Run `npm install` to install dependencies
- Run `npm run dev` to start the server
- Browse to http://localhost:3000 to view running app
- NOTE: Ensure callback, logout and web origins urls on Auth0 settings contain http://localhost:3000 

### API endpoints

[ List the __additional__ TMDB endpoints used, giving the description and pathname for each one.] 

e.g.
+ Discover List of TV Shows (homepage): "/"
+ TV Genres (used in search filter)
+ TV series images. (homepage, on the air, favourites, top rated) "/", "/tv/on-the-air", "/favourites", "/toprated"
+ Get TV Reviews: "/reviews/:id"
+ Discover top rated movies "/toprated"
+ Discover top rated TV series "/toprated"
+ Discover TV Series: (homepage) "/"
+ Get A tv show: "/details/:type/:id"
+ Discover similar movies: "/details/:type/:id"
+ Discover similar TV Shows: "/details/:type/:id"
+ Get "ON the air" TV: "/tv/on-the-air"
+ get Movie credits: "/details/:type/:id"
+ get TV Credits: "/details/:type/:id"
+ Get actor details (Biography): "/actor/:id"
+ Get actor movie credits: "/actor/:id"
+ Get actor TV credits: "/actor/:id"
+ Get a person (used in search bar, multple pages/paths)
+ Multi seerch (searches all Movies, TV and people. used in search bar on multiple pages)

### Routing

[ List the __new routes__ supported by your app and state the associated page.]

+ /toprated - Top rated Movies/tv shows
+ /review/:type/:id  - modified reviews form route, parameterised to distinguish movies or tv
+ /details/:type/:id - TV or movie details route, modified with additional parameterisation to distingusih movies and tv ( public )
+ /tv/on-the-air - On the air TV page
+ /actor/:id - Actor or Crew member bio ( public )
+ /fantasy-movie - Fantasy movie page
+ /login - login page ( public )
+ /signup - signup page ( public )

** All routes are private apart from the ones specified as public in the above list **

### Third Party Components/Integration

[Describe the level of  integration/use or other API's or third party components]

+ Authentication: Auth0

### Independent learning (If relevant)

+ tabIndex:
https://stackoverflow.com/questions/71384704/how-to-set-tabindex-on-library-react-components
https://stackoverflow.com/questions/44107052/react-dynamic-tabindex-creation

+ search bar with autocomplete free solo: https://mui.com/material-ui/react-autocomplete/

+ guide on using query keys: https://tanstack.com/query/v3/docs/framework/react/guides/query-keys#:~:text=At%20its%20core%2C%20React%20Query,data%2C%20you%20can%20use%20it! 

+ extremely comprehennsive and helpful guide in Auth0 docs: https://auth0.com/docs/quickstart/spa/react/interactive

