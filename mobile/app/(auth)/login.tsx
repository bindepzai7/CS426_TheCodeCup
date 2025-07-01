import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState, Button, TextInput } from 'react-native'
import { supabase } from '../../lib/supabase'
import { router } from 'expo-router'

AppState.addEventListener('change', (state) => {
    if(state === 'active') {
        supabase.auth.startAutoRefresh()
    }
    else {
        supabase.auth.stopAutoRefresh()
    }
})

export default function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleLogin() {
        setLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if(error) Alert.alert('Login Error', error.message)
        else{
            router.push('/(tabs)')
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput  
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button
                title={loading ? 'Logging in...' : 'Login'}
                onPress={handleLogin}
                disabled={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
})