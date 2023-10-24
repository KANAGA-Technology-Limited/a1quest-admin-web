import Select from 'react-select';

function Dropdown({
  containerStyle = {},
  values,
  isMulti = false,
  formik,
  label,
  name,
  placeholder = 'Enter Value',
  useFormik = true,
  className = '',
  onChange,
  showError,
  error,
  ...props
}: {
  containerStyle?: React.CSSProperties;
  values: { label: string; value: string | boolean | number }[];
  isMulti?: boolean;
  formik?: any;
  label?: string;
  name: string;
  placeholder?: string;
  showError?: boolean;
  error?: string;
  useFormik?: boolean;
  onChange?: (e: any) => void;
  className?: string;
  [x: string]: any;
}) {
  return (
    <div className={'w-full flex flex-col gap-[8px] !text-left ' + className}>
      {useFormik ? (
        <>
          {label && (
            <label
              htmlFor={name}
              className={`text-[#292929] font-medium flex gap-[2px] items-center ${
                formik.touched[name] && formik.errors[name] ? 'errorText' : ''
              }`}
            >
              {label}
              {props.required && <span>*</span>}
            </label>
          )}
          <Select
            options={values.map((value) => ({
              label: value.label,
              value: value.value,
            }))}
            onChange={(e: any) => {
              formik.setFieldValue(name, e ? (isMulti ? e : e.value) : undefined);
            }}
            onBlur={() => {
              formik.setFieldTouched(name, true);
            }}
            id={name}
            styles={{
              container: (provided, state) => ({
                ...provided,
                width: '100%',
                color: '#000',
                ...containerStyle,
              }),
              control: (provided, state) => ({
                ...provided,
                paddingBlock: 9,
                boxShadow: 'none',
                borderColor: state.isFocused ? 'var(--primary)' : '#D0D5DD',
                outline: state.isFocused ? '1px solid var(--primary)' : 'none',
              }),
              placeholder: (provided) => ({
                ...provided,
                color: '#B8C0CC',
                textAlign: 'left',
              }),
            }}
            isClearable
            placeholder={placeholder}
            escapeClearsValue
            backspaceRemovesValue
            noOptionsMessage={() => 'No option found at the moment'}
            isMulti={isMulti}
            {...props}
          />
          {formik.touched[name] && formik.errors[name] && (
            <div className='error'>{formik.errors[name]}</div>
          )}
        </>
      ) : (
        <>
          <label
            htmlFor={name}
            className={`dark:text-white ${showError ? 'errorText' : ''}`}
          >
            {label}
          </label>

          <Select
            options={values.map((value) => ({
              label: value.label,
              value: value.value,
            }))}
            onChange={onChange}
            id={name}
            styles={{
              container: (provided, state) => ({
                ...provided,
                width: '100%',
                color: '#000',
                ...containerStyle,
              }),
              control: (provided, state) => ({
                ...provided,
                paddingBlock: 9,
                boxShadow: 'none',
                borderColor: state.isFocused ? 'var(--primary)' : '#D0D5DD',
                outline: state.isFocused ? '1px solid var(--primary)' : 'none',
              }),
              placeholder: (provided) => ({
                ...provided,
                color: '#B8C0CC',
              }),
            }}
            isClearable
            placeholder={placeholder}
            escapeClearsValue
            backspaceRemovesValue
            noOptionsMessage={() => 'No option found at the moment'}
            isMulti={isMulti}
            {...props}
          />
          {showError && <div className='error'>{error}</div>}
        </>
      )}
    </div>
  );
}

export default Dropdown;
