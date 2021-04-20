import React, {useCallback} from 'react';
import {FieldProps} from "formik";
import {
    DropzoneWrapper,
    FieldError,
    FieldLabel,
    FieldWrapper,
    FilesText,
    FileWrapper,
    InsertedFilesWrapper
} from "./style";
// @ts-ignore
import {useDropzone} from "react-dropzone";
import _ from "lodash";

interface DropZoneFieldProps extends FieldProps {
    labelText: string;
    dropzoneText: string;
    addNewFile: (file: File) => void;
    files: File[];
    removeFile: (index: number) => void;
};

const DropZoneField = (
    {
        labelText,
        field,
        form,
        dropzoneText,
        addNewFile,
        files,
        removeFile
    }:
        DropZoneFieldProps
) => {
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file: File) => {
            addNewFile(file);
        })
    }, []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
    const error = form.touched[field.name] && form.errors[field.name];
    return (
        <FieldWrapper column>
            <FieldLabel
                error={!!error}
            >
                {labelText}
            </FieldLabel>
            <DropzoneWrapper
                {...getRootProps()}
            >
                <input {...getInputProps()}/>
                {dropzoneText}
            </DropzoneWrapper>
            {
                !_.isEmpty(files) &&
                <InsertedFilesWrapper>
                    <FilesText big>
                        Fisiere introduse:
                    </FilesText>
                    {
                        files.map((file, index) =>
                            <FileWrapper>
                                <FilesText>{file.name}</FilesText>
                                <FilesText
                                    close
                                    onClick={() => removeFile(index)}
                                >
                                    &#10005;
                                </FilesText>
                            </FileWrapper>
                        )
                    }
                </InsertedFilesWrapper>
            }
            {
                error &&
                <FieldError>{error}</FieldError>
            }
        </FieldWrapper>
    )
};

export default DropZoneField
