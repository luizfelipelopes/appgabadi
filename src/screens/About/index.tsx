import { ImageBackground } from "react-native";
import { Container, ContainerBackground, ContainerText, ContentBackground, ImageLogo, TextAbout } from "./styles";

export function About() {
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
                <TextAbout>A 1ª Igreja Batista em Diamantina já está a mais de 40 anos pregando o Evangelho em Diamantina e no Vale do Jequitinhonha.</TextAbout>
                <TextAbout>Dentro desse ministério foi criado a GABADI - Galera Batista de Diamantina - esse grupo formado pela mocidade da igreja que se organiza todos os sábados para poderem culturar à Deus.</TextAbout>
                <TextAbout>Venha e traga seus amigos para ouvirem a Palavra de Deus, fazer novas amizades e fortalecer as antigas.</TextAbout>
            </ContainerText>
        </Container>
    );
}