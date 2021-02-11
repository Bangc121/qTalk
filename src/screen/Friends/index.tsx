import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import { RootStackNavigationProps } from '../../navigation/RootStackNavigator';
import styled from 'styled-components/native';
import {useAppContext} from '../../providers/AppProvider';

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  overflow: scroll;
  background-color: ${({ theme }): string => theme.background};

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;

interface Props {
  navigation: RootStackNavigationProps<'Friends'>;
}

function Friends(props: Props): React.ReactElement {
  const {navigation} = props;

  const {
    state: {user},
  } = useAppContext();

  return (
    <Container>
      <Image         
        style={{width: 100, height: 100, borderRadius: 50}}
        source={{
          uri: user?.profile,
        }}/>
      <Text>{user?.nickname}</Text>
      <Text>{user?.email}</Text>
      <TouchableOpacity style={{width: '100%', height: 50, backgroundColor: 'green'}} onPress={(): void => navigation.navigate('Chat')}><Text>chat</Text></TouchableOpacity>
    </Container>
  );
}

export default Friends;
