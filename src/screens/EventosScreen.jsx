import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, FAB, IconButton, Avatar, Appbar } from 'react-native-paper';
import { getEventos, deleteEvento } from '../services/eventosService';

const eventosLocais = [
    { id: 1, title: "Carbon Meet", date: "Sáb, 02 Nov 2024", time: "01:00", location: "Rua José Francisco Correia", image: require('../../assets/imagens/carbon-meet.jpg'), description: "Um encontro de entusiastas do carbono." },      
    { id: 2, title: "Dia de Pista", date: "Sex, 27 Nov 2024", time: "20:00", location: "Avenida Babita Camargos, 1295", image: require('../../assets/imagens/rodas.jpg'), description: "Exclusiva para membros." },
    { id: 3, title: "Garagem 13", date: "Dom, 30 Nov 2024", time: "20:59", location: "Avenida Independência", image: require('../../assets/imagens/garagem.jpg'), description: "Uma exposição de automóveis que vai apresentar as últimas novidades do setor." },
    { id: 4, title: "DRIFT PALMAS", date: "Sáb, 23 Nov 2024", time: "22:00", location: "Quadra 1504 Sul Al 29", image: require('../../assets/imagens/imagem4.jpg'), description: "Uma competição de drift com participação de pilotos renomados." },
    { id: 5, title: "CIRCUITO MEIDERUA", date: "Dom, 24 Nov 2024", time: "18:00", location: "Setor Placa das Mercedes Conjunt...", image: require('../../assets/imagens/diadepista.jpg'), description: "Um circuito de competições, com várias modalidades e prêmios." }
];

const renderEventoItem = ({ item }) => (
    <TouchableOpacity style={styles.eventoItem}>
        <Image source={item.image} style={styles.eventoImage} />
        <View style={styles.eventoInfo}>
            <Text style={styles.eventoTitle}>{item.title}</Text>
            <View style={styles.eventoDateTime}>
                <Ionicons name="calendar" size={16} color="#666" />
                <Text style={styles.eventoDate}>{item.date}</Text>
                <Ionicons name="time" size={16} color="#666" style={styles.timeIcon} />
                <Text style={styles.eventoTime}>{item.time}</Text>
            </View>
            <View style={styles.eventoLocation}>
                <Ionicons name="location" size={16} color="#666" />
                <Text style={styles.eventoLocationText}>{item.location}</Text>
            </View>
            <Text style={styles.eventoDescription}>{item.description}</Text>
        </View>
    </TouchableOpacity>
);

const EventosScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEventos, setFilteredEventos] = useState(eventosLocais);

    useEffect(() => {
        const filtered = eventosLocais.filter(evento =>
            evento.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            evento.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredEventos(filtered);
    }, [searchQuery]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Eventos</Text>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar eventos..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <FlatList
                data={filteredEventos}
                renderItem={renderEventoItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />

            <TouchableOpacity 
                style={styles.fab}
                onPress={() => navigation.navigate('FormEventoScreen')}
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
    eventoItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    eventoImage: {
        width: '100%',
        height: 200,
    },
    eventoInfo: {
        padding: 16,
    },
    eventoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    eventoDateTime: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    eventoDate: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
        marginRight: 16,
    },
    timeIcon: {
        marginLeft: 8,
    },
    eventoTime: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
    eventoLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    eventoLocationText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
        flex: 1,
    },
    eventoDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
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

export default EventosScreen; 