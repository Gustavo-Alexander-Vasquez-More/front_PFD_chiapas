import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Swal from 'sweetalert2';
const ProtectPanel = ({ redirect = '/' }) => {
useEffect(() => {
    function handleRightClick(event) {
          if (event.button === 2) {
            event.preventDefault(); // Evita el comportamiento predeterminado del clic derecho
            // Reproduce el sonido de alerta
            const alertSound = new Audio('https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/Y2meta.app%20-%20Efecto%20de%20Sonido%20ALERTA%20para%20v%C3%ADdeos%20de%20youtube%202020%20(128%20kbps).mp3?alt=media&token=535fa32f-cb5d-4db5-b367-3dcfe9f6ea0e'); // Reemplaza '/ruta/al/archivo/' con la ruta real del archivo de sonido
            alertSound.play();
        Swal.fire("Está prohibido realizar clic derecho en la página. Recuerda que el uso está reservado para desarrolladores. Si modificas algo, el sistema lo sabrá y automáticamente cerrará tu sesión. Además, se enviará tu dirección IP y datos de usuario al administrador.");
        }
        }
    document.addEventListener('contextmenu', handleRightClick);
    return () => {
    document.removeEventListener('contextmenu', handleRightClick);};
}, [])
const user = localStorage.getItem('usuario');
if (!user) {
    return <Navigate to={redirect} replace />;
}
return <Outlet />;
}

export default ProtectPanel;