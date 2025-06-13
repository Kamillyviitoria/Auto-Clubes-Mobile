import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button, Text, TextInput, Avatar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { maskPhone, maskDate } from '../utils/masks';
import { saveClube, updateClube } from '../services/clubesService';
import { Ionicons } from '@expo/vector-icons';

export default function FormClubeScreen({ navigation, route }) {
  const clubeAntigo = route?.params || {};

  const [nome, setNome] = useState(clubeAntigo.nome || "");
  const [estado, setEstado] = useState(clubeAntigo.estado || "");
  const [cidade, setCidade] = useState(clubeAntigo.cidade || "");
  const [telefone, setTelefone] = useState(clubeAntigo.telefone || "");
  const [dataFundacao, setDataFundacao] = useState(clubeAntigo.dataFundacao || "");
  const [descricao, setDescricao] = useState(clubeAntigo.descricao || "");
  const [imagem, setImagem] = useState(clubeAntigo.imagem || null);

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
    let clube = {
      nome,
      estado,
      cidade,
      telefone,
      dataFundacao,
      descricao,
      imagem
    };
    if (!nome || !estado || !cidade || !telefone || !dataFundacao || !descricao || !imagem) {
      alert('Preencha todos os campos!');
      return;
    }
    if (clubeAntigo.id) {
      clube.id = clubeAntigo.id;
      await updateClube(clubeAntigo.id, clube);
      alert('Clube alterado com sucesso!');
    } else {
      clube.id = Date.now().toString();
      await saveClube(clube);
      alert('Clube cadastrado com sucesso!');
    }
    navigation.goBack();
  }

  return (
    <>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 30, left: 10, zIndex: 10 }}>
        <Ionicons name="arrow-back" size={32} color="#222" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={[styles.container, { paddingTop: 50 }]}>
        <Text variant='titleLarge'>Informe os dados do Clube:</Text>
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
          label="Nome do Clube"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          mode='outlined'
          label="Estado/UF"
          value={estado}
          onChangeText={setEstado}
        />
        <TextInput
          style={styles.input}
          mode='outlined'
          label="Cidade"
          value={cidade}
          onChangeText={setCidade}
        />
        <TextInput
          style={styles.input}
          mode='outlined'
          label="Telefone"
          value={telefone}
          onChangeText={text => setTelefone(maskPhone(text))}
          keyboardType='numeric'
          render={props => (
            <TextInputMask {...props} type={'cel-phone'} options={{ maskType: 'BRL', withDDD: true, dddMask: '(99)' }} />
          )}
        />
        <TextInput
          style={styles.input}
          mode='outlined'
          label="Data de Fundação"
          value={dataFundacao}
          onChangeText={text => setDataFundacao(maskDate(text))}
          keyboardType='numeric'
          render={props => (
            <TextInputMask {...props} type={'datetime'} options={{ format: 'DD/MM/YYYY' }} />
          )}
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