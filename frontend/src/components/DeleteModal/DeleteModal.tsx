import {Button, Modal} from "react-bootstrap";
import {Dispatch, FC, SetStateAction} from "react";

interface IProp {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    objName: string

    deleteAction: () => void
}

const DeleteModal: FC<IProp> = ({show, setShow, objName, deleteAction}) => {
    const handleClose = () => setShow(false)

    const handleDelete = () => {
        deleteAction()
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete {objName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure want to delete {objName}?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
};

export {
    DeleteModal
}