import './App.css';
import { useEffect, useContext } from 'react';
import { PUBLIC, AUTH } from './routes';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from "./context/AuthContext";

function App() {
	const { user } = useContext(AuthContext);

	useEffect(() => {
	}, []);

	// Handle render routes
	const renderRoutes = (routes) => {
		const paths = routes.map((route, index) => {
			let Page = route.element;
			return (
				<Route
					key={index}
					path={route.path}
					element={(
						<route.layout>
							<Page />
						</route.layout>
					)}
				/>
			);
		});

		return paths;
	}

	return (
		<Routes>
			{user && renderRoutes(AUTH)}
			{renderRoutes(PUBLIC)}
		</Routes>
	);
}

export default App;
