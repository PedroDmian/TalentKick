import { AuthRepositoryImpl } from '../repositories/auth.repository.impl';
import { FeedRepositoryImpl } from '../repositories/feed.repository.impl';
import { UserRepositoryImpl } from '../repositories/user.repository.impl';
import { LoginUseCase } from '../../domain/use-cases/login.usecase';
import { RegisterUseCase } from '../../domain/use-cases/register.usecase';
import { GetFeedsUseCase } from '../../domain/use-cases/get-feeds.usecase';
import { CreateFeedUseCase } from '../../domain/use-cases/create-feed.usecase';
import { LoginGoogleUseCase } from '../../domain/use-cases/login-google.usecase';
import { LoginAppleUseCase } from '../../domain/use-cases/login-apple.usecase';
import { GetUserByIdUseCase } from '../../domain/use-cases/get-user-by-id.usecase';
import { UpdateUserAvatarUseCase } from '../../domain/use-cases/update-user-avatar.usecase';
import { UpdateUserUseCase } from '../../domain/use-cases/update-user.usecase';
import { AddUserGalleryImageUseCase } from '../../domain/use-cases/add-user-gallery-image.usecase';
import { FirebaseAuthService } from '../services/firebase-auth.service';

export interface Dependencies {
  loginUseCase: LoginUseCase;
  registerUseCase: RegisterUseCase;
  getFeedsUseCase: GetFeedsUseCase;
  createFeedUseCase: CreateFeedUseCase;
  loginGoogleUseCase: LoginGoogleUseCase;
  loginAppleUseCase: LoginAppleUseCase;
  getUserByIdUseCase: GetUserByIdUseCase;
  updateUserAvatarUseCase: UpdateUserAvatarUseCase;
  updateUserUseCase: UpdateUserUseCase;
  addUserGalleryImageUseCase: AddUserGalleryImageUseCase;
}

export const createDependencies = (): Dependencies => {
  // Services
  const firebaseAuthService = new FirebaseAuthService();

  // Repositories
  const authRepository = new AuthRepositoryImpl();
  const feedRepository = new FeedRepositoryImpl();
  const userRepository = new UserRepositoryImpl();

  // Use Cases
  const loginUseCase = new LoginUseCase(authRepository);
  const registerUseCase = new RegisterUseCase(authRepository);
  const getFeedsUseCase = new GetFeedsUseCase(feedRepository);
  const createFeedUseCase = new CreateFeedUseCase(feedRepository);
  const loginGoogleUseCase = new LoginGoogleUseCase(authRepository, firebaseAuthService);
  const loginAppleUseCase = new LoginAppleUseCase(authRepository, firebaseAuthService);
  const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
  const updateUserAvatarUseCase = new UpdateUserAvatarUseCase(userRepository);
  const updateUserUseCase = new UpdateUserUseCase(userRepository);
  const addUserGalleryImageUseCase = new AddUserGalleryImageUseCase(userRepository);

  return {
    loginUseCase,
    registerUseCase,
    getFeedsUseCase,
    createFeedUseCase,
    loginGoogleUseCase,
    loginAppleUseCase,
    getUserByIdUseCase,
    updateUserAvatarUseCase,
    updateUserUseCase,
    addUserGalleryImageUseCase,
  };
};
