import React, { useState, useEffect } from 'react'
import { StyleSheet, Platform, View }
    from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PickerSelect from 'react-native-picker-select';
import Api from '../../resources/api/Api'
import Header from '../../components/styled/Header'
import themes from '../../themes'
import { InputArea, InputFormVeiculo } from '../../components/styled/Input'
import { StyledButtonSecundario, StyledButtonTerciario } from '../../components/styled/Botao'
import { StyledButtonDelete } from './styles'

export default ({ route }) => {
    const navigation = useNavigation()

    const dadosExistentes = route.params ? route.params.veiculo :
        {
            tipo: 'Carro', marca: '', modelo: '', cor: '',
            placa: '', renavam: '', user_id: ''
        }

    const [veiculo, setVeiculo] = useState(dadosExistentes)

    useEffect(() => {
        setVeiculo(dadosExistentes)
    }, [route])


    const salvarVeiculo = async (dadosVeiculo) => {
        dadosVeiculo.user_id = await AsyncStorage.getItem('user_id')
        let salvar = dadosVeiculo.hasOwnProperty('_id') ? await Api.alteraVeiculo(dadosVeiculo) : await Api.incluiVeiculo(dadosVeiculo)
        if (salvar.hasOwnProperty('errors')) {
            Platform.OS === 'web' ? alert(`‼️Erro: ${salvar.errors[0].msg}`) : Alert.alert("‼️Erro", salvar.errors[0].msg)
        } else if (salvar.hasOwnProperty('acknowledged')) {
            Platform.OS === 'web' ? alert(`Salvo com sucesso `) : Alert.alert("Ok", 'Salvo com sucesso')
            navigation.navigate('Veiculos')
        }
    }

    const deletarVeiculo = async (id) => {
        let res = await Api.deletaVeiculo(id)
        if (res.hasOwnProperty('acknowledged')) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: 'Veiculos' },
                    ],
                })
            )
        } else {
            Platform.OS === 'web' ? alert(`‼️Erro: ${res.errors[0].msg}`) : Alert.alert("‼️Erro", res.errors[0].msg)
        }
    }

    return (
        <View>
            <Header headerTitle="Veiculo" />
            {dadosExistentes.marca !== '' &&
                <StyledButtonDelete icon="delete" onPress={() => deletarVeiculo(veiculo._id)} />
            }
            <InputArea>
                <PickerSelect
                    onValueChange={(value) => setVeiculo({ ...veiculo, tipo: value })}
                    value={veiculo.tipo}
                    items={[
                        { label: 'Carro', value: 'Carro' },
                        { label: 'Moto', value: 'Moto' },
                        { label: 'Caminhão', value: 'Caminhao' },
                        { label: 'Onibus', value: 'Onibus' }]}
                    style={pickerSelectStyles}
                    placeholder={{}}
                />
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 64,
        backgroundColor: themes.padrao.colors.neutral.neutral_20,
        flexDirection: 'row',
        borderRadius: 32,
        paddingLeft: 16,
        marginBottom: 16,
        fontSize: 16
    },
    inputAndroid: {
        height: 64,
        backgroundColor: themes.padrao.colors.neutral.neutral_20,
        flexDirection: 'row',
        borderRadius: 32,
        paddingLeft: 16,
        marginBottom: 16,
        fontSize: 16
    },
    inputWeb: {
        height: 64,
        backgroundColor: themes.padrao.colors.neutral.neutral_20,
        flexDirection: 'row',
        borderRadius: 32,
        paddingLeft: 16,
        marginBottom: 16,
        fontSize: 16
    }
});