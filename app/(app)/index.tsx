import { Box } from '@/components/common'
import { Button, SettingsButton, WorkoutCard } from '@/components/ui'
import { APP_NAME } from '@/config'
import { Stack } from 'expo-router'
import { ScrollView } from 'react-native'

export default function IndexPage() {
  return (
    <>
      <Stack.Screen
        options={{
          title: APP_NAME,
          headerTitleStyle: {
            fontFamily: 'Roboto_900Black',
            fontSize: 20,
          },
          headerLeft: () => (
            <SettingsButton
              onPress={() => {
                /* Handle settings press */
              }}
            />
          ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box p="m">
          <Box my="l">
            <Button>本日のワークアウトを開始する</Button>
          </Box>
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
        </Box>
      </ScrollView>
    </>
  )
}
