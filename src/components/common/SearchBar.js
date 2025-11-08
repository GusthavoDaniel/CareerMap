import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { Colors, Typography } from '../../styles/theme';

const SearchBar = ({ value, onChangeText, placeholder = 'Buscar...' }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.cardBackground,
    ...Typography.body,
    color: Colors.text,
    // Sombra sutil para destacar o campo
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});

export default SearchBar;
