import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';    
import { 
    FlatList,
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View,
    Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setTasks } from '../redux/taskSlice';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
    }
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


export default function ToDo({navigation}) {
    const { tasks } = useSelector(store => store.task);
    const dispatch = useDispatch();

    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        getTasks()
    },[]);
    
    useEffect(() => {
        registerForPushNotificationsAsync()
  
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        //   console.log(notification);
        });
  
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          navigation.navigate('Task', {taskID: response.notification.request.content.data.id});
        });
  
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
      }, []);

    const getTasks = () => {
        AsyncStorage.getItem('Tasks')
            .then(task => {
                const parsedTask = JSON.parse(task)
                if (parsedTask && typeof parsedTask === 'object') {
                    dispatch(setTasks(parsedTask));
                }
            })
            .catch(err => console.log(err))
    }

    const deleteTask = (id) => {
        const filteredTasks = tasks.filter(task => task.ID !== id);
        AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
            .then(() => {
                dispatch(setTasks(filteredTasks));
            })
            .catch(err => console.log(err))
    }

    return (
        <View style={styles.body}>
            <FlatList
                data={tasks.filter(task => task.Done === false)}
                renderItem={({item}) => (
                    <TouchableOpacity 
                        style={styles.item}
                        onPress={() => {
                            navigation.navigate('Task', {
                                taskID: item.ID
                            });
                            }   
                        }
                    >
                        <View style={styles.item_row}>
                            <View 
                                style={[styles.color, {
                                    backgroundColor: 
                                        item.Color === 'blue' ? '#09f' : 
                                        item.Color === 'green' ? '#0d0' : 
                                        item.Color === 'red' ? '#f60' : '#bbb'
                                }]}
                            >
                            </View>
                            <View style={styles.item_body}>
                                <Text 
                                    style={styles.title}
                                    numberOfLines={1}
                                >
                                    {item.Title}
                                </Text>
                                <Text 
                                    style={styles.subTitle}
                                    numberOfLines={1}
                                >
                                    {item.Desc}
                                </Text>
                            </View>
                            <TouchableOpacity 
                                style={styles.itemBtn}
                                onPress={() => deleteTask(item.ID)}
                            >
                                <Ionicons name={'trash-outline'} color={'#f44'} size={26}/>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                    navigation.navigate('Task', {
                        taskID: Math.round(Math.random() * 100000) 
                    });
                }}
            >
                <Ionicons name='add-outline' size={24} color={'#fff'} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 10
    },
    button: {
        width: 60,
        height: 60,
        borderRadius:30,
        backgroundColor: '#0080dd',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        right: 20,
        elevation: 5
    },
    item: {
        marginHorizontal: 10,
        marginVertical: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5
    },
    item_row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    item_body: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    title: {
        color: '#000',
        fontSize: 24,
    },
    subTitle: {
        color: '#777',
    },
    itemBtn: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    color: {
        width: 16,
        height: '100%',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    }
})