

import React, { useState, useRef } from 'react';
import UploadIcon from '../icons/UploadIcon';

interface FileUploadProps {
  label: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ label }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
        <h3 className="text-sm font-medium text-slate-700 mb-2">{label}</h3>
        <div 
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded bg-slate-50 text-center cursor-pointer hover:bg-slate-100 transition-colors"
            onClick={handleClick}
        >
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".pdf,.jpeg,.jpg,.png"
            />
             <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mb-3">
                <UploadIcon className="w-6 h-6 text-slate-500" />
            </div>
            {fileName ? (
                <p className="text-sm text-slate-700 font-medium">{fileName}</p>
            ) : (
                <>
                    <p className="text-sm text-slate-600">
                        <span className="font-semibold text-emerald-600">Browse files</span> or drop here
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                        Supported file types: PDF, JPEG, PKG. Max file size: 5 MB.
                    </p>
                    <p className="text-xs text-slate-500">
                        Recommended format: PDF. Ensure files are clear and properly labeled.
                    </p>
                </>
            )}
        </div>
    </div>
  );
};

export default FileUpload;
