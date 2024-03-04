import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { ImageBackground } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { gabadiYoutube, handlePress, pibDiamantinaInsta, radioGabadiOnlineInsta, whatsAppUrl } from "../../utils/utils";
import { Container, ContainerBackground, ContainerLinks, ContainerText, ContentBackground, ImageLogo, ItemLink, TitleLocations } from "./styles";

export function Locations() {

    return(
        <Container>
            <ContainerBackground>
                <ImageBackground 
                        source={ require('../../assets/background.jpeg') } 
                        resizeMode={"cover"}>
                    <ContentBackground>        
                        <ImageLogo />
                    </ContentBackground>      
                </ImageBackground>  
            </ContainerBackground>
            <ContainerText>
                <TitleLocations>Acompanhe nossas redes sociais:</TitleLocations>    

                <ContainerLinks onPress={() => handlePress(radioGabadiOnlineInsta)}>
                    <AntDesign name="instagram" size={RFValue(24)} color="#fff" />
                    <ItemLink>@radiogabadionline</ItemLink>
                </ContainerLinks>
                <ContainerLinks onPress={() => handlePress(pibDiamantinaInsta)}>
                    <AntDesign name="instagram" size={RFValue(24)} color="#fff" />
                    <ItemLink>@pibdiamantina</ItemLink>
                </ContainerLinks>
                <ContainerLinks onPress={() => handlePress(gabadiYoutube)}>
                    <AntDesign name="youtube" size={RFValue(24)} color="#fff" />
                    <ItemLink>gabadi</ItemLink>
                </ContainerLinks>
                <ContainerLinks onPress={() => handlePress(whatsAppUrl)}>
                    <FontAwesome5 name="whatsapp" size={RFValue(24)} color="#fff" />
                    <ItemLink>(38) 99937-0256</ItemLink>
                </ContainerLinks>
            </ContainerText>
            
        </Container>
    );
}