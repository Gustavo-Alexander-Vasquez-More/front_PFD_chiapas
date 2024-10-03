import { createBrowserRouter } from "react-router-dom";
import Index from "../src/pages";
import PanelAdmin from "../src/pages/panelAdmin";
import ConsultaPDF from "../src/pages/consultaPDF";
import ValidacionAntecedente from "../src/pages/validacionAntecedente";
import ProtectLogin from "../src/pages/protect/protectLogin";
import ProtectPanel from "../src/pages/protect/protectPanel";
import Descarga_pdf from "../src/pages/descarga_pdf";
const router = createBrowserRouter([
{ path: "/", element: <ProtectLogin />, 
    children: [{ index: true, element:<Index/>}]},
{ path:"/panelAdmin", element: <ProtectPanel />, 
    children: [{ index: true, element:<PanelAdmin/>}]},
{ path:"/consultaPDF/:folio", element:<ConsultaPDF/>},
{ path:"/validacionAntecedente/:folio", element:<ValidacionAntecedente/>},
{ path:"/download_pdf/:folio", element:<Descarga_pdf/>},
])
export default router