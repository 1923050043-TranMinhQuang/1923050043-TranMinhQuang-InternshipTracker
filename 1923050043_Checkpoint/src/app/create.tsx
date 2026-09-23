import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../store';
import { Application, Company } from '../type';
import { useTheme } from '../theme/useTheme';

export default function CreateScreen() {
  const [role, setRole] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');

  const { addApplication, addCompany, companies } = useStore();
  const router = useRouter();
  const theme = useTheme();

  const handleSave = () => {
    if (role.trim() === '' || companyName.trim() === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ vị trí và tên công ty!');
      return;
    }

    let existingCompany = companies.find(
      (c) => c.name.toLowerCase() === companyName.trim().toLowerCase()
    );

    let targetCompanyId = existingCompany ? existingCompany.id : '';

    if (!existingCompany) {
      targetCompanyId = Math.random().toString();
      const newCompany: Company = {
        id: targetCompanyId,
        name: companyName.trim(),
        industry: industry.trim() || 'General',
      };
      addCompany(newCompany); 
    }

    const newApp: Application = {
      id: Math.random().toString(), 
      companyId: targetCompanyId,
      role: role.trim(),
      status: 'applied',
      updatedAt: new Date().toISOString()
    };

    addApplication(newApp);
    router.back();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]}>
      <Text style={[styles.header, { color: theme.text }]}>Thêm đơn ứng tuyển</Text>
      
      <Text style={[styles.label, { color: theme.text }]}>Vị trí ứng tuyển (Role):</Text>
      <TextInput
        style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
        value={role}
        onChangeText={setRole}
        placeholder="VD: Backend Developer Intern..."
        placeholderTextColor={theme.muted}
      />

      <Text style={[styles.label, { color: theme.text }]}>Tên công ty (Company Name):</Text>
      <TextInput
        style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
        value={companyName}
        onChangeText={setCompanyName}
        placeholder="VD: TechNova..."
        placeholderTextColor={theme.muted}
      />

      <Text style={[styles.label, { color: theme.text }]}>Ngành nghề (Industry):</Text>
      <TextInput
        style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
        value={industry}
        onChangeText={setIndustry}
        placeholder="VD: Software / Finance..."
        placeholderTextColor={theme.muted}
      />

      <View style={styles.btnContainer}>
        <Button title="Lưu thông tin" onPress={handleSave} color={theme.primary} />
      </View>
      <View style={styles.btnContainer}>
        <Button title="Hủy bỏ" onPress={() => router.back()} color={theme.muted} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 15 },
  btnContainer: { marginBottom: 10 }
});