import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import PreLoad from '../views/PreLoad'
import SignIn from '../views/SignIn/index'
import SignUp from '../views/SignUp/index'
import Veiculo from '../views/Veiculo'
import Veiculos from '../views/Veiculos'

const Drawer = createDrawerNavigator()

export default function Navigation() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName='PreLoad'>
                <Drawer.Screen name="PreLoad" component={PreLoad} />
                <Drawer.Screen name="SignIn" component={SignIn} />
                <Drawer.Screen name="SignUp" component={SignUp} />
                <Drawer.Screen name="Veiculo" component={Veiculo} />
                <Drawer.Screen name="Veiculos" component={Veiculos} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}