import { Box, Text } from '../common'
import { StyleSheet } from 'react-native'

export const GlobalHeader = () => {
  return (
    <Box
      px="m"
      py="s"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      borderBottomColor="borderSubtle01"
      borderBottomWidth={1}
    >
      <Box>
        <Text>Settings</Text>
      </Box>
      <Text variant="heading01">GYM NOTE</Text>
      <Box>
        <Text>Settings</Text>
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({})
