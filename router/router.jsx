import { createBrowserRouter } from "react-router-dom";
import Index from "../src/pages";
import PanelAdmin from "../src/pages/panelAdmin";
import ConsultaPDF from "../src/pages/consultaPDF";
import ValidacionAntecedente from "../src/pages/validacionAntecedente";
import ProtectLogin from "../src/pages/protect/protectLogin";
import ProtectPanel from "../src/pages/protect/protectPanel";
import Descarga_pdf from "../src/pages/descarga_pdf";
import CrearUsuario from '../src/components/crearUsuario';
import EliminarUsuario from '../src/components/eliminarUsuario';
import AsignacionFolios from '../src/components/asignacionFolios';
import CrearAltas from '../src/components/crearAltas';
import AdmiAltas from '../src/components/admiAltas';
import AdmiAltasrol3 from '../src/components/admiAltasrol3';
import UpdatePassword from '../src/components/updatePassword';
import Connecion from '../src/components/coneccion'
import UpdateRol from '../src/components/updateRol';
import Crear_usuarioRol4 from '../src/components/crear_usuarioRol4.jsx';
import Asing_foliosRol4 from '../src/components/asing_foliosRol4.jsx';
import DeleteAdminsRol4 from '../src/components/deleteAdminsRol4.jsx';
import Registro_folios from '../src/pages/registro_folios.jsx';
import Registro_usuarios from '../src/pages/registro_usuarios.jsx';

const router = createBrowserRouter([
{ path: "/", element: <ProtectLogin />, 
    children: [{ index: true, element:<Index/>}]},
{ path:"/panelAdmin", element: <ProtectPanel />, 
    children: [{ index: true, element:<PanelAdmin/>}]},
{ path:"/consultaPDF/:folio", element:<ConsultaPDF/>},
{ path:"/validacionAntecedente/:folio", element:<ValidacionAntecedente/>},
{ path:"/download_pdf/:folio", element:<Descarga_pdf/>},

{ path:"/create_users", element:<CrearUsuario/>},
{ path:"/delete_users", element:<EliminarUsuario/>},
{ path:"/asign_folios", element:<AsignacionFolios/>},
{ path:"/create_antecedentes", element:<CrearAltas/>},
{ path:"/altas_usuarios", element:<AdmiAltas/>},
{ path:"/mis_antecedentes", element:<AdmiAltasrol3/>},
{ path:"/update_password", element:<UpdatePassword/>},
{ path:"/user_conected", element:<Connecion/>},
{ path:"/update_rol", element:<UpdateRol/>},
{ path:"/create_users_revendedor", element:<Crear_usuarioRol4/>},
{ path:"/asign_folios_revendedor", element:<Asing_foliosRol4/>},
{ path:"/delete_admins_revendedor", element:<DeleteAdminsRol4/>},
{ path:"/registro_folios", element:<Registro_folios/>},
{ path:"/registro_users", element:<Registro_usuarios/>},

])
export default router