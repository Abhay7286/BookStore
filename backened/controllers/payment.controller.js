import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import { stripe } from "../lib/stripe.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { books, couponCode } = req.body;

    if (!Array.isArray(books) || books.length === 0) {
      return res
        .status(400)
        .json({ message: "Please select at least one book" });
    }

    let totalAmount = 0;

    const lineItems = books.map((book) => {
      const amount = Math.round(book.price * 100);
      totalAmount += amount * (book.quantity || 1);

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: book.title,
            images: [book.image],
          },
          unit_amount: amount,
        },
        quantity: book.quantity || 1,
      };
    });

    let coupon = null;

    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });

      if (coupon) {
        totalAmount -= Math.round(
          (coupon.discountPercentage / 100) * totalAmount
        );
      } else {
        console.log("Invalid or inactive coupon code provided.");
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      discounts: coupon
        ? [
            {
              coupon: await createStripeCoupon(coupon.discountPercentage),
            },
          ]
        : [],
      metadata: {
        userId: req.user?._id.toString(),
        couponCode: coupon?.code || "",
        books: JSON.stringify(
          books.map((book) => ({
            id: book._id,
            quantity: book.quantity,
            price: book.price,
          }))
        ),
      },
    });

    if (totalAmount >= 20000) {
      await createNewCoupon(req.user?._id);
    }

    res.json({ id: session.id, totalAmount: totalAmount / 100 });
  } catch (error) {
    console.log("error in createCheckoutSession controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

async function createStripeCoupon(discountPercentage) {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });

  return coupon.id;
}

async function createNewCoupon(userId) {
  await Coupon.findOneAndDelete({ userId });
  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    userId: userId,
  });

  await newCoupon.save();

  return newCoupon;
}

export const checkoutSuccess = async (req, res) => {
    try {
      const { sessionId } = req.body;
      // console.log("Session ID received:", sessionId);
  
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      // console.log("Stripe session retrieved:", session);
  
      if (session.payment_status === "paid") {
        if (session.metadata.couponCode) {
          await Coupon.findOneAndUpdate(
            {
              code: session.metadata.couponCode,
              userId: session.metadata.userId,
            },
            { isActive: false }
          );
        }
      }
  
      const books = JSON.parse(session.metadata.books);
      // console.log("Creating order with userId:", session.metadata.userId);
  
      const newOrder = new Order({
        userId: session.metadata.userId,
        books: books.map((book) => ({
          book: book.id,
          quantity: book.quantity,
          price: book.price,
        })),
        totalAmount: session.amount_total / 100,
        stripeSessionId: sessionId,
      });
  
      // console.log("Order data being saved:", newOrder);
  
      await newOrder.save();
  
      res.status(200).json({
        success: true,
        message: "Order created successfully",
        orderId: newOrder._id,
      });
    } catch (error) {
      console.error("Error in checkoutSuccess controller:", error.message);
      res.status(500).json({ message: error.message });
    }
  };
  




  