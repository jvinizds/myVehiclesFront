import React from 'react'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import themes from '../../themes'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default ({ data }) => {
    const navigation = useNavigation()
    const navegaDetalhe = () => {
        navigation.navigate('Veiculo', { veiculo: data })
    }

    const icone = data.tipo == 'Carro' ? 'car' : data.tipo == 'Moto' ? 'motorbike' : data.tipo == 'Caminhão' ? 'truck' : 'bus'

    return (
        <Area onPress={navegaDetalhe}>
            <InfoArea>
                <MaterialCommunityIcons name={icone} size={50} color={themes.padrao.colors.neutral.neutral_100} />
            </InfoArea>
            <InfoArea>
                <Marca>{data.marca}</Marca>
                <Modelo>{data.modelo}</Modelo>
                <Placa>{data.placa}</Placa>
            </InfoArea>
        </Area>
    )
}

const Area = styled.TouchableOpacity`
background: ${themes.padrao.colors.brand.secundario};
margin-bottom: 16px;
border-radius: 16px;
padding: 8px;
flex-direction: row;
`

const InfoArea = styled.View`
margin-horizontal: 10px;
padding-horizonda: 10px;
justify-content: center;

`
const Marca = styled.Text`
color: ${themes.padrao.colors.neutral.neutral_100}
margin-top: 4px;
font-size: 17px;
width: auto;
`
const Modelo = styled.Text`
color: ${themes.padrao.colors.neutral.neutral_100}
font-size: 17px;
width: auto;
`
const Placa = styled.Text`
color: ${themes.padrao.colors.neutral.neutral_100}
font-size: 14px;
margin-top: 4px;
width: auto;
`
