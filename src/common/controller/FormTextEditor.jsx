// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useRef, useState } from 'react';

// import { Editor } from "@tinymce/tinymce-react";
// import { Row } from 'antd';


// const FormTextEditor = (props) => {
//     const editorRef = useRef(null);

//     const { label, setData, data } = props;
//     const [value, setValue] = useState("");

//     const onChange = (value) => {
//         setValue(value || null)

//         useEffect(() => {
//             if (data) {
//                 setValue(data);
//             }
//         }, [data]);

//         useEffect(() => {
//             setData(value);
//             console.log('value', value);
//         }, [])
//     }
//     return (
//         <Row className={''}>
//             <label>{label} </label>
//             {/* @ts-ignore*/}
//             <Editor
//                 apiKey="8r5fxfzhoc7de895f21l7hokx1gshb5qeuzbapvrkfgzfczo"
//                 textareaName='textareaName'
//                 onEditorChange={onChange}
//                 value={value ? value : ""}
//                 init={{
//                     width: "100%",
//                     height: 300,
//                     plugins: 'image code',
//                     menubar: false,
//                     statusbar: false,
//                     toolbar: 'undo redo | link image | code | insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent'
//                 }}
//             />

//         </Row>
//     )

// }

// export default FormTextEditor;