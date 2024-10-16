import { DragEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

import ImagePreview from './ImagePreview';

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
  const [currentlyPreviewing, setCurrentlyPreviewing] = useState<File | null>(
    null
  );
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
      <ImagePreview
        file={currentlyPreviewing}
        onClose={() => setCurrentlyPreviewing(null)}
      />
      <div className="col-span-full">
        <div
          className={`mt-2 flex justify-center items-center rounded-lg border border-dashed border-white/25 px-6 py-10 min-h-96 ${
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
                <div className="flex mt-4 text-white gap-x-4">
                  {Array.from(files).map((file, index) => (
                    <div
                      className="cursor-pointer w-[250px] bg-white items-center flex rounded-md overflow-hidden"
                      onClick={() => setCurrentlyPreviewing(file)}
                      key={file.name}
                    >
                      <div>
                        <img src={URL.createObjectURL(file)} alt={file.name} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4 space-x-4">
                  <div className="flex items-center justify-end mt-6 gap-x-6">
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
                      className="px-3 py-2 text-sm font-semibold text-white bg-indigo-500 rounded-md shadow-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      {!isLoading ? 'Scan Documents' : 'Scanning...'}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col mt-4 text-sm leading-6 text-gray-400">
                  <ArrowUpIcon className="h-8 text-gray-400" />
                  <label
                    htmlFor="files"
                    className="relative mt-5 font-semibold text-white bg-gray-900 rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
                  >
                    <span>Upload onboarding files </span>
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
