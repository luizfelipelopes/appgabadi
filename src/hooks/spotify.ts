import axios from "axios";
import { encode } from 'base-64';


export const authenticateWithSpotify = async () => {

    const clientID = `f3fe9eec7c5f45989378b50dc6449457`;
    const clientSecret = `bcffa46da71a42eb8816c54cf19feef0`;
    const authEndpoint = `https://accounts.spotify.com/api/token`;

    try {
        const response = await axios.post(authEndpoint, 'grant_type=client_credentials', {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
                Authorization: `Basic ${encode(`${clientID}:${clientSecret}`)}`,
            }
        });

        const { access_token } = response.data;

        return access_token;

    } catch (error:any) {
        console.log('error authenticateWithSpotify', error)
        const messageError = `error authenticateWithSpotify - ${error.message}`;
        throw new Error(messageError);
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

    } catch (error: any) {
        console.log('error getArtistInfo', error)
        const messageError = `error getArtistInfo - ${error.message}`;
        throw new Error(messageError);
    }
    
    

}