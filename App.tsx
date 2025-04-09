import { StyleSheet, Text, View } from 'react-native'

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Child app!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App
