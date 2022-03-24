
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';




export default function App() {
 const baseUrl = 'https://api.jikan.moe/v3/anime/'
 const [data, setData] = useState([])
 // const [anime, setAnime] = useState({})
 
 
 const randomNumber = () =>{
   return Math.floor(Math.random() * (400 - 1)) + 1
 }
  
 const animeRandom =  async () => {
   const req = await axios(`${baseUrl}${randomNumber()}`)
   console.log(req.data)
   return req.data;
 }

const a = animeRandom()

 /*const randomArray = () =>{
    for(let i = 0; i < 7 ; i++){
      setData([...data, animeRandom()])
    }
 } */

 //useEffect(() =>{
 // axios.get(`${baseUrl}${randomNumber()}`).then(response => setData( [...data, response.data]))

// },[])
  
  return (
    <View style={styles.container}>
         <Text>{JSON.stringify(a)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
