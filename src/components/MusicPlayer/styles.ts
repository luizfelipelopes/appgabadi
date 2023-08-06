import { Image, Platform, SafeAreaView } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { styled } from "styled-components/native";

import LogoSvg from '../../assets/logo.svg';

interface DimensionsProps {
    width: string;
    height: string;
}

export const Container = styled(SafeAreaView)`
    flex: 1;
    background: ${({ theme }) => theme.colors.background};
`;

export const ContainerBackground = styled.View`
    position: absolute;
    
    width: 100%;
    height: ${RFValue(300)}px;
`;

export const ContentBackground = styled.View`
    align-items: center;
    
    width: 100%;
    height: ${RFValue(300)}px;
    background-color: rgba(0,0,0, 0.85); 
`;

export const ImageLogo = styled(LogoSvg).attrs({
    width: RFValue(80),
    height: RFValue(60)
})`
    margin-top: ${RFValue(Platform.OS === 'ios' ? 70 : 30)}px;
`;

export const MainContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const MainWrapper = styled.View<DimensionsProps>`
    width: ${({ width }) => width}px;
    height: ${({ width }) => width}px;
    justify-content: center;
    align-items: center;

    margin-top: ${RFValue(40)}px;

`;

export const ImageBorder = styled.View`

    width: 80%;
    height: 80%;

    border-radius: ${RFValue(15)}px;
    border-width: ${RFValue(4)}px;
    border-color: #fff;

    shadow-offset: ${RFValue(0)}px ${RFValue(4)}px;
    shadow-opacity: 0.3;
    shadow-radius: ${RFValue(2)}px;
    elevation: 7;

`;

export const ImageWrapper = styled(Image)`
    align-self: center;
    width: 100%;
    height: 100%;
    border-radius: ${RFValue(15)}px;
`;

export const SongText = styled.View`
    margin-top: ${RFValue(2)}px;
    height: ${RFValue(70)}px; 
`;


export const SongContent = styled.View`
    text-align: center;
    color: #EEEEEE;
`;


export const SongTitle = styled.View`
    font-size: ${RFValue(18)}px;
    font-weight: 600;
    
`;

export const SongArtist = styled.View`
    font-size: 16px;
    font-weight: 300;
`;

export const SongContentTextTitle = styled.Text`
    font-size: ${RFValue(18)}px;
    text-align: center;
    color: #EEEEEE;
    font-family: ${({ theme }) => theme.fonts.regular};
`;

export const SongContentTextArtist = styled.Text`
    font-size: ${RFValue(18)}px;
    text-align: center;
    color: #EEEEEE;
    font-family: ${({ theme }) => theme.fonts.medium};
`;

export const MusicControlsContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: ${RFValue(20)}px;
    margin-bottom: ${RFValue(20)}px;
    width: 60%;

`;

export const SocialMediaContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const ContainerLinks = styled.TouchableOpacity`
    align-items: center;
    justify-content: space-between;
    flex-direction:row;

    padding: ${RFValue(0)}px ${RFValue(20)}px;
`;