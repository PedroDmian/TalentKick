# Arquitectura del Proyecto: TalentKick

Este documento describe la arquitectura y organización del código del proyecto **TalentKick**. El proyecto sigue los principios de **Clean Architecture** (Arquitectura Limpia), lo que permite una separación clara de responsabilidades, facilita las pruebas unitarias y hace que el código sea más mantenible y escalable.

## Estructura de Directorios

La lógica principal se encuentra dentro de la carpeta `src/`, la cual está organizada en las siguientes capas:

### 1. Domain (Dominio)
Es el corazón de la aplicación. Contiene las reglas de negocio puras y es independiente de cualquier framework o librería externa.
- **`models/`**: Definiciones de entidades y tipos de datos del negocio.
- **`repositories/`**: Definiciones de interfaces (contratos) para los repositorios. Aquí se define *qué* datos necesitamos, pero no *cómo* se obtienen.
- **`use-cases/`**: Lógica de negocio específica de la aplicación. Orquestan el flujo de datos hacia y desde las entidades.

### 2. Infrastructure (Infraestructura)
Contiene las implementaciones de los detalles técnicos. Se encarga de la comunicación con el mundo exterior (APIs, bases de datos, etc.).
- **`api/`**: Definición de servicios Axios. Centraliza los endpoints y la configuración de cabeceras.
- **`repositories/`**: Implementaciones concretas de las interfaces del dominio. Aquí reside la lógica de *cómo* obtener los datos (ej: `auth.repository.impl.ts`).
- **`mappers/`**: Crucial para el desacoplamiento. Transforman los DTOs (Data Transfer Objects) de la API en modelos limpios para el dominio.
- **`factory/`**: Contiene la factoría de dependencias (`dependencies.ts`) que orquestra la instanciación de todas las clases del sistema.
- **`services/`**: Integraciones con SDKs externos como Firebase (Auth, Cloud Messaging).

### 3. Presentation (Presentación)
Capa responsable de la interfaz de usuario y la interacción con el usuario.
- **`screens/`**: Vistas principales de la aplicación organizada por módulos.
- **`components/`**: Componentes atómicos y moleculares reutilizables.
- **`hooks/`**: Encapsulan la lógica de conexión entre la UI y los Use Cases del dominio, utilizando frecuentemente **TanStack Query** para la gestión de estado asíncrono.
- **`store/`**: Manejo de estado global ligero y reactivo mediante **Zustand**.
- **`context/`**: Proveedores de React para estados transversales (Autenticación, Permisos, Temas).
- **`navigation/`**: Definición de pilas (Stacks) y navegadores (Tabs) utilizando **React Navigation v7**.

### 4. Core
Contiene utilidades, configuraciones globales y tipos compartidos que son transversales a toda la aplicación.
- **`config/`**: Variables de entorno y configuraciones generales.
- **`utils/`**: Funciones de ayuda (formateo de fechas, validaciones, etc.).
- **`types/`**: Tipos de TypeScript globales.

---

### Flujo de Datos
1. La **Capa de Presentación** (Screen/Component) detecta una acción del usuario.
2. Se invoca un **Custom Hook** o se llama directamente a un **Use Case**.
3. El **Use Case** solicita datos a un **Repository** (interfaz).
4. El **Repository Implementation** (en Infraestructura) realiza la petición vía **API** (Axios) o accede al almacenamiento local.
5. Los datos recibidos son transformados por un **Mapper** al modelo del **Domain**.
6. El **Use Case** devuelve el modelo a la **Presentación**.
7. La **Presentación** actualiza el estado (Zustand) o la UI.

### Stack Tecnológico Principal
- **Framework**: React Native (0.83.1)
- **Lenguaje**: TypeScript
- **Estado Global**: Zustand
- **Fetch/Caching**: React Query (@tanstack/react-query)
- **Navegación**: React Navigation v7
- **Cliente HTTP**: Axios
- **Servicios Cloud**: Firebase (Auth, Messaging)
- **Actualizaciones**: Revopush (Code Push)

---

---

## Ejemplos de Flujos de Datos

A continuación se detallan ejemplos concretos de cómo fluyen los datos a través de las capas de la aplicación, siguiendo los principios de Clean Architecture.

### 1. Flujo de Escritura (Mutación): Verificación de Teléfono

Este flujo describe el proceso desde que el usuario ingresa su teléfono hasta que se interactúa con el servicio externo (Firebase).

#### Estructura de Archivos Involucrados:
- **Domain**: `src/domain/use-cases/auth-phone-verification.usecase.ts`
- **Domain**: `src/domain/repositories/auth.repository.ts` (Interfaz)
- **Infrastructure**: `src/infrastructure/repositories/auth.repository.impl.ts` (Implementación)
- **Presentation**: `src/presentation/hooks/useAuth.ts` (Custom Hook)

#### Ejemplo de Código:

**Dominio (Caso de Uso):**
```typescript
// Define LA LÓGICA de qué debe pasar, sin saber CÓMO se hace técnicamente.
export class AuthPhoneVerificationUseCase {
  constructor(private readonly authRepository: AuthRepository) { }

  async execute(phoneNumber: string): Promise<string> {
    const validationId = await this.authRepository.verifyPhoneNumber(phoneNumber);
    if (!validationId) throw new Error('Validation ID not found');
    return validationId;
  }
}
```

**Infraestructura (Repositorio):**
```typescript
// Implementa el detalle técnico (Firebase en este caso).
export class AuthRepositoryImpl implements AuthRepository {
  async verifyPhoneNumber(phoneNumber: string): Promise<string> {
    const confirmation = await signInWithPhoneNumber(auth, phoneNumber);
    return confirmation.verificationId;
  }
}
```

**Presentación (Custom Hook):**
```typescript
// Conecta la UI con el caso de uso usando TanStack Query.
export const useAuthPhoneVerification = () => {
  const { authPhoneVerificationUseCase } = useDependencies();
  
  const mutation = useMutation({
    mutationFn: (phone: string) => authPhoneVerificationUseCase.execute(phone),
  });

  return { verifyPhoneNumber: mutation.mutateAsync, isLoading: mutation.isPending };
};
```

### 2. Flujo de Lectura (Query): Obtención de Entregas

Este flujo muestra cómo se solicitan datos, se transforman mediante Mappers y se presentan en la UI.

#### Estructura de Archivos Involucrados:
- **Domain**: `src/domain/use-cases/deliveries-get.usecase.ts`
- **Infrastructure**: `src/infrastructure/repositories/deliveries.repository.impl.ts`
- **Infrastructure**: `src/infrastructure/mappers/delivery.mapper.ts`
- **Presentation**: `src/presentation/hooks/useDeliveries.ts`

#### Ejemplo de Código:

**Infraestructura (Mapper):**
```typescript
// Transforma el DTO (API) al Modelo del Dominio.
export const DeliveryMapper = {
  toDelivery(response: DeliveriesResponse): Delivery {
    return {
      order_number: response.order_number,
      customer_name: response.customer_name,
      status: response.status || 'PENDING',
      // ... mapeo de campos
    };
  }
};
```

**Presentación (Custom Hook):**
```typescript
// Recupera los datos y mantiene el estado de carga.
export const useDeliveries = () => {
  const { deliveriesGetUseCase } = useDependencies();

  return useQuery({
    queryKey: ['deliveries'],
    queryFn: () => deliveriesGetUseCase.execute(),
  });
};
```

---

## Inyección de Dependencias

Para mantener las capas desacopladas, utilizamos una **Factoría de Dependencias** que instancia todas las implementaciones de infraestructura y las inyecta en los casos de uso del dominio.

**Archivo**: `src/infrastructure/factory/dependencies.ts`

```typescript
export const createDependencies = (): Dependencies => {
  // 1. Instanciar Repositorios (Infraestructura)
  const authRepository = new AuthRepositoryImpl();
  const deliveriesRepository = new DeliveriesRepositoryImpl();

  // 2. Instanciar Casos de Uso (Dominio) e inyectar repositorios
  const authPhoneVerificationUseCase = new AuthPhoneVerificationUseCase(authRepository);
  const deliveriesGetUseCase = new DeliveriesGetUseCase(deliveriesRepository);

  return {
    authPhoneVerificationUseCase,
    deliveriesGetUseCase,
    // ...
  };
};
```

Este objeto de dependencias se distribuye a toda la aplicación mediante un **Contexto de React** (`DependenciesProvider`), permitiendo que cualquier hook o componente acceda a los casos de uso sin conocer su implementación técnica.

---

## Estructura de la Aplicación (App.tsx)

El archivo `App.tsx` es el orquestador principal. Su función es configurar el entorno y envolver la aplicación en los proveedores necesarios.

### Jerarquía de Providers
Los proveedores se organizan de fuera hacia adentro para asegurar que las dependencias críticas estén listas:

1.  **PermissionsProvider**: Inicializa y gestiona los permisos nativos.
2.  **ToastProvider & ToastBridge**: Configura el sistema de alertas visuales.
3.  **DependenciesProvider**: Inyecta el grafo de dependencias (Clean Architecture).
4.  **QueryClientProvider**: Proveedor para el manejo de caché de datos.
5.  **RNSafeAreaProvider & SafeAreaContextProvider**: Gestión de insets y áreas seguras.
6.  **LoaderProvider**: Manejo del Spinner global de carga.
7.  **AuthProvider**: (En `AppContent`) Gestiona la sesión del usuario.
8.  **NavigationContainer**: Contenedor raíz de navegación.

### Inicialización y Servicios
- **Code Push (Revopush)**: Integrado para permitir actualizaciones OTA (Over-The-Air) sin pasar por las tiendas.
- **BootSplash**: Controlado manualmente para ocultar la pantalla de inicio una vez que los servicios están listos.

---

## Estándares de Código
- **Tipado**: Se debe evitar el uso de `any`. Todas las entidades y respuestas de API deben estar tipadas.
- **Componentes**: Se prefiere el uso de componentes funcionales y hooks.
- **Nombramiento**: Los archivos deben seguir el patrón `nombre-funcional.tipo.ts` (ej: `user.repository.ts`, `auth.mapper.ts`).
