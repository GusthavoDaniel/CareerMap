import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles, Typography, Colors } from '../../styles/theme';

const CareerBotScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Olá! Sou o CareerBot, seu assistente de IA. Posso te ajudar a entender sua trilha de carreira e sugerir os próximos passos.',
      sender: 'bot',
    },
    {
      id: 2,
      text: 'Qual é o meu próximo passo para me tornar um Engenheiro de Dados?',
      sender: 'user',
    },
    {
      id: 3,
      text: 'Excelente pergunta! Com base no seu perfil, o próximo passo é focar em Big Data e Cloud Computing. Recomendo o curso "Python para Data Science" e a certificação AWS Certified Data Analytics.',
      sender: 'bot',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (inputMessage.trim() === '') return;

    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulação de resposta da IA
    const userText = inputMessage;
    setTimeout(() => {
      const botResponse = {
        id: newUserMessage.id + 1,
        text: `Entendi que você perguntou: "${userText}". Em um ambiente real, a IA processaria isso e geraria uma resposta personalizada explicando os próximos passos na sua carreira.`,
        sender: 'bot',
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const MessageBubble = ({ message }) => (
    <View
      style={[
        styles.bubbleContainer,
        message.sender === 'user' ? styles.userContainer : styles.botContainer,
      ]}
    >
      <Text
        style={[
          styles.bubbleText,
          message.sender === 'user' ? styles.userText : styles.botText,
        ]}
      >
        {message.text}
      </Text>
    </View>
  );

  const TypingIndicator = () => (
    <View style={[styles.bubbleContainer, styles.botContainer]}>
      <Text style={styles.typingText}>CareerBot está digitando...</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={GlobalStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pergunte ao CareerBot..."
          placeholderTextColor={Colors.textSecondary}
          value={inputMessage}
          onChangeText={setInputMessage}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={24} color={Colors.textLight} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  bubbleContainer: {
    maxWidth: '80%',
    marginVertical: 5,
    padding: 12,
    borderRadius: 15,
    ...GlobalStyles.shadow,
  },
  userContainer: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 2,
  },
  botContainer: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.cardBackground,
    borderBottomLeftRadius: 2,
  },
  bubbleText: {
    ...Typography.body,
    fontSize: 15,
  },
  userText: {
    color: Colors.textLight,
  },
  botText: {
    color: Colors.text,
  },
  typingText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 45,
    backgroundColor: Colors.cardBackground,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginRight: 10,
    ...Typography.body,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sendButton: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CareerBotScreen;
