import React, { useState } from 'react'
import { Alert, Platform } from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { Container } from '../../components/styled/Outros';
import { StyledButtonPrimario, StyledMessageButton } from '../../components/styled/Botao'
import { InputArea, InputSignInUp } from '../../components/styled/Input'
import { Titulo } from '../../components/styled/Texto.js';
import Api from '../../resources/api/Api'

export default () => {
  const navigation = useNavigation()

  const [nomeField, setNomeField] = useState('')
  const [emailField, setEmailField] = useState('')
  const [senhaField, setSenhaField] = useState('')

  const handleRedirectSignInButtonClick = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'SignIn' },
        ],
      })
    )
  }

  const handleSignUpClick = async () => {
    if (nomeField && senhaField && emailField) {
      let res = await Api.signUp(nomeField, emailField, senhaField)
      if (res.acknowledged) {
        Platform.OS === 'web' ? alert(`Usuário criado! Efetue o login`) : Alert.alert("Aviso", `Usuário cadastrado com sucesso! \nPor favor, efetue o Login`)

        navigation.navigate('SignIn')

      } else {
        Platform.OS === 'web' ? alert(`‼️Erro: ${res.errors[0].msg}`) : Alert.alert("‼️Erro", res.errors[0].msg)
      }
    } else {
      Platform.OS === 'web' ? alert(`Preencha todos os campos`) : Alert.alert("‼️Erro", 'Preencha todos os campos')
    }
  }

  return (
    <Container >
      <Titulo >Cadastrar-se</Titulo>

      <InputArea>
        <InputSignInUp
          icon="human"
          placeholder="Digite o seu nome completo"
          value={nomeField}
          onChangeText={t => setNomeField(t)}
        />
        <InputSignInUp
          icon="email"
          placeholder="Digite o seu e-mail"
          value={emailField}
          onChangeText={t => setEmailField(t)}
        />
        <InputSignInUp
          icon="lock"
          placeholder="Digite a sua senha"
          value={senhaField}
          onChangeText={t => setSenhaField(t)}
          password={true}
        />

        <StyledButtonPrimario
          icon="login"
          text="Registrar-se"
          onPress={handleSignUpClick} />

      </InputArea>

      <StyledMessageButton onPress={handleRedirectSignInButtonClick} text="Já é um usuário?" textBold="Faça o login" />

    </Container >
  );
}

