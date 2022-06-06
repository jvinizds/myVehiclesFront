import React from 'react'
import styled from 'styled-components/native'
import themes from '../../themes'
import { Titulo } from './Texto'

const Container = styled.SafeAreaView`
    width: 100%;
    background-color: ${themes.padrao.colors.neutral.neutral_20};
    padding-top: 10px;         padding-bottom: 10px;
    height: 80px;              flex-direction: row;
    align-items: center;       justify-content: center;
`
const Header =({ headerTitle }) => {
    return(
        <Container>
            <Titulo>{headerTitle}</Titulo>
        </Container>
    )
}
export default Header