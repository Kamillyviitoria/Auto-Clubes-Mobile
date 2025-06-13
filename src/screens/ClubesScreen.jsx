import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const clubesLocais = [
    { id: '1', title: 'Zero500Club Cars', phone: '(61) 9876-5432', address: 'Ceilândia - Distrito Federal', image: require('../../assets/imagens.clubes/zaro500.jpg') },
    { id: '2', title: 'Garage Nutallo', phone: '(61) 9823-4576', address: 'Taguatinga - Distrito Federal', image: require('../../assets/imagens.clubes/GarageNutallo.jpg') },
    { id: '3', title: 'GARAGE CAR CLUB', phone: '(61) 9812-3456', address: 'Ceilândia - Distrito Federal', image: require('../../assets/imagens.clubes/garage_car_club.jpg') },
    { id: '4', title: '3deze6Club', phone: '(61) 9875-2341', address: 'Taguatinga - Distrito Federal', image: require('../../assets/imagens.clubes/3deze6club.jpg') },
    { id: '5', title: '070 club', phone: '(61) 9898-1122', address: 'Ceilândia - Distrito Federal', image: require('../../assets/imagens.clubes/070club.jpg') },
    { id: '6', title: 'Golf Clube', phone: '(61) 9888-2233', address: 'Taguatinga - Distrito Federal', image: require('../../assets/imagens.clubes/golf_clube.jpg') },
    { id: '7', title: 'MitClub DF', phone: '(61) 9845-6789', address: 'Ceilândia - Distrito Federal', image: require('../../assets/imagens.clubes/mitclub_df.jpg') },
    { id: '8', title: 'Club golf e bora bsb', phone: '(61) 9823-4567', address: 'Taguatinga - Distrito Federal', image: require('../../assets/imagens.clubes/golf_bora_bsb.jpg') },
    { id: '9', title: 'Clube Palio', phone: '(61) 9856-7890', address: 'Ceilândia - Distrito Federal', image: require('../../assets/imagens.clubes/clube_palio.jpg') },
    { id: '10', title: 'Suave na Nave BSB', phone: '(61) 9867-5432', address: 'Taguatinga - Distrito Federal', image: require('../../assets/imagens.clubes/suave_nave_bsb.jpg') },
    { id: '11', title: 'Jettaclub DF', phone: '(61) 9876-5432', address: 'Ceilândia - Distrito Federal', image: require('../../assets/imagens.clubes/jettaclub_df.jpg') },
    { id: '12', title: 'Corsa club', phone: '(61) 9834-5678', address: 'Taguatinga - Distrito Federal', image: require('../../assets/imagens.clubes/corsa_club.jpg') },
    { id: '13', title: 'VAGCulture', phone: '(61) 9888-3322', address: 'Ceilândia - Distrito Federal', image: require('../../assets/imagens.clubes/vagculture.jpg') },
    { id: '14', title: 'Fixabscei', phone: '(61) 9811-2233', address: 'Taguatinga - Distrito Federal', image: require('../../assets/imagens.clubes/fixabscei.jpg') },
    { id: '15', title: 'Brasília Exotics Club', phone: '(61) 9844-5566', address: 'Ceilândia - Distrito Federal', image: require('../../assets/imagens.clubes/brasilia_exotics.jpg') },
    { id: '16', title: 'Punto Clube DF', phone: '(61) 9855-6677', address: 'Taguatinga - Distrito Federal', image: require('../../assets/imagens.clubes/punto_clube_df.jpg') },
    { id: '17', title: 'Soboraclub', phone: '(61) 9866-7788', address: 'Ceilândia - Distrito Federal', image: require('../../assets/imagens.clubes/soboraclub.jpg') },
    { id: '18', title: 'Mistura Feminina', phone: '(61) 9899-0011', address: 'Taguatinga - Distrito Federal', image: require('../../assets/imagens.clubes/mistura_feminina.jpg') },
    { id: '19', title: 'Bsbaixos', phone: '(61) 9822-3344', address: 'Ceilândia - Distrito Federal', image: require('../../assets/imagens.clubes/bsbaixos.jpg') },
    { id: '20', title: 'Mini Clube DF', phone: '(61) 9833-4455', address: 'Taguatinga - Distrito Federal', image: require('../../assets/imagens.clubes/mini_clube_df.jpg') },
    { id: '21', title: 'Deusas do Asfalto', phone: '(61) 9833-4455', address: 'Taguatinga - Distrito Federal', image: require('../../assets/imagens.clubes/deusasdoasfalto.jpg') },
];

const renderClubeItem = ({ item }) => (
    <TouchableOpacity style={styles.clubeItem}>
        <Image source={item.image} style={styles.clubeImage} />
        <View style={styles.clubeInfo}>
            <Text style={styles.clubeTitle}>{item.title}</Text>
            <Text style={styles.clubePhone}>{item.phone}</Text>
            <Text style={styles.clubeAddress}>{item.address}</Text>
        </View>
    </TouchableOpacity>
);

const ClubesScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredClubes, setFilteredClubes] = useState(clubesLocais);

    useEffect(() => {
        const filtered = clubesLocais.filter(clube =>
            clube.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            clube.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredClubes(filtered);
    }, [searchQuery]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Clubes</Text>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar clubes..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <FlatList
                data={filteredClubes}
                renderItem={renderClubeItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
            />

            <TouchableOpacity 
                style={styles.fab}
                onPress={() => navigation.navigate('FormClubeScreen')}
            >
                <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
    },
    header: {
        padding: 16,
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#222',
        backgroundColor: '#222',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#f5f5f5',
        margin: 16,
        borderRadius: 8,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    listContainer: {
        padding: 16,
        paddingBottom: 80, // Espaço extra para o FAB
    },
    clubeItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    clubeInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    clubeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    clubePhone: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    clubeAddress: {
        fontSize: 14,
        color: '#666',
    },
    clubeImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        backgroundColor: '#eb17b0',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});

export default ClubesScreen; 