/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileUploader, Form, Submit, TextField } from '@just-scan/form';
import { useParams } from 'react-router-dom';
import { useFileUploadMutation } from '../api/employee';

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const uploadFileMutation = useFileUploadMutation();

  return (
    <div className="px-32 space-y-16 divide-y">
      <FileUploader
        onSubmit={(data) => {
          if (data.files) {
            console.log('Submitting files: ', Array.from(data.files));
            uploadFileMutation.mutate(
              {
                files: data.files,
                presignedUploadUrl: 'http://localhost:3333/api/upload',
              },
              {
                onSuccess: () => {
                  console.log('File uploaded successfully');
                },
                onError: (error) => {
                  console.error('Error uploading file: ', error);
                },
              }
            );
          } else {
            console.log('No files to submit');
          }
        }}
      />

      <Form
        defaultValues={{
          firstName: '',
          lastName: '',
          middleName: '',
        }}
        onSubmit={(data: any) => {
          console.log(data);
          console.log(id);
        }}
      >
        <TextField name="firstName" label="First Name" placeholder="Ricardo" />
        <TextField name="lastName" label="Last Name" placeholder="Aguirre" />
        <TextField name="middleName" label="Middle Name" placeholder="Nava" />
        <Submit />
      </Form>

      <Form
        defaultValues={{
          firstName: '',
          lastName: '',
          middleName: '',
        }}
        onSubmit={(data: any) => {
          console.log(data);
          console.log(id);
        }}
      >
        <TextField name="firstName" label="First Name" placeholder="Ricardo" />
        <TextField name="lastName" label="Last Name" placeholder="Aguirre" />
        <TextField name="middleName" label="Middle Name" placeholder="Nava" />

        <Submit />
      </Form>

      <Form
        defaultValues={{
          firstName: '',
          lastName: '',
          middleName: '',
        }}
        onSubmit={(data: any) => {
          console.log(data);
          console.log(id);
        }}
      >
        <TextField name="firstName" label="First Name" placeholder="Ricardo" />
        <TextField name="lastName" label="Last Name" placeholder="Aguirre" />
        <TextField name="middleName" label="Middle Name" placeholder="Nava" />
        <Submit />
      </Form>
    </div>
  );
};

export default EmployeeDetailPage;
