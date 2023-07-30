import axios from "axios";
import { encode } from 'base-64';

const { SPOTIFY_CLIENT_ID } = process.env;
const { SPOTIFY_CLIENT_SECRET } = process.env;
const { SPOTIFY_ENDPOINT } = process.env;


export const authenticateWithSpotify = async () => {

    const clientID = `${SPOTIFY_CLIENT_ID}`;
    const clientSecret = `${SPOTIFY_CLIENT_SECRET}`;
    const authEndpoint = `${SPOTIFY_ENDPOINT!}`;

    try {
        const response = await axios.post(authEndpoint, 'grant_type=client_credentials', {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
                Authorization: `Basic ${encode(`${clientID}:${clientSecret}`)}`,
            }
        });

        const { access_token } = response.data;

        return access_token;

    } catch (error) {
        console.log('error authenticateWithSpotify', error)
        throw new Error(error.message);
    }
}

export const getArtistInfo = async (artistName:string) => {
    
    try {
        
        const accessToken = await authenticateWithSpotify();

        if(!accessToken) {
            throw new Error("Não foi possível obter o token de acesso.");
        }

        const searchEndpoint = 'https://api.spotify.com/v1/search';
        const type = 'artist';
        const searchQuery = `q=${encodeURIComponent(artistName)}&type=${type}`;

        const response = await axios.get(`${searchEndpoint}?${searchQuery}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })

        const artistInfo = response.data.artists.items[0];

        return artistInfo;

    } catch (error) {
        console.log('error getArtistInfo', error)
        throw new Error(error.message);
    }
    
    

}