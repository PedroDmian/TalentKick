import React, { useState, useEffect } from 'react';
import {
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { IUser } from '../../../domain/models/IUser';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Title from '../../components/Title';

interface EditProfileModalProps {
  isVisible: boolean;
  onClose: () => void;
  user: IUser | null;
  onSave: (data: Partial<IUser>) => Promise<void>;
  isLoading: boolean;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isVisible,
  onClose,
  user,
  onSave,
  isLoading
}) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    lastname: user?.lastname || '',
    bio: user?.bio || '',
    birthdate: user?.birthdate || '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(user?.birthdate ? new Date(user.birthdate) : new Date());

  // Actualizar formData cuando el usuario cambie (si el modal se mantiene montado)
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        lastname: user.lastname || '',
        bio: user.bio || '',
        birthdate: user.birthdate || '',
      });
      if (user.birthdate) {
        setTempDate(new Date(user.birthdate));
      }
    }
  }, [user, isVisible]);

  const handleSave = async () => {
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || tempDate;
    setShowDatePicker(Platform.OS === 'ios'); // En iOS se mantiene abierto hasta que el usuario confirme
    
    if (selectedDate) {
      setTempDate(currentDate);
      // Formatear a YYYY-MM-DD para el backend/estado
      const formattedDate = currentDate.toISOString().split('T')[0];
      setFormData({ ...formData, birthdate: formattedDate });
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="bg-white rounded-t-[40px] h-[85%]"
        >
          <View className="p-6 flex-1">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-6">
              <Title title="Editar Perfil" classStyle={{ classNameTitle: 'text-2xl font-monaExtraBold' }} />
              <TouchableOpacity 
                onPress={onClose} 
                className="bg-slate-100 p-2 rounded-full"
                disabled={isLoading}
              >
                <Icon name="times" size={20} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 40 }}
            >
              <View className="gap-y-4">
                <Input
                  label="Nombre"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChangeText={(val) => setFormData({ ...formData, name: val })}
                  editable={!isLoading}
                />

                <Input
                  label="Apellido"
                  placeholder="Tu apellido"
                  value={formData.lastname}
                  onChangeText={(val) => setFormData({ ...formData, lastname: val })}
                  editable={!isLoading}
                />

                <Input
                  label="Fecha de Nacimiento"
                  placeholder="Selecciona tu fecha"
                  value={formData.birthdate ? formData.birthdate.split('T')[0] : ''}
                  onPress={() => !isLoading && setShowDatePicker(true)}
                  rightIcon={<Icon name="calendar" size={18} color="#6c757d" />}
                  editable={false}
                />

                {showDatePicker && (
                  <DateTimePicker
                    value={tempDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onDateChange}
                    maximumDate={new Date()} // No permitir fechas futuras
                  />
                )}

                <Input
                  label="Biografía"
                  placeholder="Cuéntanos sobre ti..."
                  value={formData.bio}
                  onChangeText={(val) => setFormData({ ...formData, bio: val })}
                  multiline
                  numberOfLines={4}
                  editable={!isLoading}
                />
              </View>

              <View className="mt-10">
                <Button
                  label={isLoading ? "Guardando..." : "Guardar Cambios"}
                  onPress={handleSave}
                  disabled={isLoading}
                />
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default EditProfileModal;
