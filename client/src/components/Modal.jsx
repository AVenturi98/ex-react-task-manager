import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ title, content, show, onClose, onConfirm, confirmText = "Conferma" }) => {
    if (!show) return null; // Non renderizzare nulla se `show` è false

    return ReactDOM.createPortal(
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2 style={styles.title}>{title}</h2>
                <div style={styles.content}>{content}</div>
                <div style={styles.actions}>
                    <button style={styles.cancelButton} onClick={onClose}>
                        Annulla
                    </button>
                    <button style={styles.confirmButton} onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root") // Assicurati che esista un div con id="modal-root" nel file index.html
    );
};

// Stili inline per la modale
const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modal: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        width: "95%",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
    title: {
        marginBottom: "15px",
        fontSize: "20px",
        fontWeight: "bold",
        color: "black"
    },
    content: {
        marginBottom: "20px",
        fontSize: "16px",
        color: "black"
    },
    actions: {
        display: "flex",
        justifyContent: "space-between",
    },
    cancelButton: {
        backgroundColor: "#ccc",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
    },
    confirmButton: {
        backgroundColor: "#fa450d",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default Modal;