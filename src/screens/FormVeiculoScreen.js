import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button, Text, TextInput, Avatar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { maskDate } from '../utils/masks';
import { saveVeiculo, updateVeiculo } from '../services/veiculosService';
import { Ionicons } from '@expo/vector-icons';

export default function FormVeiculoScreen({ navigation, route }) {
  const veiculoAntigo = route?.params || {};

  const [modelo, setModelo] = useState(veiculoAntigo.modelo || "");
  const [marca, setMarca] = useState(veiculoAntigo.marca || "");
  const [ano, setAno] = useState(veiculoAntigo.ano || "");
  const [placa, setPlaca] = useState(veiculoAntigo.placa || "");
  const [cor, setCor] = useState(veiculoAntigo.cor || "");
  const [descricao, setDescricao] = useState(veiculoAntigo.descricao || "");
  const [imagem, setImagem] = useState(veiculoAntigo.imagem || null);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  }

  async function salvar() {
    let veiculo = {
      modelo,
      marca,
      ano,
      placa,
      cor,
      descricao,
      imagem
    };
    if (!modelo || !marca || !ano || !placa || !cor || !descricao || !imagem) {
      alert('Preencha todos os campos!');
      return;
    }
    if (veiculoAntigo.id) {
      veiculo.id = veiculoAntigo.id;
      await updateVeiculo(veiculoAntigo.id, veiculo);
      alert('Veículo alterado com sucesso!');
    } else {
      veiculo.id = Date.now().toString();
      await saveVeiculo(veiculo);
      alert('Veículo cadastrado com sucesso!');
    }
    navigation.goBack();
  }

  return (
    <>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 30, left: 10, zIndex: 10 }}>
        <Ionicons name="arrow-back" size={32} color="#222" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={[styles.container, { paddingTop: 50 }]}>
        <Text variant='titleLarge'>Informe os dados do Veículo:</Text>
        <Avatar.Image
          size={120}
          source={imagem ? { uri: imagem } : require('../../assets/placeholder.png')}
          style={{ alignSelf: 'center', margin: 10 }}
        />
        <Button mode="outlined" onPress={pickImage} style={{ marginBottom: 10 }}>
          Selecionar Imagem
        </Button>
        <TextInput
          style={styles.input}
          mode='outlined'
          label="Modelo"
          value={modelo}
          onChangeText={setModelo}
        />
        <TextInput
          style={styles.input}
          mode='outlined'
          label="Marca"
          value={marca}
          onChangeText={setMarca}
        />
        <TextInput
          style={styles.input}
          mode='outlined'
          label="Ano"
          value={ano}
          onChangeText={setAno}
          keyboardType='numeric'
        />
        <TextInput
          style={styles.input}
          mode='outlined'
          label="Placa"
          value={placa}
          onChangeText={setPlaca}
        />
        <TextInput
          style={styles.input}
          mode='outlined'
          label="Cor"
          value={cor}
          onChangeText={setCor}
        />
        <TextInput
          style={styles.input}
          mode='outlined'
          label="Descrição"
          value={descricao}
          onChangeText={setDescricao}
          multiline
          numberOfLines={3}
        />
        <Button
          style={[styles.input, { backgroundColor: '#eb17b0' }]}
          mode='contained'
          onPress={salvar}
          labelStyle={{ color: '#fff' }}
        >
          Salvar
        </Button>
      </ScrollView>
    </>
  );
}

const styles = {
  container: {
    flexGrow: 1,
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 30
  },
  input: {
    width: '90%',
    marginTop: 10
  }
}; 