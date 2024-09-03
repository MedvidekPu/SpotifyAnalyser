import React, { useState, useRef } from "react";
import Papa, { ParseResult } from "papaparse";

interface DragAndDropProps {
  onFileLoad: (data: any[]) => void;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ onFileLoad }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      Papa.parse(file, {
        complete: (results: ParseResult<{ artist_id: string }>) => {
          const ids = results.data.map((row) => row.artist_id).filter(Boolean); // Extract artist IDs
          onFileLoad(ids);
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current?.click(); // Trigger click on file input
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  // Inline styles
  const dragDropAreaStyle: React.CSSProperties = {
    width: "95%",
    padding: "30px",
    border: "4px dashed",
    borderRadius: "8px",
    textAlign: "center",
    cursor: "pointer",
    transition: "background-color 0.3s, border-color 0.3s",
    backgroundColor: isDragging ? "#cce5ff" : "#f9f9f9", // Light gray background by default, blue when dragging
    borderColor: isDragging ? "#66afe9" : "#ccc", // Gray border by default, blue when dragging
    marginBottom: "20px",
  };

  return (
    <div
      onDrop={handleFileDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onClick={handleClick} // Add click handler
      style={dragDropAreaStyle} // Apply inline styles
    >
      Drag and drop a CSV file here with artist IDs or click to browse
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        style={{ display: "none" }} // Hidden file input
        onChange={handleFileChange}
      />
    </div>
  );
};

export default DragAndDrop;
