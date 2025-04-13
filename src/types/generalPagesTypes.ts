//layout type
export interface PageLayoutProps {
    children: React.ReactNode;
}


//form input types
export interface FormInputProps {
    type?: string;
    label: string;
    placeholder?: string;
    backbg?: boolean;
    value: string | number;
    errorText?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    required?: boolean;
    minLength?: number;
    name?: string,
    bold?: boolean;
    helpText?: string,
    options?: Array<{ value: string | number; label: string }>;
}


//custom select types
export interface CustomSelectProps {
    options: string[];
    onSelect: (option: string) => void;
    label?: string;
    border?: boolean;
    bg?: boolean;
    labeltext?: string
}


//forgot password types
export interface ForgotPasswordForms {
    email: string;
    otp: string;
    confirm_password: string;
    new_password: string;
}