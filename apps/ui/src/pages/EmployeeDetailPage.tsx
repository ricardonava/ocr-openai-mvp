/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileUploader, Form, Submit, TextField } from '@just-scan/form';
import { useParams } from 'react-router-dom';
import { useFileUploadMutation } from '../api/employee';
import ImagePreview from '../../../../libs/form/src/lib/ImagePreview';
import { useState } from 'react';

const EmployeeForm = ({ defaultValues }: any) => {
  return (
    <Form
      defaultValues={defaultValues}
      onSubmit={(data: any) => {
        console.log(data);
      }}
    >
      <div className="col-span-full">
        <h2 className="text-base font-semibold leading-7 text-white">
          Personal information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          This information will be used to identify the employee
        </p>
      </div>
      <TextField
        name="firstName"
        label="First Name"
        placeholder="Employee's first name"
        colSpan={6}
      />
      <TextField
        name="lastName"
        label="Last Name"
        placeholder="Employee's last name"
        colSpan={6}
      />
      <TextField
        name="dateOfBirth"
        label="Date of Birth"
        placeholder="Employee's date of birth"
        colSpan={6}
      />
      <TextField
        name="placeOfBirth"
        label="Place of Birth"
        placeholder="Employee's place of birth"
        colSpan={6}
      />
      <div className="col-span-full mt-3">
        <h2 className="text-base font-semibold leading-7 text-white">
          Financial information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          Add the information to pay the employee
        </p>
      </div>
      <TextField
        name="clabe"
        label="CLABE"
        placeholder="Employee's CLABE"
        colSpan={6}
      />
      <TextField
        name="account"
        label="Account"
        placeholder="Employee's bank accout number"
        colSpan={6}
      />
      <TextField
        name="rfc"
        label="RFC"
        placeholder="Employee's RFC"
        colSpan={6}
      />
      <TextField
        name="curp"
        label="CURP"
        placeholder="Employee's CURP"
        colSpan={6}
      />

      <div className="col-span-full mt-3">
        <h2 className="text-base font-semibold leading-7 text-white">
          Address
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          This address will be used to for legal purposes
        </p>
      </div>
      <TextField
        name="street"
        label="Street"
        placeholder="Employee's street"
        colSpan={6}
      />
      <TextField
        name="state"
        label="State"
        placeholder="Employee's state"
        colSpan={6}
      />
      <TextField
        name="country"
        label="Country"
        placeholder="Employee's country"
        colSpan={6}
      />

      <TextField
        name="poBox"
        label="PO Box"
        placeholder="Employee's PO Box"
        colSpan={6}
      />
      <div className="col-span-full">
        <Submit />
      </div>
    </Form>
  );
};

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const [currentPreview, setCurrentPreview] = useState<File | null>(null);
  const uploadFileMutation = useFileUploadMutation();

  console.log('Employee ID', id);

  // TODO fix types as inner data is typed as NEVER this is non breaking we just have the ugly eslint error
  const defaultValues = {
    firstName: uploadFileMutation.data?.data.firstName,
    lastName: uploadFileMutation.data?.data.lastName,
    clabe: uploadFileMutation.data?.data.clabe,
    account: uploadFileMutation.data?.data.account,
    rfc: uploadFileMutation.data?.data.rfc,
    curp: uploadFileMutation.data?.data.curp,
    dateOfBirth: uploadFileMutation.data?.data.dateOfBirth,
    placeOfBirth: uploadFileMutation.data?.data.placeOfBirth,
    street: uploadFileMutation.data?.data.address.street,
    state: uploadFileMutation.data?.data.address.state,
    country: uploadFileMutation.data?.data.address.country,
    poBox: uploadFileMutation.data?.data.address.poBox,
  };

  console.debug('uploadFileMutation.progress', uploadFileMutation.progress);

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
