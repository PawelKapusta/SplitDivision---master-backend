export interface UserAttributes {
  id: string;
  first_name: string;
  last_name: string;
  password: string;
  username: string;
  gender: string;
  service: string;
  email: string;
  phone: string;
  birth_date: Date;
  is_admin: boolean;
  is_blocked: boolean;
  avatar_image: string;
}

export interface GroupAttributes {
  id: string;
  name: string;
  description: string;
  data_created: Date;
}

export interface FAQAttributes {
  id: string;
  question: string;
  answer: string;
}

export interface BillAttributes {
  id: string;
  name: string;
  description: string;
  data_created: Date;
  data_end: Date;
  bill_image: string;
  currency_type: string;
  currency_code: string;
  debt: number;
  code_qr: string;
  owner_id: string;
  group_id: string;
}

export interface SubscriptionAttributes {
  id: string;
  type: string;
  currency_type: string;
  currency_code: string;
  features: Record<string, unknown>;
}

export interface CommentAttributes {
  id: string;
  content: string;
  likes_number: number;
  dislikes_number: number;
  owner_id: string;
  bill_id: string;
}

export interface SubcommentAttributes {
  id: string;
  content: string;
  likes_number: number;
  dislikes_number: number;
  comment_id: string;
  owner_id: string;
  bill_id: string;
}
