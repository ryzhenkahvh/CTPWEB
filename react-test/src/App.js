import React, { Suspense, lazy } from 'react';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import Header from './components/Header';
import './App.css';

// Lazy load components for better performance
const Home = lazy(() =>
    import ('./components/Home'));
const Upcoming = lazy(() =>
    import ('./components/Upcoming'));
const Previous = lazy(() =>
    import ('./components/Previous'));
const Support = lazy(() =>
    import ('./components/Support'));

/**
 * Main App component with navigation
 */
const AppContent = () => {
        const { activeSection } = useNavigation();

        return ( <
            div className = "App" >
            <
            Header / >
            <
            main >
            <
            Suspense fallback = { < div > Loading... < /div>}> { activeSection === 'home' && < Home / > } { activeSection === 'upcoming' && < Upcoming / > } { activeSection === 'previous' && < Previous / > } { activeSection === 'support' && < Support / > } <
                /Suspense> <
                /main> <
                /div>
            );
        };

        function App() {
            return ( <
                NavigationProvider >
                <
                AppContent / >
                <
                /NavigationProvider>
            );
        }

        export default App;