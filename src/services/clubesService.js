import AsyncStorage from '@react-native-async-storage/async-storage';

const CLUBES_KEY = 'CLUBES';

export async function getClubes() {
  const clubes = await AsyncStorage.getItem(CLUBES_KEY);
  return clubes ? JSON.parse(clubes) : [];
}

export async function saveClube(clube) {
  const clubes = await getClubes();
  clubes.push(clube);
  await AsyncStorage.setItem(CLUBES_KEY, JSON.stringify(clubes));
}

export async function updateClube(id, updatedClube) {
  const clubes = await getClubes();
  const newClubes = clubes.map(c => c.id === id ? { ...c, ...updatedClube } : c);
  await AsyncStorage.setItem(CLUBES_KEY, JSON.stringify(newClubes));
}

export async function deleteClube(id) {
  const clubes = await getClubes();
  const newClubes = clubes.filter(c => c.id !== id);
  await AsyncStorage.setItem(CLUBES_KEY, JSON.stringify(newClubes));
} 