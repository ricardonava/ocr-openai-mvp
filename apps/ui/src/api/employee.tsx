import api from '../config/api';

export const getEmployeeList = async () =>
  api.get('/users').then((res) => res.data);

export const getEmployee = async (id: string) =>
  api.get(`/users/${id}`).then((res) => res.data);
