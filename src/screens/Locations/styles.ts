import { Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { styled } from "styled-components/native";

import LogoSvg from '../../assets/logo-gabadi-online-editado.svg';

export const Container = styled.View`
    flex: 1;

    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
`;

export const ContainerBackground = styled.View`
    position: absolute;
    
    width: 100%;
    height: ${RFValue(200)}px;

`;

export const ContentBackground = styled.View`
    align-items: center;
    
    width: 100%;
    height: 100%;

    background-color: rgba(0,0,0, 0.85); 
`;

export const ImageLogo = styled(LogoSvg).attrs({
    width: RFValue(120),
    height: RFValue(100)
})`
    margin-top: ${RFValue(Platform.OS === 'ios' ? 50 : 50)}px;
`;


export const ContainerText = styled.View`
    
    padding-left: ${RFValue(20)}px;
    padding-top: ${RFValue(230)}px;
`;

export const TitleLocations = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;

    margin-bottom: ${RFValue(20)}px;
`;

export const ContainerLinks = styled.TouchableOpacity`
    align-items: center;
    flex-direction:row;

    margin-bottom: ${RFValue(15)}px;
    
`;

export const ItemLink = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.regular};
    margin-left: ${RFValue(15)}px;
    
`;