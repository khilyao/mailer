import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { IDraftFormValues } from "@components/Draft/Draft";

interface IEditorProps {
  setValue: UseFormSetValue<IDraftFormValues>;
}

const Editor = ({ setValue }: IEditorProps) => {
  const [editorHtml, setEditorHtml] = useState("");

  const handleEditorChange = (value: string) => {
    setEditorHtml(value);
    setValue("message", value);
  };

  return (
    <ReactQuill
      value={editorHtml}
      onChange={handleEditorChange}
      placeholder="Write something..."
      style={{
        height: "100px",
        overflowY: "scroll",
        overflow: "visible",
      }}
    />
  );
};

export default Editor;
