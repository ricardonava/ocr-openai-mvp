/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileUploader, Form, Submit, TextField } from '@just-scan/form';
import { useParams } from 'react-router-dom';
import { useFileUploadMutation } from '../api/employee';

const EmployeeForm = ({ defaultValues }: any) => {
  return (
    <Form
      defaultValues={defaultValues}
      onSubmit={(data: any) => {
        console.log(data);
      }}
    >
      <TextField
        name="firstName"
        label="First Name"
        placeholder="Employee's first name"
      />
      <TextField
        name="lastName"
        label="Last Name"
        placeholder="Employee's last name"
      />
      <TextField name="clabe" label="CLABE" placeholder="Employee's CLABE" />
      <TextField
        name="account"
        label="Account"
        placeholder="Employee's bank accout number"
      />
      <TextField name="rfc" label="RFC" placeholder="Employee's RFC" />
      <Submit />
    </Form>
  );
};

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const uploadFileMutation = useFileUploadMutation();

  console.log('Employee ID', id);

  // TODO fix types as inner data is typed as NEVER this is non breaking we just have the ugly eslint error
  const defaultValues = {
    firstName: uploadFileMutation.data?.data.results[0].firstName,
    lastName: uploadFileMutation.data?.data.results[0].lastName,
    clabe: uploadFileMutation.data?.data.results[0].clabe,
    account: uploadFileMutation.data?.data.results[0].account,
    rfc: uploadFileMutation.data?.data.results[0].rfc,
  };

  return (
    <div className="px-32 py-16 space-y-16">
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
        isLoading={uploadFileMutation.isLoading}
      />

      {uploadFileMutation.isLoading ? (
        <fieldset className="disabled:opacity-40" disabled>
          <EmployeeForm defaultValues={defaultValues} />
        </fieldset>
      ) : (
        <EmployeeForm defaultValues={defaultValues} />
      )}
    </div>
  );
};

export default EmployeeDetailPage;
