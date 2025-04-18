import { Redirect } from "expo-router";



const index = () => {
    
    return <Redirect href={"/Pages/inscription"} /> //Permet de rediriger automatiquement l'application
    //vers la page d'accueil une fois l'application démarrée avec expo-router
}


export default index;
