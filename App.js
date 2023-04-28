import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';

import { Provider } from 'react-redux';
import { store } from './app/redux/store';

import Splash from './app/screens/Splash';
import ToDo from './app/screens/ToDo';
import Done from './app/screens/Done';
import Task from './app/screens/Task';

const RootStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      barStyle={{backgroundColor: '#def'}}
      initialRouteName='To-Do'
      shifting={true}
      sceneAnimationType='shifting'
      activeColor='#0060dd'
      inactiveColor='#555'
      screenOptions={({route})=> ({
        tabBarIcon: ({focused, color}) => {
          let iconName;
          if(route.name === 'To-Do') {
            iconName = 'list-outline'
            
          } else if (route.name = 'Done') {
            iconName = 'checkmark-done-outline';
          }
          return <Ionicons name={iconName} size={focused ? 28 : 24} color={color}/>
          }
        }
      )}
    >
      <Tab.Screen name={'To-Do'} component={ToDo} options={{tabBarColor: '#d80'}} />
      <Tab.Screen name={'Done'} component={Done} options={{tabBarColor: '#0a8'}}/>
    </Tab.Navigator>
  )
}

export default function App() {
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerTitleAlign: 'center',
            headerTintColor: '#25292e',
            headerStyle: {
              backgroundColor: '#00aedf',
            }
          }}
        >
          <RootStack.Screen 
            name="Splash" 
            component={Splash}
            options={{
              headerShown: false
            }} 
          />
          <RootStack.Screen 
            name="MyTasks" 
            component={HomeTabs}
          />
          <RootStack.Screen 
            name="Task" 
            component={Task}
          />
        </RootStack.Navigator>
      </NavigationContainer>
      <StatusBar style="dark" translucent={true} />
    </Provider>
  );
}