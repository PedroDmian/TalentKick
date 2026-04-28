import { Archive } from './Archive';

/**
 * @swagger
 * components:
 *   schemas:
 *     Feed:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         description:
 *           type: string
 *         createdBy:
 *           type: string
 *           nullable: true
 *         updatedBy:
 *           type: string
 *           nullable: true
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
 *         archives:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Archive'
 *       required:
 *         - id
 *         - userId
 *         - description
 *         - createdAt
 *         - updatedAt
 */
export interface FeedProps {
  id: string;
  userId: string;
  description: string;
  createdBy?: string | null;
  updatedBy?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  archives?: Archive[]; // Opcional, para cuando se carga el feed con sus archivos
}

export class Feed {
  private props: FeedProps;

  constructor(props: FeedProps) {
    this.props = props;
  }

  get id(): string { return this.props.id; }
  get userId(): string { return this.props.userId; }
  get description(): string { return this.props.description; }
  get createdBy(): string | null | undefined { return this.props.createdBy; }
  get updatedBy(): string | null | undefined { return this.props.updatedBy; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
  get archives(): Archive[] | undefined { return this.props.archives; }

  public toJSON() {
    return {
      ...this.props,
      archives: this.props.archives?.map(archive => archive.toJSON()),
    };
  }
}
