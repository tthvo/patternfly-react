import * as React from 'react';
import { FocusTrap } from '../../helpers';
import titleStyles from '@patternfly/react-styles/css/components/Title/title';
import styles from '@patternfly/react-styles/css/layouts/Bullseye/bullseye';
import { css } from '@patternfly/react-styles';

import { Backdrop } from '../Backdrop/Backdrop';
import { ModalBoxBody } from './ModalBoxBody';
import { ModalBoxHeader } from './ModalBoxHeader';
import { ModalBoxCloseButton } from './ModalBoxCloseButton';
import { ModalBox } from './ModalBox';
import { ModalBoxFooter } from './ModalBoxFooter';
import { ModalBoxDescription } from './ModalBoxDescription';

export interface ModalContentProps {
  /** Content rendered inside the Modal. */
  children: React.ReactNode;
  /** Additional classes added to the button */
  className?: string;
  /** Variant of the modal */
  variant?: 'small' | 'large' | 'default';
  /** Flag to show the modal */
  isOpen?: boolean;
  /** Complex header (more than just text), supersedes title for header content */
  header?: React.ReactNode;
  /** Description of the modal */
  description?: React.ReactNode;
  /** Simple text content of the Modal Header, also used for aria-label on the body */
  title: string;
  /** Flag to show the title (ignored for custom headers) */
  hideTitle?: boolean;
  /** Flag to show the close button in the header area of the modal */
  showClose?: boolean;
  /** Default width of the content. */
  width?: number | string;
  /** Custom footer */
  footer?: React.ReactNode;
  /** Action buttons to add to the standard Modal Footer, ignored if `footer` is given */
  actions?: any;
  /** Flag to indicate that the Footer content is left aligned */
  isFooterRightAligned?: boolean;
  /** A callback for when the close button is clicked */
  onClose?: () => void;
  /** Id to use for Modal Box descriptor */
  modalBoxAriaDescribedById?: string;
  /** Id of the ModalBoxBody */
  id: string;
  /** Flag to disable focus trap */
  disableFocusTrap?: boolean;
}

export const ModalContent: React.FunctionComponent<ModalContentProps> = ({
  children,
  className = '',
  isOpen = false,
  header = null,
  description = null,
  title,
  hideTitle = false,
  showClose = true,
  footer = null,
  actions = [],
  isFooterRightAligned = false,
  onClose = () => undefined as any,
  variant = 'default',
  width = -1,
  modalBoxAriaDescribedById = '',
  id = '',
  disableFocusTrap = false,
  ...props
}: ModalContentProps) => {
  if (!isOpen) {
    return null;
  }

  const modalBoxHeader = header ? (
    <div className={css(titleStyles.title)}>{header}</div>
  ) : (
    <ModalBoxHeader hideTitle={hideTitle}> {title} </ModalBoxHeader>
  );

  const modalBoxFooter = footer ? (
    <ModalBoxFooter isRightAligned={isFooterRightAligned}>{footer}</ModalBoxFooter>
  ) : (
    actions.length > 0 && <ModalBoxFooter isRightAligned={isFooterRightAligned}>{actions}</ModalBoxFooter>
  );
  const boxStyle = width === -1 ? {} : { width };
  const modalBox = (
    <ModalBox
      style={boxStyle}
      className={className}
      variant={variant}
      title={title}
      id={modalBoxAriaDescribedById || id}
    >
      {showClose && <ModalBoxCloseButton onClose={onClose} />}
      {modalBoxHeader}
      {description && <ModalBoxDescription id={id}>{description}</ModalBoxDescription>}
      <ModalBoxBody {...props} {...(!description && { id })}>
        {children}
      </ModalBoxBody>
      {modalBoxFooter}
    </ModalBox>
  );
  return (
    <Backdrop>
      <FocusTrap
        active={!disableFocusTrap}
        focusTrapOptions={{ clickOutsideDeactivates: true }}
        className={css(styles.bullseye)}
      >
        {modalBox}
      </FocusTrap>
    </Backdrop>
  );
};
