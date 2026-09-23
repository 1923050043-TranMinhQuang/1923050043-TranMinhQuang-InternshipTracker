import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Link } from 'expo-router'; 
import { useStore } from '../store';
import { Application } from '../type';
import { useTheme } from '../theme/useTheme';

export default function HomeScreen() {
  const { applications, companies, logout, deleteApplication, updateStatus } = useStore();
  const theme = useTheme(); // Gọi hook theme
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Application['status'] | 'all'>('all');

  const stats = {
    applied: applications.filter(a => a.status === 'applied').length,
    interviewing: applications.filter(a => a.status === 'interviewing').length,
    offered: applications.filter(a => a.status === 'offered').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  const filteredApplications = applications.filter(app => {
    const company = companies.find(c => c.id === app.companyId);
    const matchesSearch = 
      app.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (company?.name.toLowerCase() || '').includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleStatus = (id: string, currentStatus: string) => {
    const statuses: Application['status'][] = ['applied', 'interviewing', 'offered', 'rejected'];
    const currentIndex = statuses.indexOf(currentStatus as Application['status']);
    const nextIndex = (currentIndex + 1) % statuses.length;
    updateStatus(id, statuses[nextIndex]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.header, { color: theme.text }]}>Quản lý ứng tuyển</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Link href="/create" asChild>
            <Button title="Thêm +" color={theme.success} />
          </Link>
          <Button title="Đăng xuất" color={theme.danger} onPress={logout} />
        </View>
      </View>

      <View style={[styles.statsContainer, { backgroundColor: theme.surface }]}>
        <Text style={[styles.statText, { color: theme.text }]}>Applied: {stats.applied}</Text>
        <Text style={[styles.statText, { color: theme.text }]}>Interview: {stats.interviewing}</Text>
        <Text style={[styles.statText, { color: theme.text }]}>Offer: {stats.offered}</Text>
        <Text style={[styles.statText, { color: theme.text }]}>Reject: {stats.rejected}</Text>
      </View>

      <TextInput 
        style={[styles.searchInput, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
        placeholder="Tìm theo vị trí hoặc tên công ty..."
        placeholderTextColor={theme.muted}
        value={searchQuery}
        onChangeText={setSearchQuery}
        accessibilityRole="search"
        accessibilityLabel="Tìm kiếm đơn ứng tuyển"
      />

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['all', 'applied', 'interviewing', 'offered', 'rejected'].map((status) => (
            <TouchableOpacity 
              key={status}
              style={[
                styles.filterButton, 
                { backgroundColor: theme.surface },
                statusFilter === status && { backgroundColor: theme.primary }
              ]}
              onPress={() => setStatusFilter(status as any)}
              accessibilityRole="button"
            >
              <Text style={[
                styles.filterText, 
                { color: theme.text },
                statusFilter === status && { color: '#fff' }
              ]}>
                {status.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <FlatList
        data={filteredApplications}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20, color: theme.text }}>Không có đơn ứng tuyển nào phù hợp.</Text>}
        renderItem={({ item }) => {
          const company = companies.find(c => c.id === item.companyId);
          return (
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Link href={`/${item.id}`} style={styles.cardContent}>
                <View>
                  <Text style={[styles.role, { color: theme.text }]}>{item.role}</Text>
                  <Text style={[styles.companyName, { color: theme.muted }]}>{company?.name || 'Unknown Company'}</Text>
                </View>
              </Link>
              
              <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={() => toggleStatus(item.id, item.status)} style={styles.actionBtn}>
                  <Text style={[styles.status, { color: theme.warning }]}>Trạng thái: {item.status} 🔄</Text>
                </TouchableOpacity>
              
                <TouchableOpacity 
                  style={[styles.deleteBtn, styles.actionBtn, { backgroundColor: theme.dangerBg }]} 
                  onPress={() => deleteApplication(item.id)}
                >
                  <Text style={[styles.deleteText, { color: theme.danger }]}>Xóa</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

// Bảng style đã bị xóa SẠCH các mã màu #hex
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  header: { fontSize: 24, fontWeight: 'bold' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderRadius: 8, marginBottom: 15 },
  statText: { fontSize: 12, fontWeight: 'bold' },
  searchInput: { borderWidth: 1, padding: 12, borderRadius: 8, fontSize: 16, marginBottom: 15, minHeight: 44 },
  filterContainer: { marginBottom: 15, flexDirection: 'row' },
  filterButton: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginRight: 10, minHeight: 44, justifyContent: 'center' },
  filterText: { fontWeight: 'bold', fontSize: 12 },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1 },
  cardContent: { flex: 1 },
  role: { fontSize: 18, fontWeight: '600' },
  companyName: { fontSize: 14, marginTop: 4 },
  status: { fontSize: 14, fontWeight: 'bold' },
  actionBtn: { minHeight: 44, justifyContent: 'center' },
  deleteBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginTop: 5 },
  deleteText: { fontWeight: 'bold' }
});