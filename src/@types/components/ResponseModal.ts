export interface IResponseModalProps {
  open: boolean;
  onClose: () => void;
  route: string;
  message: string;
  icon?: JSX.Element;
}

export interface IResponseModalState {
  open: boolean;
  message: string;
  icon?: JSX.Element;
}
