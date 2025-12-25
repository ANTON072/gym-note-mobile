import { TouchableOpacity, StyleSheet } from 'react-native'
import { SettingsIcon } from '../icons'

interface Props {
  onPress: () => void
}

const SettingsButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <SettingsIcon size={24} color="black" />
    </TouchableOpacity>
  )
}

export default SettingsButton

const styles = StyleSheet.create({
  button: {
    marginLeft: 6,
  },
})
