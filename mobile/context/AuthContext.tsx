import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

type Profile = {
  id: string;
  full_name: string;
  phone_number: string;
  address: string;
  reward_points: number;
  loyalty_level: number;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  logout: () => Promise<void>;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  addPoints: (points: number) => Promise<void>;
  removePoints: (points: number) => Promise<void>;
  incrementLoyaltyLevel: () => Promise<void>;
};


const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  loading: true,
  refreshProfile: async () => {},
  setProfile: () => {},
  addPoints: async () => {},
  removePoints: async () => {},
  incrementLoyaltyLevel: async () => {},
  logout: async () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, phone_number, address, reward_points, loyalty_level')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error loading profile:', error.message);
        setProfile(null);
      } else {
        setProfile(data);
      }

      setLoading(false);
    };

    loadProfile();
  }, [user]);

  // Function to log out the user
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      setSession(null);
      setUser(null);
      setProfile(null);
    }
  };

    const refreshProfile = async () => {
        if (!user) {
            setProfile(null);
            return;
        }

        const { data, error } = await supabase
            .from('profiles')
            .select('id, full_name, phone_number, address, reward_points, loyalty_level')
            .eq('id', user.id)
            .single();

        if (error) {
            console.error('Error refreshing profile:', error.message);
            setProfile(null);
        } else {
            setProfile(data);
        }
    };

    // Function to add points to the user's profile
    const addPoints = async (points: number) => {   
        if (!profile) return;
        const newPoints = profile.reward_points + points;
        const { error } = await supabase
            .from('profiles')
            .update({ reward_points: newPoints })
            .eq('id', profile.id);
        if (error) {
            console.error('Error adding points:', error.message);
        }
        else {
            setProfile((prev) => prev ? { ...prev, reward_points: newPoints } : null);
        }
    };

    // Function to remove points from the user's profile
    const removePoints = async (points: number) => {
        if (!profile) return;
        const newPoints = Math.max(profile.reward_points - points, 0); // Ensure points don't go negative
        const { error } = await supabase
            .from('profiles')
            .update({ reward_points: newPoints })
            .eq('id', profile.id);
        if (error) {
            console.error('Error removing points:', error.message);
        }   
        else {
            setProfile((prev) => prev ? { ...prev, reward_points: newPoints } : null);
        }
    };

    const incrementLoyaltyLevel = async () => {
      if (!profile) return;
      const newLevel = (profile.loyalty_level + 1) % 8;
      const { error } = await supabase
        .from('profiles')
        .update({ loyalty_level: newLevel })
        .eq('id', profile.id);
      if (error) {
        console.error('Error incrementing loyalty level:', error.message);
      }
      else {
        setProfile((prev) => prev ? { ...prev, loyalty_level: newLevel } : null);
      }
    };
  return (
    <AuthContext.Provider
        value={{ session, user, profile, loading, refreshProfile, setProfile, addPoints, removePoints, incrementLoyaltyLevel, logout }}
            >
        {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);