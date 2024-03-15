import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Contacts from 'react-native-contacts';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { getFromLocalStorage } from '../../Services/Api';
import axios from 'axios';

const ContactScreen = ({ route,...props }) => {
 const {navigation} = props;
    const [loading, setLoading] = useState(false);
    const [guestloading, setGuestLoading] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newContactData, setNewContactData] = useState({
        name: '',
        suffix: '',
        callingCode: '',
        phoneNumber: '',
        email: '',
    });


    useEffect(() => {
        requestContactsPermission();
    }, []);

    const requestContactsPermission = async () => {
        try {
            const result = await request(PERMISSIONS.ANDROID.READ_CONTACTS);
            if (result === RESULTS.GRANTED) {
                fetchContacts();
            } else {
                console.log('Contacts permission denied');
            }
        } catch (error) {
            console.error('Error requesting contacts permission:', error);
        }
    };

    const fetchContacts = () => {
        setLoading(true);
        Contacts.getAll()
            .then(async (contacts) => {
                const userInfo = JSON.parse(await getFromLocalStorage('@UserInfo'));
                const filteredContacts = contacts.map((contact) => {
                    const parsedPhoneNumber = parsePhoneNumberFromString(contact.phoneNumbers.length > 0 ? contact?.phoneNumbers[0]?.number : '');
                    if (parsedPhoneNumber) {
                        const contctInfo = {
                            user: userInfo?.id,
                            name: contact?.displayName,
                            suffix: 'Mr.',
                            email: '',
                            callingCode: parsedPhoneNumber.countryCallingCode ? `+${parsedPhoneNumber.countryCallingCode}` : '+92',
                            phoneNumber: parsedPhoneNumber.nationalNumber ? parsedPhoneNumber.nationalNumber : '',
                            fullNumber: parsedPhoneNumber.number ? parsedPhoneNumber.number : '',

                        }
                        // console.log("🚀 ~ filteredContacts ~ contctInfo:", contctInfo)
                        return contctInfo
                    }

                });
                setContacts(filteredContacts);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching contacts:', error);
                setLoading(false);
            });
    };

    const toggleContactSelection = (id) => {
        const index = selectedContacts.findIndex((contact) => contact?.phoneNumber === id);
        if (index === -1) {
            setSelectedContacts([...selectedContacts, contacts.find((contact) => contact?.phoneNumber === id)]);
        } else {
            const newContacts = [...selectedContacts];
            newContacts.splice(index, 1);
            setSelectedContacts(newContacts);
        }
    };

    const isContactSelected = (id) => {
        return selectedContacts.some((contact) => contact?.phoneNumber === id);
    };

    const filterContacts = () => {
        return contacts.filter((contact) =>
            contact?.name?.toLowerCase().includes(searchText.toLowerCase())
        );
    };


    const renderContactItem = ({ item }) => {

        return (
            <View style={styles.contactItem}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{item?.name?.charAt(0)}</Text>
                </View>
                <View style={styles.contactDetails}>
                    <Text style={styles.contactName}>{item?.name}</Text>
                    <Text style={styles.contactPhone}>{item?.phoneNumber?.length > 0 ? (item?.fullNumber) : ''}</Text>
                </View>
                <TouchableOpacity onPress={() => toggleContactSelection(item?.phoneNumber)} style={styles.checkbox}>
                    <Icon name={isContactSelected(item?.phoneNumber) ? 'check-square' : 'square-o'} size={30} color="#000" />
                </TouchableOpacity>
            </View>
        )
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        // Reset new contact data
        setNewContactData({
            name: '',
            suffix: '',
            callingCode: '',
            phoneNumber: '',
            email: '',
        });
    };

    const handleAddContact = () => {
        // Logic to add the new contact to the list
        // You can implement this based on your requirements
        // For simplicity, I'm just logging the new contact data here
        console.log('New contact data:', newContactData);
        // Close the modal
        closeModal();
    };

    const handleAddGuest = async() => {
        const userInfo = JSON.parse(await getFromLocalStorage('@UserInfo'));
        const token = await getFromLocalStorage('@UserToken');
        setGuestLoading(true);
        const requestData = {
            user: userInfo?.id,
            contacts: selectedContacts,
        };
        console.log("🚀 ~ handleAddGuest ~ requestData:", requestData)
        // Make the API call
        axios.post(`https://backend.halla.sa/api/events/addGuests/${route?.params?.id}`, requestData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then((response) => {
            // Reset loading state
            setGuestLoading(false);
    
            // Navigate to other screen on success
            // Replace 'OtherScreen' with the name of the screen you want to navigate to
            navigation.navigate('Invitationreport',{id:route?.params?.id});
        })
        .catch((error) => {
            // Reset loading state
            setGuestLoading(false);
    
            // Show alert on error
            alert('Failed to add contact. Please try again.');
            console.error('Error adding contact:', error);
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Select Contacts</Text>
                <Text style={styles.headingText}>Please select contacts from your contact list</Text>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    value={searchText}
                    placeholderTextColor="gray"
                    onChangeText={(text) => setSearchText(text)}
                />
                <TouchableOpacity style={styles.addButton} onPress={openModal}>
                    <Icon name="plus" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator style={styles.loader} size="large" color="#000" />
            ) : (
                <FlatList
                    data={filterContacts()}
                    keyExtractor={(item) => item.recordID}
                    renderItem={renderContactItem}
                    contentContainerStyle={styles.contactList}
                />
            )}
            
            <TouchableOpacity
                style={styles.continueButton}
                onPress={handleAddGuest}
                disabled={guestloading} // Disable the button when loading
            >
                {guestloading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.continueButtonText}>Continue</Text>
                )}
            </TouchableOpacity>

            <Modal visible={showModal} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeading}>Add Contact Manually</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            placeholderTextColor={'gray'}
                            value={newContactData.name}
                            onChangeText={(text) => setNewContactData({ ...newContactData, name: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Suffix"
                            placeholderTextColor={'gray'}
                            value={newContactData.suffix}
                            onChangeText={(text) => setNewContactData({ ...newContactData, suffix: text })}
                        />
                        <View style={styles.phoneInputContainer}>
                            <TextInput
                                style={[styles.input, styles.phoneInput, { width: 10 }]}
                                placeholder="Calling Code"
                                placeholderTextColor={'gray'}
                                value={newContactData.callingCode}
                                onChangeText={(text) => setNewContactData({ ...newContactData, callingCode: text })}
                            />
                            <TextInput
                                style={[styles.input, styles.phoneInput]}
                                placeholder="Phone Number"
                                placeholderTextColor={'gray'}
                                value={newContactData.phoneNumber}
                                onChangeText={(text) => setNewContactData({ ...newContactData, phoneNumber: text })}
                            />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor={'gray'}
                            value={newContactData.email}
                            onChangeText={(text) => setNewContactData({ ...newContactData, email: text })}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={handleAddContact}>
                                <Text style={styles.buttonText}>Add Contact</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 27,
        fontWeight: 'bold',
        color: 'black',
    },
    headingText: {
        fontSize: 15,
        color: 'gray',
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        color: '#000',
        borderTopLeftRadius: 14,
        borderBottomRightRadius: 14,

    },
    addButton: {
        padding: 10,
        height: 50,
        width: 50,
        color: '#fff',
        margin: 2,
        borderRadius: 10,
        backgroundColor: '#293170',
        justifyContent: 'center',
        alignItems: 'center',

    },
    contactList: {
        flexGrow: 1,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Align checkbox to the right
        marginBottom: 10,
    },
    checkbox: {
        padding: 10, // Increase padding to make checkbox bigger
    },
    contactDetails: {
        flex: 1,
    },
    contactName: {
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    contactPhone: {
        color: 'gray',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    continueButton: {
        height: '7%',
        width: '70%',
        backgroundColor: '#293170',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 55,
        borderTopLeftRadius: 14,
        borderBottomRightRadius: 14,
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        maxWidth: 400,
    },
    modalHeading: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    phoneInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    phoneInput: {
        flex: 1,
        marginRight: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
        // height: '5%',

        backgroundColor: '#293170',
        justifyContent: 'center',
        alignItems: 'center',

        borderTopLeftRadius: 14,
        borderBottomRightRadius: 14,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    avatarText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default ContactScreen;
