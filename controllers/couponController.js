import Coupon from "../models/Coupon";

export const applyCoupon = async () => {
    try {
        const { code, totalPrice} = req.body;

        const coupon = await Coupon.findOne({code});

        if (!coupon || !coupon.isActive) {
            return res.status(404).json({message: "Invalid coupon"});
        }

        if (coupon.expiry < new Date()) {
            return res.status(400).json({message: "Coupon expired"});
        }

        let finalPrice = totalPrice;

        if (coupon.discountType === "percentage") {
            finalPrice -= (coupon.value / 100) * totalPrice;
        } else {
            finalPrice -= coupon.value;
        }

        res.json({finalPrice});
        
    } catch (error) {
        console.error("Could not apply coupon", error)
        res.status(500).json({message: error.message});
    }
}