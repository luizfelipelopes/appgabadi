import { MusicPlayer } from "../../components/MusicPlayer";
import { Container, ContainerLinks, ContainerLogo, Photo, SocialMediaContainer } from "./styles";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Alert, Linking, Platform } from "react-native";
import { About } from "../About";
import { Locations } from "../Locations";
import theme from "../../global/styles/theme";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { gabadiYoutube, linkPoliciesPrivacity, pibDiamantinaInsta, whatsAppUrl } from "../../utils/utils";

const { Navigator, Screen } = createDrawerNavigator();

export function Home() {

    const navigation = useNavigation();

    const handlePress = ( async (link: string) => {
    
        const supported = await Linking.canOpenURL(link);
    
        if(supported) {
            await Linking.openURL(link);
        } else {
            Alert.alert(`Não é possível abrir este link: ${link}`);
        }
    
      })

    const seeMoreOptions = (url: any, param?: any) => {

        try {
            
            setTimeout(() => {
                navigation.navigate(url, param)          
            }, 500);
            
        } catch (error) {
            console.log(error)
        }
  
        
      }

      function CustomDrawerContent(props) {
            return (
                <Container>

                    <ContainerLogo>
                        <Photo />
                    </ContainerLogo>

                    <DrawerContentScrollView {...props}>
                        <DrawerItem labelStyle={{ fontSize: RFValue(16), color: theme.colors.text}} label={"Sobre Nós"} onPress={() => seeMoreOptions('Sobre Nós')} />
                        <DrawerItem labelStyle={{ fontSize: RFValue(16), color: theme.colors.text}} label={"Siga-nos"} onPress={() => seeMoreOptions('Mídias Sociais')} />
                        <DrawerItem labelStyle={{ fontSize: RFValue(16), color: theme.colors.text}} label={"Políticas de Privacidade"} onPress={() => handlePress(linkPoliciesPrivacity)} />

                        <SocialMediaContainer>
                            <ContainerLinks onPress={() => handlePress(pibDiamantinaInsta)}>
                                <AntDesign name="instagram" size={RFValue(34)} color={theme.colors.text} />
                            </ContainerLinks>
                            <ContainerLinks onPress={() => handlePress(gabadiYoutube)}>
                                <AntDesign name="youtube" size={RFValue(34)} color={theme.colors.text} />
                            </ContainerLinks>
                            <ContainerLinks onPress={() => handlePress(whatsAppUrl)}>
                                <FontAwesome5 name="whatsapp" size={RFValue(34)} color={theme.colors.text} />
                            </ContainerLinks>
                        </SocialMediaContainer>

                    </DrawerContentScrollView>
                
                </Container>
            );
        }


    return(
        <Navigator
            screenOptions={{
                headerTintColor: theme.colors.text,
                drawerStyle: { width: RFValue(Platform.OS === 'ios' ? 240 : 250) },
            }}
            drawerContent={ props =>
                <CustomDrawerContent {...props} />
            }>
            
            <Screen name="Rádio" component={MusicPlayer}  options={{headerTransparent: true, headerTitleStyle: {display: 'none'}}} />
            <Screen name="Sobre Nós" component={About} />
            <Screen name="Siga-nos" component={Locations} />

        </Navigator>
    );
}