import jwt from 'jsonwebtoken';

export class TokenService {
  private secret = process.env.JWT_SECRET || 'talent-kick-secret';

  generateAccessToken(payload: any): string {
    return jwt.sign(payload, this.secret, { expiresIn: '1h' }); // Token de acceso, expira en 1 hora
  }

  generateRefreshToken(payload: any): string {
    return jwt.sign(payload, this.secret, { expiresIn: '7d' }); // Token de refresco, expira en 7 días
  }

  verify(token: string): any {
    return jwt.verify(token, this.secret);
  }
}
