import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, FAB, IconButton, Avatar, Appbar } from 'react-native-paper';
import { getVeiculos, deleteVeiculo } from '../services/veiculosService';

const veiculosLocais = [
    { id: '13', title: 'FORD FUSION 2010', price: 'R$ 40.000,00', phone: '(61) 98899-1202', address: 'Águas Claras', image: require('../../assets/imagens.marketplace/fusion.jpg') },
    { id: '14', title: 'Azera 3.0 2012', price: 'R$ 60.000,00', phone: '(61) 98899-1202', address: 'Águas Claras', image: require('../../assets/imagens.marketplace/azera.jpg') },
    { id: '15', title: 'Marea Turbo 2001', price: 'R$ 20.000,00', phone: '(61) 98899-1202', address: 'Taguatinga / DF', image: require('../../assets/imagens.marketplace/marea.jpg') },
    { id: '16', title: 'BMW X6', price: 'R$ 500.000,00', phone: '(61) 98899-1202', address: 'Águas Claras', image: require('../../assets/imagens.marketplace/x6.jpg') },
    { id: '1', title: 'Corsa Wagon 1.6', price: 'R$ 20.000,00', phone: '(61) 98899-1202', address: 'Ceilândia / DF', image: require('../../assets/imagens.marketplace/corsa_wagon.jpg') },
    { id: '2', title: 'Omega 3.0', price: 'R$ 40.000,00', phone: '(61) 98899-1202', address: 'Brasília / DF', image: require('../../assets/imagens.marketplace/omega.jpg') },
    { id: '3', title: 'Pick UP Corsa', price: 'R$ 45.000,00', phone: '(61) 98899-1202', address: 'Taguatinga / DF', image: require('../../assets/imagens.marketplace/pickup_corsa.jpg') },
    { id: '5', title: 'Kia Sorento 3.5 V6', price: 'R$ 80.000,00', phone: '(61) 98899-1202', address: 'Vicente Pires / DF', image: require('../../assets/imagens.marketplace/sorento.jpg') },
    { id: '6', title: 'Montana Vulkanic', price: 'R$ 15.000,00', phone: '(61) 98899-1202', address: 'Ceilândia / DF', image: require('../../assets/imagens.marketplace/montana_vulkanic.jpg') },
    { id: '8', title: 'Chevette L', price: 'R$ 30.000,00', phone: '(61) 98899-1202', address: 'Vicente Pires / DF', image: require('../../assets/imagens.marketplace/chevette.jpg') },
    { id: '11', title: 'Honda Civic lx 2000', price: 'R$ 25.000,00', phone: '(61) 98899-1202', address: 'Águas Lindas de Goiás / GO', image: require('../../assets/imagens.marketplace/honda.jpg') },
    { id: '12', title: 'Gol bola', price: 'R$ 12.000,00', phone: '(61) 98899-1202', address: 'Taguatinga / DF', image: require('../../assets/imagens.marketplace/gol_bola.jpg') },
];

const renderVeiculoItem = ({ item }) => (
    <TouchableOpacity style={styles.veiculoItem}>
        <Image source={item.image} style={styles.veiculoImage} />
        <View style={styles.veiculoInfo}>
            <Text style={styles.veiculoTitle}>{item.title}</Text>
            <Text style={styles.veiculoPrice}>{item.price}</Text>
            <Text style={styles.veiculoPhone}>{item.phone}</Text>
            <Text style={styles.veiculoAddress}>{item.address}</Text>
        </View>
    </TouchableOpacity>
);

const VeiculosScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredVeiculos, setFilteredVeiculos] = useState(veiculosLocais);

    useEffect(() => {
        const filtered = veiculosLocais.filter(veiculo =>
            veiculo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            veiculo.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredVeiculos(filtered);
    }, [searchQuery]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Veículos</Text>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar veículos..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <FlatList
                data={filteredVeiculos}
                renderItem={renderVeiculoItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
            />

            <TouchableOpacity 
                style={styles.fab}
                onPress={() => navigation.navigate('FormVeiculoScreen')}
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
        paddingBottom: 80,
    },
    veiculoItem: {
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
    veiculoInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    veiculoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    veiculoPrice: {
        fontSize: 16,
        color: '#eb17b0',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    veiculoPhone: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    veiculoAddress: {
        fontSize: 14,
        color: '#666',
    },
    veiculoImage: {
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

export default VeiculosScreen; 