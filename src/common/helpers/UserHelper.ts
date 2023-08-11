import { adminIds } from '@common/constants/AdminIds';

export const isAdmin = (id: string) => adminIds.indexOf(id) > -1;
