import { useEffect, useState, type ChangeEvent } from "react";

interface UseFormProps<T> {
    initialValue: T;
    validate: (values: T, step: number) => Record<keyof T, string>;
    step: number;
}

function useForm<T>({ initialValue, validate, step }: UseFormProps<T>) {
    const [values, setValues] = useState<T>(initialValue);
    const [touched, setTouched] = useState<Record<string, boolean>>({}); 
    const [errors, setErrors] = useState<Record<string, string>>({});

    // 입력값 바꿨을 때 
    const handleChange = (name: keyof T, text: string) => {
        setValues({
            ...values,
            [name]: text,
        })
    }

    // 눌렀는지 여부 (focus를 잃었을 때)
    const handleBlur = (name: keyof T) => {
        setTouched({
            ...touched,
            [name]: true,
        });
    }

    // input 속성 가져오기 
    const getInputProps = (name: keyof T) => {
        const value = values[name];
        const onChange = (e: ChangeEvent<HTMLInputElement>) => {
            handleChange(name, e.target.value);
        };
        const onBlur = () => handleBlur(name);

        return {value, onChange, onBlur};
    }

    useEffect(() => {
        const newErrors = validate(values, step);
        setErrors(newErrors);

    }, [values, step, validate]);

    return {
        values,
        errors,
        touched,
        getInputProps,
    };
}

export default useForm;
