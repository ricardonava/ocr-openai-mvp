import { DragEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
  files: FileList | null;
};

export function FileUploader({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
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
            {files && files.length > 0 ? (
              <>
                <div className="mt-4 text-white">
                  {Array.from(files).map((file, index) => (
                    <p key={index}>{file.name}</p>
                  ))}
                </div>
                <div className="mt-4 flex justify-center space-x-4">
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                      onClick={handleClearFiles}
                      disabled={!files || isLoading}
                    >
                      Clear files
                    </button>
                    <button
                      disabled={!files || files.length === 0 || isLoading}
                      type="submit"
                      className="disabled:opacity-40 disabled:cursor-not-allowed rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      {!isLoading ? 'Upload Files' : 'Uploading...'}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
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
                      {...register('files')}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-400">
                  PNG, JPG, JPEG up to 10MB
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default FileUploader;
