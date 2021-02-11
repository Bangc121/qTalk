import React, { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, TextInput, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';
import { RootStackNavigationProps } from '../../navigation/RootStackNavigator';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
// import { useMessages, useSendMessage } from '../graphql/cache/Messages';
import { MessageList } from '../../components/MessageList';
import { MessageItem } from '../../components/MessageItem';
import { isIphoneX } from '../../utils';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useWebSockets } from '../../hooks/useWebSockets';
import { useAppContext } from '../../providers/AppProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

export const TIME_FORMAT = 'HH:mm';

interface Props {
  navigation: RootStackNavigationProps<'Chat'>;
}

function Chat(props: Props): React.ReactElement {
  const { navigation } = props;
  const [inputValue, setInputValue] = useState('');
  const [isVisibleKeyboard] = useKeyboard();
  const [data, setData] = useState([
    {
      _id: '',
      sender_id: '',
      senderName: 'bangc',
      text: 'hihi',
      date: new Date(),
    }
  ]);

  const {
    state: { user },
  } = useAppContext();
  // const { logout, user }  = React.useContext(AuthContext);
  // const { data, loading, fetchMore } = useMessages({ sender_id: user._id });
  // const sendMessage = useSendMessage();

  const ref = useRef();

  // const scrollToBottom = () => {
  //   setTimeout(() => {
  //     ref.current.scrollToEnd({ animated: true });
  //   }, 200);
  // };

  // const {message, send} = useWebSockets({
  //   userId: user?.userId,
  //   enabled: Boolean(user?.userId),
  //   // onConnected: scrollToBottom(),
  // });

  const getBackgroundColorByID = (id?: string) => {
    console.log('id', id);
    return '#F2F3F5';
    // if (!id) {
    //   return '#F2F3F5';
    // }
  
    // const colors = ['#E57373','#F06292','#BA68C8','#9575CD','#7986CB','#64B5F6','#4DD0E1','#4FC3F7','#4DB6AC','#81C784','#AED581','#DCE775','#FFF176','#FFD54F','#FFB74D','#FF8A65','#A1887F','#E0E0E0','#90A4AE'];
    // return colors[Math.abs(parseInt(id.replace(/\D/g, ''), 10)) % colors.length];
  };

  const Picture = (letter: string, id: string) => {
    const backgroundColor = getBackgroundColorByID(id);
  
    return (
      <View style={[styles.pictureWrapper, { backgroundColor }]}>
        <Text style={styles.pictureLetter}>
          {letter.substr(0, 1)}
        </Text>
      </View>
    );
  };

  const MessageItem = ({ isImSender, message }) => (
    <View style={[styles.container, { justifyContent: isImSender ? 'flex-end' : 'flex-start' }]}>
      {!isImSender && (
        <View style={styles.memberPicture}>
          {/* <Picture
            letter={message.senderName}
            id={message.sender_id}
          /> */}
        </View>
      )}
      <View style={styles.bubbleSize}>
        <View style={[styles.bubble, { backgroundColor: isImSender ? '#007BFF' : '#F2F3F5' }]}>
          <View style={{ flexShrink: 1 }}>
            {!isImSender && (
              <Text style={styles.senderName}>
                {message.senderName}
              </Text>
            )}
            <Text style={[styles.messageText, { color: isImSender ? '#FFF' : '#262626' }]}>
              {message.text}
            </Text>
          </View>

          <View style={styles.bubbleTime}>
            <Text style={[styles.bubbleTimeText, { color: isImSender ? '#8FC5FF' : '#9D9FA3' }]}>
              {moment(message.date).format(TIME_FORMAT)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const sendMessage = (sender_id: string, senderName: string, text: string) => {
    const msg = {
      _id: '',
      sender_id,
      senderName,
      text,
      date: new Date(),
    };

    setData((prev) => prev.concat(msg));
    setInputValue('');
  };

  return (
    <View style={{ flex: 1 }}>
      <MessageList
        // inverted
        // onEndReached={fetchMore}
        onEndReachedThreshold={0.7}
        // ListFooterComponent={() => (
        //   <>
        //     {loading && <ActivityIndicator size="small" />}
        //   </>
        // )}
        data={data}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => (
          <MessageItem
            message={item}
            isImSender={item.sender_id === user?.userId}
          />
        )}
      />
      <KeyboardAccessoryView
        style={{ backgroundColor: '#FFF' }}
        alwaysVisible
        avoidKeyboard
        bumperHeight={30}
        hideBorder
      >
        <View style={styles.accessoryContainer}>
          <TextInput
            multiline
            onChangeText={(text) => setInputValue(text)}
            value={inputValue}
            placeholder={'Message'}
            placeholderTextColor={'#9D9FA3'}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => sendMessage(user?.userId, user?.nickname, inputValue)}
            style={[styles.buttonSend, { opacity: inputValue ? 1 : 0.5 }]}
            disabled={!inputValue}
          >
            <Icon
              name="md-arrow-up"
              size={18}
              color={'#FFF'}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAccessoryView>

      {isIphoneX && !isVisibleKeyboard && (
        <View style={{ height: 30 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  accessoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  input: {
    flex: 1,
    borderRadius: 18,
    paddingBottom: Platform.OS === 'android' ? 6 : 9,
    paddingTop: Platform.OS === 'android' ? 5 : 8,
    paddingHorizontal: 12,
    fontSize: 17,
    flexGrow: 1,
    lineHeight: 20,
    maxHeight: isIphoneX ? 200 : 100,
    minHeight: 36,
    color: '#262626',
    backgroundColor: '#F2F3F5'
  },
  buttonSend: {
    marginLeft: 12,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: '#007BFF'
  },
  container: {
    marginHorizontal: 12, 
    marginVertical: 6, 
    flexDirection: 'row',
  },
  memberPicture: {
    paddingRight: 12, 
    alignSelf: 'flex-end'
  },
  bubble: {
    paddingVertical: 7, 
    paddingHorizontal: 12, 
    borderRadius: 18, 
    flexDirection: 'row', 
    alignItems:"stretch",
    flexWrap: 'wrap',
  },
  bubbleSize: {
    maxWidth: '80%', 
    flexDirection: 'column'
  },
  senderName: {
    fontSize: 15, 
    lineHeight: 20, 
    fontWeight: '500'
  },
  messageText: {
    fontSize: 17, 
    lineHeight: 22, 
    fontWeight: '400'
  },
  bubbleTime: {
    alignSelf: "stretch",
    flexGrow: 1, 
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  bubbleTimeText: {
    position: 'relative',
    lineHeight: 18,
    top: 2,
    fontSize: 13,
    paddingLeft: 8,
    fontWeight: '400'
  },
  pictureWrapper: {
    backgroundColor: '#597fab',
    width: 32,
    height: 32,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pictureLetter: {
    fontWeight: '500',
    fontSize: 12,
    color: '#fff'
  },
});

export default Chat;