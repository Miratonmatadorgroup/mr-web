//modal layout types
export interface ModalLayoutProps {
    children: React.ReactNode;
    setModal: (value: boolean) => void;
    addclas?: string;
}