import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/plugins/image";
import "tinymce/plugins/imagetools";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";

const MyEditor = () => {
  const handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
  };

  return (
    <Editor
      apiKey="your_api_key"
      initialValue="<p>This is the initial content of the editor</p>"
      init={{
        height: 500,
        menubar: true,
        plugins: [
          "advlist autolink lists link image imagetools charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | " +
          "bold italic backcolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | table | image | help",
        image_advtab: true,
        codesample_languages: [
          { text: "HTML/XML", value: "markup" },
          { text: "JavaScript", value: "javascript" },
          { text: "CSS", value: "css" },
          { text: "PHP", value: "php" },
          { text: "Ruby", value: "ruby" },
          { text: "Python", value: "python" },
          { text: "Java", value: "java" },
          { text: "C", value: "c" },
          { text: "C#", value: "csharp" },
          { text: "C++", value: "cpp" },
        ],
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default MyEditor;
