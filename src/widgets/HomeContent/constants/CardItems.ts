import type { IHomeCardProps } from '@/src/entities/home-card';
import ChakraUIImage from '@/src/shared/assets/images/ChakraUI.png';
import FramerMotionImage from '@/src/shared/assets/images/FramerMotion.png';
import FSDImage from '@/src/shared/assets/images/FSD.png';
import MongoDBImage from '@/src/shared/assets/images/MongoDB.png';
import TanstackQueryImage from '@/src/shared/assets/images/TanstackQuery.png';

export const cardItems: IHomeCardProps[] = [
  {
    title: 'MongoDB',
    description: `MongoDB - это NoSQL база данных, использующая формат BSON (Binary JSON) для хранения данных. BSON расширяет JSON, добавляя поддержку дополнительных типов данных, таких как даты и бинарные данные, что делает его более эффективным для машинного чтения и записи`,
    image: MongoDBImage,
    isReverse: false,
  },
  {
    title: 'Framer Motion',
    description: `Framer Motion - это библиотека для анимаций в React, предлагающая простой и мощный API для создания сложных анимаций и взаимодействий без необходимости написания кода. Она поддерживает анимации макета, жесты, анимации при прокрутке и многое другое`,
    image: FramerMotionImage,
    isReverse: true,
  },
  {
    title: 'Tanstack Query',
    description: `Tanstack Query - это библиотека для React, предназначенная для упрощения работы с асинхронными данными. Она предоставляет хуки для запросов, кэширования и обновления данных, поддерживает автоматическое кэширование и рефетчинг, а также параллельные и зависимые запросы`,
    image: TanstackQueryImage,
    isReverse: false,
  },
  {
    title: 'Chakra UI',
    description: `Chakra UI - это простая, модульная и доступная библиотека компонентов для React, предлагающая широкий спектр компонентов для быстрого и удобного создания интерфейсов. Она поддерживает темы, адаптивность и доступность, обеспечивая легкую стилизацию через пропсы и интеграцию с другими инструментами и фреймворками`,
    image: ChakraUIImage,
    isReverse: true,
  },
  {
    title: 'Feature Sliced Design (FSD)',
    description: `Feature-Sliced Design (FSD) - это методология архитектуры для фронтенд-приложений, ориентированная на организацию кода по функциональности и бизнес-логике. Она обеспечивает четкую структуру проекта, упрощая понимание и поддержку кода, особенно в условиях изменяющихся требований`,
    image: FSDImage,
    isReverse: false,
  },
];
