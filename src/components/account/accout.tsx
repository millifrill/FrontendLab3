'use client';
import { useEffect, useState } from 'react';
import {
  // Form,
  Button,
  Tabs,
  Tab,
  Card,
  Row,
  Col,
  ListGroup,
  Modal,
} from 'react-bootstrap';
import { useAuth } from '../../context/auth.context';
import { useRouter } from 'next/navigation';

// import bcrypt from 'bcryptjs';
import styles from './account.module.css';

export default function Account() {
  const router = useRouter();
  const [editInformation, setEditInformation] = useState<string | null>(null);
  console.log('editInformation', editInformation);
  const [changePassword, setChangePassword] = useState<string | null>(null);
  console.log('changePassword', changePassword);
  const [managePayment, setManagePayment] = useState<string | null>(null);
  console.log('managePayment', managePayment);

  const { currentUser, setCurrentUser } = useAuth();
  const { users, setUsers } = useAuth();
  console.log('users', users);
  const [storedUsers, setStoredUsers] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const currentStoredUser = JSON.parse(
    localStorage.getItem('currentUser') || 'null',
  );
  console.log('currentStoredUser', currentStoredUser);
  const allUsers = JSON.parse(localStorage.getItem('users') || '[]');

  let updatedUsers = allUsers.filter((u) => u.email !== currentUser.email);
  console.log('updatedUsers', updatedUsers);

  useEffect(() => {
    let updatedUsers = allUsers.filter((u) => u.email !== currentUser.email);
    setUsers(updatedUsers);
  }, []);

  function handleCancelDeleteAccount() {
    setShowConfirm(false);
  }

  function handleDeleteAccount() {
    setShowConfirm(true);
  }

  function handleConfirmDeleteAccount(e) {
    e.preventDefault();
    e.stopPropagation();
    setCurrentUser('');
    localStorage.removeItem('currentUser');
    setUsers(updatedUsers);
    localStorage.setItem('users', updatedUsers);
    router.push('/');
    setShowConfirm(false);
  }

  return (
    <>
      <h1 className='fs-2 mb-5 mt-2'>Account</h1>
      <Tabs
        defaultActiveKey='overview'
        id='uncontrolled-tab-example'
        className={`${styles.tabs} mb-3`}>
        <Tab eventKey='overview' title='Overview' className={styles.tabBody}>
          <Card className={styles.card}>
            <Card.Header className={styles.cardHeader}>
              <h3>Account information</h3>
              <Button
                variant='primary'
                onClick={() => setEditInformation('edit-mode')}>
                Edit Information
              </Button>
            </Card.Header>
            <Card.Body>
              <Card.Text as={'div'} className={styles.rowGap}>
                <Row>
                  <Col>First Name</Col>
                  <Col>{currentUser?.email}</Col>
                </Row>
                <Row>
                  <Col>Last Name</Col>
                  <Col>Johansson</Col>
                </Row>
                <Row>
                  <Col>Email</Col>
                  <Col>{currentUser?.email}</Col>
                </Row>
                <Row>
                  <Col>Address</Col>
                  <Col></Col>
                </Row>
                <Row>
                  <Col>City</Col>
                  <Col></Col>
                </Row>
                <Row>
                  <Col>Country</Col>
                  <Col></Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className={styles.card}>
            <Card.Header className={styles.cardHeader}>
              <h3>Security</h3>
              <Button
                variant='primary'
                onClick={() => setChangePassword('edit-mode')}>
                Change Password
              </Button>
            </Card.Header>
            <Card.Body>
              <Card.Text as={'div'} className={styles.rowGap}>
                <Row>
                  <Col>Password</Col>
                  <Col>**********</Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className={styles.card}>
            <Card.Header className={styles.cardHeader}>
              <h3>Payment</h3>
              <Button
                variant='primary'
                onClick={() => setManagePayment('edit-mode')}>
                Manage Payment
              </Button>
            </Card.Header>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item className={styles.rowGap}>
                  <Card.Title as={'h4'} className={styles.cardTitle}>
                    Credit / Debit Card
                  </Card.Title>
                  <Card.Text as={'div'} className={styles.rowGap}>
                    <Row>
                      <Col>Card Number</Col>
                      <Col>***********45</Col>
                    </Row>
                    <Row>
                      <Col>Expiration Date</Col>
                      <Col>********</Col>
                    </Row>
                  </Card.Text>
                </ListGroup.Item>
                <ListGroup.Item className={styles.rowGap}>
                  <Card.Title as={'h4'} className={styles.cardTitle}>
                    Swish
                  </Card.Title>
                  <Card.Text as={'div'} className={styles.rowGap}>
                    <Row>
                      <Col>Swish Number</Col>
                      <Col>********12</Col>
                    </Row>
                  </Card.Text>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header className={styles.cardHeader}>
              <h3>Delete Account</h3>
            </Card.Header>
            <Card.Body>
              <Card.Text as={'div'} className={styles.rowGap}>
                <Button
                  variant='danger'
                  style={{ margin: '0 auto' }}
                  onClick={handleDeleteAccount}>
                  Delete Account
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey='order-history' title='Order History'>
          Order History
        </Tab>
      </Tabs>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Body className={styles.modalBody}>
          Are you sure you want to DELETE your account? <br />
          This action is irreversible.
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button
            variant='outline-primary'
            className={styles.btnOutline}
            onClick={handleCancelDeleteAccount}>
            Cancel
          </Button>
          <Button
            variant='primary'
            className={styles.btnPrimary}
            onClick={handleConfirmDeleteAccount}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/*
      <Form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Form.Group className='mb-2' controlId='email'>
          <Form.Label>New email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter new email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        {<p className={styles.errorMessage}>{emailError}</p>}
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>New password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter new password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-2' controlId='passwordAgain'>
          <Form.Label>New password again</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter new password again'
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
          />
        </Form.Group>
        {<p className={styles.errorMessage}>{passwordError}</p>}
        <div className='d-flex justify-content-center'>
          <Button
            variant='primary'
            type='submit'
            disabled={!email || !password || !passwordAgain}>
            Save
          </Button>
        </div>
      </Form> */}
    </>
  );
}
