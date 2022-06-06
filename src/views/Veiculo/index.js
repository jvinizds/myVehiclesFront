import React, { useState } from 'react'
import { Text, TextInput, StyleSheet, Platform, ActivityIndicator, Button, View }
    from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Header from '../../components/styled/Header'
import themes from '../../themes'
import Api from '../../resources/api/Api'
import { InputArea, InputFormVeiculo } from '../../components/styled/Input'
import { StyledButtonPrimario, StyledButtonSecundario, StyledButtonTerciario } from '../../components/styled/Botao'

export default ({ route }) => {
    const navigation = useNavigation()
    //Veio algum dado através da rota de navegação?
    const dadosExistentes = route.params ? route.params.veiculo :
        {
            marca: '', modelo: '', cor: '', placa: '',
            renavam: ''
        }

    const [veiculo, setVeiculo] = useState(dadosExistentes)

    const salvarVeiculo = async (dadosVeiculo) => {
        let salvar = dadosVeiculo.hasOwnProperty('_id') ? await Api.alteraVeiculo(dadosVeiculo) : await Api.incluiVeiculo(dadosVeiculo)
        if (salvar.hasOwnProperty('errors')) {
            Platform.OS === 'web' ? alert(`‼️Erro: ${salvar.errors[0].msg}`) : Alert.alert("‼️Erro", salvar.errors[0].msg)
        } else if (salvar.hasOwnProperty('acknowledged')) {
            Platform.OS === 'web' ? alert(`Salvo com sucesso `) : Alert.alert("Ok", 'Salvo com sucesso')
            navigation.navigate('Veiculos')
        }
    }

    return (
        <View>
            <Header headerTitle="Veiculo" />
            <InputArea>
                <InputFormVeiculo
                    name='marca'
                    onChangeText={(text) => setVeiculo({ ...veiculo, marca: text })}
                    value={veiculo.marca}
                    keyboardType='default'
                    placeholder='Marca'
                    maxLength={50}
                />
                <InputFormVeiculo
                    name='modelo'
                    onChangeText={(text) => setVeiculo({ ...veiculo, modelo: text })}
                    value={veiculo.modelo}
                    keyboardType='default'
                    placeholder='Modelo'
                    maxLength={100}
                />
                <InputFormVeiculo
                    name='cor'
                    onChangeText={(text) => setVeiculo({ ...veiculo, cor: text })}
                    value={veiculo.cor}
                    keyboardType='default'
                    placeholder='Cor'
                    maxLength={100}
                />
                <InputFormVeiculo
                    name='placa'
                    onChangeText={(text) => setVeiculo({ ...veiculo, placa: text })}
                    value={veiculo.placa}
                    keyboardType='default'
                    placeholder='Placa'
                    maxLength={7}
                />
                <InputFormVeiculo
                    name="renavam"
                    onChangeText={(text) => setVeiculo({ ...veiculo, renavam: text })}
                    value={veiculo.renavam}
                    keyboardType="default"
                    placeholder='Renavam'
                    maxLength={11}
                />
                <StyledButtonSecundario
                    text='Salvar o Registro'
                    onPress={() => salvarVeiculo(veiculo)}
                />
                <StyledButtonTerciario
                    text='Cancelar'
                    onPress={() => navigation.navigate('Veiculos')}
                    background-color={themes.padrao.colors.brand.terciario}
                />
            </InputArea>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        height: 40, margin: 8, borderWidth: 1,
        borderColor: themes.padrao.colors.brand.terciario, padding: 8
    },
    label: { marginLeft: 8, marginTop: 8, marginBottom: 4, fontSize: 14 }
})