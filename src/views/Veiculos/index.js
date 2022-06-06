import React, { useState, useEffect } from 'react'
import { ScrollView, Text, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { StyledButtonPrimario } from '../../components/styled/Botao'
import { Container } from '../../components/styled/Outros'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ListaVeiculos from '../../components/styled/ListaVeiculos'
import themes from '../../themes'
import Header from '../../components/styled/Header'
import Api from '../../resources/api/Api'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
export default () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [listaVeiculos, setLlistaVeiculos] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getVeiculos()
        wait(2000).then(() => setRefreshing(false));
    }, []);

    async function getVeiculos() {
        setLoading(true)
        let res = await Api.getVeiculos()
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
    return (
        <>
            <Header headerTitle="Veiculos" />
            <Container>
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }>
                    {loading &&
                        <ActivityIndicator size="large"
                            color={themes.padrao.colors.brand.primario} />
                    }
                    {listaVeiculos.length === 0 && !loading &&
                        <Text>Ops! Não existe nenhum veiculo adicionar.</Text>
                    }
                    <Text>Lista de veiculos &nbsp;
                        <MaterialCommunityIcons name="cloud-refresh" size={16} color={themes.padrao.colors.brand.primario} onPress={() => getVeiculos()} />
                    </Text>
                    {listaVeiculos.map((veiculo, k) => (
                        <ListaVeiculos key={k} data={veiculo} />
                    ))}
                </ScrollView>
                <StyledButtonPrimario icon="car" text="Adicionar" onPress={handleRedirectVeiculoButtonClick} />
            </Container>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    },
});