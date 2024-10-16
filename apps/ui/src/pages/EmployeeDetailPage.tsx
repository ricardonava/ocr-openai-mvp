/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileUploader, Form, Submit, TextField } from '@just-scan/form';
import { useState } from 'react';
import { useFileUploadMutation } from '../api/employee';
import Notification from '../components/Notification';
import Progress from '../components/Progress';

const EmployeeForm = ({ defaultValues }: any) => {
  if (defaultValues.firstName) {
    window.scrollTo({
      top: 700,
      left: 0,
      behavior: 'smooth',
    });
  }
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
        placeholder="e.g., Maria"
      />
      <TextField
        name="lastName"
        label="Last Name"
        placeholder="e.g., Lopez Martinez"
      />
      <TextField
        name="dateOfBirth"
        label="Date of Birth"
        placeholder="MM-DD-YYYY"
      />
      <TextField
        name="placeOfBirth"
        label="Place of Birth"
        placeholder="e.g., Guadalajara"
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
        placeholder="18 digits, e.g., 002180045678901234"
      />
      <TextField
        name="account"
        label="Account"
        placeholder="e.g., 4567890123"
      />
      <TextField name="rfc" label="RFC" placeholder="e.g., LOMM850101XX9" />
      <TextField
        name="curp"
        label="CURP"
        placeholder="e.g., LOMM850101HDFRRL08"
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
        placeholder="e.g., Avenida Siempre Viva 742"
      />
      <TextField name="state" label="State" placeholder="e.g., Jalisco" />
      <TextField name="country" label="Country" placeholder="e.g., Mexico" />

      <TextField name="poBox" label="PO Box" placeholder="e.g., 44100" />
      <div className="col-span-full">
        <Submit />
      </div>
    </Form>
  );
};

const EmployeeDetailPage = () => {
  const uploadFileMutation = useFileUploadMutation();
  const [start, setStart] = useState(false);

  console.log('uploadFileMutation', uploadFileMutation.data?.data.error);

  // TODO fix types as inner data is typed as NEVER this is non breaking we just have the ugly eslint error

  const defaultValues = {
    firstName: '',
    lastName: '',
    clabe: '',
    account: '',
    rfc: '',
    curp: '',
    dateOfBirth: '',
    placeOfBirth: '',
    street: '',
    state: '',
    country: '',
    poBox: '',
  };

  return (
    <>
      {uploadFileMutation.data?.data.error ? (
        <Notification
          show={true}
          type="error"
          message="Documents belong to different employees. Please verify."
        />
      ) : (
        <Notification
          show={uploadFileMutation.isSuccess}
          type="success"
          message="Successfully processed!"
        />
      )}

      <div className="px-32 py-16 space-y-16">
        <FileUploader
          onSubmit={(data) => {
            setStart(true);
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
        <Progress start={start} isSuccess={uploadFileMutation.isSuccess} />

        {uploadFileMutation.isLoading ? (
          <fieldset className="disabled:opacity-40" disabled>
            <EmployeeForm defaultValues={defaultValues} />
          </fieldset>
        ) : (
          <EmployeeForm
            defaultValues={
              !uploadFileMutation.data?.data.error
                ? {
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
                  }
                : defaultValues
            }
          />
        )}
      </div>
    </>
  );
};

export default EmployeeDetailPage;
