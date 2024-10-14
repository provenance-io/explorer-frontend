import { FieldInputProps } from 'formik';
import styled from 'styled-components';
import Sprite from '../../../Components/Sprite';
import { useCallback, useState } from 'react';
import { bytesToFileSize } from '../../../utils';
import Loading from '../../../Components/Loading';

const Container = styled.div<{ dragActive: boolean }>`
  margin-top: 10px;
  padding: 20px 0;
  width: 100%;
  border: ${({ dragActive, theme }) =>
    `${dragActive ? '2px solid' : '1px dashed'} ${theme.INPUT_BORDER_LIGHT}`};
  border-radius: 4px;
  color: ${({ theme }) => theme.INPUT_FONT_LIGHT};
  font-size: 1.2rem;
  line-height: 2.2rem;
  background-color: ${({ theme }) => theme.INPUT_BG_LIGHT};
  height: 100px;
  &:focus {
    outline: none;
    box-shadow: 0 0 1px 1px ${({ theme }) => theme.INPUT_OUTLINE_LIGHT};
  }
  &:hover {
    border: 2px solid ${({ theme }) => theme.INPUT_BORDER_LIGHT};
  }
  &::placeholder {
    color: ${({ theme }) => theme.INPUT_PLACEHOLDER_LIGHT};
  }
`;

const LoadingContainer = styled(Loading)`
  max-height: 10px;
`;

const SpriteHolder = styled.div`
  justify-self: center;
`;

const FileUpload = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;
  margin: 0;
  width: 90%;
`;

const Uploaded = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const FileData = styled.div`
  display: grid;
`;

type Fileish = File | null;

interface FileUploadProps {
  field: FieldInputProps<any>;
  form: any; // FormikState<any> & FormikHelpers<any>;
  mediaTypes?: string[];
  onFileChanged: (file: Fileish) => void;
  maxFileSizeMb?: number;
}

enum STATE {
  SELECT,
  UPLOADING,
  COMPLETE,
}

const FileUploadComponent = ({
  field,
  form,
  mediaTypes,
  onFileChanged,
  maxFileSizeMb = 1,
  ...props
}: FileUploadProps) => {
  // // State for drag actions
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [state, setState] = useState(STATE.SELECT);

  const handleFileSelected = (file: File): Promise<void> =>
    new Promise((resolve, reject) => {
      const isValid = mediaTypes ? mediaTypes.includes(file.type) : true;
      if (isValid) {
        form.setFieldValue(field.name, file, true).finally(() => {
          form.setFieldTouched(field.name, true).finally(() => {
            resolve();
            onFileChanged && onFileChanged(file);
          });
        });
      } else {
        reject(new Error(`Unsupported file type: ${file.type}`));
      }
    });

  const handleFileDelete = () => {
    form.setFieldValue(field.name, null, true).finally(() => {
      form.setFieldTouched(field.name, true).finally(() => {
        onFileChanged && onFileChanged(null);
      });
    });
    setFileName('');
    setDragActive(false);
    setState(STATE.SELECT);
  };

  const upload = useCallback(
    async (e: React.ChangeEvent<any>) => {
      const BYTES_PER_MEGABYTE = 1048576;
      if (
        !e.target.files?.[0]?.size ||
        !maxFileSizeMb ||
        e.target.files[0].size / BYTES_PER_MEGABYTE < maxFileSizeMb
      ) {
        const { files } = e.target;
        const file = files?.[0];
        if (file) {
          const { name, size } = file;
          setFileName(name);
          setFileSize(bytesToFileSize(size));
          try {
            setState(STATE.UPLOADING);
            await handleFileSelected(file);
            setState(STATE.COMPLETE);
          } catch (e: any) {
            setState(STATE.SELECT);
          }
        }
      }
    },
    // Don't have handleFileSelected as a dependency here
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maxFileSizeMb]
  );

  // Set dragActive state
  const handleDrag = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  return (
    <Container
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      dragActive={dragActive || state === STATE.COMPLETE}
      onDrop={upload}
    >
      {!fileName ? (
        <FileUpload>
          <Input type="file" {...field} {...props} onChange={upload} />
          <SpriteHolder>
            <Sprite icon="UPGRADE" size="3rem" />
          </SpriteHolder>
          Upload .wasm file
        </FileUpload>
      ) : state === STATE.COMPLETE ? (
        <Uploaded>
          <FileData>
            <div>File: {fileName}</div>
            <div>Size: {fileSize}</div>
          </FileData>
          <Sprite icon="TRASH" size="5rem" onClick={handleFileDelete} />
        </Uploaded>
      ) : (
        <LoadingContainer />
      )}
    </Container>
  );
};

export default FileUploadComponent;
