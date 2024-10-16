export default function Progress() {
  return (
    <div>
      <h4 className="sr-only">Status</h4>
      <div aria-hidden="true" className="mt-6">
        <div className="overflow-hidden bg-gray-200 rounded-full">
          <div
            style={{ width: '0' }}
            className="h-2 bg-indigo-600 rounded-full"
          />
        </div>
        <div className="hidden grid-cols-4 mt-6 text-sm font-medium text-gray-600 sm:grid">
          <div className="">Uploading files</div>
          <div className="text-center">Migrating database</div>
          <div className="text-center">Compiling assets</div>
          <div className="text-right">Deployed</div>
        </div>
      </div>
    </div>
  );
}
