/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         type:
 *           type: string
 *         title:
 *           type: string
 *         message:
 *           type: string
 *         referenceId:
 *           type: string
 *           nullable: true
 *         isRead:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - userId
 *         - type
 *         - title
 *         - message
 *         - isRead
 *         - createdAt
 */

export interface NotificationProps {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  referenceId?: string | null;
  isRead: boolean;
  createdAt: Date;
}

export class Notification {
  private props: NotificationProps;

  constructor(props: NotificationProps) {
    this.props = props;
  }

  get id(): string { return this.props.id; }
  get userId(): string { return this.props.userId; }
  get type(): string { return this.props.type; }
  get title(): string { return this.props.title; }
  get message(): string { return this.props.message; }
  get referenceId(): string | null | undefined { return this.props.referenceId; }
  get isRead(): boolean { return this.props.isRead; }
  get createdAt(): Date { return this.props.createdAt; }

  public toJSON() {
    return {
      ...this.props,
    };
  }
}
