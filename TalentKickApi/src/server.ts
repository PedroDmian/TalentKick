import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './presentation/routes/AuthRoutes';
import userRoutes from './presentation/routes/UserRoutes';
import feedRoutes from './presentation/routes/FeedRoutes';
import commentRoutes from './presentation/routes/CommentRoutes';
import followRoutes from './presentation/routes/FollowRoutes';
import connectionRoutes from './presentation/routes/ConnectionRoutes';
import notificationRoutes from './presentation/routes/NotificationRoutes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './infrastructure/config/swagger';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
}));
app.use(express.json({ strict: false }));

// Documentación Swagger generada automáticamente
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/feeds', feedRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/notifications', notificationRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor TalentKick API funcionando' });
});

app.listen(port, () => {
  console.log(`[Servidor]: Escuchando en http://localhost:${port}`);
});
