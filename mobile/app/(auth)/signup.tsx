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

export default function SignupScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    
    async function handleSignup() {
        setLoading(true)
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })
        if (error) {
            Alert.alert('Signup Error', error.message)
        }
        else {
            Alert.alert('Signup Successful', 'Please check your email to verify your account.')
            router.push('/login')
        }
        setLoading(false)

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
                title={loading ? 'Signing up...' : 'Sign Up'}
                onPress={handleSignup}
                disabled={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
})