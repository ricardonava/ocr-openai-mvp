import { AxiosError } from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-query';
import api from '../config/api';

export const getEmployeeList = async () =>
  api.get('/users').then((res) => res.data);

export const getEmployee = async (id: string) =>
  api.get(`/users/${id}`).then((res) => res.data);

type UploadArgs = {
  presignedUploadUrl: string; // Single URL for uploading all files
  files: FileList; // FileList to upload
};

export const useFileUploadMutation = () => {
  const [progress, setProgress] = useState(0); // Track overall upload progress

  const mutation = useMutation<void, AxiosError, UploadArgs>(async (args) => {
    const { presignedUploadUrl, files } = args;

    // Create a FormData object and append all files
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('images', file); // 'files' key corresponds to your backend
    });

    // Post all files in one request using FormData
    await api.post(presignedUploadUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (ev) => {
        setProgress(Math.round((ev.loaded * 100) / (ev.total || 0)));
      },
    });
  });

  return { ...mutation, progress };
};
