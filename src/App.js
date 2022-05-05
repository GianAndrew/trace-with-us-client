import React from 'react';
import Login from './pages/Login';
import Registration from './pages/Registration';
import HealthForm from './pages/HealthForm';
import UserDetails from './pages/UserDetails';
import Home from './pages/Home';
import EditUserDetails from './pages/EditUserDetails';
import EditOwnerDetails from './pages/EditOwnerDetails';
import ErrorPage from './pages/ErrorPage';
import Details from './pages/Details';
import OwnersDetails from './pages/OwnersDetails';
import VisitorsDetails from './pages/VisitorsDetails';
import OwnerLogin from './pages/OwnerLogin';
import OwnersRegistration from './pages/OwnersRegistration';
import OwnersHome from './pages/Owners';
import RequireAuth from './auth/RequireAuth';
import OwnersRequireAuth from './auth/OwnersRequireAuth';
import { AuthProvider } from './auth/Authenticate';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './features/store';
import { Provider } from 'react-redux';

const App = () => {
	return (
		<>
			<Provider store={store}>
				<BrowserRouter>
					<AuthProvider>
						<Routes>
							<Route path='/'>
								<Route path='visitors'>
									<Route path='login' element={<Login />} />
									<Route path='registration' element={<Registration />} />
									<Route element={<RequireAuth />}>
										<Route index element={<Home />} />
										<Route path='userdetails'>
											<Route index element={<UserDetails />}></Route>
											<Route path=':id' element={<EditUserDetails />}></Route>
										</Route>
										<Route path='healthForm'>
											<Route index element={<HealthForm />}></Route>
											<Route path=':id' element={<Details />}></Route>
										</Route>
									</Route>
								</Route>
								<Route path='owners'>
									<Route path='login' element={<OwnerLogin />}></Route>
									<Route path='registration' element={<OwnersRegistration />}></Route>
									<Route element={<OwnersRequireAuth />}>
										<Route index element={<OwnersHome />}></Route>
										<Route path='ownerdetails'>
											<Route index element={<OwnersDetails />}></Route>
											<Route path=':id' element={<EditOwnerDetails />} />
										</Route>
										<Route path='userdetails'>
											<Route path=':id' element={<VisitorsDetails />}></Route>
										</Route>
									</Route>
								</Route>

								<Route path='*' element={<ErrorPage />} />
							</Route>
						</Routes>
					</AuthProvider>
				</BrowserRouter>
			</Provider>
		</>
	);
};

export default App;
