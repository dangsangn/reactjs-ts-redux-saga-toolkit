import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
history.listen(() => typeof window !== 'undefined' && window.scrollTo(0, 0));
export default history;
