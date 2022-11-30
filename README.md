# TodoApp

### Overview
A react webapp using firebase backend for a simple todolist application based on this [tutorial](https://www.freecodecamp.org/news/how-to-build-a-todo-application-using-reactjs-and-firebase/).

The tutorial uses ReactJS v16.13.1 and Material UI v4.9.8. In the spirit of not just blindly following the tutorial, I decided to upgrade to ReactJS 18 and Material UI 5, as well as switch from using class components to functional components.

### Challenges
Some of the challenges I had to deal with include the following:

1. There were a lot of differences between Material UI 4 and 5. The easiest to resolve were the different import locations. The more annoying challenge was that certain methods of styling were deprecated/changed. For example "withStyles" no longer worked and was replaced by some sx thing instead. Working with styling webpages has always been challenging and this was no exception.
2. Certain implementations using Axios were outdated and I had to search for the correct implementation. 
3. useEffect was constantly being run and so I could not fill in my account edit form properly. Had to pass in '[]' as an argument but this led to another warning. 
4. Cross-origin resource sharing: I had a lot of trouble trying to get the React frontend to make calls to the firebase backend API because of CORS. Was only fixed when I added `app.use(cors())` at the top of my `index.js` file for firebase. 
5. Deploying to Github pages was a lot trickier than I expected because of routing issues that caused the webpage not to show up. Had to use HashRouter instead of BrowserRouter.
6. Additionally, for some reason, `POST` requests were getting 405 errors. It turns out that Github pages does not allow `POST` requests...

### Areas for Improvement