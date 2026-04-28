import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RootStackParamsList } from '../../../../App';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useLogin, useLoginGoogle, useLoginApple } from '../../hooks/useAuth';
import { useToast } from 'tostadin-rn';

interface Props extends StackScreenProps<RootStackParamsList, 'SignUpScreen'> { }

const SignUpScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('damian@yopmail.com');
  const [password, setPassword] = useState('Password1.');

  const { showToast } = useToast();

  const loginMutation = useLogin();
  const googleMutation = useLoginGoogle();
  const appleMutation = useLoginApple();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        showToast({ message: 'Error', description: 'Por favor rellena todos los campos', type: 'error' });
        return;
      }
      await loginMutation.mutateAsync({ email, password });
      showToast({ message: 'Éxito', description: 'Sesión iniciada correctamente', type: 'success' });
      navigation.navigate('MainContainerScreen');
    } catch (error: any) {
      showToast({ 
        message: 'Error', 
        description: error?.response?.data?.error || error?.message || 'Ocurrió un error en el inicio de sesión', 
        type: 'error' 
      });
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await googleMutation.mutateAsync();
      showToast({ message: 'Éxito', description: 'Sesión iniciada con Google', type: 'success' });
      navigation.navigate('MainContainerScreen');
    } catch (error: any) {
      showToast({ message: 'Error', description: error?.message || 'Error con Google Sign In', type: 'error' });
    }
  };

  const handleAppleAuth = async () => {
    try {
      await appleMutation.mutateAsync();
      showToast({ message: 'Éxito', description: 'Sesión iniciada con Apple', type: 'success' });
      navigation.navigate('MainContainerScreen');
    } catch (error: any) {
      showToast({ message: 'Error', description: error?.message || 'Error con Apple Sign In', type: 'error' });
    }
  };

  return (
    <View className='flex-1 bg-white'>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View className='flex-1 relative bg-salt'>
            <Image
              source={require('../../../assets/icons/waves-opacity.png')}
              className='w-full absolute top-0 left-0 right-0 h-60 z-0'
              resizeMode='stretch'
            />

            <View 
              className='flex-1 px-6 z-20'
              style={{ paddingTop: insets.top }}
            >
              <View className='w-full mt-4'>
                <Image
                  source={require('../../../assets/icons/logo.png')}
                  className='w-full h-24 mb-6'
                  resizeMode='contain'
                />

                <Text className='text-dark text-4xl font-monaExtraBold leading-tight'>
                  Bienvenido de nuevo
                </Text>
                <Text className='text-dark/60 text-lg font-monaMedium mt-2'>
                  Ingresa tus credenciales para continuar
                </Text>
              </View>

              <View className='w-full mt-8'>
                <View className='gap-y-4'>
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
                    secureTextEntry
                  />
                </View>

                <View className='mt-8'>
                  <Button 
                    title='Iniciar sesión' 
                    onPress={handleLogin} 
                    isLoading={loginMutation.isPending}
                  />
                </View>

                <View className='flex flex-row justify-center items-center mt-6'>
                  <Text className='text-silver font-monaMedium'>
                    ¿No tienes una cuenta? 
                  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen' as any)}>
                    <Text className='text-primary font-monaBold ps-1'>
                      Regístrate
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className='flex-row items-center my-8'>
                  <View className='flex-1 h-[1px] bg-timberwolf' />
                  <Text className='mx-4 text-silver font-monaMedium'>o continúa con</Text>
                  <View className='flex-1 h-[1px] bg-timberwolf' />
                </View>

                <View className='flex-row justify-between mb-10'>
                  {/* Google Button Coming Soon */}
                  <View className='w-[48%] relative'>
                    <Button 
                      title='Google' 
                      icon={<Image 
                        source={require('../../../assets/icons/google.png')} className='w-5 h-5'
                        resizeMode='contain'
                      />}
                      onPress={() => {}}
                      styleType='light'
                    />
                    <TouchableOpacity 
                      activeOpacity={0.9}
                      onPress={() => showToast({ message: 'Próximamente', description: 'Esta función estará disponible muy pronto', type: 'info', icon: <Text style={{ fontSize: 18 }}>🥳</Text> })}
                      className='absolute inset-0 bg-salt/20 rounded-2xl'
                    >
                      <View className='absolute top-2 right-2 bg-primary px-2 py-0.5 rounded-full shadow-sm'>
                        <Text className='text-white text-[7px] font-monaBold uppercase tracking-tighter'>Muy pronto</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  
                  {/* Apple Button Coming Soon */}
                  <View className='w-[48%] relative'>
                    <Button 
                      title='Apple' 
                      icon={<Image 
                        source={require('../../../assets/icons/apple.png')} className='w-5 h-5' 
                        resizeMode='contain'
                      />}
                      onPress={() => {}}
                      styleType='light'
                    />
                    <TouchableOpacity 
                      activeOpacity={0.9}
                      onPress={() => showToast({ message: 'Próximamente', description: 'Esta función estará disponible muy pronto', type: 'info', icon: <Text style={{ fontSize: 18 }}>🥳</Text> })}
                      className='absolute inset-0 bg-salt/20 rounded-2xl'
                    >
                      <View className='absolute top-2 right-2 bg-dark px-2 py-0.5 rounded-full shadow-sm'>
                        <Text className='text-white text-[7px] font-monaBold uppercase tracking-tighter'>Muy pronto</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <Image
              source={require('../../../assets/icons/waves-yellow.png')}
              className='w-full absolute bottom-0 left-0 right-0 h-32 z-10'
              style={{ transform: [{ rotate: '180deg' }], opacity: 0.5 }}
              resizeMode='stretch'
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

export default SignUpScreen;
