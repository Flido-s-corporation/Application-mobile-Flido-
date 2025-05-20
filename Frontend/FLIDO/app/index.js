import { Redirect } from "expo-router";
import "../global.css"


const index = () => {
    
    return <Redirect href={"/Pages/accueil"} /> //Permet de rediriger automatiquement l'application
    //vers la page d'accueil une fois l'application démarrée avec expo-router
}


export default index;
