import { createBrowserRouter } from "react-router-dom";
import Main from "../src/layouts/Main";
import App from "../src/App";
const router = createBrowserRouter([
    {
    path:"/",
    element:<Main/>,
    children:[            
        {
            path:'/',
            element: <App/>
        },]
}
])
export default router