import {Button, Modal} from "react-bootstrap";
import {Dispatch, FC, SetStateAction} from "react";

interface IProp {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    objName: string,
    cancel?: boolean

    deleteAction: () => void
}

const DeleteModal: FC<IProp> = ({show, setShow, objName, cancel, deleteAction}) => {
    const handleClose = () => setShow(false)

    const handleDelete = () => {
        deleteAction()
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{cancel ? 'Cancel' : 'Delete'} {objName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure want to {cancel ? 'cancel' : 'delete'} {objName}?</Modal.Body>
            <Modal.Footer>
                {!cancel && <Button variant="secondary" onClick={handleClose}>Cancel</Button>}
                <Button variant="danger" onClick={handleDelete}>{cancel ? 'Cancel' : 'Delete'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export {
    DeleteModal
}