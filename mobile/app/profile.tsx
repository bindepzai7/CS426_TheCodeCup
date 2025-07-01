import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import BackButton from '@/components/BackButton';
import ProfileInfoRow from '@/components/profile/ProfileInfoRow';
import { Colors } from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

export default function Profiles() {
  const { profile, user, loading, refreshProfile } = useAuth();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name ?? '');
      setPhoneNumber(profile.phone_number ?? '');
      setAddress(profile.address ?? '');
    }
  }, [profile]);

  const hasChanges =
    fullName !== (profile?.full_name ?? '') ||
    phoneNumber !== (profile?.phone_number ?? '') ||
    address !== (profile?.address ?? '');

  const handleSave = async () => {
    if (!profile?.id || !hasChanges) return;

    if (!fullName.trim() || !phoneNumber.trim() || !address.trim()) {
      ToastAndroid.show('All fields are required.', ToastAndroid.SHORT);
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName.trim(),
        phone_number: phoneNumber.trim(),
        address: address.trim(),
      })
      .eq('id', profile.id);

    setSaving(false);

    if (error) {
      ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.LONG);
    } else {
      await refreshProfile();
      ToastAndroid.show('Profile updated successfully!', ToastAndroid.SHORT);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.themedBlue} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.title}>Profile</Text>
        <Pressable
          onPress={handleSave}
          disabled={!hasChanges || saving}
          style={({ pressed }) => [
            styles.saveButton,
            pressed && { opacity: 0.6 },
            !hasChanges && { opacity: 0.3 },
          ]}
        >
          <Text style={styles.saveText}>{saving ? 'Saving...' : 'Save'}</Text>
        </Pressable>
      </View>

      <ProfileInfoRow
        label="Full Name"
        icon="person-outline"
        value={fullName}
        onChangeText={setFullName}
      />
      <ProfileInfoRow
        label="Phone Number"
        icon="call-outline"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <ProfileInfoRow
        label="Email"
        icon="mail-outline"
        value={user?.email ?? ''}
        editable={false}
      />
      <ProfileInfoRow
        label="Address"
        icon="location-outline"
        value={address}
        onChangeText={setAddress}
      />

      <Pressable style={styles.signInButton} onPress={() => router.push('/(auth)/login')}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </Pressable>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    backgroundColor: Colors.backgroundColor,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundColor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '5%',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.themedBlue,
    textAlign: 'center',
    flex: 1,
  },
  saveButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  saveText: {
    fontSize: 16,
    color: Colors.themedBlue,
  },
  loginLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: Colors.themedBlue,
  },
  signInButton: {
    marginTop: 32,
    backgroundColor: Colors.themedBlue,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '20%',
  },

  signInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

});
