'use client';

import Link from 'next/link';
import { MdLocalShipping, MdCheckCircle, MdDescription } from 'react-icons/md';
import { useCart } from '../../context/cart.context';
import styles from './order-confirmation.module.css';

export default function OrderConfirmation() {
  const { lastOrder } = useCart();

  if (!lastOrder) {
    return (
      <div className={styles.empty}>
        <p>No order found.</p>
        <Link href='/' className={styles.backLink}>
          Back to home
        </Link>
      </div>
    );
  }

  const {
    id,
    date,
    expectedDelivery,
    tracking,
    firstName,
    lastName,
    address,
    city,
    postalCode,
    country,
    shippingMethod,
    shippingCost,
    paymentMethod,
    cardLast4,
    items,
    subtotal,
    taxes,
    total,
  } = lastOrder;

  return (
    <div className={styles.page}>
      {/* ── Header — full width ── */}
      <div className={styles.headerWrapper}>
        <Link href='/' className={styles.backArrow}>
          ←
        </Link>
        <div>
          <h1 className={styles.orderTitle}>Order #{id}</h1>
          <p className={styles.orderDate}>{date}</p>
        </div>
      </div>

      <div className={styles.layout}>
        {/* ── Left ── */}
        <div>
          <div className={styles.card}>
            <p className={styles.deliveryTitle}>Expected {expectedDelivery}</p>
            <p className={styles.trackingText}>
              Canada Post{' '}
              <span className={styles.trackingNumber}>{tracking}</span>
            </p>

            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineIconWrapper}>
                  <MdLocalShipping className={styles.truckIcon} />
                </div>
                <div>
                  <p className={styles.timelineLabelActive}>On its way</p>
                  <p className={styles.timelineDate}>{expectedDelivery}</p>
                </div>
              </div>

              <div className={styles.timelineLine} />

              <div className={styles.timelineItem}>
                <MdCheckCircle className={styles.checkIcon} />
                <div>
                  <p className={styles.timelineLabel}>Confirmed</p>
                  <p className={styles.timelineDate}>{date}</p>
                </div>
              </div>

              <div className={styles.timelineLine} />

              <div className={styles.timelineItem}>
                <MdDescription className={styles.submitIcon} />
                <div>
                  <p className={styles.timelineLabel}>Submitted</p>
                  <p className={styles.timelineDate}>{date}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.detailsGrid}>
              <div>
                <p className={styles.detailTitle}>Contact information</p>
                <p className={styles.detailText}>
                  {firstName} {lastName}
                </p>
              </div>

              <div>
                <p className={styles.detailTitle}>Payment</p>
                <p className={styles.detailText}>
                  {paymentMethod === 'card' ? (
                    <>Visa •••• {cardLast4}</>
                  ) : paymentMethod === 'bank' ? (
                    'Bank Transfer'
                  ) : (
                    'Swish'
                  )}
                  <br />${total.toFixed(2)}
                </p>
              </div>

              <div>
                <p className={styles.detailTitle}>Shipping address</p>
                <p className={styles.detailText}>
                  {firstName} {lastName}
                  <br />
                  {address}
                  <br />
                  {city} {postalCode}
                  <br />
                  {country}
                </p>
              </div>

              <div>
                <p className={styles.detailTitle}>Billing address</p>
                <p className={styles.detailText}>
                  {firstName} {lastName}
                  <br />
                  {address}
                  <br />
                  {city} {postalCode}
                  <br />
                  {country}
                </p>
              </div>

              <div>
                <p className={styles.detailTitle}>Shipping method</p>
                <p className={styles.detailText}>{shippingMethod}</p>
              </div>
            </div>
          </div>

          <div className={styles.footerLinks}>
            <Link href='#' className={styles.footerLink}>
              Return policy
            </Link>
            <Link href='#' className={styles.footerLink}>
              Privacy policy
            </Link>
            <Link href='#' className={styles.footerLink}>
              Terms of service
            </Link>
          </div>
        </div>

        {/* ── Right / Summary ── */}
        <aside className={styles.aside}>
          <ul className={styles.itemList}>
            {items.map((item) => (
              <li key={item.id} className={styles.item}>
                <div className={styles.imageWrapper}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                  <span className={styles.itemQtyBadge}>{item.quantity}</span>
                </div>
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemVariant}>{item.color}</p>
                </div>
                <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
              </li>
            ))}
          </ul>

          <div className={styles.priceBreakdown}>
            <div className={styles.priceRow}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.priceRow}>
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className={styles.priceRow}>
              <span>Taxes</span>
              <span>${taxes.toFixed(2)}</span>
            </div>
            <div className={`${styles.priceRow} ${styles.totalRow}`}>
              <strong>Total</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
