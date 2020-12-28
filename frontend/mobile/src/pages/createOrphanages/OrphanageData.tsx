import React, { useState } from 'react';
import { View, Text,StyleSheet, ScrollView,Switch, TextInput, TouchableOpacity, Image  } from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as ImagesPicker from  'expo-image-picker';

import api from '../../service/api'

interface Positions{
    latitude:number;
    longitude:number;
}
interface ParamsPosition{
    position:Positions;
}

const OrphanagesDetails: React.FC = () =>{
    const route = useRoute();
    const paramsPosition = route.params as ParamsPosition;
    const navigation = useNavigation()

    
    const [name, setName]= useState('');
    const [about, setAbout]= useState('');
    const [instuctions, setInstuctions]= useState('');
    const [opening_hours, setOpening_hours]= useState('');
    const [open_on_weekends, setOpen_on_weekends]= useState(true);
    const [imagesURI, setImagesURI]= useState<string[]>([]);


    async function handlerCreateOrphanage(){
        
        const{latitude, longitude} = paramsPosition.position;
        
        const data = new FormData();

        data.append('name', name);
        data.append('about', about);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('instuctions', instuctions);
        data.append('opening_hours', opening_hours);
        data.append('open_on_weekends', String(open_on_weekends));

        imagesURI.forEach((imageURI, index)=>{
            data.append('images', {
                name: `image_${index}.jpg`,
                type: 'image/jpg',
                uri: imageURI,
            } as any );
        });

        console.log(data)

        await api.post('orphanages', data);
        navigation.navigate('OrphanagesMap')
    }

    async function handlerSelectImages() {
        const { status } = await ImagesPicker.requestCameraPermissionsAsync();

        if(status !== 'granted'){
            alert("precisamos de acesso as suas fotos");
            return;
        };
        const result = await ImagesPicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality:1,
            mediaTypes: ImagesPicker.MediaTypeOptions.Images,
        });

        if(result.cancelled){
            return;
        }
        const { uri } = result;

        setImagesURI([...imagesURI, uri])
        
    }
    function changeValueOpenOnWeekends(){
        setOpen_on_weekends(!open_on_weekends);
    }

    return(
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Dados</Text>
            
            <Text style={styles.label}>Nome</Text>
            <TextInput 
            style={styles.input}
            value={name}
            onChangeText={text=>setName(text)}
            />

            <Text style={styles.label}>Sobre</Text>
            <TextInput 
            multiline 
            style={[styles.input,{height:110}]}
            value={about}
            onChangeText={setAbout}
            />

            <Text style={styles.label}>WhatsApp</Text>
            <TextInput 
            style={styles.input}
            />

            <Text style={styles.label}>Fotos</Text>

            <View style={styles.imageContainer}>
            {imagesURI.map(imgUri=>{
               return(
                   <Image
                        style={styles.uploadedImage}
                        key={imgUri}
                        source={{ uri:imgUri }}
                   />
               )
           })}
           </View>
            <TouchableOpacity style={styles.imagesInput} onPress={handlerSelectImages}>
                <Feather name='plus'size={24}color="#15B6D6" />
            </TouchableOpacity>

            <Text style={styles.title}>Visitação</Text>
            
            <Text style={styles.label}>Instruções</Text>
            <TextInput 
            multiline 
            style={[styles.input,{height:110}]}
            value={instuctions}
            onChangeText={setInstuctions}
            />

            <Text style={styles.label}>Horário de visita</Text>
            <TextInput 
            style={styles.input}
            value={opening_hours}
            onChangeText = {setOpening_hours}

            />

            <View style={styles.switchContainer}>
                <Text style={styles.label}>Atende no Final de Semana?</Text>
                <Switch
                    thumbColor="#fff"
                    trackColor={{false:'#ccc', true:'#39cc83'}}
                    value = {open_on_weekends}
                    onValueChange = {changeValueOpenOnWeekends}
                />
            </View>
            <RectButton style ={styles.nextButton}onPress={handlerCreateOrphanage}>
                <Text style={styles.nextButtonText}>Cadastrar</Text>
            </RectButton>

        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:12,
    },
    title:{
        color:'#5c8599',
        fontSize:24,
        fontFamily:'Nunito_700Bold',
        marginBottom:32,
        paddingBottom:24,
        borderBottomWidth:0.8,
        borderBottomColor:'#D3E2E6',
        textAlign:'center',
    },
    label:{
        color:'#8fa7b3',
        fontFamily:'Nunito_600SemiBold',
        marginBottom:8,
    },
    input:{
        backgroundColor:'#fff',
        borderWidth:1.4,
        borderColor:'#d3e2e6',
        borderRadius:20,
        height:56,
        paddingVertical:18,
        paddingHorizontal:24,
        marginBottom:16,
        textAlignVertical:'top',
    },
    imagesInput:{
        backgroundColor:'rgba(255, 255, 255, 0.5)',
        borderStyle:'dashed',
        borderColor:'#96D2F0',
        borderWidth:1.4,
        borderRadius:20,
        height:56,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:32,
    },
    switchContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:16,
    },
    nextButton:{
        backgroundColor:'#15c3d6',
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        height:56,
        marginTop:32,
        marginBottom:12,
    },
    nextButtonText:{
        fontFamily:'Nunito_800ExtraBold',
        fontSize:16,
        color:'#FFF',
    },
    uploadedImage:{
        width: 100,
        height: 100,
        borderColor: '#96d2f0',
        borderWidth: 1.4,
        marginVertical: 10,
        marginHorizontal: 5,
    },
    imageContainer:{
        flexDirection:"row",
    }
});

export default OrphanagesDetails;