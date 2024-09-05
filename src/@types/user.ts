export type IUser = {
    id_user?: number;
    name: string;
    phone: string;
    email: string;
    password?: string;
    role: number;
    active: boolean;
    created_at: Date;
    updated_at: Date;
  };
  