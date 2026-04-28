import { Archive } from './Archive';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         role:
 *           type: string
 *           enum: [admin, recruiter, user]
 *         name:
 *           type: string
 *         lastname:
 *           type: string
 *         bio:
 *           type: string
 *           nullable: true
 *         birthdate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         avatar:
 *           type: string
 *           nullable: true
 *         email:
 *           type: string
 *           format: email
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
 *         gallery:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Archive'
 *       required:
 *         - id
 *         - role
 *         - name
 *         - lastname
 *         - email
 *         - createdAt
 *         - updatedAt
 */

export type UserRole = 'admin' | 'recruiter' | 'user';

export interface UserProps {
  id: string;
  role: UserRole;
  type?: string | null;
  name: string;
  lastname: string;
  bio?: string | null;
  birthdate?: Date | null;
  avatar?: string | null;
  email: string;
  password?: string | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  gallery?: Archive[];
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    this.props = props;
  }

  get id(): string { return this.props.id; }
  get role(): UserRole { return this.props.role; }
  get type(): string | null | undefined { return this.props.type; }
  get name(): string { return this.props.name; }
  get lastname(): string { return this.props.lastname; }
  get bio(): string | null | undefined { return this.props.bio; }
  get birthdate(): Date | null | undefined { return this.props.birthdate; }
  get avatar(): string | null | undefined { return this.props.avatar; }
  get email(): string { return this.props.email; }
  get password(): string | null | undefined { return this.props.password; }
  get createdBy(): string | null | undefined { return this.props.createdBy; }
  get updatedBy(): string | null | undefined { return this.props.updatedBy; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }
  get gallery(): Archive[] | undefined { return this.props.gallery; }

  public toJSON() {
    return {
      ...this.props,
      gallery: this.props.gallery?.map(archive => archive.toJSON()),
    };
  }
}
