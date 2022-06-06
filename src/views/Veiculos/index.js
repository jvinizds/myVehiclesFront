import React, { useState, useEffect } from 'react'
import { ScrollView, Text, ActivityIndicator, StyleSheet, View } from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { StyledButtonPrimario, StyledButtonTerciario } from '../../components/styled/Botao'
import { Container } from '../../components/styled/Outros'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ListaVeiculos from '../../components/styled/ListaVeiculos'
import themes from '../../themes'
import Header from '../../components/styled/Header'
import Api from '../../resources/api/Api'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [listaVeiculos, setLlistaVeiculos] = useState([])

    async function getVeiculos() {
        setLoading(true)
        const user_id = await AsyncStorage.getItem('user_id')
        let res = await Api.getVeiculos(user_id)
        res.ok === 0
            ? alert(`Não foi possível obter a lista de veiculos ${res.codeName}`)
            : setLlistaVeiculos(res)
        setLoading(false)
    }

    useEffect(() => {
        getVeiculos()
    }, [])


    const handleRedirectVeiculoButtonClick = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Veiculo' },
                ],
            })
        )
    }

    const sair = async () => {
        await Api.logout()
        navigation.navigate('SignIn')
    }

    return (
        <>
            <Header headerTitle="Veiculos" />
            <Container>
                <ScrollView>
                    {loading &&
                        <ActivityIndicator size="large"
                            color={themes.padrao.colors.brand.primario} />
                    }
                    {listaVeiculos.length === 0 && !loading &&
                        <Text>Ops! Não existe nenhum veiculo.</Text>
                    }
                    <MaterialCommunityIcons name="cloud-refresh" size={30} color={themes.padrao.colors.brand.primario} onPress={() => getVeiculos()} />

                    {listaVeiculos.map((veiculo, k) => (
                        <ListaVeiculos key={k} data={veiculo} />
                    ))}
                </ScrollView>
                <StyledButtonPrimario icon="car" text="Adicionar" onPress={handleRedirectVeiculoButtonClick} />
                <StyledButtonTerciario icon="logout" text="Sair" onPress={sair} />
            </Container>
        </>
    );
}

const styles = StyleSheet.create({
    containerBotaoSair: {
        justifyContent: 'center'
    }
})