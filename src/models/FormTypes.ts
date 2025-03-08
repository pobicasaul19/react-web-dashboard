import { Dayjs } from 'dayjs';

export interface ItemField {
  type: 'input' | 'select' | 'file' | 'textarea' | 'calendar';
  label: string;
  model: string;
  capitalize?: boolean;
  options?: { name: string; value: string }[];
}

export interface FormModalProps {
  showModal: boolean;
  header: string;
  onGetData: () => void;
  formData: Record<string, string | File | null | Dayjs>;
  errorData: Record<string, string>;
  itemFields: ItemField[];
  mode: 'create' | 'update';
  onClose: () => void;
  create: (payload: Record<string, string | File | null>) => Promise<void>;
  update: (payload: Record<string, string | File | null>, uuid: string) => Promise<void>;
  uuid: string;
  name: string;
  isPublish?: boolean;
}