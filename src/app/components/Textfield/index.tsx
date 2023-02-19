import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Input, Label } from 'reactstrap';

interface Props {
  label: string;
  type?: 'text' | 'password';
  isRequired?: boolean;
  name: string;
  control: Control<any>;
  disabled?: boolean;
  placeholder: string;
  className?: string;
}

function Textfield(props: Props) {
  const {
    label,
    type = 'text',
    isRequired = false,
    name,
    control,
    placeholder,
    className,
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: value => {
          if (isRequired && !value) {
            return `${label} is required`;
          }
          return true;
        },
      }}
      render={({ field, fieldState }) => {
        return (
          <>
            <Label
              className={`${className || ''} mb-0 text-dark`}
              style={{ fontSize: '12px' }}
            >
              {label} {isRequired && <span className="text-danger">*</span>}
            </Label>
            {type === 'password' ? (
              <Input
                className="w-100 form-control"
                placeholder={placeholder}
                {...field}
                type="password"
              />
            ) : (
              <Input
                type={type}
                className="w-100 form-control"
                placeholder={placeholder}
                {...field}
              />
            )}
            <div className="d-flex justify-content-between mt-1">
              <small className="text-danger">
                {fieldState?.error?.message || ''}
              </small>
            </div>
          </>
        );
      }}
    />
  );
}

export default React.memo(Textfield);
