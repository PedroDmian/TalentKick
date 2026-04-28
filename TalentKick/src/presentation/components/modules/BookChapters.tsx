import { useState } from 'react';
import { Text, View } from 'react-native';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { IBook, IChapter } from '../../../domain/models/IBook';

import Title from '../Title';
import Button from '../Button';

const titleClassStyle = { classNameTitle: 'text-white text-xl font-monaExtraBold mt-0' };

const BookChapters = (
  entityBook: IBook & {
    onPressRead?: (id: string) => void;
  }
) => {
  const [chapters] = useState<IChapter[]>([
    {
      "id": "chap-001",
      "bookId": "book-001",
      "title": "El Cementerio de los Libros Olvidados",
      "content": "Mi padre me llevó por primera vez al Cementerio de los Libros Olvidados una mañana de verano...",
      "order": 1,
      "createdAt": "2025-07-01T10:05:00Z",
      "updatedAt": "2025-07-01T10:05:00Z",
      "deletedAt": null
    },
    {
      "id": "chap-002",
      "bookId": "book-001",
      "title": "Encuentro con Julián Carax",
      "content": "Con el paso de los años, descubrí que Carax había desaparecido tras escribir su último libro...",
      "order": 2,
      "createdAt": "2025-07-01T10:10:00Z",
      "updatedAt": "2025-07-01T10:10:00Z",
      "deletedAt": null
    },
    {
      "id": "chap-003",
      "bookId": "book-001",
      "title": "La Sombra del Mal",
      "content": "A medida que profundizaba en la historia de Carax, me di cuenta de que había una sombra oscura acechando...",
      "order": 3,
      "createdAt": "2025-07-01T10:15:00Z",
      "updatedAt": "2025-07-01T10:15:00Z",
      "deletedAt": null
    },
    {
      "id": "chap-004",
      "bookId": "book-001",
      "title": "El Misterio de la Casa de los Espíritus",
      "content": "La casa de los espíritus, donde Carax vivió sus últimos días, se convirtió en un lugar de misterio y revelaciones...",
      "order": 4,
      "createdAt": "2025-07-01T10:20:00Z",
      "updatedAt": "2025-07-01T10:20:00Z",
      "deletedAt": null
    },
    {
      "id": "chap-005",
      "bookId": "book-001",
      "title": "El Legado de Julián Carax",
      "content": "Al final, comprendí que el legado de Carax no solo era su obra, sino también las lecciones que había aprendido...",
      "order": 5,
      "createdAt": "2025-07-01T10:25:00Z",
      "updatedAt": "2025-07-01T10:25:00Z",
      "deletedAt": null
    },
    {
      "id": "chap-006",
      "bookId": "book-001",
      "title": "El Viaje a París",
      "content": "En mi búsqueda de respuestas, decidí viajar a París, donde Carax había vivido y escrito...",
      "order": 6,
      "createdAt": "2025-07-01T10:30:00Z",
      "updatedAt": "2025-07-01T10:30:00Z",
      "deletedAt": null
    }
  ]);

  return (
    <View 
      className='relative -top-10 left-0 right-0 w-full p-4 rounded-t-3xl -mb-10'
    >
      <Text className='text-white text-4xl text-center font-monaExtraBold tracking-widest'>
        {entityBook.title}
      </Text>

      <View className='flex'>
        { chapters.map((chapter, index) => (
          <View className='flex-row items-center mb-4' key={index}>
            <View className='flex-1'>
              <Text className='text-davygray text-xs font-mona'>
                Capítulo {chapter.order}
              </Text>

              <Title 
                title={chapter.title}
                subtitle={chapter.content}
                classStyle={titleClassStyle}
              />
            </View>

            <View className='ml-3'>
              <Button 
                onPress={() => entityBook.onPressRead && entityBook.onPressRead(chapter.id)} 
                icon={<IconFontAwesome5 name='play' size={20} color={'dark'} />}
                styleType='light'
                classNameTouch='px-3 py-2.5 rounded-full'
              />
            </View>
          </View>
        ))}
        
      </View>

      
    </View>
  );
}

export default BookChapters;