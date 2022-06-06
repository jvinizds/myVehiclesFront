import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styled from 'styled-components/native'
import themes from '../../themes'

const CustomButtonDelete = styled.TouchableOpacity`
background-color: red;
width: auto;
height: auto;
margin-top: 10px;
border-radius: 5px;
align-items: end;
`

export const StyledButtonDelete = ({ icon, onPress }) => {
    return (
        <CustomButtonDelete
            onPress={onPress}>
            <MaterialCommunityIcons name={icon} size={30} color={themes.padrao.colors.neutral.neutral_100} />
        </CustomButtonDelete>
    )
}
