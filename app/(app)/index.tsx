import { Box, Text } from '@/components/common'
import { SettingsIcon } from '@/components/icons'
import { Stack } from 'expo-router'
import { ScrollView, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function IndexPage() {
  const insets = useSafeAreaInsets()

  return (
    <Box flex={1}>
      <Stack.Screen
        options={{
          title: 'GYM NOTE',
          headerLeft: () => (
            <TouchableOpacity onPress={() => console.log('設定')}>
              <SettingsIcon size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      {/* <Stack.Screen options={{ headerShown: false }} /> */}
      {/* 固定ヘッダー */}
      {/* <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        px="m"
        py="s"
        style={{ paddingTop: insets.top }}
      >
        <TouchableOpacity onPress={() => console.log('設定')}>
          <SettingsIcon size={24} color="black" />
        </TouchableOpacity>
        <Text variant="heading04" style={{ fontFamily: 'Roboto_900Black' }}>
          GYM NOTE
        </Text>
        <Box width={24} />
      </Box> */}
      {/* スクロールコンテンツ */}
      <ScrollView style={{ flex: 1 }}>
        <Box px="m">
          <Text>Index Page</Text>
        </Box>
      </ScrollView>
    </Box>
  )
}
