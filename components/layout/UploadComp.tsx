"use client";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/kibo-ui/dropzone";
import { useEditorDataStore } from "@/lib/store/useEditonData";
import Image from "next/image";
import { useState } from "react";
const UploadComp = () => {
  const { setImageFile } = useEditorDataStore();
  const [files, setFiles] = useState<File[] | undefined>();
  const [filePreview, setFilePreview] = useState<string | undefined>();
  const handleDrop = (files: File[]) => {
    console.log(files);
    setFiles(files);
    setImageFile(files[0]);
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setFilePreview(e.target?.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };
  return (
    <Dropzone
      accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
      onDrop={handleDrop}
      onError={console.error}
      src={files}
      maxSize={1024 * 1024 * 5} // 5MB
      maxFiles={1}
    >
      <DropzoneEmptyState />
      <DropzoneContent>
        {filePreview && (
          <div className="h-[102px] w-full">
            <Image
            height={24} width={24}
              alt="Preview"
              className="absolute top-0 left-0 h-full w-full object-cover"
              src={filePreview}
            />
          </div>
        )}
      </DropzoneContent>
    </Dropzone>
  );
};
export default UploadComp;
