'use client';

import { useEffect, useState } from 'react';
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

const nameRegex = /^[A-Za-z\s'-]+$/;
const postalCodeRegex = /^\d+$/;
const swishRegex = /^07\d{8}$/;

function sanitizeName(value: string): string {
  return value.replace(/[^A-Za-z\s'-]/g, '');
}

function sanitizeDigits(value: string): string {
  return value.replace(/\D/g, '');
}

export default function Checkout() {
  const { items, placeOrder } = useCart();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);

  // Shipping form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [shipping, setShipping] = useState<ShippingOption>('standard');
  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>(
    {},
  );
  const [attemptedShipping, setAttemptedShipping] = useState(false);

  // Payment form
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [discount, setDiscount] = useState('');
  const [discountError, setDiscountError] = useState(false);
  const [swishNumber, setSwishNumber] = useState('');
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>(
    {},
  );
  const [attemptedPayment, setAttemptedPayment] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingCost = SHIPPING_RATES[shipping];
  const taxRate = 0.04;
  const taxes = subtotal * taxRate;
  const total = subtotal + shippingCost + taxes;

  function validateShipping(): Record<string, string> {
    const next: Record<string, string> = {};

    if (!firstName.trim()) next.firstName = 'Please enter your first name.';
    else if (!nameRegex.test(firstName))
      next.firstName = 'First name can only contain letters.';

    if (!lastName.trim()) next.lastName = 'Please enter your last name.';
    else if (!nameRegex.test(lastName))
      next.lastName = 'Last name can only contain letters.';

    if (!address.trim()) next.address = 'Please enter your address.';

    if (!city.trim()) next.city = 'Please enter your city.';
    else if (!nameRegex.test(city))
      next.city = 'City can only contain letters.';

    if (!postalCode.trim()) next.postalCode = 'Please enter your postal code.';
    else if (!postalCodeRegex.test(postalCode))
      next.postalCode = 'Postal code can only contain numbers.';

    if (!country.trim()) next.country = 'Please enter your country.';
    else if (!nameRegex.test(country))
      next.country = 'Country can only contain letters.';

    return next;
  }

  function validatePayment(): Record<string, string> {
    const next: Record<string, string> = {};

    if (paymentMethod === 'card') {
      const digits = cardNumber.replace(/\s/g, '');
      if (!digits) next.cardNumber = 'Please enter your card number.';
      else if (digits.length !== 16)
        next.cardNumber = 'Card number must be 16 digits.';

      if (!expDate) next.expDate = 'Please enter the expiration date.';
      else if (expDate.length !== 5) next.expDate = 'Use MM/YY format.';
      else {
        const [month, year] = expDate.split('/').map(Number);
        if (month < 1 || month > 12) {
          next.expDate = 'Enter a valid month.';
        } else if (new Date(2000 + year, month) < new Date()) {
          next.expDate = 'This card has expired.';
        }
      }

      if (!cvv) next.cvv = 'Please enter the CVV.';
      else if (cvv.length !== 3) next.cvv = 'CVV must be 3 digits.';
    } else if (paymentMethod === 'transfer') {
      if (!swishNumber.trim())
        next.swishNumber = 'Please enter your Swish number.';
      else if (!swishRegex.test(swishNumber))
        next.swishNumber = 'Enter a valid Swedish mobile number.';
    }

    return next;
  }

  useEffect(() => {
    if (attemptedShipping) setShippingErrors(validateShipping());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, lastName, address, city, postalCode, country]);

  useEffect(() => {
    if (attemptedPayment) setPaymentErrors(validatePayment());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardNumber, expDate, cvv, swishNumber, paymentMethod]);

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
    setAttemptedShipping(true);
    const errors = validateShipping();
    setShippingErrors(errors);
    if (Object.keys(errors).length === 0) setStep(2);
  }

  function handlePayClick() {
    setAttemptedPayment(true);
    const errors = validatePayment();
    setPaymentErrors(errors);
    if (Object.keys(errors).length === 0) handlePay();
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
              onChange={(e) => {
                setDiscount(e.target.value);
                setDiscountError(false);
              }}
              className={styles.discountInput}
            />
            <Button
              variant='secondary'
              className={styles.applyBtn}
              onClick={() => {
                if (discount.trim()) setDiscountError(true);
              }}>
              Apply
            </Button>
          </div>
          {discountError && (
            <p className={styles.discountError}>
              No discount code matches "{discount}"
            </p>
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
            <Form noValidate className={styles.stepContent}>
              <h2>Shipping Address</h2>

              <div className={styles.nameRow}>
                <Form.Group className='mb-3'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='John'
                    value={firstName}
                    onChange={(e) => setFirstName(sanitizeName(e.target.value))}
                  />
                  <p className={styles.errorMessage}>
                    {shippingErrors.firstName}
                  </p>
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Doe'
                    value={lastName}
                    onChange={(e) => setLastName(sanitizeName(e.target.value))}
                  />
                  <p className={styles.errorMessage}>
                    {shippingErrors.lastName}
                  </p>
                </Form.Group>
              </div>

              <Form.Group className='mb-3'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='123 Main Street'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <p className={styles.errorMessage}>{shippingErrors.address}</p>
              </Form.Group>

              <div className={styles.nameRow}>
                <Form.Group className='mb-3'>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Stockholm'
                    value={city}
                    onChange={(e) => setCity(sanitizeName(e.target.value))}
                  />
                  <p className={styles.errorMessage}>{shippingErrors.city}</p>
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='11120'
                    value={postalCode}
                    onChange={(e) =>
                      setPostalCode(sanitizeDigits(e.target.value))
                    }
                  />
                  <p className={styles.errorMessage}>
                    {shippingErrors.postalCode}
                  </p>
                </Form.Group>
              </div>

              <Form.Group className='mb-3'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Sweden'
                  value={country}
                  onChange={(e) => setCountry(sanitizeName(e.target.value))}
                />
                <p className={styles.errorMessage}>{shippingErrors.country}</p>
              </Form.Group>

              <h2 className={styles.shippingTitle}>Shipping Method</h2>

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
              <h2>Payment</h2>

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
                  <Form.Group className='mb-3'>
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='1234 5678 9101 1121'
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(formatCardNumber(e.target.value))
                      }
                    />
                    <p className={styles.errorMessage}>
                      {paymentErrors.cardNumber}
                    </p>
                  </Form.Group>

                  <div className={styles.nameRow}>
                    <Form.Group className='mb-3'>
                      <Form.Label>Expiration Date</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='MM/YY'
                        value={expDate}
                        onChange={(e) =>
                          setExpDate(formatExpDate(e.target.value))
                        }
                      />
                      <p className={styles.errorMessage}>
                        {paymentErrors.expDate}
                      </p>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                      <Form.Label>CVV</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='123'
                        value={cvv}
                        onChange={(e) =>
                          setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))
                        }
                      />
                      <p className={styles.errorMessage}>{paymentErrors.cvv}</p>
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
                  <Form.Group className='mb-3'>
                    <Form.Label>Swish Number</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='07X XXX XX XX'
                      value={swishNumber}
                      onChange={(e) =>
                        setSwishNumber(
                          sanitizeDigits(e.target.value).slice(0, 10),
                        )
                      }
                    />
                    <p className={styles.errorMessage}>
                      {paymentErrors.swishNumber}
                    </p>
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
                  disabled={loading}
                  onClick={handlePayClick}>
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
