import { Button, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getUpdatePass } from '../api/getUpdatePassword';
import { Route, useHistory } from 'react-router';
import { SuccessChange } from './SuccessChange';
import { Link } from 'react-router-dom';


const ChangePass = () => {
    let history = useHistory();

    const [userRequest, setUserRequest] = useState({
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email"),
        password: "",
        newPassword: ""
    })

    const [isInvalid, setIsInvalid] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [message, setMessage] = useState("");

    const [isFilled, setIsFilled] = useState(false);

    const handleFilled = (userRequest) => {
        if (!userRequest.password == "" && !userRequest.newPassword == "") {
            setIsFilled(true);
        } else if (userRequest.password === "" || userRequest.newPassword === "") {
            setIsFilled(false);
        }
    }

    const handleChangePass = async () => {
        let data = await getUpdatePass(userRequest);
        if (data == null) {
            setIsInvalid(true)
            setMessage("Your password is incorrect")
        } else if (data.message === "SUCCESS_CHANGE_PASSWORD") {
            setIsInvalid(false);
            setShow(false);
        }

    }

    useEffect(() => handleFilled(userRequest),[userRequest]);

    return (
        <>
            <Button variant="default" onClick={handleShow}>
                Change password
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><p class="h3 text-danger">Change password</p></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className="flex flex-column mx-auto bg-white p-3">
                        <div
                            class={`alert alert-danger my-2 ${isInvalid ? "" : "d-none"}`}
                            role="alert"
                        >
                            {message}
                            { }
                        </div>
                        <div>
                            <label className="form-label text-secondary" htmlFor="password">
                                Current password
                            </label>
                            <input
                                class="form-control"
                                onChange={(e) => setUserRequest({ ...userRequest, password: e.target.value })}
                                type="password"
                                value={userRequest.password}
                                id="password"
                            />

                        </div>
                        <div className="flex flex-column mt-2">
                            <label className="form-label text-secondary" htmlFor="password">
                                New password
                            </label>
                            <input
                                class="form-control"
                                onChange={(e) => setUserRequest({ ...userRequest, newPassword: e.target.value })}
                                type="password"
                                value={userRequest.newPassword}
                                id="newPassword"
                            />
                        </div>


                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    {isFilled ? (
                        <Button variant="danger" onClick={() => handleChangePass()}>
                            Change password
                        </Button>
                    ) :
                        <Button variant="danger" disabled>
                            Change password
                        </Button>}

                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ChangePass
