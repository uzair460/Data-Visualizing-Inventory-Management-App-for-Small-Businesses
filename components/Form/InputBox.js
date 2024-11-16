import {View, Text, TextInput, StyleSheet} from 'react-native'
import React from 'react'

const InputBox = ({
	inputTitle,
	secureTextEntry = false,
	autoComplete,
	keyboardType,
	value,
	setValue
}) => {
	return (<View>

		<Text> {inputTitle}</Text>
		<TextInput style={
			style.inputBox}
            autoCorrect = {false}
            keyboardType = {keyboardType}
            autoComplete={autoComplete}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={(text) => setValue(text)}
            />
		

	</View>)
}
const style = StyleSheet.create({
	inputBox: {
		height: 40,
		marginBottom: 20,
		backgroundColor: '#ffffff',
		borderRadius: 10,
		marginTop: 10,
		padding: 10,
	}
})
export default InputBox
