import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, Alert, TouchableWithoutFeedback } from 'react-native';
import { GlobalStyles, Typography, Colors } from '../../styles/theme';
import Input from './Input';
import Button from './Button';

const FormModal = ({ visible, onClose, onSubmit, initialData, fields, title }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Inicializa o formulário com os dados iniciais ou campos vazios
    const initial = {};
    fields.forEach(field => {
      initial[field.name] = initialData?.[field.name] || '';
    });
    setFormData(initial);
  }, [initialData, fields]);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Validação simples
    for (const field of fields) {
      if (field.required && !formData[field.name]) {
        Alert.alert('Erro', `O campo "${field.label}" é obrigatório.`);
        return;
      }
    }

    setLoading(true);
    try {
      await onSubmit(formData);
      onClose(); // Fecha o modal após o sucesso
    } catch (error) {
      Alert.alert('Erro', error.message || 'Falha ao salvar os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      animationType="fade" // Animação mais suave
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <Text style={styles.title}>{title}</Text>
              <ScrollView style={styles.formContainer}>
                {fields.map(field => (
                  <Input
                    key={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChangeText={(text) => handleChange(field.name, text)}
                    keyboardType={field.keyboardType || 'default'}
                    secureTextEntry={field.secureTextEntry || false}
                    autoCapitalize={field.autoCapitalize || 'none'}
                  />
                ))}
              </ScrollView>
              <View style={styles.buttonContainer}>
                <Button
                  title="Cancelar"
                  onPress={onClose}
                  type="secondary"
                  style={styles.halfButton}
                  textStyle={{ color: Colors.text }}
                />
                <Button
                  title="Salvar"
                  onPress={handleSubmit}
                  loading={loading}
                  type="primary"
                  style={styles.halfButton}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fundo mais escuro
  },
  modalView: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    width: '90%',
    maxHeight: '85%',
    // Sombra mais proeminente para o modal
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    ...Typography.title,
    color: Colors.primary,
    marginBottom: 20,
    fontSize: 24,
  },
  formContainer: {
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  halfButton: {
    width: '48%',
    marginTop: 0,
    shadowOpacity: 0, // Remover sombra dos botões dentro do modal
    elevation: 0,
  },
});

export default FormModal;
