'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useCart } from '../../context/cart.context';
import type { PlacedOrder } from '../../context/cart.context';
import styles from './checkout.module.css';

type PaymentMethod = 'card' | 'bank' | 'transfer';
type ShippingOption = 'standard' | 'express';

const SHIPPING_RATES: Record<ShippingOption, number> = {
  standard: 7.24,
  express: 14.99,
};

export default function Checkout() {
  const { items, placeOrder } = useCart();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  // Shipping form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [shipping, setShipping] = useState<ShippingOption>('standard');

  // Payment form
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [discount, setDiscount] = useState('');
  const [discountError, setDiscountError] = useState(false);
  const [swishNumber, setSwishNumber] = useState('');

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingCost = SHIPPING_RATES[shipping];
  const taxRate = 0.04;
  const taxes = subtotal * taxRate;
  const total = subtotal + shippingCost + taxes;

  const isShippingValid =
    firstName.trim() !== '' &&
    lastName.trim() !== '' &&
    address.trim() !== '' &&
    city.trim() !== '' &&
    postalCode.trim() !== '' &&
    country.trim() !== '';

  const isCardValid =
    cardNumber.replace(/\s/g, '').length === 16 &&
    expDate.length === 5 &&
    cvv.length === 3;

  const isPaymentValid =
    paymentMethod === 'card'
      ? isCardValid
      : paymentMethod === 'transfer'
        ? swishNumber.trim() !== ''
        : true;

  function formatCardNumber(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  }

  function formatExpDate(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  }

  function handleContinue() {
    setValidated(true);
    if (isShippingValid) setStep(2);
  }

  function handlePay() {
    setLoading(true);
    const order: PlacedOrder = {
      id: String(Math.floor(1000 + Math.random() * 9000)),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      expectedDelivery: new Date(
        Date.now() + (shipping === 'express' ? 2 : 5) * 24 * 60 * 60 * 1000,
      ).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
      }),
      tracking: Math.random().toString(36).substring(2, 18).toUpperCase(),
      firstName,
      lastName,
      address,
      city,
      postalCode,
      country,
      shippingMethod: shipping === 'express' ? 'Express' : 'Standard',
      shippingCost,
      paymentMethod,
      cardLast4: cardNumber.replace(/\s/g, '').slice(-4),
      items,
      subtotal,
      taxes,
      total,
    };

    setTimeout(() => {
      placeOrder(order);
      router.push('/order-confirmation');
    }, 2000);
  }

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        {/* ── Order Summary ── */}
        <section className={styles.summary}>
          <h2 className={styles.sectionTitle}>Order Summary</h2>

          <ul className={styles.itemList}>
            {items.map((item) => (
              <li key={item.id} className={styles.item}>
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className={styles.itemImage}
                />
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.title}</p>
                  <p className={styles.itemVariant}>{item.color}</p>
                </div>
                <div className={styles.itemRight}>
                  <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                  <p className={styles.itemQty}>Qty: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.discountRow}>
            <Form.Control
              type='text'
              placeholder='Get your discount'
              value={discount}
              onChange={(e) => { setDiscount(e.target.value); setDiscountError(false); }}
              className={styles.discountInput}
            />
            <Button
              variant='secondary'
              className={styles.applyBtn}
              onClick={() => { if (discount.trim()) setDiscountError(true); }}
            >
              Apply
            </Button>
          </div>
          {discountError && (
            <p className={styles.discountError}>No discount code matches "{discount}"</p>
          )}

          <div className={styles.priceBreakdown}>
            <div className={styles.priceRow}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.priceRow}>
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className={`${styles.priceRow} ${styles.totalRow}`}>
              <strong>Total</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <p className={styles.taxNote}>
              Including ${taxes.toFixed(2)} in taxes
            </p>
          </div>
        </section>

        {/* ── Right side ── */}
        <section className={styles.formSection}>
          {/* Step indicator */}
          <div className={styles.steps}>
            <span className={step === 1 ? styles.stepActive : styles.stepDone}>
              1. Shipping
            </span>
            <span className={styles.stepDivider}>›</span>
            <span
              className={step === 2 ? styles.stepActive : styles.stepInactive}>
              2. Payment
            </span>
          </div>

          {/* ── Step 1: Shipping ── */}
          {step === 1 && (
            <Form
              noValidate
              validated={validated}
              className={styles.stepContent}>
              <h2 className={styles.sectionTitle}>Shipping Address</h2>

              <div className={styles.nameRow}>
                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.label}>First Name</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='John'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={styles.input}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please enter your first name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.label}>Last Name</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Doe'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={styles.input}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please enter your last name.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.label}>Address</Form.Label>
                <Form.Control
                  required
                  type='text'
                  placeholder='123 Main Street'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={styles.input}
                />
                <Form.Control.Feedback type='invalid'>
                  Please enter your address.
                </Form.Control.Feedback>
              </Form.Group>

              <div className={styles.nameRow}>
                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.label}>City</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Stockholm'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={styles.input}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please enter your city.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.label}>Postal Code</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='11120'
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className={styles.input}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please enter your postal code.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.label}>Country</Form.Label>
                <Form.Control
                  required
                  type='text'
                  placeholder='Sweden'
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={styles.input}
                />
                <Form.Control.Feedback type='invalid'>
                  Please enter your country.
                </Form.Control.Feedback>
              </Form.Group>

              <h2 className={`${styles.sectionTitle} ${styles.shippingTitle}`}>
                Shipping Method
              </h2>

              <div className={styles.shippingOptions}>
                <label
                  className={`${styles.shippingOption} ${shipping === 'standard' ? styles.shippingSelected : ''}`}
                  onClick={() => setShipping('standard')}>
                  <Form.Check
                    type='radio'
                    id='standard'
                    checked={shipping === 'standard'}
                    onChange={() => setShipping('standard')}
                  />
                  <div>
                    <p className={styles.shippingName}>Standard</p>
                    <p className={styles.shippingDesc}>
                      Delivery in 3–5 business days
                    </p>
                  </div>
                  <span className={styles.shippingPrice}>$7.24</span>
                </label>

                <label
                  className={`${styles.shippingOption} ${shipping === 'express' ? styles.shippingSelected : ''}`}
                  onClick={() => setShipping('express')}>
                  <Form.Check
                    type='radio'
                    id='express'
                    checked={shipping === 'express'}
                    onChange={() => setShipping('express')}
                  />
                  <div>
                    <p className={styles.shippingName}>Express</p>
                    <p className={styles.shippingDesc}>
                      Delivery in 1–2 business days
                    </p>
                  </div>
                  <span className={styles.shippingPrice}>$14.99</span>
                </label>
              </div>

              <Button className={styles.continueBtn} onClick={handleContinue}>
                Continue to Payment
              </Button>
            </Form>
          )}

          {/* ── Step 2: Payment ── */}
          {step === 2 && (
            <div className={styles.stepContent}>
              <h2 className={styles.sectionTitle}>Payment</h2>

              <p className={styles.payLabel}>Pay With:</p>

              <div className={styles.paymentOptions}>
                <label
                  className={`${styles.paymentOption} ${paymentMethod === 'card' ? styles.paymentSelected : ''}`}
                  onClick={() => setPaymentMethod('card')}>
                  <Form.Check
                    type='radio'
                    id='card'
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <div>
                    <p className={styles.paymentName}>Credit / Debit Card</p>
                    <p className={styles.paymentDesc}>Visa, Mastercard, Amex</p>
                  </div>
                </label>

                <label
                  className={`${styles.paymentOption} ${paymentMethod === 'bank' ? styles.paymentSelected : ''}`}
                  onClick={() => setPaymentMethod('bank')}>
                  <Form.Check
                    type='radio'
                    id='bank'
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                  />
                  <div>
                    <p className={styles.paymentName}>Bank Transfer</p>
                    <p className={styles.paymentDesc}>
                      Direct transfer from your bank
                    </p>
                  </div>
                </label>

                <label
                  className={`${styles.paymentOption} ${paymentMethod === 'transfer' ? styles.paymentSelected : ''}`}
                  onClick={() => setPaymentMethod('transfer')}>
                  <Form.Check
                    type='radio'
                    id='transfer'
                    checked={paymentMethod === 'transfer'}
                    onChange={() => setPaymentMethod('transfer')}
                  />
                  <div>
                    <p className={styles.paymentName}>Swish</p>
                    <p className={styles.paymentDesc}>
                      Pay instantly with Swish
                    </p>
                  </div>
                </label>
              </div>

              {/* Card form */}
              {paymentMethod === 'card' && (
                <div className={styles.cardForm}>
                  <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.label}>
                      Card Number
                    </Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='1234 5678 9101 1121'
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(formatCardNumber(e.target.value))
                      }
                      className={styles.input}
                    />
                  </Form.Group>

                  <div className={styles.nameRow}>
                    <Form.Group className={styles.formGroup}>
                      <Form.Label className={styles.label}>
                        Expiration Date
                      </Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='MM/YY'
                        value={expDate}
                        onChange={(e) =>
                          setExpDate(formatExpDate(e.target.value))
                        }
                        className={styles.input}
                      />
                    </Form.Group>

                    <Form.Group className={styles.formGroup}>
                      <Form.Label className={styles.label}>CVV</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='123'
                        value={cvv}
                        onChange={(e) =>
                          setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))
                        }
                        className={styles.input}
                      />
                    </Form.Group>
                  </div>

                  <Form.Check
                    type='checkbox'
                    id='saveCard'
                    label='Save card details'
                    checked={saveCard}
                    onChange={(e) => setSaveCard(e.target.checked)}
                    className={styles.saveCard}
                  />
                </div>
              )}

              {/* Bank info */}
              {paymentMethod === 'bank' && (
                <div className={styles.infoBox}>
                  <p className={styles.infoText}>
                    After placing your order you will receive an email with our
                    bank details. Please use your order number as payment
                    reference. Orders are processed once payment is confirmed.
                  </p>
                </div>
              )}

              {/* Swish form */}
              {paymentMethod === 'transfer' && (
                <div className={styles.cardForm}>
                  <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.label}>
                      Swish Number
                    </Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='07X XXX XX XX'
                      value={swishNumber}
                      onChange={(e) => setSwishNumber(e.target.value)}
                      className={styles.input}
                    />
                  </Form.Group>
                  <p className={styles.infoText}>
                    You will receive a Swish payment request on your phone once
                    you confirm the order.
                  </p>
                </div>
              )}

              <div className={styles.btnRow}>
                <Button
                  variant='outline-secondary'
                  className={styles.backBtn}
                  disabled={loading}
                  onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  className={styles.payBtn}
                  disabled={!isPaymentValid || loading}
                  onClick={handlePay}>
                  {loading ? (
                    <>
                      <Spinner
                        as='span'
                        animation='border'
                        size='sm'
                        role='status'
                        aria-hidden='true'
                        className={styles.spinner}
                      />
                      Processing...
                    </>
                  ) : (
                    `Pay USD${total.toFixed(2)}`
                  )}
                </Button>
              </div>

              <p className={styles.privacyNote}>
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our privacy policy.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
