import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../styles/theme';


// Função auxiliar para mapear área para cor de tag
const Card = ({ style, children }) => {
  return (
    <View style={[GlobalStyles.card, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  // Não há estilos específicos para o Card genérico, usa GlobalStyles.card
});

export default Card;
