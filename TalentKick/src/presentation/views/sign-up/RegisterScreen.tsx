import React, { useState, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RootStackParamsList } from '../../../../App';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useRegister } from '../../hooks/useAuth';
import { useToast } from 'tostadin-rn';

interface Props extends StackScreenProps<RootStackParamsList, 'RegisterScreen'> { }

const RegisterScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [role, setRole] = useState<'user' | 'recruiter'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const { showToast } = useToast();
  const registerMutation = useRegister();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleRegister = async () => {
    try {
      if (!email || !password || !name || !lastname) {
        showToast({ message: 'Error', description: 'Por favor rellena todos los campos', type: 'error' });
        return;
      }
      
      await registerMutation.mutateAsync({ 
        name, 
        lastname, 
        email, 
        password,
        role,
        sessionType: 'email'
      });
      
      showToast({ message: 'Éxito', description: 'Usuario registrado correctamente', type: 'success' });
      navigation.navigate('MainContainerScreen');
    } catch (error: any) {
      showToast({ 
        message: 'Error', 
        description: error?.response?.data?.error || error?.message || 'Ocurrió un error en el registro', 
        type: 'error' 
      });
    }
  };

  return (
    <View className='flex-1 bg-white'>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className='flex-1'
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className='flex-1 relative bg-salt'>
            {/* Fondo Superior - Se oculta con el teclado */}
            {!isKeyboardVisible && (
              <Image
                source={require('../../../assets/icons/waves-opacity.png')}
                className='w-full absolute top-0 left-0 right-0 h-60 z-0'
                resizeMode='stretch'
              />
            )}

            {/* Contenido con Safe Area */}
            <View 
              className='flex-1 px-6 z-20'
              style={{ paddingTop: isKeyboardVisible ? 20 : insets.top }}
            >
              {/* Header Section */}
              <View className={`${isKeyboardVisible ? 'mb-4' : 'mt-4 mb-8'}`}>
                <TouchableOpacity 
                  onPress={() => navigation.goBack()}
                  className='mb-4 p-2 -ml-2 self-start'
                >
                  <Text className='text-dark text-4xl'>←</Text>
                </TouchableOpacity>
                
                <Text className='text-dark text-4xl font-monaExtraBold leading-tight'>
                  Crea tu cuenta
                </Text>
                {!isKeyboardVisible && (
                  <Text className='text-dark/60 text-lg font-monaMedium mt-2'>
                    Únete a la mejor plataforma de reclutamiento
                  </Text>
                )}
              </View>

              {/* Form Section */}
              <View className='flex-1'>
                <View className='gap-y-4'>
                  {/* Role Selector */}
                  <View className='mb-2'>
                    <Text className='text-dark font-monaBold mb-3'>¿Qué eres?</Text>
                    <View className='flex-row justify-between'>
                      <TouchableOpacity 
                        onPress={() => setRole('user')}
                        className={`w-[48%] py-4 rounded-2xl border-2 items-center ${role === 'user' ? 'border-primary bg-primary/10' : 'border-timberwolf bg-white'}`}
                      >
                        <Text className={`font-monaBold ${role === 'user' ? 'text-primary' : 'text-silver'}`}>Jugador</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={() => setRole('recruiter')}
                        className={`w-[48%] py-4 rounded-2xl border-2 items-center ${role === 'recruiter' ? 'border-primary bg-primary/10' : 'border-timberwolf bg-white'}`}
                      >
                        <Text className={`font-monaBold ${role === 'recruiter' ? 'text-primary' : 'text-silver'}`}>Reclutador</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Input
                    label="Nombre"
                    placeholder="Tu nombre"
                    value={name}
                    onChangeText={setName}
                  />
                  
                  <Input
                    label="Apellido"
                    placeholder="Tu apellido"
                    value={lastname}
                    onChangeText={setLastname}
                  />

                  <Input
                    label="Correo electrónico"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />

                  <Input
                    label="Contraseña"
                    placeholder="********"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    rightIcon={
                      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Text className="text-primary font-monaBold text-xs px-2">
                          {showPassword ? 'Ocultar' : 'Mostrar'}
                        </Text>
                      </TouchableOpacity>
                    }
                  />
                </View>

                {/* Footer Section / Button */}
                <View 
                  className='mt-12 mb-10'
                  style={{ paddingBottom: insets.bottom + 20 }}
                >
                  <Button 
                    title='Registrarse' 
                    onPress={handleRegister} 
                    isLoading={registerMutation.isPending}
                  />
                  
                  <View className='flex-row justify-center mt-6 mb-4'>
                    <Text className='text-dark/60 font-mona'>¿Ya tienes cuenta? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen' as any)}>
                      <Text className='text-primary font-monaBold'>Inicia sesión</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Fondo Inferior - Se oculta con el teclado */}
            {!isKeyboardVisible && (
              <Image
                source={require('../../../assets/icons/waves-yellow.png')}
                className='w-full absolute bottom-0 left-0 right-0 h-32 z-10'
                style={{ transform: [{ rotate: '180deg' }], opacity: 0.5 }}
                resizeMode='stretch'
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

export default RegisterScreen;
