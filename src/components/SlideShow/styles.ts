import { RFValue } from "react-native-responsive-fontsize";
import { styled } from "styled-components/native";

export const Container = styled.ScrollView.attrs({
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
    scrollEventThrottle: 16
})
`
    margin: ${RFValue(0)}px ${RFValue(20)}px;
`;

export const TextSlideShow = styled.Text`
    font-size: ${RFValue(18)}px;
    text-align: center;
    align-self:center;
    color: #EEEEEE;
    font-family: ${({ theme }) => theme.fonts.regular};

`;