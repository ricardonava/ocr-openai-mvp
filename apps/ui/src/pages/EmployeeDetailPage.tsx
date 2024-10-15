/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileUploader, Form, Submit, TextField } from '@just-scan/form';
import { useParams } from 'react-router-dom';

const EmployeeDetailPage = () => {
  const { id } = useParams();
  return (
    <div className="px-32 space-y-16 divide-y">
      <FileUploader
        onSubmit={(data) => {
          if (data.files) {
            console.log('Submitting files: ', Array.from(data.files));
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
