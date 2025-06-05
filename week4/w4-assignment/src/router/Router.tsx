import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../layouts/Layout';
import LoginPage from '../pages/Login/Login';
import SignupPage from '../pages/Signup/Signup';
import MyPage from '../pages/Mypage/MyPage';
import SearchPage from '../pages/Mypage/SearchPage';


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            // { index: true, element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            { path: "signup", element: <SignupPage /> },
            { path: "mypage/info", element: <MyPage /> }, 
            { path: "mypage/search", element: <SearchPage /> },
        ],
    },
]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;