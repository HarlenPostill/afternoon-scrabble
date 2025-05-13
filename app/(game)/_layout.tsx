//@ts-ignore
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function GameLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          contentStyle: {
            position: 'relative',
          },
          headerShown: false,
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="newGame" />
        <Stack.Screen name="activeGame" />
      </Stack>
    </ThemeProvider>
  );
}
