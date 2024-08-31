import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                if (userId) {
                    // Fetch the latest data from Firestore
                    const userDoc = await firestore().collection('test-users').doc(userId).get();
                    const data = userDoc.data();

                    // Ensure that REMAINING_COINS is up to date
                    const now = new Date();
                    const lastFortuneDate = data.LAST_POSTED_FORTUNE?.toDate();

                    if (!lastFortuneDate || now.getDate() !== lastFortuneDate.getDate()) {
                        data.REMAINING_COINS = 2;
                        await firestore().collection('test-users').doc(userId).update({
                            REMAINING_COINS: 2,
                            LAST_POSTED_FORTUNE: firestore.FieldValue.serverTimestamp(),
                        });
                    }

                    setUserData(data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => React.useContext(UserContext);
