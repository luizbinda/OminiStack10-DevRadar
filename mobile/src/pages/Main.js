import React, { useState, useEffect} from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'
import api from '../services/api'

function Main ({ navigation }){
    const [devs, setDevs] = useState([]);
    const [techs, setTechs] = useState([]);
    const [currentRegion, setcurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition(){
            const { granted } = await requestPermissionsAsync();

            if(granted){
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude ,longitude } = coords;

                setcurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04 ,
                });
            }
        }
        loadInitialPosition();
    },[])

    async function loadDevs(){
        const { longitude, latitude } = currentRegion;

        const response = await api.get('/search',{
            params: {
                latitude,
                longitude,
                techs,
            }
        });

        setDevs(response.data);

    }

    function handlerRegionChanged(region){
        setcurrentRegion(region);
    }


    if(!currentRegion){
        return null;
    }
    return (
        <>
            <MapView 
                initialRegion={currentRegion} 
                style={style.map}
                onRegionChangeComplete={handlerRegionChanged}
            >
                {devs.map( dev => (
                    <Marker id={dev._id} coordinate={
                        { 
                            latitude: dev.location.coordinates[1],
                            longitude: dev.location.coordinates[0]
                        }}>
                        <Image style={style.avatar} source={{ uri: dev.avatar_url}}/>
                        <Callout onPress={ () => {
                            navigation.navigate('Profile', {gitUser: dev.git_user })
                        }}>
                            <View style={style.callout}>
                                <Text style={style.devName}>{dev.nome}</Text>
                                <Text style={style.devBio}>{dev.biografia}</Text>
                                <Text style={style.devTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
                
             </MapView>
             <View style={style.Form}>
                <TextInput 
                    style={style.Input}
                    placeholder="Buscar dev por Techs..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    onChangeText={setTechs}
                />
                <TouchableOpacity onPress={loadDevs} style={style.Button} >
                    <MaterialIcons name="my-location" size={20} color={'#FFF'} />
                </TouchableOpacity>
             </View>
        </>
        
    );
}


const style = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTechs: {
        marginTop: 5,
    },
    Form: {
        position: 'absolute',
        top: 20,
        right: 20,
        left: 20,
        zIndex: 5,
        flexDirection: 'row',
    },
    Input: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },
    Button: {
        width: 50,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    }
})



export default Main