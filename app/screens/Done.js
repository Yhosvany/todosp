import React from 'react';
import { useSelector, useDispatch } from 'react-redux';    
import { 
    FlatList,
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setTasks } from '../redux/taskSlice';

export default function Done({navigation}) {
    const { tasks } = useSelector(store => store.task);
    const dispatch = useDispatch();

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
                data={tasks.filter(task => task.Done === true)}
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
                            <Ionicons
                                style={styles.itemBtn}
                                name={'checkmark-outline'} 
                                color={'#0a8'} 
                                size={26}
                            />
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
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 10
    },
    item: {
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 6,
        paddingHorizontal: 10,
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
        paddingHorizontal: 5
    },
    title: {
        color: '#000',
        fontSize: 24,
    },
    subTitle: {
        color: '#777'
    },
    itemBtn: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})