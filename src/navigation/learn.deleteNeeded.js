import React from "react";
import { View, Text, Button, Image } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

// class LogoTitle extends React.Component {
//     render() {
//         return (
//             <Text>233</Text>
//         );
//     }
// }

class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Home',
            // headerRight: (
            //     <Button
            //         onPress={navigation.getParam('increaseCount')}
            //         title="+1"
            //         color="#fff"
            //     />
            // ),
            // headerTitle: <LogoTitle />,
            // gesturesEnabled: false,
            // header: null,
            // headerStyle: {
            //     backgroundColor: '#f4511e',
            // },
            // headerTintColor: '#fff',
            // headerTitleStyle: {
            //     fontWeight: 'bold',
            // },
        }
    };
    
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details', {
                        itemId: 86,
                        otherParam: 'anything you want here',
                    })}
                />
                <Button
                    onPress={() => this.props.navigation.navigate('MyModal')}
                    title="MyModal"
                />
            </View>
        );
    }

    componentDidMount() {
        this.props.navigation.setParams({ increaseCount: this._increaseCount });
    }

    state = {
        count: 0,
    };

    _increaseCount = () => {
        this.setState({ count: this.state.count + 1 });
    };
}

class DetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('otherParam', 'A Nested Details Screen'),
            // headerLeft: null
        };
    };

    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        const otherParam = navigation.getParam('otherParam', 'some default value');
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Details Screen</Text>
                <Text>itemId: {JSON.stringify(itemId)}</Text>
                <Text>otherParam: {JSON.stringify(otherParam)}</Text>
                {/* <Button
                    title="Update the title"
                    onPress={() => this.props.navigation.setParams({otherParam: 'Updated!'})}
                />
                <Button
                    title="Go to Details... again"
                    onPress={() =>
                        this.props.navigation.push('Details', {
                            itemId: Math.floor(Math.random() * 100),
                        })}
                />
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
                <Button
                    title="Go to Top"
                    onPress={() => this.props.navigation.popToTop()}
                />
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                /> */}
            </View>
        );
    }
}

// const AppNavigator = createStackNavigator(
//     {
//         Home: HomeScreen,
//         Details: DetailsScreen,
//     },
//     {
//         initialRouteName: "Home",
//         defaultNavigationOptions: {
//             headerStyle: {
//                 backgroundColor: '#f4511e',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//                 fontWeight: 'bold',
//             },
//         }
//     }
// );

class ModalScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>This is a modal!</Text>
            <Button
                onPress={() => this.props.navigation.navigate('Home')}
                title="Dismiss"
            />
            </View>
        );
    }
}

const MainStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        Details: {
            screen: DetailsScreen,
        },
    }
)

const ModalStack = createStackNavigator(
    {
        MyModal: {
            screen: ModalScreen,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
)

const RootStack = createStackNavigator(
    {
        Main: {
            screen: MainStack,
        },
        Modal: {
            screen: ModalStack,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
