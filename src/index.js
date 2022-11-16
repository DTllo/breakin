import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ScanResult from './scan_result'
import reportWebVitals from './reportWebVitals';

import {
    createBrowserRouter,
    RouterProvider,
    useRouteError
} from "react-router-dom";


function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/scan",
        element: <ScanResult />,
        errorElement: <ErrorPage />,
    }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
