import { User } from './User';

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         feedId:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         content:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         user:
 *           $ref: '#/components/schemas/User'
 *       required:
 *         - id
 *         - feedId
 *         - userId
 *         - content
 *         - createdAt
 *         - updatedAt
 */
export interface CommentProps {
  id: string;
  feedId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  user?: User; // Opcional, para incluir info del autor
}

export class Comment {
  private props: CommentProps;

  constructor(props: CommentProps) {
    this.props = props;
  }

  get id(): string { return this.props.id; }
  get feedId(): string { return this.props.feedId; }
  get userId(): string { return this.props.userId; }
  get content(): string { return this.props.content; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
  get user(): User | undefined { return this.props.user; }

  public toJSON() {
    return {
      ...this.props,
      user: this.props.user?.toJSON(),
    };
  }
}
