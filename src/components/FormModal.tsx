import React, { useState, useEffect, useRef } from 'react';
import type { ItemField, FormModalProps } from '../models/FormTypes';
import { useNotifications } from '@toolpad/core/useNotifications';
import {
  Dialog,
  Button,
  Select,
  MenuItem,
  TextField,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextareaAutosize,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const FormModal: React.FC<FormModalProps> = ({
  uuid,
  name,
  mode,
  header,
  create,
  update,
  showModal,
  onGetData,
  errorData,
  itemFields,
  isPublish,
  formData: initialFormData,
  onClose,
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [, setErrors] = useState(errorData);
  const fileRef = useRef<File | null>(null);
  const notifications = useNotifications();

  useEffect(() => {
    if (!showModal) {
      setErrors(errorData);
    }
  }, [showModal, errorData]);

  useEffect(() => {
    if (mode === 'create') {
      setFormData(initialFormData);
    }
    if (mode === 'update' && uuid) {
      setFormData(initialFormData);
    }
  }, [mode, uuid, initialFormData]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      fileRef.current = event.target.files[0];
    }
  };

  const getInputComponent = (type: ItemField['type'], item: ItemField) => {
    switch (type) {
      case 'input':
        return (
          <TextField
            fullWidth
            variant="outlined"
            value={item.model}
            onChange={(e) => item.model = e.target.value}
          />
        );
      case 'select':
        return (
          <Select
            fullWidth
            variant="outlined"
            value={item.model}
            onChange={(e) => item.model = e.target.value}
          >
            {item.options?.map((option, i) => (
              <MenuItem key={i} value={option.value}>{option.name}</MenuItem>
            ))}
          </Select>
        );
      case 'file':
        return (
          <input type="file" onChange={(e) => handleFileSelect(e)} />
        );
      case 'textarea':
        return (
          <TextareaAutosize
            value={item.model}
            onChange={(e) => item.model = e.target.value}
            minRows={3}
            maxRows={10}
            style={{ width: '100%' }}
          />
        );
      case 'calendar':
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                value={formData[item.model] as dayjs.Dayjs | null}
                onChange={(date) => setFormData((prev) => ({ ...prev, [item.model]: date }))}
              />
            </DemoContainer>
          </LocalizationProvider>
        )
      default:
        return null;
    }
  }

  const saveOrUpdate = async () => {
    const payload = { ...formData, file: fileRef.current };
    const publishPayload = { ...payload, status: 'For Edit' };
    if (mode === 'create') {
      await create(isPublish ? publishPayload : payload);
    } else {
      await update(isPublish ? publishPayload : payload, uuid);
    }
  };

  const onSave = async () => {
    try {
      setErrors({});
      await saveOrUpdate();
      notifications.show(`${name} was ${mode === 'update' ? 'updated' : 'created'} successfully.`, {
        severity: 'success',
        autoHideDuration: 5000,
      });
    } catch (error) {
      console.error(error);
      notifications.show('An error occurred while saving the data.', {
        severity: 'error',
        autoHideDuration: 5000,
      });
    }
  }

  const onPublish = async () => {
    try {
      const payload = { ...formData, status: 'Published' };
      await update(payload, uuid);
      notifications.show(`${name} was published successfully.`, {
        severity: 'success',
        autoHideDuration: 5000,
      });
      onGetData();
    } catch (error) {
      console.error(error);
      notifications.show('An error occurred while publishing the data.', {
        severity: 'error',
        autoHideDuration: 5000,
      });
    }
  }

  return (
    <Dialog open={showModal} maxWidth="md" fullWidth>
      <DialogTitle>{header}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <form encType="multipart/form-data">
          {itemFields.map((item, i) => (
            <div key={i} className="mb-4">
              {getInputComponent(item.type, item)}
            </div>
          ))}
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={onSave}>
          Save
        </Button>
        {isPublish && (
          <Button variant="contained" color="secondary" onClick={onPublish}>
            Publish
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default FormModal;