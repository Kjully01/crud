import React, { useContext } from 'react'
import { View, FlatList, Alert } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { ListItem } from 'react-native-elements'
import UsersContext from '../context/UsersContext'

export default props => {

    const {state, dispatch} = useContext(UsersContext)
    //console.warn(Object.keys(ctx.state.users))

    function confirmUserDeletion(user){
        Alert.alert('Excluir Usuário', 'Deseja excluir usuário?', [
            {
                text: 'Sim',
                onPress(){
                    //console.warn('delete user ' + user.id)
                    dispatch({
                        type: 'deleteUser',
                        payload: user,
                    })
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    function getUserItem({item: user}) {
        return (
            <ListItem
                bottomDivider
                onPress={() => props.navigation.navigate('UserForm', user)}>
                <Avatar key={user.id} title={user.name} source={{ uri: user.avatarUrl}}/>
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron
                    onPress={() => props.navigation.navigate('UserForm', user)}
                    iconProps={{name: 'edit'}}
                    iconStyle={{fontSize: 25, color: "orange"}}
                />
                <ListItem.Chevron
                    onPress={() => confirmUserDeletion(user)}
                    iconProps={{name: 'delete'}}
                    iconStyle={{fontSize: 25, color: "red"}}
                />
            </ListItem>
        )    
    }

    return (
        <View>
            <FlatList
                keyExtractor={user => user.id}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}