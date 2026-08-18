'use client';
import { useState } from 'react';
import { Button, Tabs, Tab, Card, Row, Col, ListGroup } from 'react-bootstrap';
import styles from './account.module.css';

export default function Account() {
  const [editInformation, setEditInformation] = useState<string | null>(null);
  console.log('editInformation', editInformation);
  const [changePassword, setChangePassword] = useState<string | null>(null);
  console.log('changePassword', changePassword);
  const [managePayment, setManagePayment] = useState<string | null>(null);
  console.log('managePayment', managePayment);

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
                  <Col>Camilla</Col>
                </Row>
                <Row>
                  <Col>Last Name</Col>
                  <Col>Johansson</Col>
                </Row>
                <Row>
                  <Col>Email</Col>
                  <Col>camilla@gmail.com</Col>
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
              <Button variant='primary'>Manage Payment</Button>
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
                    <Row>
                      <Col>CVV</Col>
                      <Col>***</Col>
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
                <Button variant='danger' style={{ margin: '0 auto' }}>
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
    </>
  );
}
