import React, {useEffect, useState} from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Linking
  } from "react-native";
  import MapView, { Marker } from "react-native-maps";
  import { Feather, FontAwesome } from "@expo/vector-icons";
  import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
  import {useRoute} from '@react-navigation/native'

import mapMarker from '../images/map-marker.png'
import api from '../service/api';
import AppLoading from 'expo-app-loading';


interface ParamsId{
  id:number;
}
interface imageUrl{
  id:number;
  url:string;
}
interface Orphanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    about: string;
    instuctions: string;
    opening_hours: string;
    open_on_weekends:boolean;
    images: Array<imageUrl>;
}
const OrphanagesDetails: React.FC = () =>{
const route = useRoute();
const paramsId =  route.params as ParamsId;

const [orphanage, setOrphanage] = useState<Orphanage>();

useEffect(()=>{
  api.get(`orphanages/${paramsId.id}`).then(response =>{
    setOrphanage(response.data);
  })
},[paramsId.id]);
if(!orphanage){
  return <AppLoading/>
}
function handlerOpenGoogleMapsRoute(){
  Linking.openURL(`https://www.google.com/maps/dir/?api1&destination=${orphanage?.latitude, orphanage?.longitude}`)
}

    return(
        <ScrollView style={styles.container}>
           <View style={styles.imagesContainer}>
                <ScrollView horizontal pagingEnabled>
                    {orphanage.images.map(image=>{
                      return(
                        <Image key={image.id} 
                        source={{uri:image.url}}
                        style={styles.image}
                        />
                      )
                    })}
                </ScrollView>
           </View>
           <View style={styles.mapContainer}>
               <Text style={styles.title}>{orphanage.name}</Text>
               <Text style={styles.description}>{orphanage.about}</Text>
                <View style={styles.mapContainer}>
               <MapView
                initialRegion={
                   {
                    latitude:orphanage.latitude,
                    longitude:orphanage.longitude,
                    latitudeDelta:0.008,
                    longitudeDelta:0.008,
                   }
                }
                zoomEnabled={false}
                pitchEnabled={false}
                scrollEnabled={false}
                rotateEnabled={false}
                style={styles.map}
            >
                <Marker
                  icon={mapMarker}
                  coordinate = {{
                    latitude:orphanage.latitude,
                    longitude:orphanage.longitude,
                      }}
                >
                </Marker>

            </MapView>
            <TouchableOpacity onPress={handlerOpenGoogleMapsRoute} style={styles.routesContainer}>
                <Text style={styles.routesText}>Ver rotas no google maps</Text>
            </TouchableOpacity>
           </View>
    </View>
           <View style={styles.separator}/>
           <Text style={styles.title}>Instruções para visitar</Text>
            <Text style={styles.description}>{orphanage.instuctions}</Text>
            <View style={styles.scheduleContainer}>
                <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
                  <Feather name="clock" size={40}color="#2ab5d1">
                    <Text style={[styles.scheduleItemText, styles.scheduleItemTextBlue] }>{orphanage.opening_hours}</Text>
                  </Feather>
                </View>
                {orphanage.open_on_weekends?(
          <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
          <Feather name="clock" size={40} color="#2ab5d1" />
          <Text style={[styles.scheduleItemText, styles.scheduleItemTextGreen]}>
            Open on weekends
          </Text>
        </View>
        ):(
          <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
          <Feather name="clock" size={40} color="#ff669d" />
          <Text style={[styles.scheduleItemText, styles.scheduleItemTextRed]}>
            Closed on weekends
          </Text>
        </View>
        )}
      </View>
      <RectButton style={styles.contactButton} onPress={() => {}}>
        <FontAwesome name="whatsapp" size={24} color="#fff" />
        <Text style={styles.contactButtonText}> Entrar em Contato </Text>
      </RectButton>
    </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      imagesContainer: {
        height: 240,
      },
      image: {
        width: Dimensions.get("screen").width,
        height: 240,
        resizeMode: "cover",
      },
      title: {
        color: "#4d6f80",
        fontSize: 30,
        fontFamily: "Nunito_700Bold",
        textAlign:'center'
      },
      detailsOrphanageContainer: {
        padding: 24,
      },
      description: {
        fontFamily: "Nunito_600SemiBold",
        color: "#5c8599",
        lineHeight: 24,
        marginTop: 16,
        textAlign:'center'
      },
      mapContainer: {
        borderRadius: 20,
        overflow: "hidden",
        borderWidth: 1.2,
        borderColor: "#b3dae2",
        marginTop: 40,
        backgroundColor: "#e6f7fb",
      },
      map: {
        width: "100%",
        height: 150,
      },
      routesContainer: {
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#b3dae2",
      },
      routesText: {
        fontFamily: "Nunito_700Bold",
        color: "#0089a5",
      },
      separator: {
        height: 0.8,
        width: "100%",
        backgroundColor: "#d3e2e6",
        marginVertical: 30,
      },
      scheduleContainer: {
        marginTop: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10
      },
      scheduleItem: {
        width: "48%",
        padding: 20,
        borderWidth: 1,
        borderRadius: 20,
      },
      scheduleItemGreen: {
        backgroundColor: "#edfff6",
        borderColor: "#a1e9c5",
      },
      scheduleItemText: {
        fontFamily: "Nunito_600SemiBold",
        fontSize: 16,
        lineHeight: 24,
        marginTop: 20,
      },
      scheduleItemBlue: {
        backgroundColor: "#e6f7fb",
        borderColor: "#b3eae2",
      },
      scheduleItemTextGreen: {
        color: "#37c77f",
      },
      scheduleItemTextBlue: {
        color: "#5c8599",
      },
      contactButton: {
          backgroundColor: '#3cdc8c',
          borderRadius: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 56,
          marginVertical: 30,
          marginHorizontal: 30
      },
      contactButtonText: {
          fontFamily: 'Nunito_800ExtraBold',
          color: '#fff',
          fontSize: 16,
          marginLeft: 16,
      },
      scheduleItemRed:{
        backgroundColor: '#fef6f9',
        borderColor: '#ffbcd4',
      },
      scheduleItemTextRed:{
        color: '#ff669d'
      }
    });

export default OrphanagesDetails;