import AsyncStorage from '@react-native-async-storage/async-storage';

const EVENTOS_KEY = 'EVENTOS';

export async function getEventos() {
  const eventos = await AsyncStorage.getItem(EVENTOS_KEY);
  return eventos ? JSON.parse(eventos) : [];
}

export async function saveEvento(evento) {
  const eventos = await getEventos();
  eventos.push(evento);
  await AsyncStorage.setItem(EVENTOS_KEY, JSON.stringify(eventos));
}

export async function updateEvento(id, updatedEvento) {
  const eventos = await getEventos();
  const newEventos = eventos.map(e => e.id === id ? { ...e, ...updatedEvento } : e);
  await AsyncStorage.setItem(EVENTOS_KEY, JSON.stringify(newEventos));
}

export async function deleteEvento(id) {
  const eventos = await getEventos();
  const newEventos = eventos.filter(e => e.id !== id);
  await AsyncStorage.setItem(EVENTOS_KEY, JSON.stringify(newEventos));
} 