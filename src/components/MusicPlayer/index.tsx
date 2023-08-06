import { useEffect, useState } from "react";
import { Dimensions, ImageBackground, ScrollView, Text, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import TrackPlayer, { AppKilledPlaybackBehavior, Capability, Event, State, usePlaybackState, useTrackPlayerEvents } from "react-native-track-player";
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from "../../global/styles/theme";
import { getArtistInfo } from "../../hooks/spotify";
import { SlideShow } from "../SlideShow";
import { Container, ContainerBackground, ContentBackground, ImageBorder, ImageLogo, ImageWrapper, MainContainer, MainWrapper, MusicControlsContainer, SongContentTextArtist, SongContentTextTitle, SongText } from "./styles";

export function MusicPlayer() {
    
    const audioUrl = 'http://paineldj5.com.br:8076/stream';
    const thumbDefault = 'https://play-lh.googleusercontent.com/MndpDp084TBi-dRBomUQ2zoxL-DYRW1di26yn_L_vZB2z82aYdJAyPIWk8Bn2FW4Y_qR';
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackTitle, setTrackTitle] = useState('A Potência Gospel de Diamantina');
    const [trackArtist, setTrackArtist] = useState('Gabadi');
    const [trackArtwork, setTrackArtwork] = useState(thumbDefault);
    const [textWidth, setTextWidth] = useState(0);
    
    const playBackState = usePlaybackState();

    const setupPlayer = async () => {
        try {
            
            const track = await TrackPlayer.getCurrentTrack();
            await configPlayer();
          

        } catch (error) { 
            console.log('error setupPlayer', error); 

            try {
                await TrackPlayer.setupPlayer();
                await configPlayer();
            } catch (error) {
                console.log('error setupPlayer Catch', error); 
            }

           
        }
    };

    const configPlayer = async () => {

        try {
            await TrackPlayer.updateOptions({
                android: {
                    appKilledPlaybackBehavior:
                      AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
                },
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                ],
                
            });
    
            await TrackPlayer.add({
                id: 'track',
                url: audioUrl,
                title: trackTitle,
                artist: trackArtist,
                artwork: trackArtwork,
                duration: 0,
            });
            
            await gettrackdata();
            await TrackPlayer.play();    
        } catch (error) {
            console.log('configPlayer error', error)
        }

        
    }

    useTrackPlayerEvents([Event.PlaybackTrackChanged, Event.PlaybackMetadataReceived], async event => {

        try {
            if (event.type === Event.PlaybackTrackChanged && event.nextTrack) {
                
                const track = await TrackPlayer.getTrack(event.nextTrack);
                const {title, artwork, artist} = track;
                
                setTrackIndex(event.nextTrack);
                setTrackTitle(title);
                setTrackArtist(artist);
                setTrackArtwork(artwork);
            }

            if(event.type === Event.PlaybackMetadataReceived) {

                if(event?.title !== trackTitle) {
                    updateTrackMetadata(event.title!, event.artist!);
                }
            }    

        } catch (error) {
            console.log('useTrackPlayerEvents error', error)    
        }

    });


    const hasViewThumb = (artist?: string) =>{

        if(artist
           && (
            artist.toLowerCase().trim().includes('desconhecido') 
            || artist.toLowerCase().trim().includes('gabadi')  
           ) ){
            return false;
        }

        return true;
    }


    const updateTrackMetadata = async (title: string, artist: string, track = 0) => {
        
        try {
            const artWork = hasViewThumb(artist) ? await getArtistImage(artist) : thumbDefault;

            await TrackPlayer.updateMetadataForTrack(track, {
                title: title,
                artist: artist,
                artwork: artWork
            });

            gettrackdata();    
        } catch (error) {
            console.log('updateTrackMetadata error', error)
        }
        
        
    };

    const getArtistImage = async (artistName: string) => {

        let artistUrl = thumbDefault;

        try {

            const artistInfo = await getArtistInfo(artistName);
            artistUrl = artistInfo?.images[0]?.url ?? thumbDefault; 
        } catch (error) {
            console.log('getArtistImage', error)
            artistUrl = thumbDefault;
        }

        return artistUrl;
    }

    const gettrackdata = async () => {

        try {
            let trackIndex = await TrackPlayer.getCurrentTrack();
            let trackObject = await TrackPlayer.getTrack(trackIndex!);
            setTrackIndex(trackIndex!);
            setTrackTitle(trackObject!.title!);
            setTrackArtist(trackObject!.artist!);
            setTrackArtwork(trackObject!.artwork!);    
        } catch (error) {
            console.log('gettrackdata error', error)
        }

        
    };

    const togglePlayBack = async (playBackState: any) => {
        
        const currentTrack = await TrackPlayer.getCurrentTrack();

        if (currentTrack != null) {
            if ((playBackState == State.Paused) 
            || (playBackState == State.Ready)
            || (playBackState == 'idle')
            ) {
                    await TrackPlayer.reset();
                    await configPlayer();
                } else {
                    await TrackPlayer.pause();
                }
            }
        };

    
    useEffect(() => {
        
        setupPlayer();

        const clearSetup = async () => {
            await TrackPlayer.reset();
        }

        return () => {
            try { clearSetup() } catch(error){};
        };
    }, []);


    const marginSize = 40;
    const { width } = Dimensions.get('window');

    const handleTextLayout = (event) => {
        
        const textLayout = event.nativeEvent.layout;
        setTextWidth(textLayout.width);

    };

    return (

        <Container>
            <ContainerBackground>
                
                <ImageBackground 
                    source={ require('../../assets/background.jpeg') } 
                    resizeMode={"cover"} >
                    <ContentBackground>        
                        <ImageLogo />
                    </ContentBackground>      
                </ImageBackground>  
            </ContainerBackground>

            <MainContainer>
                
                <MainWrapper width={width}>
                    <ImageBorder>
                        <ImageWrapper source={ {uri: trackArtwork } } /> 
                    </ImageBorder>
                </MainWrapper>
                
                <SongText>
                
                    { textWidth >= width - marginSize
                    ? <SlideShow text={trackTitle} widthLimit={width} />
                    : <SongContentTextTitle>{trackTitle}</SongContentTextTitle>}
                    
                    <SongContentTextArtist>{trackArtist}</SongContentTextArtist>
                </SongText>

                <MusicControlsContainer>
                
                    <TouchableOpacity onPress={() => togglePlayBack(playBackState) }>

                    <Ionicons
                        name={
                        playBackState === State.Playing
                            ? 'ios-pause-circle'
                            : playBackState === State.Connecting
                            ? 'ios-caret-down-circle'
                            : 'ios-play-circle'
                        }
                        size={RFValue(75)}
                        color={theme.colors.primary}
                        
                    />
                    </TouchableOpacity>
                    
                </MusicControlsContainer>

            </MainContainer>

            <ScrollView style={{ position: 'absolute', bottom: 0 }} horizontal>
                <Text onLayout={handleTextLayout}>{trackTitle}</Text>
            </ScrollView>            
            
      </Container>

    );
}

