import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Blog from './Blog.jsx';
import './index.css';
import { store } from './redux/store';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<Blog />
			</Provider>
		</BrowserRouter>
	</StrictMode>,
);
