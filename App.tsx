import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, TextInput} from 'react-native'
import React from 'react'
import { useState } from 'react'
import * as Yup from 'yup'
import { create } from 'react-test-renderer'
import { Formik } from 'formik'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
const passwordSchema = Yup.object().shape({
passwordLength: Yup.number()
.min(8, 'Password is too short - should be 8 chars minimum.')
.max(20, 'Password is too long - should be 20 chars maximum.')
.required('Password is required')
})
export default function App() {
  const [password, setPassword] = useState('')
  const [isPassGenerated, setIsPassGenerated] = useState(false)
  const [lowerCase, setLowerCase] = useState(false)
  const [upperCase, setUpperCase] = useState(false)
  const [number, setNumber] = useState(false)
  const [symbol, setSymbol] = useState(false)

  const generatePasswordString = (passwordLength:number) => {
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (number) {
      characterList += digitChars;
    } 
    if (symbol) {
      characterList += specialChars;
    }

    let passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPassGenerated(true);
  }
  const createPassword = (characters:string, passwordLength:number) => {

    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
      
    }
    return result;
  }
  const resetPasswordState = () => {
    setPassword('')
    setIsPassGenerated(true)
    setLowerCase(false)
    setUpperCase(false)
    setNumber(false)
    setSymbol(false)
  }
    return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <SafeAreaView style={styles.appConatiner}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
       initialValues={{passwordLength:''}}
        validationSchema={passwordSchema}
        onSubmit={(values) => {generatePasswordString(+values.passwordLength)}} //TODO: Add password length
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
         <>
         <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Passworld Length</Text>
         {touched.passwordLength && errors.passwordLength &&(
            <Text style={styles.errorText}>{errors.passwordLength}</Text>
          
         )}
         </View>
         <TextInput
          value={values.passwordLength}
          onChangeText={handleChange('passwordLength')}
          style={styles.inputText}
         keyboardType='numeric'
         placeholder='Type number here'></TextInput>
         </View>
         
<View style={styles.inputWrapper}>
  <Text style={styles.heading}>Include lowercase</Text>
  <BouncyCheckbox 
  isChecked={lowerCase}
  disableBuiltInState
  onPress={(isChecked) => setLowerCase(!lowerCase)}
  fillColor='#29AB87'
  />
</View>

<View style={styles.inputWrapper}>
  <Text style={styles.heading}>Include uppercase</Text>
  <BouncyCheckbox 
  isChecked={upperCase}
  disableBuiltInState
  onPress={(isChecked) => setUpperCase(!upperCase)}
  fillColor='#29AB87'
  />
</View>

<View style={styles.inputWrapper}>
  <Text style={styles.heading}>Include numbers</Text>
  <BouncyCheckbox 
  isChecked={number}
  disableBuiltInState
  onPress={(isChecked) => setNumber(!number)}
  fillColor='#29AB87'
  />
</View>
<View style={styles.inputWrapper}>
  <Text style={styles.heading}>Include symbols</Text>
  <BouncyCheckbox 
  isChecked={symbol}
  disableBuiltInState
  onPress={(isChecked) => setSymbol(!symbol)}
  fillColor='#29AB87'
  />
</View>

<View style={styles.formAction}>
  <TouchableOpacity 
  disabled={!isValid}
  onPress={handleSubmit}
  style={styles.primaryBtn}
  >
    <Text>Generate Password</Text></TouchableOpacity>
    <TouchableOpacity 
    style={styles.secondaryBtn}
  onPress={ () => {
    handleReset();
    resetPasswordState()
  }}
    >
    <Text style={styles.secondaryBtnTxt}>Reset</Text></TouchableOpacity>
</View>
         
         </>
       )}
     </Formik>
                </View>

                {isPassGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long Press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
    ) 
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
});