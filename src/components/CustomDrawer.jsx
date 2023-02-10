import React from "react";
import { useDispatch } from 'react-redux'
import { StyleSheet, View, Text } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { FontAwesome5 } from '@expo/vector-icons';
import { logout } from '../redux/actions/authActions'

export default function CustomDrawer(props, navigation) {

    const dispatch = useDispatch()

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>

                </View>
            </DrawerContentScrollView>
            <View style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <FontAwesome5 name="sign-out-alt" size={24} color="#5257f2" />
                    )}
                    label="Cerrar Sesión"
                    onPress={() => {
                        dispatch(logout());
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: "#f4f4f4",
        borderTopWidth: 1,
    },
});
