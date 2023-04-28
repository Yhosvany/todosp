import React, { useState } from 'react';
import { 
    StyleSheet,
    Modal, 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput
} from 'react-native';

import * as Notifications from 'expo-notifications';

export default function NotificationModal(props) {
    const [time, setTime] = useState(0);

    // Local Notification
    async function setTaskAlarm() {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: props.title,
          body: props.desc,
          data: {id: props.id},
        },
        trigger: { seconds:  time * 60 },
      });
      props.onClose();
    }

    return (
        <Modal 
            visible={props.visible}
            onRequestClose={props.onClose}
            transparent
            animationType='slide'
            hardwareAccelerated
        >
            <View style={styles.centered_view}>
                <View style={styles.notif_modal}>
                    <View style={styles.notif_title}>
                        <Text style={styles.text}>Remind me After</Text>
                    </View>
                    <View style={styles.notif_body}>
                        <TextInput
                          style={styles.notif_input}
                          placeholder='0'
                          keyboardType='numeric'
                          maxLength={2}
                          value={time}
                          onChangeText={setTime}
                        />
                        <Text style={styles.text}>Minute(s)</Text>
                    </View>
                    <View style={styles.notif_btn_container}>
                      <TouchableOpacity 
                          style={styles.notif_btn_left}
                          onPress={props.onClose}
                      >
                          <Text style={styles.text}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                          style={styles.notif_btn_right}
                          onPress={async () => await setTaskAlarm()}
                      >
                          <Text style={styles.text}>OK</Text>
                      </TouchableOpacity>
                    </View>
                </View>
            </View>
      </Modal>
    );
}



// Some cool Styles here
const styles = StyleSheet.create({
    centered_view: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#00000099'
    },
    
    notif_modal: {
      width: 300,
      height: 300,
      backgroundColor: '#ddd',
      borderWidth: 1,
      borderColor: '#000000', 
      borderRadius: 20
    },
    
    notif_title: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#d80',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20
    },
    
    notif_body: {
      height: 200,
      justifyContent: 'center',
      alignItems: 'center'
    },
    notif_input: {
      width: 80,
      borderWidth: 1,
      borderRadius: 8,
      fontSize: 30,
      padding: 10,
      paddingHorizontal: 20,
      textAlign: 'center',
      backgroundColor: '#fff'
    },
    notif_btn_container: {
      flexDirection: 'row'
    },
    notif_btn_right: {
      flex: 1,
      backgroundColor: '#008fff',
      borderBottomRightRadius: 20,
      borderWidth: 1
    },
    notif_btn_left: {
      flex: 1,
      backgroundColor: '#008fff',
      borderBottomLeftRadius: 20,
      borderWidth: 1
    },
    
    text: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10
    },    
})