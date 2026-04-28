/**
 * @swagger
 * components:
 *   schemas:
 *     Archive:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         url:
 *           type: string
 *           format: uri
 *         type:
 *           type: string
 *           description: Tipo de archivo (e.g., "video", "image", "document")
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
 *       required:
 *         - id
 *         - url
 *         - type
 *         - createdAt
 *         - updatedAt
 */
export interface ArchiveProps {
  id: string;
  url: string;
  type: string;
  createdBy?: string | null;
  updatedBy?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class Archive {
  private props: ArchiveProps;

  constructor(props: ArchiveProps) {
    this.props = props;
  }

  get id(): string { return this.props.id; }
  get url(): string { return this.props.url; }
  get type(): string { return this.props.type; }
  get createdBy(): string | null | undefined { return this.props.createdBy; }
  get updatedBy(): string | null | undefined { return this.props.updatedBy; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }

  public toJSON() {
    return {
      ...this.props,
    };
  }
}
