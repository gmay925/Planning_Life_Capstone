import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChangePassword.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

export default function ChangePassword() {
  const navigate = useNavigate();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [previousPassword, setPreviousPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const [hasTypedNewPassword, setHasTypedNewPassword] = useState(false);
  const [hasTypedConfirmPassword, setHasTypedConfirmPassword] = useState(false);
  const isValidNewPassword = newPassword.length >= 6;
  const isValidConfirm = confirmPassword === newPassword;
  const isAllValid = isValidNewPassword && isValidConfirm;

  const cancelChangePasswordHandler = async () => {
    setShowChangePassword(false);
  };

  const changePasswordSubmit = async (body) => {
    const res = await fetch('/preferences', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (res.ok) {
      return json;
    }
    // eslint-disable-next-line
    throw { status: res.status, message: json.message };
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setMessage('');

    try {
      const result = await changePasswordSubmit({
        previousPassword,
        newPassword,
      });
      setShowChangePassword(false);
      setMessage(result.message);
      setPreviousPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      if (error.status === 401) {
        navigate('/logout');
      }
      setErrorMessage(error.message);
      setHasTypedNewPassword(false);
    }
  };

  return (
    <Container className="password-page">
      {showChangePassword && (
        <Form onSubmit={onSubmit} className="password-form">
          <Form.Label className='error align-items-center mb-3'>{errorMessage}</Form.Label>
          <Form.Label>
            Previous Password:
            <Form.Control
              className="mb-3"
              autoFocus={true}
              name='previousPassword'
              controlid="formBasicPreviousPassword"
              type="password"
              value={previousPassword}
              onChange={(e) => setPreviousPassword(e.target.value)}
            />
          </Form.Label>
          <Form.Label>
            New Password:
            <Form.Control
              data-testid="new-pass"
              className="mb-3"
              name='newPassword'
              controlid="formBasicPassword"
              type="password"
              value={newPassword}
              isInvalid={hasTypedNewPassword && !isValidNewPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setHasTypedNewPassword(true);
              }
              }
            />
          </Form.Label>
          <Form.Label>
            Confirm Password:
            <Form.Control
              className="mb-3"
              name='confirmPassword'
              controlid="formConfirmPassword"
              type="password"
              value={confirmPassword}
              isInvalid={hasTypedConfirmPassword && !isValidConfirm}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setHasTypedConfirmPassword(true);
              }}
            />
          </Form.Label>
          <div className="password-btns">
            <Button
              type='submit'
              className="password-btn"
              disabled={!isAllValid}
            >
              Save Password
            </Button>
            <Button
              className="password-btn-cancel"
              onClick={cancelChangePasswordHandler}
            >
              Cancel
            </Button>
          </div>
        </Form>
      )}
      {!showChangePassword && (
        <div className="changePassword">
          <p className='message'>{message}</p>
          <Button
            className="change-password-btn"
            onClick={() => {
              setShowChangePassword(true);
            }}
          >
            Change Password
          </Button>
        </div>
      )}
    </Container>
  );
}
