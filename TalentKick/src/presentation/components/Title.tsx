import { Text } from 'react-native';

import { ITitleProps } from '../../domain/models/shared/ITitle';

const Title = ({
  title,
  subtitle,
  classStyle,
}: ITitleProps) => {
  return (
    <>
      <Text className={`text-dark text-2xl font-monaExtraBold tracking-widest mt-5 ${classStyle?.classNameTitle || ''}`}>
        {title}
      </Text>

      { subtitle && 
        <Text className={` text-davygray text-sm font-mona tracking-wide mb-2 ${classStyle?.classNameSubtitle}`}>
          {subtitle}
        </Text>
      }
    </>
  );
}

export default Title;