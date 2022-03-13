import React from 'react';
import {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

export default function App() {
  // Mapeamento de teclas
  const buttons = ['LIMPAR', 'DEL', '%', '/', 7, 8, 9, "x", 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '+/-', '=']

  const [currentNumber, setCurrentNumber] = useState("")
  const [lastNumber, setLastNumber] = useState("")


  function calculator(){
    const splitNumbers = currentNumber.split(' ')
    const fistNumber = parseFloat(splitNumbers[0])
    const lastNumber = parseFloat(splitNumbers[2])
    const operator = splitNumbers[1]

    // Faz ação referente tecla pressionada
    switch(operator){
      case '+':
        setCurrentNumber((fistNumber + lastNumber).toString())
        return
      case '-': 
        setCurrentNumber((fistNumber - lastNumber).toString())
        return
      case 'x':
        setCurrentNumber((fistNumber * lastNumber).toString())
        return
      case '/': 
        setCurrentNumber((fistNumber / lastNumber).toString())
        return
    }
  }

  function handleInput(buttonPressed){
    console.log(buttonPressed) // Mostra no Console a tecla pressionada
    if(buttonPressed === '+' | buttonPressed === "-" | buttonPressed === "x" | buttonPressed === "/" ){
      setCurrentNumber(currentNumber + " " + buttonPressed + " ")
      return
    }
    switch(buttonPressed){
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)))
        return
      case 'LIMPAR': // Limpa todo o conteúdo
        setLastNumber("") 
        setCurrentNumber("") 
        return
      case '=':
        setLastNumber(currentNumber + " = ")
        calculator()
        return
      
      case '+/-':
        const splitNumbers = currentNumber.split(' ')
        const fistNumber = parseFloat(splitNumbers[0])
        const lastNumber = parseFloat(splitNumbers[2])
        const operator = splitNumbers[1]

        if (operator !== '+' && operator !== '-' && operator !== 'x' && operator !== '/') {
          setCurrentNumber((fistNumber * -1).toString())
          return

        } else {
          setCurrentNumber((fistNumber + " " + operator + " " + (lastNumber * -1)).toString())
          return
        }
        
      case '%':
        setLastNumber(currentNumber + " %" + " =")

        const splitNumbersPorcent = currentNumber.split(' ')
        const fistNumberPorcent = parseFloat(splitNumbersPorcent[0])
        const lastNumberPorcent = parseFloat(splitNumbersPorcent[2])
        const operatorPorcent = splitNumbersPorcent[1]

        if (operatorPorcent == 'x') {
          setCurrentNumber(((fistNumberPorcent * lastNumberPorcent) / 100).toString())
          return
  
        } else {
          if (operatorPorcent == '+') {
            setCurrentNumber((fistNumberPorcent + ((fistNumberPorcent * lastNumberPorcent) / 100)).toString())
            return
  
          } else {
            if (operatorPorcent == '-') {
              setCurrentNumber((fistNumberPorcent - ((fistNumberPorcent * lastNumberPorcent) / 100)).toString())
              return

            } else {
              if (operatorPorcent == '/') {
                setCurrentNumber((fistNumberPorcent / ((fistNumberPorcent * lastNumberPorcent) / 100)).toString())
                return
              }
            }
          }
        }
        
        return
    }

    setCurrentNumber(currentNumber + buttonPressed)
  }


  return (

    <View style={styles.container}>

      {/* Area onde o resultado é exibido */}
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      {/* Area onde os botões são exibidos*/}
      <View style={styles.buttons}>

        {buttons.map((button) => 
          button === '=' ? // Mapeamento do botão =
        <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, {backgroundColor: '#1E1240'}]}>
          <Text style={[styles.textButton, {color: "white", fontSize: 30}]}>{button}</Text>
        </TouchableOpacity>
          : // Mapeamento dos outros botões
          <TouchableOpacity onPress={() => handleInput(button)} key={button} style={styles.button}>
            <Text style={[styles.textButton, {color: typeof(button) === 'number' ? 'white': '#7c7c7c'}]}>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  results: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: "#1E1240"
  },
  resultText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    padding: 12,
    textAlign: "right"
  },
  historyText:{
    color: "#7c7c7c",
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: "#3D0075",
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90, 
    minHeight: 90,
    flex: 2,
  },
  textButton: {
    color: "#7c7c7c",
    fontSize: 20,
  } 
});