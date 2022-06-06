import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PreLoad from '../views/PreLoad'
import SignIn from '../views/SignIn/index'
import SignUp from '../views/SignUp/index'
import Veiculo from '../views/Veiculo'
import Veiculos from '../views/Veiculos'

const Stack = createNativeStackNavigator()

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='PreLoad'>
                <Stack.Screen name="PreLoad" component={PreLoad} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Veiculo" component={Veiculo} />
                <Stack.Screen name="Veiculos" component={Veiculos} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}