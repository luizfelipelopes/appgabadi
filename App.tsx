import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TrackPlayer, { Event, STATE_PLAYING, STATE_PAUSED, Track} from 'react-native-track-player';
import { MusicPlayer } from './src/components/MusicPlayer';

interface AudioPlayerProps {
  audioUrl: string;
}
// http://paineldj5.com.br:8076/stream
export default function App() {


  // const [isPlaying, setIsPlaying] = useState(false);
  // const [duration, setDuration] = useState(0);
  // const [currentTime, setCurrentTime] = useState(0);
  // const soundRef = useRef<TrackPlayer | null>(null);
  // const audioUrl = 'http://paineldj5.com.br:8076/stream';

  // useEffect(() => {

  //   async function setupPlayer() {

  //     await TrackPlayer.setupPlayer();
  //     await TrackPlayer.add({
  //       id: 'track',
  //       url: audioUrl,
  //       title: 'Transmissão ao vivo',
  //       artist: 'Rádio local',
  //       duration: 0,
  //     });
      
  //     const trackDuration = await TrackPlayer.getDuration();
      
  //     setDuration(trackDuration);
      
  //     TrackPlayer.addEventListener(Event.PlaybackState, ({ state }) => {
  //       if (state === STATE_PLAYING) {
  //         setIsPlaying(true);
  //       } else if (state === STATE_PAUSED) {
  //         setIsPlaying(false);
  //       }
  //     });
      
      
  //     TrackPlayer.addEventListener(Event.PlaybackQueueEnded, () => {
  //       setIsPlaying(false);
  //     });
  //   }

  //   setupPlayer();

  //   return () => {
  //     TrackPlayer.destroy();
  //     // TrackPlayer.destroy();
  //   };
  // }, [audioUrl]);

  // const togglePlayPause = async () => {
  //   if (isPlaying) {
  //     await TrackPlayer.pause();
  //   } else {
  //     await TrackPlayer.play();
  //   }
  //   setIsPlaying(!isPlaying);
  // };

  // useEffect(() =>
  // {
  //   return () => {
  //     try { TrackPlayer.reset() } catch(error){};
  //   };
  // }, []);

  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>Transmissão ao vivo</Text>
    //   <TouchableOpacity style={styles.button} onPress={togglePlayPause}>
    //     <Text style={styles.buttonText}>{isPlaying ? 'Pausar' : 'Tocar'}</Text>
    //   </TouchableOpacity>
    //   <View style={styles.progressContainer}>
    //     <View style={{ flex: currentTime, backgroundColor: '#333' }} />
    //     <View style={{ flex: duration - currentTime, backgroundColor: '#ccc' }} />
    //   </View>
    // </View>

    <View style={styles.container}>
        <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'} />
         <MusicPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#333',
//     borderRadius: 50,
//     padding: 15,
//     marginVertical: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   progressContainer: {
//     flexDirection: 'row',
//     height: 5,
//     width: '100%',
//   },
// });
