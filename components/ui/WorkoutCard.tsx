import { TouchableOpacity } from 'react-native'
import { Box, Text } from '../common'

const WorkoutCard = () => {
  return (
    <TouchableOpacity>
      <Box borderBottomColor="borderSubtle00" borderBottomWidth={1} p="m">
        <Text variant="heading01">2025.12.25 Wed 10:00 - 11:00</Text>
        <Text>@ クラブオーサム西国分寺</Text>
      </Box>
    </TouchableOpacity>
  )
}

export default WorkoutCard
