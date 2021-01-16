import * as React from "react";
import styles from "./ModalProvider.module.scss";

type ContextState = {
  actions: {
    showModal(children: React.ReactElement): void;
    closeModal(): void;
  };
};

export const ModalContext = React.createContext<ContextState>({
  actions: {
    showModal: (children: React.ReactElement) => {},
    closeModal: () => {},
  },
});

export const ModalProvider = (props: { children: React.ReactElement }) => {
  const [state, setState] = React.useState<React.ReactElement | null>(null);
  const currentRef = React.createRef<HTMLDivElement>();
  const showModal = (children: React.ReactElement) => {
    setState(children);
  };
  const closeModal = () => {
    setState(null);
    return;
  };
  React.useEffect(() => {
    document.addEventListener("keydown", (ev) => {
      ev.key === "Escape" && setState(null);
    });
  }, []);
  const handleBlur = React.useCallback(
    (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
      if (e.target === currentRef.current) {
        setState(null);
        return;
      }
    },
    [currentRef]
  );
  return (
    <ModalContext.Provider
      value={{
        actions: {
          showModal,
          closeModal,
        },
      }}
    >
      {props.children}
      {state && (
        <div ref={currentRef} onClick={handleBlur} className={styles.topModal}>
          <div className={styles.modal}>{state}</div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
