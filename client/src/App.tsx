import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import FindTeamMates from './components/FindTeamMates';
import Navbar from './components/Navbar';
import MainPage from './components/MainPage';
import Footer from './components/Footer';
import EditProfile from './components/Editprofile';
import Hackathons from './components/Hackathons';
import { Toaster } from './components/ui/toaster';

import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from './components/Login';
import SignupForm from './components/Signup';
import AboutUs from './components/AboutUs';

const App: React.FC = () => {
    return (
        <Router>
            <Layout />
        </Router>
    );
};

const Layout: React.FC = () => {
    const location = useLocation();

    // List of routes where the navbar and footer should not be displayed
    const noNavbarRoutes = ['/register', '/'];
    const noFooterRoutes = ['/register', '/'];

    // Check if the current route should hide the navbar and footer
    const showNavbar = !noNavbarRoutes.includes(location.pathname);
    const showFooter = !noFooterRoutes.includes(location.pathname);

    return (
        <div className="flex flex-col min-h-screen">
            {showNavbar && <Navbar />}
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<LoginForm/>} />
                    <Route path="/register" element={<SignupForm />} />
                    <Route path="/about" element={<AboutUs />} />
                    {/* <Route path="/admin" element={<AdminPage />} /> */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/Home" element={<MainPage/>} />
                        <Route path="/buildteam" element={<FindTeamMates />} />
                        <Route path="/edit-profile" element={<EditProfile />} />
                        <Route path="/hackathons" element={<Hackathons />} />
                    </Route>
                </Routes>
            </main>
            <Toaster />
            {showFooter && <Footer />}
        </div>
    );
};

export default App;
