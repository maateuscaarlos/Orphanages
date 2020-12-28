import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

import OrphanagesDetails from './pages/OrphanagesDetails';
import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageData from './pages/createOrphanages/OrphanageData';
import SelectMapPosition from './pages/createOrphanages/SelectMapPosition';
import Header from './components/Header';

const {Navigator, Screen} = createStackNavigator();
const Routes: React.FC = () =>{
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown:false, cardStyle:{backgroundColor:'#FFF'}}}>
                <Screen 
                name="OrphanagesMap" 
                component={OrphanagesMap}
                />
                <Screen 
                name="OrphanagesDetails" 
                component={OrphanagesDetails}
                options={{
                    headerShown:true,
                    header:()=> <Header title='Orfanato' showX={false} />
                }}
                />
                <Screen 
                name="OrphanageData" 
                component={OrphanageData}
                options={{
                    headerShown:true,
                    header:()=><Header title='Informe os dados'/>
                }}
                />
                <Screen 
                name="SelectMapPosition" 
                component={SelectMapPosition}
                options={{
                    headerShown:true,
                    header:()=><Header title='Selecione a posição do mapa'/>
                }}
                />          
            </Navigator>
        </NavigationContainer>
    );
}

export default Routes;