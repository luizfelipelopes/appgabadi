import { Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { styled } from "styled-components/native";

import LogoSvg from '../../assets/logo-gabadi-online-editado.svg';

export const Container = styled.View`
    flex: 1;

    background: ${({ theme }) => theme.colors.background_light};
    color: ${({ theme }) => theme.colors.text};
`;

export const ContainerLogo = styled.View`
    align-items: center;
    margin-top: ${RFValue(Platform.OS === 'ios' ? 30 : 0)}px;
`;

export const Photo = styled(LogoSvg).attrs({
    width: RFValue(120),
    height: RFValue(120)
})`

    margin-top: ${RFValue(30)}px;
    margin-bottom: ${RFValue(Platform.OS === 'ios' ? 0 : 30)}px;

    border-radius: ${RFValue(20)}px;

`;

export const SocialMediaContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin-top: ${RFValue(130)}px;

`;

export const ContainerLinks = styled.TouchableOpacity`
    align-items: center;
    justify-content: space-between;
    flex-direction:row;

    padding: ${RFValue(0)}px ${RFValue(15)}px;
`;