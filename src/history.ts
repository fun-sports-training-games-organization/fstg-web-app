import { createBrowserHistory } from 'history';

export default createBrowserHistory({
    basename: process.env.PUBLIC_URL
});
// export default createBrowserHistory();
// import createHistory from 'history/createBrowserHistory';
// export default createHistory();
