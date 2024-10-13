import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import RootLayout from './layouts/RootLayout';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import NotFound from './notfound/NotFound';
import LandingPage from './pages/LandingPage';
import ContactsManagement from './layouts/ContactManagement';
import { AuthProvider } from './context/AuthContext';
import AboutMe from './pages/AboutMe';


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/dashboard',
        element: <ContactsManagement />,
      },
      {
        path: '/login',
        element: <SignInPage />,
      },
      {
        path: '/register',
        element: <SignUpPage />,
      }
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/aboutme',
    element: <AboutMe />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
