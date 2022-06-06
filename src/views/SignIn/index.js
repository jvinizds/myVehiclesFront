import React, { useState } from 'react'
import { Alert, Platform, View } from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyledButtonPrimario, StyledMessageButton } from '../../components/styled/Botao'
import { InputArea, InputSignInUp } from '../../components/styled/Input'
import { Titulo, StyledLinkLegenda } from '../../components/styled/Texto'
import Api from '../../resources/api/Api'

export default () => {
  const navigation = useNavigation()

  const [emailField, setEmailField] = useState('')
  const [senhaField, setSenhaField] = useState('')

  const handleRedirectSignUpButtonClick = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'SignUp' },
        ],
      })
    )
  }

  const handleSignInClick = async () => {
    if (senhaField && emailField) {
      let res = await Api.signIn(emailField, senhaField)
      if (res.access_token) {
        await AsyncStorage.setItem('token', res.access_token)
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'PreLoad' },
            ],
          })
        )
      } else {
        Platform.OS === 'web' ? alert(`‼️Erro: ${res.errors[0].msg}`) : Alert.alert("‼️Erro", res.errors[0].msg)
      }
    } else {
      Platform.OS === 'web' ? alert(`‼️Atenção: Preencha todos os campos`) : Alert.alert("‼️Atenção", 'Preencha todos os campos')
    }
  }

  return (
    <View>
      <Titulo>
        Bem vindo de volta!
      </Titulo>

      <InputArea>
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
        <StyledLinkLegenda text="Esqueceu a senha?" />

        <StyledButtonPrimario
          icon="login"
          text="Login"
          onPress={handleSignInClick} />

      </InputArea>

      <StyledMessageButton onPress={handleRedirectSignUpButtonClick} text="Ainda não tem uma conta?" textBold="Registre-se" />

    </View>
  );
}