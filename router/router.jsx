import { createBrowserRouter } from "react-router-dom";
import Index from "../src/pages";
import PanelAdmin from "../src/pages/panelAdmin";
import ConsultaPDF from "../src/pages/consultaPDF";
import ValidacionAntecedente from "../src/pages/validacionAntecedente";
const router = createBrowserRouter([
    {
        path:"/",
        element:<Index/>
    },
    {
        path:"/panelAdmin",
        element:<PanelAdmin/>
    },
    {
        path:"/consultaPDF/:id",
        element:<ConsultaPDF/>
    },
    {
        path:"/validacionAntecedente/:id",
        element:<ValidacionAntecedente/>
    },
       
])
export default router