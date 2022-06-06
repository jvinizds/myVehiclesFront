import React, { useEffect } from 'react'
import { useNavigation, CommonActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import themes from '../../themes'
import Api from '../../resources/api/Api'
import { Container } from '../../components/styled/Outros'
import { TituloPreLoad } from '../../components/styled/Texto'
import { ActivityIndicator } from 'react-native'

export default function PreLoad() {
    const navigation = useNavigation()
    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token')
            if (token) {
                let res = await Api.checkToken(token)
                if (res.access_token) {
                    await AsyncStorage.setItem('token', res.access_token)
                    navigation.navigate('Veiculos')
                } else {
                    navigation.navigate('SignIn')
                }
            } else {
                navigation.navigate('SignIn')
            }
        }
        checkToken()
    }, [])

    return (
        <Container>
            <ActivityIndicator size="large"
                color={themes.padrao.colors.brand.secundario} />
            <TituloPreLoad>Aguarde...</TituloPreLoad>
        </Container>
    )
}