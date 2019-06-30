"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const waves_crypto_1 = require("@waves/waves-crypto");
const marshall_1 = require("@waves/marshall");
const { BASE58_STRING } = marshall_1.serializePrimitives;
const generic_1 = require("../generic");
exports.cancelOrderParamsToBytes = (cancelOrderParams) => waves_crypto_1.concat(BASE58_STRING(cancelOrderParams.sender), BASE58_STRING(cancelOrderParams.orderId));
function cancelOrder(params, seed) {
    const seedsAndIndexes = generic_1.convertToPairs(seed);
    const senderPublicKey = generic_1.getSenderPublicKey(seedsAndIndexes, { senderPublicKey: undefined });
    const cancelOrderBody = {
        sender: senderPublicKey,
        orderId: params.orderId,
        signature: waves_crypto_1.signBytes(waves_crypto_1.concat(BASE58_STRING(senderPublicKey), BASE58_STRING(params.orderId)), seed),
    };
    return cancelOrderBody;
}
exports.cancelOrder = cancelOrder;
//# sourceMappingURL=cancel-order.js.map