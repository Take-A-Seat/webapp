import React, {useCallback, useEffect, useState} from 'react';
import {FieldProps} from "formik";
import {
    DropzoneWrapper,
    FieldError,
    FieldLabel,
    FieldTextTitleSection,
    FieldWrapper,
    FilesText,
    InsertedFilesWrapper, PreviewPhoto, RemoveFileButton
} from "./style";
// @ts-ignore
import {useDropzone} from "react-dropzone";
import _ from "lodash";
import {AuthHeaderLogoWrapper} from "../../auth/authComponents/styles";
import MaterialIcon from "../MaterialIcons";

interface DropZoneFieldProps extends FieldProps {
    title: string;
    dropzoneText: string;
    addNewFile: (file: File) => void;
    files: File;
    removeFile: () => void;
    accept?: string;
    icon: string;
    description?: string;
    fromUrl?:string;
    urlImage?:string;
}

const DropZoneField = (
    {
        title,
        field,
        form,
        dropzoneText,
        addNewFile,
        files,
        removeFile,
        accept,
        icon,
        description,
        fromUrl,
        urlImage
    }:
        DropZoneFieldProps
    ) => {
        const [preview, setPreview] = useState<string>();
        useEffect(() => {
                if (files && !_.isEmpty(files) && !fromUrl) {
                    const render = new FileReader();
                    render.onload = () => {
                        setPreview(render.result as string)
                    }
                    render.readAsDataURL(files)
                } else {
                    setPreview("");
                }


        }, [files])
        const onDrop = useCallback((acceptedFiles) => {
            acceptedFiles.forEach((file: File) => {
                addNewFile(file);
            })
        }, []);
        const {getRootProps, getInputProps} = useDropzone({onDrop});
        const error = form.touched[field.name] && form.errors[field.name];

        return (
            <FieldWrapper checkBoxMargin>
                <FieldTextTitleSection>
                    <FieldLabel
                        title
                        error={error}
                    >
                        {title}
                    </FieldLabel>
                    {description && <FieldLabel description>
                        {description}
                    </FieldLabel>}
                </FieldTextTitleSection>

                {files && !_.isEmpty(files) || fromUrl? <InsertedFilesWrapper>
                    <RemoveFileButton onClick={() => {
                        removeFile()
                    }}>
                        <MaterialIcon iconName={"close"}/>
                    </RemoveFileButton>

                    <PreviewPhoto src={fromUrl?urlImage:preview} alt={files.name}/>
                </InsertedFilesWrapper> : <DropzoneWrapper
                    {...getRootProps()}
                >
                    <input {...getInputProps()} accept={accept}/>
                    <MaterialIcon iconName={icon}/>
                    {dropzoneText}
                </DropzoneWrapper>}
                {
                    error &&
                    <FieldError>{error}</FieldError>
                }
            </FieldWrapper>
        )
    }
;

export default DropZoneField
