# TodoApp

### Overview
A react webapp using firebase backend for a simple todolist application based on this [tutorial](https://www.freecodecamp.org/news/how-to-build-a-todo-application-using-reactjs-and-firebase/).

The tutorial uses ReactJS v16.13.1 and Material UI v4.9.8. In the spirit of not just blindly following the tutorial, I decided to upgrade to ReactJS 18 and Material UI 5, as well as switch from using class components to functional components.

### Challenges
Some of the challenges I had to deal with include the following:

1. Differences between Node and React versions led to some import and npm installation errors/warnings.
2. At one point my API calls stopped working (I kept getting 403 errors) and for about 30 minutes I couldn't figure out why, then suddenly they started working again.
3. There were a lot of differences between Material UI 4 and 5. The easiest to resolve were the different import locations. The more annoying challenge was that certain methods of styling were deprecated/changed. Working with styling webpages has always been challenging and this was no exception
4. For example "withStyles" no longer worked and was replaced by some sx thing instead, which took me a while to get the hang of. Certain things like the <Offset /> element took me quite long to figure out.
5. Certain implementations using Axios were outdated and I had to search for the correct implementation. 
6. useEffect was constantly being run and so I could not fill in my account edit form properly as it will override any edits I had made. Had to pass in '[]' as an argument but this led to another warning about a missing dependency. 
7. Cross-origin resource sharing: I had a lot of trouble trying to get the React frontend to make calls to the firebase backend API because of CORS. Was only fixed when I added `app.use(cors())` at the top of my `index.js` file for firebase. 
8. Deploying to Github pages was a lot trickier than I expected because of routing issues that caused the webpage not to show up. Had to use HashRouter instead of BrowserRouter.
9. Additionally, for some reason, `POST` requests were getting 405 errors. It turns out that Github pages does not allow `POST` requests...
10. Tried deploying to firebase hosting but webpage does not seem to be working for some reason. API calls were not getting the correct response and it appears that it is because the calls are not going through the proxy. Turns out the `proxy` field in `package.json` is only for development. Seems like the only way for now is to hard code the links in axios requests.

### Areas for Improvement
1. Some CSS elements are still a bit funky like the view dialogue and the centralisation of the loading icon.