/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
  files: FileList | null;
};

export function FileUploader({
  onSubmit,
}: {
  onSubmit: (data: FormValues) => void;
}) {
  const { register, setValue, watch, handleSubmit, reset } =
    useForm<FormValues>({
      defaultValues: { files: null },
    });

  const [dragActive, setDragActive] = useState<boolean>(false);
  const files = watch('files');

  const handleDrag = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === 'dragenter' || event.type === 'dragover') {
      setDragActive(true);
    } else if (event.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setValue('files', event.dataTransfer.files, { shouldValidate: true });
      event.dataTransfer.clearData();
    }
  };

  const handleClearFiles = () => {
    setValue('files', null); // Clear the file list in the form state
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="col-span-full">
        <label
          htmlFor="cover-photo"
          className="block text-sm font-medium leading-6 text-white"
        >
          Onboarding documents
        </label>
        <div
          className={`mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10 ${
            dragActive ? 'bg-gray-800' : ''
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <div className="mt-4 flex text-sm leading-6 text-gray-400">
              <label
                htmlFor="files"
                className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
              >
                <span>Upload onboarding files</span>
                <input
                  id="files"
                  type="file"
                  multiple
                  className="sr-only"
                  {...register('files')} // Register is still used, but manual control happens with setValue
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-400">
              PNG, JPG, GIF up to 10MB
            </p>

            {files && files.length > 0 && (
              <div className="mt-4 text-white">
                <h4>Files selected:</h4>
                {Array.from(files).map((file, index) => (
                  <p key={index}>{file.name}</p>
                ))}
              </div>
            )}

            <div className="mt-4 flex justify-center space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                disabled={!files || files.length === 0}
              >
                Submit Files
              </button>
              <button
                type="button"
                onClick={handleClearFiles}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                disabled={!files}
              >
                Clear Files
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FileUploader;
