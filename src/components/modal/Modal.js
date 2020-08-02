/**
 * Reusable Modal Component
 * @author Prashant Chuaudhari <prashantchaudhari@jump360.me>
 */
import React from "react";

import Portal from "./Portal";
import { MdClose } from "react-icons/md";

/** import styles */
import classes from "./modal.module.css";

function Modal({
  children,
  on,
  toggle,
  title = "",
  noCloseButton,
  outsideClickDisabled,
}) {
  return (
    <Portal>
      {on && (
        <div className={classes.modal}>
          <div className={classes.modal__card}>
            <div className={classes.modal__card__header}>
              <h3 className={classes.modal__card__title}>{title}</h3>
              {noCloseButton ? null : (
                <button
                  className={classes.modal__card__closeBtn}
                  onClick={toggle}
                >
                  <MdClose className={classes.modal__card__closeBtn__icon} />
                </button>
              )}
            </div>
            <div className={classes.contentContainer}>{children}</div>
          </div>
          <div
            className={classes.modalBackground}
            onClick={outsideClickDisabled ? () => {} : toggle}
          />
        </div>
      )}
    </Portal>
  );
}

export default Modal;
