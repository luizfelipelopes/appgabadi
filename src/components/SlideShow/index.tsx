import { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { Container, TextSlideShow } from "./styles";

interface SlideShowProps {
    text: string;
    widthLimit?: number;
    slideInterval?: number;
}
const { width } = Dimensions.get('window');

export function SlideShow ({ text, widthLimit = width, slideInterval = 4000 }: SlideShowProps)  {
    
    const scrollViewRef = useRef(null);
    const [textWidth, setTextWidth] = useState(0);
    const scrollX = useSharedValue(0);

    const textFormatted = text.trim();
  
    useEffect(() => {
        const scrollTimer = setInterval(() => {

            scrollX.value += widthLimit;
            scrollX.value = withSpring(scrollX.value, { damping: 1, stiffness: 0.1 })
        
        }, slideInterval);
    
        return () => clearInterval(scrollTimer);
      }, [textWidth]);

  
    const handleTextLayout = (event) => {
        const textLayout = event.nativeEvent.layout;
        setTextWidth(textLayout.width);
    };

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x;
    });

    const animatedStyle = useAnimatedStyle(() => {
        
        return {
            transform: [{ 
                translateX: withTiming(-scrollX.value, 
                    { duration: 500 })}],
        };
    });

    const iterationsText = (iterationNumber?: number) => {
        const arrayTexts = [];
        const total = iterationNumber ?? 1;

        for (let index = 0; index < total; index++) {
            arrayTexts.push(
                <TextSlideShow key={index}
                    onLayout={handleTextLayout}>
                    {' ' + textFormatted}
                </TextSlideShow>

            );
        }

        return arrayTexts;
    }
  
    return (
        <Container
            ref={scrollViewRef}
            onScroll={scrollHandler}>

            {textWidth >  widthLimit ?
                
                <Animated.View style={[{ flexDirection: 'row' }, animatedStyle]}>
                    {iterationsText(120)}
                </Animated.View> :

                <TextSlideShow
                    onLayout={handleTextLayout}>
                    {textFormatted}
                </TextSlideShow> 
                
            }
            
        </Container>
    );
  };