import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useStore } from '../store';

export default function RootLayout() {
  const { isLoggedIn } = useStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra xem user có đang ở trang login không
    const inAuthGroup = segments[0] === 'login';

    if (!isLoggedIn && !inAuthGroup) {
      // Chưa đăng nhập -> Đá ra trang login
      router.replace('/login');
    } else if (isLoggedIn && inAuthGroup) {
      // Đã đăng nhập mà cố vào trang login -> Đẩy về trang chủ
      router.replace('/');
    }
  }, [isLoggedIn, segments]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Trang chủ' }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}