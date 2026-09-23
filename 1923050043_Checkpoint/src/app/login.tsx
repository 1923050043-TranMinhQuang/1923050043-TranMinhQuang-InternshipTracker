import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useStore } from '../store';

export default function LoginScreen() {
  const login = useStore((state) => state.login);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Internship Tracker</Text>
      <Text style={styles.subtitle}>Quản lý hành trình thực tập của bạn</Text>
      
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Đăng nhập để tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#0a7ea4', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#687076', marginBottom: 40 },
  button: { backgroundColor: '#0a7ea4', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 8 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' }
});