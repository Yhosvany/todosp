import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput,
    Alert, 
    TouchableOpacity
} from 'react-native';
import Checkbox from 'expo-checkbox';
import CustomButton from '../components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { setTasks } from '../redux/taskSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationModal from '../components/NotificationModal';

export default function Task({navigation, route}) {
    const { taskID } = route.params;

    const { tasks } = useSelector(store => store.task);
    const dispatch = useDispatch();

    const [done, setDone] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [color, setColor] = useState('default');
    const [showNotModal, setShowNotModal] = useState(false);

    useEffect(() => {
        getTask();
    },[]);

    const getTask = () => {
        const Task = tasks.find(task => task.ID === taskID)
        if(Task) {
            setTitle(Task.Title);
            setDesc(Task.Desc);
            setDone(Task.Done);
            setColor(Task.Color);
        } 
    }

    const setTask = () => {
        if(title.length == 0) {
            Alert.alert('Warning!', 'Please write your task title.')
        } else {
            try {
                let Task = {
                    ID: taskID,
                    Title: title,
                    Desc: desc,
                    Done: done,
                    Color: color
                }
                const index = tasks.findIndex(task => task.ID === taskID);
                let newTask = [];
                if (index > -1) {
                    newTask = [...tasks];
                    newTask[index] = Task;
                } else {
                    newTask = [...tasks, Task];
                }
                AsyncStorage.setItem('Tasks', JSON.stringify(newTask))
                    .then(() => {
                        dispatch(setTasks(newTask));
                        navigation.goBack();
                    })
                    .catch(err => console.log(err))
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <View style={styles.body}>
            <NotificationModal 
                visible={showNotModal} 
                onClose={() => setShowNotModal(false)} 
                title={title}
                desc={desc}
                id={taskID}
            />
            <TextInput 
                style={[styles.input, {fontWeight: 'bold'}]}
                placeholder={'Title'}
                value={title}
                onChangeText={setTitle}
            />
            <TextInput 
                style={[styles.input, {flex: 1}]}
                multiline
                placeholder='Description'
                scrollEnabled
                textAlignVertical='top'
                value={desc}
                onChangeText={setDesc} 
            />
            <View style={styles.color_bar}>
                <TouchableOpacity 
                    style={styles.color_default}
                    onPress={() => setColor('default')}
                >
                    {color === 'default' && 
                        <Ionicons
                            name={'checkmark-outline'} 
                            color={'#000'} 
                            size={26}
                        />
                    }
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.color_blue}
                    onPress={() => setColor('blue')}
                >
                    {color === 'blue' && 
                        <Ionicons
                            name={'checkmark-outline'} 
                            color={'#000'} 
                            size={26}
                        />
                    }
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.color_green}
                    onPress={() => setColor('green')}
                >
                    {color === 'green' && 
                        <Ionicons
                            name={'checkmark-outline'} 
                            color={'#000'} 
                            size={26}
                        />
                    }
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.color_red}
                    onPress={() => setColor('red')}
                >
                    {color === 'red' && 
                        <Ionicons
                            name={'checkmark-outline'} 
                            color={'#000'} 
                            size={26}
                        />
                    }
                </TouchableOpacity>
            </View>
                <TouchableOpacity style={styles.extra_btn} onPress={() => {setShowNotModal(true)}}>
                    <Ionicons 
                        name={'notifications-outline'}
                        color={'#fff'}
                        size={28}
                    />
                </TouchableOpacity>
            <View style={styles.checkbox}>
                <Checkbox
                    style={{marginHorizontal: 8, padding: 12}}
                    color={'#0a8'}
                    value={done}
                    onValueChange={(newValue) => setDone(newValue)}
                />
                <Text style={styles.text}>Is Done</Text>
            </View>
            <CustomButton
                title={'Save Task'}
                color={'#1eb900'}
                onPressFunction={() => setTask()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    input: {
        width: '100%',
        padding: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#fff',
        textAlign: 'left',
        fontSize: 20,
        margin: 10,
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        margin: 10
    },
    text: {
        fontSize: 20
    },
    color_bar: {
        flexDirection: 'row',
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#555',
        marginVertical: 10,
    },
    color_default: {
        flex: 1,
        backgroundColor: '#bbb',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    },
    color_blue: {
        flex: 1,
        backgroundColor: '#09f',
        justifyContent: 'center',
        alignItems: 'center'
    },
    color_green: {
        flex: 1,
        backgroundColor: '#0d0',
        justifyContent: 'center',
        alignItems: 'center'
    },
    color_red: {
        flex: 1,
        backgroundColor: '#f60',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    },
    extra_btn: {
        height: 50,
        width: '100%',
        backgroundColor: '#d80',
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20
    }
})