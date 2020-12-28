import React, {useState} from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import MapView, {Marker,  Callout,PROVIDER_GOOGLE}  from 'react-native-maps';
import {useNavigation, useFocusEffect} from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';

import api from '../service/api'

import mapMarker from '../images/map-marker.png';

interface Orphanage{
    id:number;
    latitude:number;
    longitude:number;
    name:string;
}
const OrphanagesMap: React.FC = () =>{
    const navigation = useNavigation();
    
    const [orphanages, setOrphanages] =  useState<Orphanage[]>([]);
    
    useFocusEffect(()=>{
        api.get('orphanages').then(response =>{
            setOrphanages(response.data);
        });
    });

    function handlerNavigateToOrphanageDetails(id:number){
        navigation.navigate('OrphanagesDetails', {id});
}
    function handlerNavigateToCreateOrphanage(){
        navigation.navigate('SelectMapPosition')
    }
    return (
        <View style={styles.container}>
            <MapView
                provider = {PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={
                   {
                    latitude:-6.5205485,
                    longitude:-38.4155765,
                    latitudeDelta:0.008,
                    longitudeDelta:0.008,
                   }
                }
                >
                {orphanages.map((orphanage) => (
                  <Marker
                    key={orphanage.id}
                    icon={mapMarker}
                    coordinate={{
                      latitude: orphanage.latitude,
                      longitude: orphanage.longitude,
                    }}
                    calloutAnchor={{
                      x: 2.7,
                      y: 0.8,
                    }}
                  >
                    <Callout tooltip={true} onPress={()=>{handlerNavigateToOrphanageDetails(orphanage.id)}}>
                      <View style={styles.calloutContainer}>
                        <Text style={styles.calloutText}>{orphanage.name}</Text>
                      </View>
                    </Callout>
                  </Marker>
                ))}
              </MapView>
              <View style={styles.footer}>
                <Text style={styles.footerText}> {orphanages.length} Orfanato(s) </Text>
                <RectButton
                  style={styles.createOrphanageButton}
                  onPress={handlerNavigateToCreateOrphanage}
                >
                  <Feather name="plus" size={20} color="#fff" />
                </RectButton>
              </View>
            </View>
          );
        }
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    map:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height
    },
    calloutContainer:{
        width:168,
        height:46,
        paddingHorizontal:16,
        backgroundColor:'rgba(255,255,255,0.8)',
        borderRadius:16,
        justifyContent:'center',
    },
    calloutText:{
        color:'#8889a5',
        fontSize:14,
        fontFamily:'Nunito_700Bold',
    },
    footer:{
        position:'absolute',
        left:24,
        right:24,
        bottom:32,

        backgroundColor:'#fff',
        borderRadius:28,
        height:46,
        paddingLeft:24,

        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',

        elevation:3,
    },
    footerText:{
        color:'#8fa7b3',
        fontFamily:'Nunito_700Bold'
    },
    createOrphanageButton:{
        width:56,
        height:56,
        backgroundColor:'#15c3d6',
        borderRadius:28,

        justifyContent:'center',
        alignItems:'center'
    }
});
export default OrphanagesMap;