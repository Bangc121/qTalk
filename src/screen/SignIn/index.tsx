import React, { useState } from 'react';
import { Text } from 'react-native';
import { RootStackNavigationProps } from '../../navigation/RootStackNavigator';
import styled from 'styled-components/native';
import KakaoLogins, { KAKAO_AUTH_TYPES } from '@react-native-seoul/kakao-login';
import {useAppContext} from '../../providers/AppProvider';
import {User} from '../../types';
import { useId } from "react-id-generator";

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  overflow: scroll;
  /* background-color: ${({ theme }): string => theme.background}; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const LoginButton = styled.TouchableOpacity<{ backgroundColor: string }>`
  height: 44px;
  width: 274px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.backgroundColor};
  border-radius: 30px;
`;

const ButtonText = styled.Text<{ color: string }>`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
  text-align: center;
  color: ${props => props.color};
`;

const StyledText = styled.Text`
  font-size: 18px;
  line-height: 27px;
  color: ${({theme}): string => theme.text};
`;

if (!KakaoLogins) {
  console.error('Module is Not Linked');
}

interface Props {
  navigation: RootStackNavigationProps<'SignIn'>;
}

function SignIn(props: Props): React.ReactElement {
  const {navigation} = props;

  const {
    state: {user},
    setUser,
  } = useAppContext();

  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [userId] = useId();

  const kakaoLogin = () => {
    KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
      .then(result => {
        console.log('kakaoLogin', result);
        getProfile();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const kakaoLogout = () => {
    KakaoLogins.logout()
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getProfile = () => {
    KakaoLogins.getProfile()
      .then(result => {
        console.log(result);

        setIsLoggingIn(true);

        const myUser: User = {
          userId,
          nickname: result.nickname,
          email: result.email,
          profile: result.profile_image_url,
        };
    
        setUser(myUser);
        setIsLoggingIn(false);
        navigation.navigate('BottomTabs');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Container>
      <LoginButton backgroundColor="#ffeb00" onPress={(): void => kakaoLogin()} isLoading={isLoggingIn}>
        <ButtonText color="#3c1e1e">카카오로 로그인</ButtonText>
      </LoginButton>
    </Container>
  );
}

export default SignIn;
