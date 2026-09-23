import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useStore } from '../store';
import { useTheme } from '../theme/useTheme';

export default function ApplicationDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { applications, companies } = useStore();
  const theme = useTheme();

  const application = applications.find((app) => app.id === id);
  const company = companies.find((c) => c.id === application?.companyId);

  if (!application) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.bg }]}>
        <Text style={[styles.errorText, { color: theme.danger }]}>Không tìm thấy dữ liệu!</Text>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: theme.primary }]} onPress={() => router.back()} accessibilityRole="button">
          <Text style={styles.backText}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <Text style={[styles.header, { color: theme.text }]}>Chi tiết ứng tuyển</Text>
      
      <View style={[styles.detailCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.label, { color: theme.muted }]}>Vị trí (Role):</Text>
        <Text style={[styles.value, { color: theme.text }]}>{application.role}</Text>

        <Text style={[styles.label, { color: theme.muted }]}>Công ty (Company):</Text>
        <Text style={[styles.value, { color: theme.text }]}>{company?.name || 'Chưa rõ'}</Text>

        <Text style={[styles.label, { color: theme.muted }]}>Ngành nghề (Industry):</Text>
        <Text style={[styles.value, { color: theme.text }]}>{company?.industry || 'Chưa rõ'}</Text>

        <Text style={[styles.label, { color: theme.muted }]}>Trạng thái (Status):</Text>
        <Text style={[styles.value, { color: theme.warning, textTransform: 'uppercase' }]}>
          {application.status}
        </Text>
      </View>

      <TouchableOpacity style={[styles.backButton, { backgroundColor: theme.primary }]} onPress={() => router.back()} accessibilityRole="button">
        <Text style={styles.backText}>Quay lại danh sách</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  detailCard: { padding: 20, borderRadius: 8, borderWidth: 1, marginBottom: 20 },
  label: { fontSize: 14, marginTop: 10 },
  value: { fontSize: 18, fontWeight: '600', marginTop: 4 },
  errorText: { fontSize: 18, marginBottom: 20, fontWeight: 'bold' },
  backButton: { paddingHorizontal: 20, borderRadius: 6, minHeight: 44, minWidth: 44, justifyContent: 'center', alignItems: 'center' },
  backText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 }
});