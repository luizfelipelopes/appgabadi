import { useEffect, useState } from "react";
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TrackPlayer, { AppKilledPlaybackBehavior, Capability, Event, State, usePlaybackState, useTrackPlayerEvents } from "react-native-track-player";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getArtistInfo } from "../../hooks/spotify";

export function MusicPlayer() {
    
    const audioUrl = 'http://paineldj5.com.br:8076/stream';
    const thumbDefault = 'https://play-lh.googleusercontent.com/MndpDp084TBi-dRBomUQ2zoxL-DYRW1di26yn_L_vZB2z82aYdJAyPIWk8Bn2FW4Y_qR';
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackTitle, setTrackTitle] = useState('A Potência Gospel de Diamantina');
    const [trackArtist, setTrackArtist] = useState('Gabadi');
    const [trackArtwork, setTrackArtwork] = useState(thumbDefault);
    
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
                    // await TrackPlayer.play();
                    await TrackPlayer.reset();
                    await configPlayer();
                } else {
                    await TrackPlayer.pause();
                }
            }
        };

    const nexttrack = async () => {
        await TrackPlayer.skipToNext();
        gettrackdata();
    };

    const previoustrack = async () => {
        if (trackIndex > 0) {
            await TrackPlayer.skipToPrevious();
            gettrackdata();
        };
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


    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.mainContainer}>
            
            <View style={styles.mainWrapper}>
                <Image source={ {uri: trackArtwork } } style={styles.imageWrapper} /> 
            </View>
            
            <View style={styles.songText}>
                <Text style={[styles.songContent, styles.songTitle]}>{trackTitle}</Text>
                <Text style={[styles.songContent, styles.songArtist]}>{trackArtist}</Text>
            </View>

            <View style={styles.musicControlsContainer}>
            
                <TouchableOpacity onPress={() => togglePlayBack(playBackState) }>
                <Ionicons
                    name={
                    playBackState === State.Playing
                        ? 'ios-pause-circle'
                        : playBackState === State.Connecting
                        ? 'ios-caret-down-circle'
                        : 'ios-play-circle'
                    }
                    size={75}
                    color="#FFD369"
                />
                </TouchableOpacity>
                
            </View>
            </View>
      </SafeAreaView>

    );
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainWrapper: {
    width: width,
    height: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    alignSelf: "center",
    width: '80%',
    height: '80%',
    borderRadius: 15,
  },
  songText: {
    marginTop:2,
    height: 70
  },
  songContent: {
    textAlign: 'center',
    color: '#EEEEEE',
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  songArtist: {
    fontSize: 16,
    fontWeight: '300',
  },
  progressBar: {
    alignSelf: "stretch",
    marginTop: 40,
    marginLeft:5,
    marginRight:5
  },
  progressLevelDuraiton: {
    width: width,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#FFF',
  },
  musicControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: '60%',
  },
});