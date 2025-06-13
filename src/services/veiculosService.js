import AsyncStorage from '@react-native-async-storage/async-storage';

const VEICULOS_KEY = 'VEICULOS';

export async function getVeiculos() {
  const veiculos = await AsyncStorage.getItem(VEICULOS_KEY);
  return veiculos ? JSON.parse(veiculos) : [];
}

export async function saveVeiculo(veiculo) {
  const veiculos = await getVeiculos();
  veiculos.push(veiculo);
  await AsyncStorage.setItem(VEICULOS_KEY, JSON.stringify(veiculos));
}

export async function updateVeiculo(id, updatedVeiculo) {
  const veiculos = await getVeiculos();
  const newVeiculos = veiculos.map(v => v.id === id ? { ...v, ...updatedVeiculo } : v);
  await AsyncStorage.setItem(VEICULOS_KEY, JSON.stringify(newVeiculos));
}

export async function deleteVeiculo(id) {
  const veiculos = await getVeiculos();
  const newVeiculos = veiculos.filter(v => v.id !== id);
  await AsyncStorage.setItem(VEICULOS_KEY, JSON.stringify(newVeiculos));
} 