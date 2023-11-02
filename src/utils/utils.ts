import { Alert, Linking } from "react-native";


export const radioGabadiOnlineInsta = 'https://www.instagram.com/radiogabadionline/';
export const pibDiamantinaInsta = 'https://www.instagram.com/pibdiamantina/';
export const gabadiYoutube = 'https://www.youtube.com/gabadi';
export const linkPoliciesPrivacity = 'https://politica-privacidade-gabadi.vercel.app/';

export const whatsAppFone = '5538999370256';
export const whatsAppUrl = `https://wa.me/${whatsAppFone}/`;

export const handlePress = ( async (link: string) => {
    
    const supported = await Linking.canOpenURL(link);

    if(supported) {
        await Linking.openURL(link);
    } else {
        Alert.alert(`Não é possível abrir este link: ${link}`);
    }

  })