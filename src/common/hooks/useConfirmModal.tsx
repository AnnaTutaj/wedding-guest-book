import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalFuncProps } from 'antd';
import { useCallback } from 'react';
import { MascotImage } from '@common/constants/MascotImage';
import { StyledCloseIcon } from './styled';

export interface IConfirmModalProps extends ModalFuncProps {
  imageMascot?: MascotImage | null;
}

const useConfirmModal = () => {
  const [modal, confirmModalContextHolder] = Modal.useModal();

  const confirmModal = useCallback(
    ({ imageMascot = MascotImage.trash, ...props }: IConfirmModalProps) => {
      modal.confirm({
        closeIcon: <StyledCloseIcon icon={faTimes} />,
        ...props
      });
    },
    [modal]
  );

  return {
    confirmModal,
    confirmModalContextHolder
  };
};

export default useConfirmModal;
