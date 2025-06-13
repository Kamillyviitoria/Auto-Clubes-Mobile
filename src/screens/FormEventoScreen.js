import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button, Text, TextInput, Avatar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { maskDate } from '../utils/masks';
import { saveEvento, updateEvento } from '../services/eventosService';
import { Ionicons } from '@expo/vector-icons';

export default function FormEventoScreen({ navigation, route }) {
  const eventoAntigo = route?.params || {};

  const [nome, setNome] = useState(eventoAntigo.nome || "");
  const [data, setData] = useState(eventoAntigo.data || "");
  const [local, setLocal] = useState(eventoAntigo.local || "");
  const [descricao, setDescricao] = useState(eventoAntigo.descricao || "");
  const [imagem, setImagem] = useState(eventoAntigo.imagem || null);
  const [clubeResponsavel, setClubeResponsavel] = useState(eventoAntigo.clubeResponsavel || "");

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  }

  async function salvar() {
    let evento = {
      nome,
      data,
      local,
      descricao,
      imagem,
      clubeResponsavel
    };
    if (!nome || !data || !local || !descricao || !imagem || !clubeResponsavel) {
      alert('Preencha todos os campos!');
      return;
    }
    if (eventoAntigo.id) {
      evento.id = eventoAntigo.id;
      await updateEvento(eventoAntigo.id, evento);
      alert('Evento alterado com sucesso!');
    } else {
      evento.id = Date.now().toString();
      await saveEvento(evento);
      alert('Evento cadastrado com sucesso!');
    }
    navigation.goBack();
  }

  return (
    <>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 30, left: 10, zIndex: 10 }}>
        <Ionicons name="arrow-back" size={32} color="#222" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={[styles.container, { paddingTop: 50 }]}>
        <Text variant='titleLarge'>Informe os dados do Evento:</Text>
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
          label="Nome do Evento"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          mode='outlined'
          label="Data"
          value={data}
          onChangeText={text => setData(maskDate(text))}
          keyboardType='numeric'
          render={props => (
            <TextInputMask {...props} type={'datetime'} options={{ format: 'DD/MM/YYYY' }} />
          )}
        />
        <TextInput
          style={styles.input}
          mode='outlined'
          label="Local"
          value={local}
          onChangeText={setLocal}
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
        <TextInput
          style={styles.input}
          mode='outlined'
          label="Clube Responsável"
          value={clubeResponsavel}
          onChangeText={setClubeResponsavel}
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