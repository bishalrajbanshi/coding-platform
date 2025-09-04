class UsetEntity {
  id?: number;
  name!: string;
  email!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(props: Partial<UsetEntity>) {
    Object.assign(this, props);
  }
}

export default UsetEntity;
