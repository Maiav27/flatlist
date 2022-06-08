
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { render } from 'react-dom';




export default function App() {
 const baseUrl = 'https://api.jikan.moe/v3/anime/'
 const [data, setData] = useState([])

   const randomNumber = () =>{
   return Math.floor(Math.random() * (400 - 1)) + 1
 }
  
 const animeRandom =  async () => {

    let req
  
    
      req =  await axios(`${baseUrl}${randomNumber()}`)

    
     
   return { 
     id : randomNumber(),
     titulo : req.data.title,
     qtdeEpisodios : req.data.episodes,
     genero : req.data.genres.map((genero, index ) => index + 1 == req.data.genres.length ?  genero.name : genero.name+', '),
     image : req.data.image_url
   }
}

 const randomArray =  async () =>{
   let array = []
    for(let i = 0; i < 7 ; i++){
           array[i] =   await animeRandom()
          
          }

      Promise.all(array).then(data => setData(data))
        
    
 }  
 useEffect(() =>{

   randomArray() 
},[])
 
  
  const renderItem = ({item}) =>{
    return(

      <View style={styles.card}>
         <Image source={ { uri : item.image}} style={styles.image} />
         <View >
            <Text> Título : {item.titulo}</Text>
            <Text> Gênero : {item.genero}</Text>
            <Text> Quantidade de episodios : {item.qtdeEpisodios}</Text>
         </View>

      </View>

    )
  }

  
  return (
    <View style={styles.container}>
        <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.id}/>
      
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
  
  card : {
     borderWidth : 2 ,
     borderRadius : 80,
     width : 320,
     height :280, 
     marginBottom : 10, 
     borderColor : 'black',
    
    
  },
  image : {
    width : 315,
    height : 150,
    borderTopRightRadius : 80,
    borderTopLeftRadius : 80,
    
  }
});
