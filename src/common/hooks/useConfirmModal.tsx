import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalFuncProps } from 'antd';
import { useCallback } from 'react';
import mascotMapImage from '@assets/mascot_map.svg';
import mascotWelcomeImage from '@assets/mascot_welcome.svg';
import mascotTrashImage from '@assets/mascot_trash.svg';
import mascotFolderImage from '@assets/mascot_folder.svg';
import Image from '@common/components/Image/Image';
import { MascotImage } from '@common/constants/MascotImage';
import { StyledCloseIcon, StyledImageContainer } from './styled';

export interface IConfirmModalProps extends ModalFuncProps {
  imageMascot?: MascotImage | null;
}

const useConfirmModal = () => {
  const [modal, confirmModalContextHolder] = Modal.useModal();

  const renderIcon = (imageMascot: IConfirmModalProps['imageMascot']) => {
    if (!imageMascot) {
      return null;
    }

    let imageSrc: string;

    switch (imageMascot) {
      case MascotImage.trash:
        imageSrc = mascotTrashImage;
        break;

      case MascotImage.map:
        imageSrc = mascotMapImage;
        break;

      case MascotImage.welcome:
        imageSrc = mascotWelcomeImage;
        break;

      case MascotImage.folder:
        imageSrc = mascotFolderImage;
        break;
    }

    return (
      <StyledImageContainer>
        <Image height={150} src={imageSrc} alt="Wedding Guest Book Mascot" preview={false} />
      </StyledImageContainer>
    );
  };

  const confirmModal = useCallback(
    ({ imageMascot = MascotImage.trash, ...props }: IConfirmModalProps) => {
      modal.confirm({
        closeIcon: <StyledCloseIcon icon={faTimes} />,
        icon: renderIcon(imageMascot),
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
