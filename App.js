import React, { useState, useRef } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard} from 'react-native';
import api from './src/api/api';

export default function App(){
  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null);


  async function search(){
    if(cep == ''){
      alert('Digite um CEP valido');
      setCep('');
      return; //
    }

    try{
      const response = await api.get(`/${cep}/json`);
      console.log(response.data);
      setCepUser(response.data);
      Keyboard.dismiss(); //Garantir que o teclado sera fechado!

    }catch(error){
      alert('CEP não Localizado!')
      console.log('ERROR: ' + error);
    }

  }

  function clear(){
    setCep('');
    inputRef.current.focus();
    setCepUser(null);
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 28, padding: 10}}>Digite o CEP desejado: </Text>
        <TextInput
        style={styles.inputCEP}
        placeholder="ex: 62940000"
        value={cep}
        onChangeText={ (texto) => setCep(texto) }
        keyboardType="numeric"
        ref={inputRef}
        />
      </View>

      <View style={{flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity 
        style={styles.btnSearch}
        onPress={ search }
        >
          <Text style={{fontSize: 20, color: '#FFF', padding: 15, textAlign: 'center'}}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.btnClear}
        onPress={ clear }
        >
          <Text style={{fontSize: 20, color: '#0DC8F7', padding: 15,textAlign: 'center'}}>Clear</Text>
        </TouchableOpacity>
      </View>


      { cepUser &&
        <View style={styles.resultado}>
          <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
          <Text style={styles.itemText}>DDD: {cepUser.ddd}</Text>
        </View>
      }

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputCEP: {
    width: 350,
    height: 50,
    borderWidth: 1,
    borderColor: '#0DC8F7',
    borderRadius: 25,
    padding: 10,
  },
  btnSearch: {
    backgroundColor: '#0DC8F7',
    width: 180,
    height: 50,
    borderRadius: 25
  },
  btnClear: {
    width: 180,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#0DC8F7',
    backgroundColor: '#FFF',
    marginLeft: 5
  },
  itemText:{
    fontSize: 22,
  }
});
